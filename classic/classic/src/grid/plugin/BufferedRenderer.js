/**
 * @private
 * Implements buffered rendering of a grid, allowing users to scroll
 * through thousands of records without the performance penalties of
 * rendering all the records into the DOM at once.
 *
 * The number of rows rendered outside the visible area can be controlled by configuring the plugin.
 *
 * Users should not instantiate this class. It is instantiated automatically
 * and applied to all grids.
 *
 * ## Implementation notes
 *
 * This class monitors scrolling of the {@link Ext.view.Table
 * TableView} within a {@link Ext.grid.Panel GridPanel} to render a small section of
 * the dataset.
 *
 */
Ext.define('Ext.grid.plugin.BufferedRenderer', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.bufferedrenderer',

    /**
     * @property {Boolean} isBufferedRenderer
     * `true` in this class to identify an object as an instantiated BufferedRenderer, or subclass thereof.
     */
    isBufferedRenderer: true,

    lockableScope: 'both',

    /**
     * @cfg {Number}
     * The zone which causes new rows to be appended to the view. As soon as the edge
     * of the rendered grid is this number of rows from the edge of the viewport, the view is moved.
     */
    numFromEdge: 2,

    /**
     * @cfg {Number}
     * The number of extra rows to render on the trailing side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    trailingBufferZone: 10,

    /**
     * @cfg {Number}
     * The number of extra rows to render on the leading side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    leadingBufferZone: 20,

    /**
     * @cfg {Boolean} [synchronousRender=true]
     * By default, on detection of a scroll event which brings the end of the rendered table within
     * `{@link #numFromEdge}` rows of the grid viewport, if the required rows are available in the Store,
     * the BufferedRenderer will render rows from the Store *immediately* before returning from the event handler.
     * This setting helps avoid the impression of whitespace appearing during scrolling.
     *
     * Set this to `false` to defer the render until the scroll event handler exits. This allows for faster
     * scrolling, but also allows whitespace to be more easily scrolled into view.
     *
     */
    synchronousRender: true,

    /**
     * @cfg {Number}
     * This is the time in milliseconds to buffer load requests when the store is a {@link Ext.data.BufferedStore buffered store}
     * and a page required for rendering is not present in the store's cache and needs loading.
     */
    scrollToLoadBuffer: 200,

    /**
     * @private
     */
    viewSize: 100,

    /**
     * @private
     */
    rowHeight: 21,
    /**
     * @property {Number} position
     * Current pixel scroll position of the associated {@link Ext.view.Table View}.
     */
    position: 0,
    lastScrollDirection: 1,
    bodyTop: 0,
    scrollHeight: 0,
    loadId: 0,

    // Initialize this as a plugin
    init: function(grid) {
        var me = this,
            view = grid.view,
            viewListeners = {
                scroll: me.onViewScroll,
                scrollend: me.onViewScrollEnd,
                refresh: me.onViewRefresh,
                columnschanged: me.checkVariableRowHeight,
                boxready: me.onViewBoxReady,
                scope: me,
                destroyable: true
            },
            initialConfig = view.initialConfig;

        // If we are going to be handling a NodeStore then it's driven by node addition and removal, *not* refreshing.
        // The view overrides required above change the view's onAdd and onRemove behaviour to call onDataRefresh when necessary.
        if (grid.isTree || (grid.ownerLockable && grid.ownerLockable.isTree)) {
            view.blockRefresh = false;

            // Set a load mask if undefined in the view config.
            if (initialConfig && initialConfig.loadMask === undefined) {
                view.loadMask = true;
            }
        }

        if (view.positionBody) {
            viewListeners.refresh = me.onViewRefresh;
        }

        // Only play the pointer-events;none trick on the platform it is needed on.
        // Only needed when using DOM scrolling on WebKit.
        // WebKit does a browser layout when you change the pointer-events style.
        if (Ext.isWebKit && Ext.supports.touchScroll !== 2) {
            me.needsPointerEventsFix = true;
            viewListeners.scrollEnd = me.onViewScrollEnd;
        }

        me.grid = grid;
        me.view = view;
        me.isRTL = view.getInherited().rtl;
        view.bufferedRenderer = me;
        view.preserveScrollOnRefresh = true;
        view.animate = false;

        // It doesn't matter if it's a FeatureStore or a DataStore. The important thing is to only bind the same Type of
        // store in future operations!
        me.bindStore(view.dataSource);

        // Use a configured rowHeight in the view
        if (view.hasOwnProperty('rowHeight')) {
            me.rowHeight = view.rowHeight;
        }

        me.position = 0;

        me.viewListeners = view.on(viewListeners);
    },

    // Keep the variableRowHeight property correct WRT variable row heights being possible.
    checkVariableRowHeight: function() {
        this.variableRowHeight = this.view.hasVariableRowHeight();
    },

    bindStore: function (newStore) {
        var me = this,
            currentStore = me.store,
            view = me.view;

        // If the grid was configured with a feature such as Grouping that binds a FeatureStore (GroupStore, in its case) as
        // the view's dataSource, we must continue to use the same Type of store.
        //
        // Note that reconfiguring the grid can call into here.
        if (currentStore && currentStore.isFeatureStore) {
            return;
        }

        if (currentStore) {
            me.unbindStore();
        }

        me.storeListeners = newStore.on({
            scope: me,
            groupchange: me.onStoreGroupChange,
            clear: me.onStoreClear,
            beforeload: me.onBeforeStoreLoad,
            load: me.onStoreLoad,
            destroyable: true
        });

        me.store = newStore;

        // If the view has acquired a size, calculate a new view size and scroll range when the store changes.
        if (me.view.componentLayout.layoutCount) {
            // Delete whatever our last viewSize might have been, and fall back to the prototype's default.
            delete me.viewSize;

            if (newStore.isBufferedStore) {
                newStore.setViewSize(me.viewSize);
            }

            me.onViewResize(me.view, 0, me.view.getHeight());
        }
    },

    unbindStore: function() {
        this.storeListeners.destroy();
        this.storeListeners = this.store = null;
    },

    // Disable handling of scroll events until the load is finished
    onBeforeStoreLoad: function(store) {
        var me = this,
            view = me.view;

        if (view && view.refreshCounter) {
            // Unless we are loading tree nodes, or have preserveScrollOnReload, set scroll position and row range back to zero.
            if (store.isTreeStore || view.preserveScrollOnReload) {
                me.nextRefreshStartIndex = view.all.startIndex;
            }
            else {
                if (me.scrollTop !== 0) {
                    // Zero position tracker so that next scroll event will not trigger any action
                    me.setBodyTop(me.bodyTop = me.scrollTop = me.position = me.scrollHeight = me.nextRefreshStartIndex = 0);
                    view.setScrollY(0);
                }
            }

            me.lastScrollDirection = me.scrollOffset = null;
        }
        me.disable();
    },

    // Re-enable scroll event handling on load.
    onStoreLoad: function() {
        this.enable();
    },

    onStoreClear: function() {
        var me = this,
            view = me.view;

        // Do not do anything if view is not rendered, or if the reason for cache clearing is store destruction
        if (view.rendered && !me.store.destroyed) {

            if (me.scrollTop !== 0) {
                // Zero position tracker so that next scroll event will not trigger any action
                me.bodyTop = me.scrollTop = me.position = me.scrollHeight = 0;
                me.nextRefreshStartIndex = null;
                view.setScrollY(0);
            }

            // TableView does not add a Store Clear listener if there's a BufferedRenderer
            // We handle that here.
            view.refresh();

            me.lastScrollDirection = me.scrollOffset = null;
        }
    },

    // If the store is not grouped, we can switch to fixed row height mode
    onStoreGroupChange: function(store) {
        this.refreshSize();
    },

    onViewBoxReady: function(view) {
        this.refreshScroller(view, this.scrollHeight);
    },

    onViewRefresh: function(view, records) {
        var me = this,
            rows = view.all,
            height;

        // Recheck the variability of row height in the view.
        me.checkVariableRowHeight();

        // The first refresh on the leading edge of the initial layout will mean that the
        // View has not had the sizes of flexed columns calculated and flushed yet.
        // So measurement of DOM height for calculation of an approximation of the variableRowHeight would be premature.
        // And measurement of the body width would be premature because of uncalculated flexes.
        if (!view.componentLayoutCounter && (view.headerCt.down('{flex}') || me.variableRowHeight)) {
            view.on({
                boxready: Ext.Function.pass(me.onViewRefresh, [view, records], me),
                single: true
            });
            
            // AbstractView will call refreshSize() immediately after firing the 'refresh'
            // event; we need to skip that run for the reasons stated above.
            me.skipNextRefreshSize = true;
            
            return;
        }
        
        me.skipNextRefreshSize = false;

        // If we are instigating the refresh, we will have already called refreshSize in doRefreshView
        if (me.refreshing) {
            return;
        }

        me.refreshSize();

        if (me.scrollTop !== view.getScrollY()) {
            // The view may have refreshed and scrolled to the top, for example
            // on a sort. If so, it's as if we scrolled to the top, so we'll simulate
            // it here.
            me.onViewScroll();
            me.onViewScrollEnd();
        } else {
            if (!me.hasOwnProperty('bodyTop')) {
                me.bodyTop = rows.startIndex * me.rowHeight;
                view.setScrollY(me.bodyTop);
            }
            me.setBodyTop(me.bodyTop);

            // With new data, the height may have changed, so recalculate the rowHeight and viewSize.
            // This will either add or remove some rows.
            height = view.getHeight();
            if (rows.getCount() && height > 0) {
                me.onViewResize(view, null, height);

                // If we repaired the view by adding or removing records, then keep the records array
                // consistent with what is there for subsequent listeners.
                // For example the WidgetColumn listener which post-processes all rows: https://sencha.jira.com/browse/EXTJS-13942
                if (records && (rows.getCount() !== records.length)) {
                    records.length = 0;
                    records.push.apply(records, me.store.getRange(rows.startIndex, rows.endIndex));
                }
            }
        }
    },

    /**
     * @private
     * @param {Ext.layout.ContextItem} ownerContext The view's layout context
     * Called before the start of a view's layout run
     */
    beforeTableLayout: function(ownerContext) {
        var dom = this.view.body.dom;
        if (dom) {
            ownerContext.bodyHeight = dom.offsetHeight;
            ownerContext.bodyWidth = dom.offsetWidth;
        }
    },

    /**
     * @private
     * @param {Ext.layout.ContextItem} ownerContext The view's layout context
     * Called when a view's layout run is complete.
     */
    afterTableLayout: function(ownerContext) {
        var me = this,
            view = me.view,
            renderedBlockHeight;

        // The rendered block has changed height.
        // This could happen if a cellWrap: true column has changed width.
        // We need to recalculate row height and scroll range
        if (ownerContext.bodyHeight && view.body.dom) {
            delete me.rowHeight;
            me.refreshSize();
            renderedBlockHeight = view.body.dom.offsetHeight;
            if (renderedBlockHeight !== ownerContext.bodyHeight) {
                me.onViewResize(view, null, view.el.lastBox.height);

                // The layout has caused the rendered block to shrink in height.
                // This could happen if a cellWrap: true column has increased in width.
                // It could cause the bottom of the rendered view to zoom upwards
                // out of sight.
                if (renderedBlockHeight < ownerContext.bodyHeight) {
                    if (me.viewSize >= me.store.getCount()) {
                        me.setBodyTop(0);
                    }

                    // Column got wider causing scroll range to shrink, leaving the view stranded above the fold.
                    // Scroll up to bring it into view.
                    else if (me.bodyTop > me.scrollTop || me.bodyTop + renderedBlockHeight < me.scrollTop + me.viewClientHeight) {
                        me.setBodyTop(me.scrollTop - me.trailingBufferZone * me.rowHeight);
                    }
                }

                // If the rendered block is the last lines in the dataset,
                // ensure the scroll range exactly encapsuates it.
                if (view.all.endIndex === (view.dataSource.getCount()) - 1) {
                    me.stretchView(view, me.scrollHeight = me.bodyTop + renderedBlockHeight - 1);
                }
            }
        }
    },

    refreshSize: function() {
        var me = this,
            view = me.view,
            skipNextRefreshSize = me.skipNextRefreshSize,
            dom = view.body.dom;
    
        // We only want to skip ONE time.
        me.skipNextRefreshSize = false;
        
        if (skipNextRefreshSize || !dom) {
            return;
        }

        // Cache the rendered block height.
        me.bodyHeight = view.body.dom.offsetHeight;
        
        // Calculates scroll range.
        // Also calculates rowHeight if we do not have an own rowHeight property.
        me.scrollHeight = me.getScrollHeight();

        me.stretchView(view, me.scrollHeight);
    },

    /**
     * Called directly from {@link Ext.view.Table#onResize}. Reacts to View changing height by
     * recalculating the size of the rendered block, and either trimming it or adding to it.
     * @param {Ext.view.Table} view The Table view.
     * @param {Number} width The new Width.
     * @param {Number} height The new height.
     * @param {Number} oldWidth The old width.
     * @param {Number} oldHeight The old height.
     * @private
     */
    onViewResize: function(view, width, height, oldWidth, oldHeight) {
        var me = this,
            newViewSize;

        // Only process first layout (the boxready event) or height resizes.
        if (!oldHeight || height !== oldHeight) {

            // Recalculate the view size in rows now that the grid view has changed height
            newViewSize = Math.ceil(height / me.rowHeight) + me.trailingBufferZone + me.leadingBufferZone;
            me.viewSize = me.setViewSize(newViewSize);
            me.viewClientHeight = view.el.dom.clientHeight;
        }
    },

    stretchView: function(view, scrollRange) {
        var me = this;

        // Ensure that both the scroll range AND the positioned view body are in the viewable area.
        if (me.scrollTop > scrollRange) {
            me.position = me.scrollTop = Math.max(scrollRange - me.bodyHeight, 0);
            view.setScrollY(me.scrollTop);
        }
        if (me.bodyTop > scrollRange) {
            view.body.translate(null, me.bodyTop = me.position);
        }

        // Tell the scroller what the scroll size is.
        if (view.getScrollable()) {
            me.refreshScroller(view, scrollRange);
        }
    },

    refreshScroller: function(view, scrollRange) {
        var scroller = view.getScrollable();

        if (scroller) {
            // Ensure the scroller viewport element size is up to date if it needs to be told (touch scroller)
            if (scroller.setElementSize) {
                scroller.setElementSize();
            }

            // Ensure the scroller knows about content size
            scroller.setSize({
                x: view.headerCt.getTableWidth(),
                y: scrollRange
            });
        }
    },

    setViewSize: function(viewSize, fromLockingPartner) {
        var me = this,
            store = me.store,
            view = me.view,
            rows = view.all,
            elCount = rows.getCount(),
            start, end,
            lockingPartner = me.view.lockingPartner && me.view.lockingPartner.bufferedRenderer,
            diff = elCount - viewSize,
            records,
            oldRows,
            newRows,
            storeCount;

        // Exchange largest view size as long as the partner has been laid out (and thereby calculated a true view size)
        if (lockingPartner && !fromLockingPartner && lockingPartner.view.componentLayoutCounter) {
            if (lockingPartner.viewSize > viewSize) {
                viewSize = lockingPartner.viewSize;
            }
            else {
                lockingPartner.setViewSize(viewSize, true);
            }
        }

        diff = elCount - viewSize;
        if (diff) {

            // Must be set for getFirstVisibleRowIndex to work
            me.scrollTop = view.getScrollY();

            me.viewSize = viewSize;
            if (store.isBufferedStore) {
                store.setViewSize(viewSize);
            }

            // If a store loads before we have calculated a viewSize, it loads me.defaultViewSize records.
            // This may be larger or smaller than the final viewSize so the store needs adjusting when the view size is calculated.
            if (elCount) {
                storeCount = store.getCount();
                start = rows.startIndex;
                    end = Math.min(start + viewSize - 1, storeCount - 1);

                // Only do expensive adding or removal if range is not already correct
                if (start === rows.startIndex && end === rows.endIndex) {
                    // Needs rows adding to top
                    if (diff < 0) {
                        me.handleViewScroll(-1);
                    }
                } else {
                    // While changing our visible range, the locking partner must not sync
                    if (lockingPartner) {
                        lockingPartner.disable();
                    }

                    // View must expand: add rows at end if possible
                    if (diff < 0) {

                        // If it's *possible* to add rows to the end...
                        if (storeCount > elCount) {

                            // Store's getRange API always has been inclusive of endIndex.
                            store.getRange(rows.endIndex + 1, end, {
                                callback: function(records, start) {
                                    newRows = view.doAdd(records, start);
                                    view.fireEvent('itemadd', records, start, newRows);
                                    me.setBodyTop(me.bodyTop);
                                }
                            });
                        }
                        // If not possible just refresh
                        else {
                            me.refreshView(0);
                        }
                    }

                    // View is shrinking: remove rows from end
                    else {
                        // Remove the DOM rows
                        start = rows.endIndex - (diff - 1);
                        end = rows.endIndex;
                        oldRows = rows.slice(start, end + 1);
                        rows.removeRange(start, end, true);

                        if (view.hasListeners.itemremove) {
                            records = store.getRange(start, end);
                            view.fireEvent('itemremove', records, start, oldRows);
                        }
                        me.setBodyTop(me.bodyTop);
                    }
                    if (lockingPartner) {
                        lockingPartner.enable();
                    }
                }
            }
        }
        return viewSize;
    },

    /**
     * @private
     * TableView's getViewRange delegates the operation to this method if buffered rendering is present.
     */
    getViewRange: function() {
        var me = this,
            rows = me.view.all,
            store = me.store,
            startIndex = 0;

        // If there already is a view range, then the startIndex from that
        if (rows.getCount()) {
            startIndex = rows.startIndex;
        }
        // Otherwise use start index of current page.
        // https://sencha.jira.com/browse/EXTJSIV-10724
        // Buffered store may be primed with loadPage(n) call rather than autoLoad which starts at index 0.
        else if (store.isBufferedStore) {
            if (!store.currentPage) {
                store.currentPage = 1;
            }
            startIndex = rows.startIndex = (store.currentPage - 1) * (store.pageSize || 1);

            // The RowNumberer uses the current page to offset the record index, so when buffered, it must always be on page 1
            store.currentPage = 1;
        }

        if (store.data.getCount()) {
            return store.getRange(startIndex, startIndex + (me.viewSize || store.defaultViewSize) - 1);
        } else {
            return [];
        }
    },

    /**
     * @private
     * Handles the Store replace event, producing a correct buffered view after the replace operation.
     */
    onReplace: function(store, startIndex, oldRecords, newRecords) {
        var me = this,
            view = me.view,
            rows = view.all,
            oldStartIndex,
            renderedSize = rows.getCount(),
            lastAffectedIndex = startIndex + oldRecords.length - 1,
            recordIncrement = newRecords.length - oldRecords.length,
            scrollIncrement = recordIncrement * me.rowHeight;

        // All replacement activity is past the end of a full-sized rendered block; do nothing except update scroll range
        if (startIndex >= rows.startIndex + me.viewSize) {
            me.refreshSize();
            return;
        }

        // If the change is all above the rendered block and the rendered block is its maximum size, update the scroll range and
        // ensure the buffer zone above is filled if possible.
        if (renderedSize && lastAffectedIndex < rows.startIndex && rows.getCount() >= me.viewSize) {

            // Move the index-based NodeCache up or down depending on whether it's a net adding or removal above.
            rows.moveBlock(recordIncrement);
            me.refreshSize();

            // If the change above us was an addition, pretend that we just scrolled upwards
            // which will ensure that there is at least this.numFromEdge rows above the fold.
            oldStartIndex = rows.startIndex;
            if (recordIncrement > 0) {

                // Do not allow this operation to mirror to the partner side.
                me.doNotMirror = true;
                me.handleViewScroll(-1);
                me.doNotMirror = false;
            }

            // If the handleViewScroll did nothing, we just have to ensure the rendered block is the correct
            // amount down the scroll range, and then readjust the top of the rendered block to keep the visuals the same.
            if (rows.startIndex === oldStartIndex) {
                // If inserting or removing invisible records above the start of the rendered block, the visible
                // block must then be moved up or down the scroll range.
                if (rows.startIndex) {
                    me.setBodyTop(me.bodyTop += scrollIncrement);
                    view.suspendEvent('scroll');
                    view.scrollBy(0, scrollIncrement);
                    view.resumeEvent('scroll');
                    me.position = me.scrollTop = view.getScrollY();
                }
            }
            // The handleViewScroll added rows, so we must scroll to keep the visuals the same;
            else {
                view.suspendEvent('scroll');
                view.scrollBy(0, (oldStartIndex  - rows.startIndex) * me.rowHeight);
                view.resumeEvent('scroll');
            }
            view.refreshSize(rows.getCount() !== renderedSize);

            return;
        }

        // If the change is all below the rendered block, update the scroll range
        // and ensure the buffer zone below us is filled if possible.
        if (renderedSize && startIndex > rows.endIndex) {
            me.refreshSize();

            // If the change below us was an addition, ask for <viewSize>
            // rows to be rendered starting from the current startIndex.
            // If more rows need to be scrolled onto the bottom of the rendered
            // block to achieve this, that will do it.
            if (recordIncrement > 0) {
                me.onRangeFetched(null, rows.startIndex, Math.min(store.getCount(), rows.startIndex + me.viewSize) - 1, null, true);
            }
            view.refreshSize(rows.getCount() !== renderedSize);

            return;
        }

        // Cut into rendered block from above
        if (startIndex < rows.startIndex && lastAffectedIndex <= rows.endIndex) {
            me.refreshView(rows.startIndex - oldRecords.length + newRecords.length);
            return;
        }

        if (startIndex < rows.startIndex && lastAffectedIndex <= rows.endIndex && scrollIncrement) {
            view.suspendEvent('scroll');
            view.setScrollY(me.position = me.scrollTop += scrollIncrement);
            view.resumeEvent('scroll');
        }

        // Only need to change display if the view is currently empty, or
        // change intersects the rendered view.
        me.refreshView();
    },

    /**
     * @private
     * Scrolls to and optionally selects the specified row index **in the total dataset**.
     *
     * This is a private method for internal usage by the framework.
     *
     * Use the grid's {@link Ext.panel.Table#ensureVisible ensureVisible} method to scroll a particular
     * record or record index into view.
     *
     * @param {Number/Ext.data.Model} record The record, or the zero-based position in the dataset to scroll to.
     * @param {Object}          [options] An object containing options to modify the operation.
     * @param {Boolean}         [options.animate] Pass `true` to animate the row into view.
     * @param {Boolean}         [options.highlight] Pass `true` to highlight the row with a glow animation when it is in view.
     * @param {Boolean}         [options.select] Pass as `true` to select the specified row.
     * @param {Boolean}         [options.focus] Pass as `true` to focus the specified row.
     * @param {Function}        [options.callback] A function to call when the row has been scrolled to.
     * @param {Number}          options.callback.recordIdx The resulting record index (may have changed if the passed index was outside the valid range).
     * @param {Ext.data.Model}  options.callback.record The resulting record from the store.
     * @param {HTMLElement}     options.callback.node The resulting view row element.
     * @param {Object}          [options.scope] The scope (`this` reference) in which to execute the callback. Defaults to this BufferedRenderer.
     * @param {Ext.grid.column.Column/Number} [options.column] The column, or column index to scroll into view.
     *
     */
    scrollTo: function(recordIdx, options) {
        var args = arguments,
            me = this,
            view = me.view,
            lockingPartner = view.lockingPartner && view.lockingPartner.grid.isVisible() && view.lockingPartner.bufferedRenderer,
            store = me.store,
            total = store.getCount(),
            startIdx, endIdx,
            targetRow,
            tableTop,
            groupingFeature,
            metaGroup,
            record,
            direction;

        // New option object API
        if (options !== undefined && !(options instanceof Object)) {
            options = {
                select : args[1],
                callback: args[2],
                scope: args[3]
            };
        }

        // If we have a grouping summary feature rendering the view in groups,
        // first, ensure that the record's group is expanded,
        // then work out which record in the groupStore the record is at.
        if ((groupingFeature = view.dataSource.groupingFeature) && (groupingFeature.collapsible)) {
            if (recordIdx.isEntity) {
                record = recordIdx;
            } else {
                record = view.store.getAt(Math.min(Math.max(recordIdx, 0), view.store.getCount() - 1));
            }

            metaGroup = groupingFeature.getMetaGroup(record);

            if (metaGroup && metaGroup.isCollapsed) {
                if (!groupingFeature.isExpandingOrCollapsing) {
                    groupingFeature.expand(groupingFeature.getGroup(record).getGroupKey());
                    total = store.getCount();
                    recordIdx = groupingFeature.indexOf(record);
                } else {
                    // If we've just been collapsed, then the only record we have is
                    // the wrapped placeholder
                    record = metaGroup.placeholder;
                    recordIdx = groupingFeature.indexOfPlaceholder(record);
                }
            } else {
                recordIdx = groupingFeature.indexOf(record);
            }

        } else {

            if (recordIdx.isEntity) {
                record = recordIdx;
                recordIdx = store.indexOf(record);

                // Currently loaded pages do not contain the passed record, we cannot proceed.
                if (recordIdx === -1) {
                    //<debug>
                    Ext.raise('Unknown record passed to BufferedRenderer#scrollTo');
                    //</debug>
                    return;
                }
            } else {
                // Sanitize the requested record index
                recordIdx = Math.min(Math.max(recordIdx, 0), total - 1);
                record = store.getAt(recordIdx);
            }
        }

        // See if the required row for that record happens to be within the rendered range.
        if (record && (targetRow = view.getNode(record))) {
            view.grid.ensureVisible(record,options);

            // Keep the view immediately replenished when we scroll an existing element into view.
            // DOM scroll events fire asynchronously, and we must not leave subsequent code without a valid buffered row block.
            me.onViewScroll();
            me.onViewScrollEnd();

            return;
        }

        // Calculate view start index.
        // If the required record is above the fold...
        if (recordIdx < view.all.startIndex) {
            // The startIndex of the new rendered range is a little less than the target record index.
            direction = -1;
            startIdx = Math.max(Math.min(recordIdx - (Math.floor((me.leadingBufferZone + me.trailingBufferZone) / 2)), total - me.viewSize + 1), 0);
            endIdx = Math.min(startIdx + me.viewSize - 1, total - 1);
        }
        // If the required record is below the fold...
        else {
            // The endIndex of the new rendered range is a little greater than the target record index.
            direction = 1;
            endIdx = Math.min(recordIdx + (Math.floor((me.leadingBufferZone + me.trailingBufferZone) / 2)), total - 1);
            startIdx = Math.max(endIdx - (me.viewSize - 1), 0);
        }
        tableTop = Math.max(startIdx * me.rowHeight, 0);

        store.getRange(startIdx, endIdx, {
            callback: function(range, start, end) {
                // Render the range.
                // Pass synchronous flag so that it does it inline, not on a timer.
                // Pass fromLockingPartner flag so that it does not inform the lockingPartner.
                me.renderRange(start, end, true, true);
                record = store.data.getRange(recordIdx, recordIdx + 1)[0];
                targetRow = view.getNode(record);

                // bodyTop property must track the translated position of the body
                view.body.translate(null, me.bodyTop = tableTop);

                // Ensure the scroller knows about the range if we're going down
                if (direction === 1) {
                    me.refreshSize();
                }

                // Locking partner must render the same range
                if (lockingPartner) {
                    lockingPartner.renderRange(start, end, true, true);

                    // Sync all row heights
                    me.syncRowHeights();

                    // bodyTop property must track the translated position of the body
                    lockingPartner.view.body.translate(null, lockingPartner.bodyTop = tableTop);

                    // Ensure the scroller knows about the range if we're going down
                    if (direction === 1) {
                        lockingPartner.refreshSize();
                    }
                }

                // The target does not map to a view node.
                // Cannot scroll to it.
                if (!targetRow) {
                    return;
                }
                view.grid.ensureVisible(record,options);

                me.scrollTop = me.position = me.view.getScrollY();

                if (lockingPartner) {
                    lockingPartner.position = lockingPartner.scrollTop = me.scrollTop;
                }
            }
        });
    },

    onViewScroll: function() {
        var me = this,
            store = me.store,
            totalCount = (store.getCount()),
            vscrollDistance,
            scrollDirection,
            scrollTop = me.scrollTop = me.view.getScrollY();

        // Only play the pointer-events;none trick on the platform it is needed on.
        // WebKit does a browser layout when you change the pointer-events style.
        // Stops the jagging DOM scrolling when mouse is over data rows.
        if (me.needsPointerEventsFix) {
            me.view.body.dom.style.pointerEvents = 'none';
        }

        // Only check for nearing the edge if we are enabled, and if there is overflow beyond our view bounds.
        // If there is no paging to be done (Store's dataset is all in memory) we will be disabled.
        if (!(me.disabled || totalCount < me.viewSize)) {

            vscrollDistance = scrollTop - me.position;
            scrollDirection = vscrollDistance > 0 ? 1 : -1;

            // Moved at least 20 pixels, or changed direction, so test whether the numFromEdge is triggered
            if (Math.abs(vscrollDistance) >= 20 || (scrollDirection !== me.lastScrollDirection)) {
                me.lastScrollDirection = scrollDirection;
                me.handleViewScroll(me.lastScrollDirection);
            }
        }
    },

    onViewScrollEnd: function() {
        // Only play the pointer-events;none trick on the platform it is needed on.
        // WebKit does a browser layout when you change the pointer-events style.
        // Stops the jagging DOM scrolling when mouse is over data rows.
        if (this.needsPointerEventsFix) {
            this.view.body.dom.style.pointerEvents = '';
        }
    },

    handleViewScroll: function(direction) {
        var me              = this,
            rows            = me.view.all,
            store           = me.store,
            viewSize        = me.viewSize,
            lastItemIndex   = store.getCount() - 1,
            requestStart,
            requestEnd;

        // We're scrolling up
        if (direction === -1) {

            // If table starts at record zero, we have nothing to do
            if (rows.startIndex) {
                if (me.topOfViewCloseToEdge()) {
                    requestStart = Math.max(0, me.getLastVisibleRowIndex() + me.trailingBufferZone - viewSize);
                }
            }
        }
        // We're scrolling down
        else {

            // If table ends at last record, we have nothing to do
            if (rows.endIndex < lastItemIndex) {
                if (me.bottomOfViewCloseToEdge()) {
                    requestStart = Math.max(0, me.getFirstVisibleRowIndex() - me.trailingBufferZone);
                }
            }
        }

        // View is OK at this scroll. Advance loadId so that any load requests in flight do not
        // result in rendering upon their return.
        if (requestStart == null) {
            // View is still valid at this scroll position.
            // Do not trigger a handleViewScroll call until *ANOTHER* 20 pixels have scrolled by.
            me.position = me.scrollTop;
            me.loadId++;
        }
        // We scrolled close to the edge and the Store needs reloading
        else {
            requestEnd = Math.min(requestStart + viewSize - 1, lastItemIndex);

            // viewSize was calculated too small due to small sample row count with some skewed
            // item height in there such as a tall group header item. Extend the view size in this case.
            if (me.variableRowHeight && requestEnd === rows.endIndex && requestEnd < lastItemIndex) {
                requestEnd++;

                // Do NOT call setViewSize - that re-renders the view at the new size,
                // and we are just about to scroll it to correct it.
                me.viewSize = viewSize++;
                if (store.isBufferedStore) {
                    store.setViewSize(me.viewSize);
                }
            }

            // If calculated view range has moved, then render it and return the fact that the scroll was handled.
            if (requestStart !== rows.startIndex || requestEnd !== rows.endIndex) {
                me.renderRange(requestStart, requestEnd);
                return true;
            }
        }
    },

    bottomOfViewCloseToEdge: function() {
        var me = this;

        if (me.variableRowHeight) {
            return me.bodyTop + me.bodyHeight < me.scrollTop + me.view.lastBox.height + (me.numFromEdge * me.rowHeight);
        } else {
            return (me.view.all.endIndex - me.getLastVisibleRowIndex()) < me.numFromEdge;
        }
    },

    topOfViewCloseToEdge: function() {
        var me = this;

        if (me.variableRowHeight) {
            // The body top position is within the numFromEdge zone
            return me.bodyTop > me.scrollTop - (me.numFromEdge * me.rowHeight);
        } else {
            return (me.getFirstVisibleRowIndex() - me.view.all.startIndex) < me.numFromEdge;
        }
    },

    /**
     * @private
     * Refreshes the current rendered range if possible.
     * Optionally refreshes starting at the specified index.
     */
    refreshView: function(startIndex) {
        var me = this,
            viewSize = me.viewSize,
            rows = me.view.all,
            store = me.store,
            storeCount = store.getCount(),
            maxIndex = Math.max(0, storeCount - 1),
            endIndex;

        // Empty Store is simple, don't even ask the store
        if (!storeCount) {
            return me.doRefreshView([], 0, 0);
        }
        // Store doesn't fill the required view size. Simple start/end calcs.
        else if (storeCount < viewSize) {
            startIndex = 0;
            endIndex = maxIndex;
        } else {
            if (startIndex == null) {
                // Use a nextRefreshStartIndex as set by a load operation in which we are maintaining scroll position
                if (me.nextRefreshStartIndex != null) {
                    startIndex = me.nextRefreshStartIndex;
                    me.nextRefreshStartIndex = null;
                } else {
                    startIndex = rows.startIndex;
                }
            }
            // New start index should be current start index unless that's now too close to the end of the store
            // to yield a full view, in which case work back from the end of the store. If working back from the end, the leading buffer zone
            // cannot be rendered, so subtract it from the view size.
            // Ensure we don't go negative.
            startIndex = Math.max(0, Math.min(startIndex, maxIndex - (viewSize - me.leadingBufferZone) + 1));

            // New end index works forward from the new start index ensuring we don't walk off the end    
            endIndex = Math.min(startIndex + viewSize - 1, maxIndex);

            if (endIndex - startIndex + 1 > viewSize) {
                startIndex = endIndex - viewSize + 1;
            }
        }

        if (startIndex === 0 && endIndex === 0 && storeCount === 0) {
            me.doRefreshView([], 0, 0);
        } else {
            store.getRange(startIndex, endIndex, {
                callback: me.doRefreshView,
                scope: me
            });
        }
    },

    doRefreshView: function(range, startIndex, endIndex, options) {
        var me = this,
            view = me.view,
            rows = view.all,
            previousStartIndex = rows.startIndex,
            previousEndIndex = rows.endIndex,
            previousFirstItem,
            previousLastItem,
            prevRowCount = rows.getCount(),
            newNodes,
            viewMoved = startIndex !== rows.startIndex,
            calculatedTop,
            scrollIncrement,
            restoreFocus;

        if (view.refreshCounter) {

            // Give CellEditors or other transient in-cell items a chance to get out of the way.
            if (view.hasListeners.beforerefresh && view.fireEvent('beforerefresh', view) === false) {
                return;
            }

            // So that listeners to the itemremove events know that its because of a refresh.
            // And so that this class's refresh listener knows to ignore it.
            view.refreshing = me.refreshing = true;

            // If focus was in any way in the view, whether actionable or navigable, this will return
            // a function which will restore that state.
            restoreFocus = view.saveFocusState();

            view.clearViewEl(true);
            view.refreshCounter++;
            if (range.length) {
                newNodes = view.doAdd(range, startIndex);

                if (viewMoved) {
                    // Try to find overlap between newly rendered block and old block
                    previousFirstItem = rows.item(previousStartIndex, true);
                    previousLastItem = rows.item(previousEndIndex, true);

                    // Work out where to move the view top if there is overlap
                    if (previousFirstItem) {
                        scrollIncrement = -previousFirstItem.offsetTop;
                    } else if (previousLastItem) {
                        scrollIncrement = rows.last(true).offsetTop - previousLastItem.offsetTop;
                    }

                    // If there was an overlap, we know exactly where to move the view
                    if (scrollIncrement) {
                        me.bodyTop = Math.max(me.bodyTop + scrollIncrement, 0);
                        me.scrollTop = me.bodyTop ? me.scrollTop + scrollIncrement : 0;
                    }
                    // No overlap: calculate the a new body top and scrollTop.
                    else {
                        // To position rows, remove table's top border
                        me.bodyTop  = calculatedTop = startIndex * me.rowHeight;
                        me.scrollTop = Math.max(calculatedTop - me.rowHeight * (calculatedTop < me.bodyTop ? me.leadingBufferZone : me.trailingBufferZone, 0));
                    }
                }
            }

            // Clearing the view.
            // Ensure we jump to top.
            // Apply empty text.
            else {
                if (me.scrollTop) {
                    me.bodyTop = me.scrollTop = 0;
                }
                view.addEmptyText();
            }

            // Keep scroll and rendered block positions synched.
            if (viewMoved) {
                me.setBodyTop(me.bodyTop);
                view.suspendEvent('scroll');
                view.setScrollY(me.position = me.scrollTop);
                view.resumeEvent('scroll');
            }

            // Correct scroll range
            me.refreshSize();
            view.refreshSize(rows.getCount() !== prevRowCount);
            view.fireEvent('refresh', view, range);

            // If focus was in any way in this view, this will restore it
            restoreFocus();
            view.headerCt.setSortState();
            view.refreshNeeded = view.refreshing = me.refreshing = false;
        } else {
            view.refresh();
        }
    },

    renderRange: function(start, end, forceSynchronous, fromLockingPartner) {
        var me = this,
            rows = me.view.all,
            store = me.store;

        // Skip if we are being asked to render exactly the rows that we already have.
        // This can happen if the viewSize has to be recalculated (due to either a data refresh or a view resize event)
        // but the calculated size ends up the same.
        if (!(start === rows.startIndex && end === rows.endIndex)) {

            // If range is availiable synchronously, process it now.
            if (store.rangeCached(start, end)) {
                me.cancelLoad();

                if (me.synchronousRender || forceSynchronous) {
                    me.onRangeFetched(null, start, end, null, fromLockingPartner);
                } else {
                    if (!me.renderTask) {
                        me.renderTask = new Ext.util.DelayedTask(me.onRangeFetched, me, null, false);
                    }
                    // Render the new range very soon after this scroll event handler exits.
                    // If scrolling very quickly, a few more scroll events may fire before
                    // the render takes place. Each one will just *update* the arguments with which
                    // the pending invocation is called.
                    me.renderTask.delay(1, null, null, [null, start, end, null, fromLockingPartner]);
                }
            }

            // Required range is not in the prefetch buffer. Ask the store to prefetch it.
            else {
                me.attemptLoad(start, end);
            }
        }
    },

    onRangeFetched: function(range, start, end, options, fromLockingPartner) {
        var me = this,
            view = me.view,
            viewEl = view.el,
            oldStart,
            rows = view.all,
            removeCount,
            increment = 0,
            calculatedTop,
            newTop,
            lockingPartner = (view.lockingPartner && !fromLockingPartner && !me.doNotMirror) && view.lockingPartner.bufferedRenderer,
            newRows,
            partnerNewRows,
            topAdditionSize,
            topBufferZone,
            i,
            variableRowHeight = me.variableRowHeight,
            activeEl,
            containsFocus,
            pos;

        // View may have been destroyed since the DelayedTask was kicked off.
        if (view.destroyed) {
            return;
        }

        // If called as a callback from the Store, the range will be passed, if called from renderRange, it won't
        if (range) {
            // Re-cache the scrollTop if there has been an asynchronous call to the server.
            me.scrollTop = me.view.getScrollY();
        } else {
            range = me.store.getRange(start, end);

            // Store may have been cleared since the DelayedTask was kicked off.
            if (!range) {
                return;
            }
        }

        // If we contain focus now, but do not when we have rendered the new rows, we must focus the view el.
        activeEl = Ext.Element.getActiveElement();
        containsFocus = viewEl.contains(activeEl);

        // Best guess rendered block position is start row index * row height.
        calculatedTop = start * me.rowHeight;

        // The new range encompasses the current range. Refresh and keep the scroll position stable
        if (start < rows.startIndex && end > rows.endIndex) {

            // How many rows will be added at top. So that we can reposition the table to maintain scroll position
            topAdditionSize = rows.startIndex - start;

            // MUST use View method so that itemremove events are fired so widgets can be recycled.
            view.clearViewEl(true);
            newRows = view.doAdd(range, start);
            view.fireEvent('itemadd', range, start, newRows);
            for (i = 0; i < topAdditionSize; i++) {
                increment -= newRows[i].offsetHeight;
            }

            // We've just added a bunch of rows to the top of our range, so move upwards to keep the row appearance stable
           newTop = me.bodyTop + increment;
        }
        else {
            // No overlapping nodes, we'll need to render the whole range
            // teleported flag is set in getFirstVisibleRowIndex/getLastVisibleRowIndex if
            // the table body has moved outside the viewport bounds
            if (me.teleported || start > rows.endIndex || end < rows.startIndex) {
                newTop = calculatedTop;

                // If we teleport with variable row height, the best thing is to try to render the block
                // <bufferzone> pixels above the scrollTop so that the rendered block encompasses the
                // viewport. Only do that if the start is more than <bufferzone> down the dataset.
                if (variableRowHeight) {
                    topBufferZone = me.scrollTop < me.position ? me.leadingBufferZone : me.trailingBufferZone;
                    if (start > topBufferZone) {
                        newTop = me.scrollTop - me.rowHeight * topBufferZone;
                    }
                }
                // MUST use View method so that itemremove events are fired so widgets can be recycled.
                view.clearViewEl(true);
                me.teleported = false;
            }

            if (!rows.getCount()) {
                newRows = view.doAdd(range, start);
                view.fireEvent('itemadd', range, start, newRows);
            }
            // Moved down the dataset (content moved up): remove rows from top, add to end
            else if (end > rows.endIndex) {
                removeCount = Math.max(start - rows.startIndex, 0);

                // We only have to bump the table down by the height of removed rows if rows are not a standard size
                if (variableRowHeight) {
                    increment = rows.item(rows.startIndex + removeCount, true).offsetTop;
                }
                newRows = rows.scroll(Ext.Array.slice(range, rows.endIndex + 1 - start), 1, removeCount);

                // We only have to bump the table down by the height of removed rows if rows are not a standard size
                if (variableRowHeight) {
                    // Bump the table downwards by the height scraped off the top
                    newTop = me.bodyTop + increment;
                } else {
                    newTop = calculatedTop;
                }
            }
            // Moved up the dataset: remove rows from end, add to top
            else {
                removeCount = Math.max(rows.endIndex - end, 0);
                oldStart = rows.startIndex;
                newRows = rows.scroll(Ext.Array.slice(range, 0, rows.startIndex - start), -1, removeCount);

                // We only have to bump the table up by the height of top-added rows if rows are not a standard size
                if (variableRowHeight) {
                    // Bump the table upwards by the height added to the top
                    newTop = me.bodyTop - rows.item(oldStart, true).offsetTop;

                    // We've arrived at row zero...
                    if (!rows.startIndex) {
                        // But the calculated top position is out. It must be zero at this point
                        // We adjust the scroll position to keep visual position of table the same.
                        if (newTop) {
                            view.setScrollY(me.position = (me.scrollTop -= newTop));
                            newTop = 0;
                        }
                    }

                    // Not at zero yet, but the position has moved into negative range
                    else if (newTop < 0) {
                        increment = rows.startIndex * me.rowHeight;
                        view.setScrollY(me.position = (me.scrollTop += increment));
                        newTop = me.bodyTop + increment;
                    }
                } else {
                    newTop = calculatedTop;
                }
            }

            // The position property is the scrollTop value *at which the table was last correct*
            // MUST be set at table render/adjustment time
            me.position = me.scrollTop;
        }

        // We contained focus at the start, but that activeEl has been derendered.
        // Focus the cell's column header.
        if (containsFocus && !viewEl.contains(activeEl)) {
            pos = view.actionableMode ? view.actionPosition : view.lastFocused;
            if (pos && pos.column) {
                view.onFocusLeave({});
                pos.column.focus();
            }
        }

        // Position the item container.
        newTop = Math.max(Math.floor(newTop), 0);
        if (view.positionBody) {
            me.setBodyTop(newTop);
        }

        // Sync the other side to exactly the same range from the dataset.
        // Then ensure that we are still at exactly the same scroll position.
        if (newRows && lockingPartner && !lockingPartner.disabled) {
            // Set the pointers of the partner so that its onRangeFetched believes it is at the correct position.
            lockingPartner.scrollTop = lockingPartner.position = me.scrollTop;
            if (lockingPartner.view.ownerCt.isVisible()) {
                partnerNewRows = lockingPartner.onRangeFetched(null, start, end, options, true);

                // Sync the row heights if configured to do so, or if one side has variableRowHeight but the other doesn't.
                // variableRowHeight is just a flag for the buffered rendering to know how to measure row height and
                // calculate firstVisibleRow and lastVisibleRow. It does not *necessarily* mean that row heights are going
                // to be asymmetric between sides. For example grouping causes variableRowHeight. But the row heights
                // each side will be symmetric.
                // But if one side has variableRowHeight (eg, a cellWrap: true column), and the other does not, that
                // means there could be asymmetric row heights.
                if (view.ownerGrid.syncRowHeight || (lockingPartner.variableRowHeight !== variableRowHeight)) {
                    me.syncRowHeights(newRows, partnerNewRows);

                    // body height might have changed with change of rows, and possible syncRowHeights call.
                    me.bodyHeight = view.body.dom.offsetHeight;
                }
            }
            if (lockingPartner.bodyTop !== newTop) {
                lockingPartner.setBodyTop(newTop);
            }
            // Set the real scrollY position after the correct data has been rendered there.
            // It will not handle a scroll because the scrollTop and position have been preset.
            lockingPartner.view.setScrollY(me.scrollTop);
        }
        return newRows;
    },

    syncRowHeights: function(itemEls, partnerItemEls) {
        var me = this,
            ln = 0, otherLn = 1, // Different initial values so that all items are synched
            mySynchronizer = [],
            otherSynchronizer = [],
            RowSynchronizer = Ext.grid.locking.RowSynchronizer,
            i, rowSync;

        if (itemEls && partnerItemEls) {
            ln = itemEls.length;
            otherLn = partnerItemEls.length;
        }

        // The other side might not quite by in scroll sync with us, in which case
        // it may have gone a different path way and rolled some rows into
        // the rendered block where we may have re-rendered the whole thing.
        // If this has happened, fall back to syncing all rows.
        if (ln !== otherLn) {
            itemEls = me.view.all.slice();
            partnerItemEls = me.view.lockingPartner.all.slice();
            ln = otherLn = itemEls.length;
        }
        for (i = 0; i < ln; i++) {
            mySynchronizer[i] = rowSync = new RowSynchronizer(me.view, itemEls[i]);
            rowSync.measure();
        }
        for (i = 0; i < otherLn; i++) {
            otherSynchronizer[i] = rowSync = new RowSynchronizer(me.view.lockingPartner, partnerItemEls[i]);
            rowSync.measure();
        }
        for (i = 0; i < ln; i++) {
            mySynchronizer[i].finish(otherSynchronizer[i]);
            otherSynchronizer[i].finish(mySynchronizer[i]);
        }

        // Ensure that both BufferedRenderers have the same idea about scroll range and row height
        me.syncRowHeightsFinish();
    },

    syncRowHeightsFinish: function () {
        var me = this,
            view = me.view,
            lockingPartner = view.lockingPartner.bufferedRenderer;

        // Now that row heights have potentially changed, both BufferedRenderers
        // have to re-evaluate what they think the average rowHeight is
        // based on the synchronized-height rows.
        //
        // If the view has not been layed out, then the upcoming first resize event
        // will trigger the needed refreshSize call; See onViewRefresh -
        // If control arrives there and the componentLayoutCounter is zero and
        // there is variableRowHeight, it schedules itself to be run on boxready
        // so refreshSize will be called there for the first time.
        if (view.componentLayoutCounter) {
            delete me.rowHeight;
            me.refreshSize();
            if (lockingPartner.rowHeight !== me.rowHeight) {
                delete lockingPartner.rowHeight;
                lockingPartner.refreshSize();
            }
        }
    },

    setBodyTop: function(bodyTop) {
        var me = this,
            view = me.view,
            rows = view.all,
            store = me.store,
            body = view.body;

        if (!body.dom) {
            // The view may be rendered, but the body element not attached.
            return;
        }

        me.translateBody(body, bodyTop);

        // If this is the last page, correct the scroll range to be just enough to fit.
        if (me.variableRowHeight) {
            me.bodyHeight = body.dom.offsetHeight;

            // We are displaying the last row, so ensure the scroll range finishes exactly at the bottom of the view body
            if (rows.endIndex === store.getCount() - 1) {
                me.scrollHeight = bodyTop + me.bodyHeight - 1;
            }
            // Not last row - recalculate scroll range
            else {
                me.scrollHeight = me.getScrollHeight();
            }
            me.stretchView(view, me.scrollHeight);
        } else {
            // If we have fixed row heights, calculate rendered block height without forcing a layout
            me.bodyHeight = rows.getCount() * me.rowHeight;
        }
    },

    translateBody: function(body, bodyTop) {
        body.translate(null, this.bodyTop = bodyTop);
    },

    getFirstVisibleRowIndex: function(startRow, endRow, viewportTop, viewportBottom) {
        var me = this,
            view = me.view,
            rows = view.all,
            elements = rows.elements,
            clientHeight = me.viewClientHeight,
            target,
            targetTop,
            bodyTop = me.bodyTop;

        // If variableRowHeight, we have to search for the first row who's bottom edge is within the viewport
        if (rows.getCount() && me.variableRowHeight) {
            if (!arguments.length) {
                startRow = rows.startIndex;
                endRow = rows.endIndex;
                viewportTop = me.scrollTop;
                viewportBottom = viewportTop + clientHeight;

                // Teleported so that body is outside viewport: Use rowHeight calculation
                if (bodyTop > viewportBottom || bodyTop + me.bodyHeight < viewportTop) {
                    me.teleported = true;
                    return Math.floor(me.scrollTop / me.rowHeight);
                }

                // In first, non-recursive call, begin targeting the most likely first row
                target = startRow + Math.min(me.numFromEdge + ((me.lastScrollDirection === -1) ? me.leadingBufferZone : me.trailingBufferZone), Math.floor((endRow - startRow) / 2));
            } else {
                target = startRow + Math.floor((endRow - startRow) / 2);
            }
            targetTop = bodyTop + elements[target].offsetTop;

            // If target is entirely above the viewport, chop downwards
            if (targetTop + elements[target].offsetHeight <= viewportTop) {
                return me.getFirstVisibleRowIndex(target + 1, endRow, viewportTop, viewportBottom);
            }

            // Target is first
            if (targetTop <= viewportTop) {
                return target;
            }
            // Not narrowed down to 1 yet; chop upwards
            else if (target !== startRow) {
                return me.getFirstVisibleRowIndex(startRow, target - 1, viewportTop, viewportBottom);
            }
        }
        return Math.floor(me.scrollTop / me.rowHeight);
    },
    
    /**
     * Returns the index of the last row in your table view deemed to be visible.
     * @return {Number}
     * @private
     */
    getLastVisibleRowIndex: function(startRow, endRow, viewportTop, viewportBottom) {
        var me = this,
            view = me.view,
            rows = view.all,
            elements = rows.elements,
            clientHeight = me.viewClientHeight,
            target,
            targetTop, targetBottom,
            bodyTop = me.bodyTop;

        // If variableRowHeight, we have to search for the first row who's bottom edge is below the bottom of the viewport
        if (rows.getCount() && me.variableRowHeight) {
            if (!arguments.length) {
                startRow = rows.startIndex;
                endRow = rows.endIndex;
                viewportTop = me.scrollTop;
                viewportBottom = viewportTop + clientHeight;

                // Teleported so that body is outside viewport: Use rowHeight calculation
                if (bodyTop > viewportBottom || bodyTop + me.bodyHeight < viewportTop) {
                    me.teleported = true;
                    return Math.floor(me.scrollTop / me.rowHeight) + Math.ceil(clientHeight / me.rowHeight);
                }

                // In first, non-recursive call, begin targeting the most likely last row
                target = endRow - Math.min(me.numFromEdge + ((me.lastScrollDirection === 1) ? me.leadingBufferZone : me.trailingBufferZone), Math.floor((endRow - startRow) / 2));
            } else {
                target = startRow + Math.floor((endRow - startRow) / 2);
            }
            targetTop = bodyTop + elements[target].offsetTop;

            // If target is entirely below the viewport, chop upwards
            if (targetTop > viewportBottom) {
                return me.getLastVisibleRowIndex(startRow, target - 1, viewportTop, viewportBottom);
            }
            targetBottom = targetTop + elements[target].offsetHeight;

            // Target is last
            if (targetBottom >= viewportBottom) {
                return target;
            }
            // Not narrowed down to 1 yet; chop downwards
            else if (target !== endRow) {
                return me.getLastVisibleRowIndex(target + 1, endRow, viewportTop, viewportBottom);
            }
        }
        return me.getFirstVisibleRowIndex() + Math.ceil(clientHeight / me.rowHeight);
    },

    getScrollHeight: function() {
        var me = this,
            view   = me.view,
            rows   = view.all,
            store  = me.store,
            recCount = store.getCount(),
            rowCount = rows.getCount(),
            row, rowHeight, borderWidth, scrollHeight;

        if (!recCount) {
            return 0;
        }
        
        if (!me.hasOwnProperty('rowHeight')) {
            if (rowCount) {
                if (me.variableRowHeight) {
                    me.rowHeight = Math.floor(me.bodyHeight / rowCount);
                }
                else {
                    row = rows.first();
                    rowHeight = row.getHeight();
                    
                    // In IE8 we're adding bottom border on all the rows to work around
                    // the lack of :last-child selector, and we compensate that by setting
                    // a negative top margin that equals the border width, so that top and
                    // bottom borders overlap on adjacent rows. Negative margin does not
                    // affect the row's reported height though so we have to compensate
                    // for that effectively invisible additional border width here.
                    if (Ext.isIE8) {
                        borderWidth = row.getBorderWidth('b');
                        
                        if (borderWidth > 0) {
                            rowHeight -= borderWidth;
                        }
                    }
                    
                    me.rowHeight = rowHeight;
                }
            } else {
                delete me.rowHeight;
            }
        }

        if (me.variableRowHeight) {
            // If this is the last page, ensure the scroll range is exactly enough to scroll to the end of the rendered block.
            if (rows.endIndex === recCount - 1) {
                scrollHeight = me.bodyTop + me.bodyHeight - 1;
            }
            // Calculate the scroll range based upon measured row height and our scrollPosition.
            else {
                scrollHeight = Math.floor((recCount - rowCount) * me.rowHeight) + me.bodyHeight;

                // If there's a discrepancy between the boy position we have scrolled to, and the calculated position,
                // account for that in the scroll range so that we have enough range to scroll all the data into view.
                scrollHeight += me.bodyTop - rows.startIndex * me.rowHeight;
            }
        } else {
            scrollHeight = Math.floor(recCount * me.rowHeight);
        }

        return (me.scrollHeight = scrollHeight); // jshint ignore:line
    },

    attemptLoad: function(start, end) {
        var me = this;
        if (me.scrollToLoadBuffer) {
            if (!me.loadTask) {
                me.loadTask = new Ext.util.DelayedTask(me.doAttemptLoad, me, []);
            }
            me.loadTask.delay(me.scrollToLoadBuffer, me.doAttemptLoad, me, [start, end]);
        } else {
            me.doAttemptLoad(start, end);
        }
    },

    cancelLoad: function() {
        if (this.loadTask) {
            this.loadTask.cancel();
        }
    },

    doAttemptLoad:  function(start, end) {
        var me = this;

        // If we were called on a delay, check for destruction
        if (!me.destroyed) {
            me.store.getRange(start, end, {
                loadId: ++me.loadId,
                callback: function(range, start, end, options) {
                    // If our loadId position has not changed since the getRange request started, we can continue to render
                    if (options.loadId === me.loadId) {
                        me.onRangeFetched(range, start, end, options);
                    }
                },
                fireEvent: false
            });
        }
    },

    destroy: function() {
        var me = this,
            view = me.view;

        me.cancelLoad();

        if (view && view.el) {
            view.un('scroll', me.onViewScroll, me);
        }

        if (me.store) {
            me.unbindStore();
        }

        // Remove listeners from old grid, view and store
        me.viewListeners = me.gridListeners = me.view = me.grid = Ext.destroy(me.viewListeners, me.stretcher, me.gridListeners);

        me.callParent();
    }
}, function(cls) {
    // Minimal leading and trailing zones are best on mobile.
    // Use 2 to ensure visible range is covered
    if (Ext.supports.Touch) {
        cls.prototype.leadingBufferZone = cls.prototype.trailingBufferZone = 2;
        cls.prototype.numFromEdge = 1;
    }
});
