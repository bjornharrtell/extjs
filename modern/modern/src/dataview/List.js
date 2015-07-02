/**
 * List is a custom styled DataView which allows Grouping, Indexing, Icons, and a Disclosure.
 *
 *     @example miniphone preview
 *     Ext.create('Ext.List', {
 *         fullscreen: true,
 *         itemTpl: '{title}',
 *         data: [
 *             { title: 'Item 1' },
 *             { title: 'Item 2' },
 *             { title: 'Item 3' },
 *             { title: 'Item 4' }
 *         ]
 *     });
 *
 * A more advanced example showing a list of people grouped by last name:
 *
 *     @example miniphone preview
 *     Ext.define('Contact', {
 *         extend: 'Ext.data.Model',
 *         config: {
 *             fields: ['firstName', 'lastName']
 *         }
 *     });
 *
 *     var store = Ext.create('Ext.data.Store', {
 *        model: 'Contact',
 *        sorters: 'lastName',
 *
 *        grouper: {
 *            groupFn: function(record) {
 *                return record.get('lastName')[0];
 *            }
 *        },
 *
 *        data: [
 *            { firstName: 'Peter',   lastName: 'Venkman'  },
 *            { firstName: 'Raymond', lastName: 'Stantz'   },
 *            { firstName: 'Egon',    lastName: 'Spengler' },
 *            { firstName: 'Winston', lastName: 'Zeddemore'}
 *        ]
 *     });
 *
 *     Ext.create('Ext.List', {
 *        fullscreen: true,
 *        itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',
 *        store: store,
 *        grouped: true
 *     });
 *
 * If you want to dock items to the bottom or top of a List, you can use the scrollDock configuration on child items in this List. The following example adds a button to the bottom of the List.
 *
 *     @example phone preview
 *     Ext.define('Contact', {
 *         extend: 'Ext.data.Model',
 *         config: {
 *             fields: ['firstName', 'lastName']
 *         }
 *     });
 *
 *     var store = Ext.create('Ext.data.Store', {
 *        model: 'Contact',
 *        sorters: 'lastName',
 *
 *        grouper: {
 *            groupFn: function(record) {
 *                return record.get('lastName')[0];
 *            }
 *        },
 *
 *        data: [
 *            { firstName: 'Peter',   lastName: 'Venkman'  },
 *            { firstName: 'Raymond', lastName: 'Stantz'   },
 *            { firstName: 'Egon',    lastName: 'Spengler' },
 *            { firstName: 'Winston', lastName: 'Zeddemore'}
 *        ]
 *     });
 *
 *     Ext.create('Ext.List', {
 *         fullscreen: true,
 *         itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',
 *         store: store,
 *         items: [{
 *             xtype: 'button',
 *             scrollDock: 'bottom',
 *             docked: 'bottom',
 *             text: 'Load More...'
 *         }]
 *     });
 */
Ext.define('Ext.dataview.List', {
    alternateClassName: 'Ext.List',
    extend: 'Ext.dataview.DataView',
    xtype: 'list',

    mixins: ['Ext.mixin.Hookable'],

    requires: [
        'Ext.data.Store',
        'Ext.dataview.IndexBar',
        'Ext.dataview.ListItemHeader',
        'Ext.dataview.component.ListItem',
        'Ext.dataview.component.SimpleListItem',
        'Ext.util.PositionMap'
    ],

    /**
     * @event disclose
     * @preventable doDisclose
     * Fires whenever a disclosure is handled
     * @param {Ext.dataview.List} this The List instance
     * @param {Ext.data.Model} record The record associated to the item
     * @param {HTMLElement} target The element disclosed
     * @param {Number} index The index of the item disclosed
     * @param {Ext.EventObject} e The event object
     */

    config: {
        /**
         * @cfg layout
         * Hide layout config in DataView. It only causes confusion.
         * @accessor
         * @private
         */
        layout: 'fit',

        /**
         * @cfg {Boolean/Object} indexBar
         * `true` to render an alphabet IndexBar docked on the right.
         * This can also be a config object that will be passed to {@link Ext.IndexBar}.
         * @accessor
         */
        indexBar: false,

        icon: null,

        /**
         * @cfg {Boolean} preventSelectionOnDisclose `true` to prevent the item selection when the user
         * taps a disclose icon.
         * @accessor
         */
        preventSelectionOnDisclose: true,

        /**
         * @cfg baseCls
         * @inheritdoc
         */
        baseCls: Ext.baseCSSPrefix + 'list',

        /**
         * @cfg {Boolean} pinHeaders
         * Whether or not to pin headers on top of item groups while scrolling for an iPhone native list experience.
         * @accessor
         */
        pinHeaders: true,

        /**
         * @cfg {Boolean} grouped
         * Whether or not to group items in the provided Store with a header for each item.
         * @accessor
         */
        grouped: null,

        /**
         * @cfg {Boolean/Function/Object} onItemDisclosure
         * `true` to display a disclosure icon on each list item.
         * The list will still fire the disclose event, and the event can be stopped before itemtap.
         * By setting this config to a function, the function passed will be called when the disclosure
         * is tapped.
         * Finally you can specify an object with a 'scope' and 'handler'
         * property defined. This will also be bound to the tap event listener
         * and is useful when you want to change the scope of the handler.
         * @accessor
         */
        onItemDisclosure: null,

        /**
         * @cfg {String} disclosureProperty
         * A property to check on each record to display the disclosure on a per record basis.  This
         * property must be false to prevent the disclosure from being displayed on the item.
         * @accessor
         */
        disclosureProperty: 'disclosure',

        /**
         * @cfg {Boolean} useComponents
         * Flag the use a component based DataView implementation.  This allows the full use of components in the
         * DataView at the cost of some performance.
         *
         * @accessor
         * @private
         */

        /**
         * @cfg {Object} itemConfig
         * A configuration object that is passed to every item created by a component based DataView. Because each
         * item that a List renders is a Component, we can pass configuration options to each component to
         * easily customize how each child component behaves.
         * @accessor
         * @private
         */

        /**
         * @cfg {Number} maxItemCache
         * Maintains a cache of reusable components when using a component based DataView.  Improving performance at
         * the cost of memory.
         * Note this is currently only used when useComponents is true.
         * @accessor
         * @private
         */

        /**
         * @cfg {String} defaultType
         * The xtype used for the component based DataView. Defaults to dataitem.
         * Note this is only used when useComponents is true.
         * @accessor
         */
        defaultType: undefined,

        /**
         * @cfg {Object} itemMap
         * @private
         */
        itemMap: {},

        /**
         * @cfg {Number} itemHeight
         * This allows you to set the default item height and is used to roughly calculate the amount
         * of items needed to fill the list. By default items are around 50px high.
         */
        itemHeight: null,

        /**
         * @cfg {Boolean} variableHeights
         * This configuration allows you optimize the list by not having it read the DOM heights of list items.
         * Instead it will assume (and set) the height to be the {@link #itemHeight}.
         * @private
         */
        variableHeights: false,

        /**
         * @cfg {Boolean} refreshHeightOnUpdate
         * Set this to false if you make many updates to your list (like in an interval), but updates
         * won't affect the item's height. Doing this will increase the performance of these updates.
         */
        refreshHeightOnUpdate: true,

        /**
         * @cfg {Boolean} infinite
         * Set this to false to render all items in this list, and render them relatively.
         * Note that this configuration can not be dynamically changed after the list has instantiated.
         */
        infinite: false,

        /**
         * @cfg {Boolean} useSimpleItems
         * Set this to true if you just want to have the list create simple items that use the itemTpl.
         * These simple items still support headers, grouping and disclosure functionality but avoid
         * container layouts and deeply nested markup. For many Lists using this configuration will
         * drastically increase the scrolling and render performance.
         */
        useSimpleItems: true,

        /**
         * @cfg {Object} scrollable
         * @private
         */
        scrollable: null,

        /**
         * @cfg {Number} bufferSize
         * The amount of items we render additionally besides the ones currently visible.
         * We try to prevent the rendering of items while scrolling until the next time you stop scrolling.
         * If you scroll close to the end of the buffer, we start rendering individual items to always
         * have the {@link #minimumBufferSize} prepared.
         */
        bufferSize: 20,

        minimumBufferDistance: 5,

        /**
         * @cfg {Boolean} striped
         * Set this to true if you want the items in the list to be zebra striped, alternating their
         * background color.
         */
        striped: false
    },

    topRenderedIndex: 0,
    topVisibleIndex: 0,
    visibleCount: 0,

    constructor: function() {
        var me = this, layout;

        me.callParent(arguments);

        //<debug>
        layout = this.getLayout();
        if (layout && !layout.isFit) {
            Ext.Logger.error('The base layout for a DataView must always be a Fit Layout');
        }
        //</debug>
    },

    // We create complex instance arrays and objects in beforeInitialize so that we can use these inside of the initConfig process.
    beforeInitialize: function() {
        var me = this,
            container = me.container,
            baseCls = me.getBaseCls(),
            scrollViewElement, pinnedHeader;

        Ext.apply(me, {
            listItems: [],
            headerItems: [],
            updatedItems: [],
            headerMap: [],
            scrollDockItems: {
                top: [],
                bottom: []
            }
        });

        me.translationMethod = 'csstransform';

        // Create the inner container that will actually hold all the list items
        if (!container) {
            container = me.container = me.createContainer();
        }

        // We add the container after creating it manually because when you add the container,
        // the items config is initialized. When this happens, any scrollDock items will be added,
        // which in turn tries to add these items to the container
        me.add(container);

        // We make this List's scrollable the inner containers scrollable
        scrollViewElement = me.scrollViewElement = container.bodyElement;
        me.scrollElement = container.innerElement;

        // Create the pinnedHeader instance thats being used when grouping is enabled
        // and insert it into the scrollElement
        pinnedHeader = me.pinnedHeader = Ext.factory({
            xtype: 'listitemheader',
            html: '&nbsp;',
            translatable: {
                translationMethod: this.translationMethod
            },
            cls: [baseCls + '-header', baseCls + '-header-swap']
        });
        pinnedHeader.translate(0, -10000);
        pinnedHeader.$position = -10000;
        scrollViewElement.insertFirst(pinnedHeader.renderElement);

        container.getScrollable().on({
            scroll: 'onScroll',
            refresh: 'onScrollerRefresh',
            scope: me
        });
    },

    /**
     * @private
     */
    createContainer: function() {
        return Ext.factory({
            xtype: 'container',
            scrollable: {
                autoRefresh: !this.getInfinite(),
                x: false
            }
        });
    },

    getScrollable: function() {
        return this.container.getScrollable();
    },

    // We override DataView's initialize method with an empty function
    initialize: function() {
        var me = this,
            container = me.container,
            scrollViewElement = me.scrollViewElement,
            indexBar = me.getIndexBar(),
            triggerEvent = me.getTriggerEvent(),
            triggerCtEvent = me.getTriggerCtEvent();

        if (indexBar) {
            scrollViewElement.appendChild(indexBar.renderElement);
        }

        if (triggerEvent) {
            me.on(triggerEvent, me.onItemTrigger, me);
        }
        if (triggerCtEvent) {
            me.on(triggerCtEvent, me.onContainerTrigger, me);
        }

        container.element.on({
            delegate: '.' + me.getBaseCls() + '-disclosure',
            tap: 'handleItemDisclosure',
            scope: me
        });

        container.element.on({
            resize: 'onContainerResize',
            scope: me
        });

        // Android 2.x not a direct child
        container.innerElement.on({
            touchstart: 'onItemTouchStart',
            touchend: 'onItemTouchEnd',
            tap: 'onItemTap',
            taphold: 'onItemTapHold',
            singletap: 'onItemSingleTap',
            doubletap: 'onItemDoubleTap',
            swipe: 'onItemSwipe',
            delegate: '.' + Ext.baseCSSPrefix + 'list-item',
            scope: me
        });

        if (me.getStore()) {
            me.refresh();
        }
    },

    onScroll: function(scroller, x, y) {
        var me = this,
            pinnedHeader = me.pinnedHeader,
            store = me.getStore(),
            storeCount = store && store.getCount(),
            grouped = me.isGrouping(),
            infinite = me.getInfinite();

        // This method was originally written as an interceptor for doTranslate, so the
        // coordinates are expected to be in CSS translation form (negative number ==
        // positive scroll position).  It was changed to be a scroll event listener in v5
        // which uses scroll position coordinates.
        if (x) {
            x = -x;
        }
        if (y) {
            y = -y;
        }

        if (!storeCount) {
            me.showEmptyText();
            me.showEmptyScrollDock();

            pinnedHeader.$position = -10000;
            pinnedHeader.translate(0, -10000);
        }
        else if (infinite && me.itemsCount) {
            me.handleItemUpdates(y);
            me.handleItemHeights();
            me.handleItemTransforms();

            if (!me.onIdleBound) {
                Ext.AnimationQueue.onIdle(me.onAnimationIdle, me);
                me.onIdleBound = true;
            }
        }

        if (grouped && me.groups && me.groups.length && me.getPinHeaders()) {
            me.handlePinnedHeader(y);
        }

        // This is a template method that can be intercepted by plugins to do things when scrolling
        me.onScrollBinder(x, y);
    },

    onScrollerRefresh: function(scroller) {
        var position = scroller.getPosition();
        this.onScroll(scroller, position.x, position.y);
    },

    onScrollBinder: function(){},

    handleItemUpdates: function(y) {
        var me = this,
            listItems = me.listItems,
            itemsCount = listItems.length,
            info = me.getListItemInfo(),
            itemMap = me.getItemMap(),
            bufferSize = me.getBufferSize(),
            lastIndex = me.getStore().getCount() - 1,
            minimumBufferDistance = me.getMinimumBufferDistance(),
            currentTopVisibleIndex = me.topVisibleIndex,
            topRenderedIndex = me.topRenderedIndex,
            updateCount, i, item, topVisibleIndex, bufferDistance, itemIndex;

        // This is the index of the item that is currently visible at the top
        me.topVisibleIndex = topVisibleIndex = Math.max(0, itemMap.findIndex(-y) || 0);

        if (currentTopVisibleIndex !== topVisibleIndex) {
            // When we are scrolling up
            if (currentTopVisibleIndex > topVisibleIndex) {
                bufferDistance = topVisibleIndex - topRenderedIndex;
                if (bufferDistance < minimumBufferDistance) {
                    updateCount = Math.min(itemsCount, minimumBufferDistance - bufferDistance);

                    if (updateCount == itemsCount) {
                        me.topRenderedIndex = topRenderedIndex = Math.max(0, topVisibleIndex - (bufferSize - minimumBufferDistance));
                        // Update all
                        for (i = 0; i < updateCount; i++) {
                            itemIndex = topRenderedIndex + i;
                            item = listItems[i];
                            me.updateListItem(item, itemIndex, info);
                        }
                    }
                    else {
                        for (i = 0; i < updateCount; i++) {
                            itemIndex = topRenderedIndex - i - 1;
                            if (itemIndex < 0) {
                                break;
                            }

                            item = listItems.pop();
                            listItems.unshift(item);
                            me.updateListItem(item, itemIndex, info);
                            me.topRenderedIndex--;
                        }
                    }
                }
            }
            // When we are scrolling down
            else {
                bufferDistance = bufferSize - (topVisibleIndex - topRenderedIndex);

                if (bufferDistance < minimumBufferDistance) {
                    updateCount = Math.min(itemsCount, minimumBufferDistance - bufferDistance);

                    if (updateCount == itemsCount) {
                        me.topRenderedIndex = topRenderedIndex = Math.min(lastIndex - itemsCount, topVisibleIndex - minimumBufferDistance);
                        // Update all
                        for (i = 0; i < updateCount; i++) {
                            itemIndex = topRenderedIndex + i;
                            item = listItems[i];
                            me.updateListItem(item, itemIndex, info);
                        }
                    }
                    else {
                        for (i = 0; i < updateCount; i++) {
                            itemIndex = topRenderedIndex + itemsCount + i;
                            if (itemIndex > lastIndex) {
                                break;
                            }

                            item = listItems.shift();
                            listItems.push(item);
                            me.updateListItem(item, itemIndex, info);
                            me.topRenderedIndex++;
                        }
                    }
                }
            }
        }
    },

    onAnimationIdle: function() {
        var me = this,
            info = me.getListItemInfo(),
            bufferSize = me.getBufferSize(),
            topVisibleIndex = me.topVisibleIndex,
            topRenderedIndex = me.topRenderedIndex,
            lastIndex = me.getStore().getCount() - 1,
            listItems = me.listItems,
            itemsCount = listItems.length,
            topBufferDistance, bottomBufferDistance,
            i, ln, item, itemIndex;

        topBufferDistance = topVisibleIndex - topRenderedIndex;
        bottomBufferDistance = topRenderedIndex + bufferSize - topVisibleIndex;

        if (topBufferDistance < bottomBufferDistance) {
            // This means there are more items below the visible list. The user
            // has probably just scrolled up. In this case we move some items
            // from the bottom to the top only if the list is scrolled down a bit
            if (topVisibleIndex > 0) {
                ln = bottomBufferDistance - topBufferDistance;

                for (i = 0; i < ln; i++) {
                    itemIndex = topRenderedIndex - i - 1;
                    if (itemIndex < 0) {
                        break;
                    }

                    item = listItems.pop();
                    listItems.unshift(item);
                    me.updateListItem(item, itemIndex, info);
                    me.topRenderedIndex--;
                }
            }
        }
        else {
            ln = topBufferDistance - bottomBufferDistance;
            for (i = 0; i < ln; i++) {
                itemIndex = topRenderedIndex + itemsCount + i;
                if (itemIndex > lastIndex) {
                    break;
                }

                item = listItems.shift();
                listItems.push(item);
                me.updateListItem(item, itemIndex, info);
                me.topRenderedIndex++;
            }
        }

        me.handleItemHeights();
        me.handleItemTransforms();

        me.onIdleBound = false;
    },

    handleItemHeights: function() {
        var me = this,
            updatedItems = me.updatedItems,
            ln = updatedItems.length,
            itemMap = me.getItemMap(),
            useSimpleItems = me.getUseSimpleItems(),
            minimumHeight = itemMap.getMinimumHeight(),
            headerIndices = me.headerIndices,
            headerMap = me.headerMap,
            variableHeights = me.getVariableHeights(),
            itemIndex, i, j, jln, item, height, scrollDockHeight;

        for (i = 0; i < ln; i++) {
            item = updatedItems[i];
            itemIndex = item.$dataIndex;

            // itemIndex may not be set yet if the store is still being loaded
            if (itemIndex !== null) {
                if (variableHeights) {
                    height = useSimpleItems ? item.element.getHeight() : item.element.getFirstChild().getHeight();
                    height = Math.max(height, minimumHeight);
                } else {
                    height = minimumHeight;
                }

                item.$ownItemHeight = height;

                jln = me.scrollDockItems.top.length;
                if (item.isFirst) {
                    me.totalScrollDockTopHeight = 0;
                    for (j = 0; j < jln; j++) {
                        scrollDockHeight = me.scrollDockItems.top[j].$scrollDockHeight;
                        height += scrollDockHeight;
                        me.totalScrollDockTopHeight += scrollDockHeight;
                    }
                }

                jln = me.scrollDockItems.bottom.length;
                if (item.isLast) {
                    for (j = 0; j < jln; j++) {
                        scrollDockHeight = me.scrollDockItems.bottom[j].$scrollDockHeight;
                        height += scrollDockHeight;
                    }
                }

                if (headerIndices && headerIndices[itemIndex]) {
                    height += me.headerHeight;
                }

                itemMap.setItemHeight(itemIndex, height);
                item.$height = height;
            }
        }

        itemMap.update();
        height = itemMap.getTotalHeight();

        headerMap.length = 0;
        for (i in headerIndices) {
            if (headerIndices.hasOwnProperty(i)) {
                headerMap.push(itemMap.map[i]);
            }
        }

        me.setScrollerHeight(height);

        me.updatedItems.length = 0;
    },

    setScrollerHeight: function(height) {
        var me = this,
            scroller = me.container.getScrollable(),
            scrollSize = scroller.getSize();

        if (height != scrollSize.y) {
            scroller.setSize({
                // When using a TouchScroller we can pass the x scrollSize to prevent
                // the scroller from reading the DOM to determine the x size.
                // When using a DomScroller we pass null so that only the y size gets set
                // (DomScroller does not need to read the dom to determine missing dimensions)
                x: scroller.isTouchScroller ? scrollSize.x : null,
                y: height
            });
        }
    },

    handleItemTransforms: function() {
        var me = this,
            listItems = me.listItems,
            itemsCount = listItems.length,
            itemMap = me.getItemMap(),
            scrollDockItems = me.scrollDockItems,
            grouped = me.isGrouping(),
            item, transY, i, jln, j;

        for (i = 0; i < itemsCount; i++) {
            item = listItems[i];
            transY = itemMap.map[item.$dataIndex];

            if (!item.$hidden && item.$position !== transY) {
                item.$position = transY;

                jln = scrollDockItems.top.length;
                if (item.isFirst && jln) {
                    for (j = 0; j < jln; j++) {
                        scrollDockItems.top[j].translate(0, transY);
                        transY += scrollDockItems.top[j].$scrollDockHeight;
                    }
                }

                if (grouped && me.headerIndices && me.headerIndices[item.$dataIndex]) {
                    item.getHeader().translate(0, transY);
                    transY += me.headerHeight;
                }

                item.translate(0, transY);
                transY += item.$ownItemHeight;

                jln = scrollDockItems.bottom.length;
                if (item.isLast && jln) {
                    for (j = 0; j < jln; j++) {
                        scrollDockItems.bottom[j].translate(0, transY);
                        transY += scrollDockItems.bottom[j].$scrollDockHeight;
                    }
                }
            }
        }
    },

    handlePinnedHeader: function(y) {
        var me = this,
            pinnedHeader = me.pinnedHeader,
            itemMap = me.getItemMap(),
            groups = me.groups,
            headerMap = me.headerMap,
            headerHeight = me.headerHeight,
            store = me.getStore(),
            totalScrollDockTopHeight = me.totalScrollDockTopHeight,
            record, closestHeader, pushedHeader, transY, headerString;

        closestHeader = itemMap.binarySearch(headerMap, -y);
        record = groups.getAt(closestHeader).getAt(0);

        if (record) {
            pushedHeader = y + headerMap[closestHeader + 1] - headerHeight;
            // Top of the list or above (hide the floating header offscreen)
            if (y >= 0 || (closestHeader === 0 && totalScrollDockTopHeight + y >= 0) || (closestHeader === 0 && -y <= headerMap[closestHeader])) {
                transY = -10000;
            }
            // Scroll the floating header a bit
            else if (pushedHeader < 0) {
                transY = pushedHeader;
            }
            // Stick to the top of the screen
            else {
                transY = Math.max(0, y);
            }

            headerString = store.getGrouper().getGroupString(record);

            if (pinnedHeader.$currentHeader != headerString) {
                pinnedHeader.setHtml(headerString);
                pinnedHeader.$currentHeader = headerString;
            }

            if (pinnedHeader.$position != transY) {
                pinnedHeader.translate(0, transY);
                pinnedHeader.$position = transY;
            }
        }
    },

    createItem: function(config) {
        var me = this,
            container = me.container,
            listItems = me.listItems,
            infinite = me.getInfinite(),
            scrollElement = me.scrollElement,
            item, header, itemCls;

        config.$initParent = me;
        item = Ext.factory(config);
        delete config.$initParent;
        item.dataview = me;
        item.$height = config.minHeight;

        if (!infinite) {
            itemCls = me.getBaseCls() + '-item-relative';
            item.addCls(itemCls);
        }

        header = item.getHeader();
        if (!infinite) {
            header.addCls(itemCls);
        } else {
            header.setTranslatable({
                translationMethod: this.translationMethod
            });
            header.translate(0, -10000);

            scrollElement.insertFirst(header.renderElement);
        }

        container.doAdd(item);
        listItems.push(item);

        return item;
    },

    setItemsCount: function(itemsCount, itemConfig) {
        var me = this,
            listItems = me.listItems,
            config = itemConfig || me.getListItemConfig(),
            difference = itemsCount - listItems.length,
            i;

        // This loop will create new items if the new itemsCount is higher than the amount of items we currently have
        for (i = 0; i < difference; i++) {
            me.createItem(config);
        }

        // This loop will destroy unneeded items if the new itemsCount is lower than the amount of items we currently have
        for (i = difference; i < 0; i++) {
            listItems.pop().destroy();
        }

        me.itemsCount = itemsCount;

        // Finally we update all the list items with the correct content
        me.updateAllListItems();

        //Android Stock bug where redraw is needed to show empty list
        if (Ext.browser.is.AndroidStock && me.container.element && itemsCount === 0 && difference !== 0) {
            me.container.element.redraw();
        }

        return me.listItems;
    },

    updateListItem: function(item, index, info) {
        var me = this,
            store = info.store,
            record = store.getAt(index),
            headerIndices = me.headerIndices,
            footerIndices = me.footerIndices,
            header = item.getHeader(),
            scrollDockItems = me.scrollDockItems,
            updatedItems = me.updatedItems,
            infinite = me.getInfinite(),
            storeCount = store.getCount(),
            grouper = store.getGrouper(),
            itemCls = [],
            headerCls = [],
            itemRemoveCls = [info.headerCls, info.footerCls, info.firstCls, info.lastCls, info.selectedCls, info.stripeCls],
            headerRemoveCls = [info.headerCls, info.footerCls, info.firstCls, info.lastCls],
            ln, i, scrollDockItem, classCache, groupKey, currentItemCls, currentHeaderCls;

        // When we update a list item, the header and scrolldocks can make it have to be retransformed.
        // For that reason we want to always set the position to -10000 so that the next time we translate
        // all the pieces are transformed to the correct location
        if (infinite) {
            item.$position = -10000;
        }

        // We begin by hiding/showing the item and its header depending on a record existing at this index
        if (!record) {
            item.setRecord(null);
            if (infinite) {
                item.translate(0, -10000);
            } else {
                item.hide();
            }

            if (infinite) {
                header.translate(0, -10000);
            } else {
                header.hide();
            }
            item.$hidden = true;
            return;
        } else if (item.$hidden) {
            if (!infinite) {
                item.show();
            }
            item.$hidden = false;
        }

        if (infinite) {
            updatedItems.push(item);
        }

        // If this item was previously used for the first record in the store, and now it will not be, then we hide
        // any scrollDockTop items and change the isFirst flag
        if (item.isFirst && index !== 0 && scrollDockItems.top.length) {
            for (i = 0, ln = scrollDockItems.top.length; i < ln; i++) {
                scrollDockItem = scrollDockItems.top[i];
                if (infinite) {
                    scrollDockItem.translate(0, -10000);
                }
            }
            item.isFirst = false;
        }

        // If this item was previously used for the last record in the store, and now it will not be, then we hide
        // any scrollDockBottom items and change the istLast flag
        if (item.isLast && index !== storeCount - 1 && scrollDockItems.bottom.length) {
            for (i = 0, ln = scrollDockItems.bottom.length; i < ln; i++) {
                scrollDockItem = scrollDockItems.bottom[i];
                if (infinite) {
                    scrollDockItem.translate(0, -10000);
                }
            }
            item.isLast = false;
        }

        // If the item is already bound to this record then we shouldn't have to do anything
        if (item.$dataIndex !== index) {
            item.$dataIndex = index;
            me.fireEvent('itemindexchange', me, record, index, item);
        }

        // This is where we actually update the item with the record
        if (item.getRecord() === record) {
            item.updateRecord(record);
        } else {
            item.setRecord(record);
        }

        if (me.isSelected(record)) {
            itemCls.push(info.selectedCls);
        }

        if (info.grouped) {
            if (headerIndices[index]) {
                itemCls.push(info.headerCls);
                headerCls.push(info.headerCls);
                header.setHtml(grouper.getGroupString(record));

                if (!infinite) {
                    header.renderElement.insertBefore(item.renderElement);
                }
                header.show();
            } else {
                if (infinite) {
                    header.translate(0, -10000);
                } else {
                    header.hide();
                }
            }
            if (footerIndices[index]) {
                itemCls.push(info.footerCls);
                headerCls.push(info.footerCls);
            }
        }

        if (!info.grouped) {
            if (infinite) {
                header.translate(0, -10000);
            } else {
                header.hide();
            }
        }

        if (index === 0) {
            item.isFirst = true;
            itemCls.push(info.firstCls);
            headerCls.push(info.firstCls);

            if (!info.grouped) {
                itemCls.push(info.headerCls);
                headerCls.push(info.headerCls);
            }

            if (!infinite) {
                for (i = 0, ln = scrollDockItems.top.length; i < ln; i++) {
                    scrollDockItem = scrollDockItems.top[i];
                    if (info.grouped) {
                        scrollDockItem.renderElement.insertBefore(header.renderElement);
                    } else {
                        scrollDockItem.renderElement.insertBefore(item.renderElement);
                    }
                }
            }
        }

        if (index === storeCount - 1) {
            item.isLast = true;
            itemCls.push(info.lastCls);
            headerCls.push(info.lastCls);

            if (!info.grouped) {
                itemCls.push(info.footerCls);
                headerCls.push(info.footerCls);
            }

            if (!infinite) {
                for (i = 0, ln = scrollDockItems.bottom.length; i < ln; i++) {
                    scrollDockItem = scrollDockItems.bottom[i];
                    scrollDockItem.renderElement.insertAfter(item.renderElement);
                }
            }
        }

        if (info.striped && index % 2 == 1) {
            itemCls.push(info.stripeCls);
        }

        currentItemCls = item.renderElement.getData().classList.slice();
        currentHeaderCls = header.renderElement.getData().classList.slice();

        if (currentItemCls) {
            for (i = 0; i < itemRemoveCls.length; i++) {
                Ext.Array.remove(currentItemCls, itemRemoveCls[i]);
            }
            itemCls = Ext.Array.merge(itemCls, currentItemCls);
        }

        if (currentHeaderCls) {
            for (i = 0; i < headerRemoveCls.length; i++) {
                Ext.Array.remove(currentHeaderCls, headerRemoveCls[i]);
            }
            headerCls = Ext.Array.merge(headerCls, currentHeaderCls);
        }

        classCache = itemCls.join(' ');

        if (item.classCache !== classCache) {
            item.renderElement.setCls(itemCls);
            item.classCache = classCache;
        }

        header.renderElement.setCls(headerCls);
    },

    updateAllListItems: function() {
        var me = this,
            store = me.getStore(),
            items = me.listItems,
            info = me.getListItemInfo(),
            topRenderedIndex = me.topRenderedIndex,
            i, ln;

        if (store) {
            for (i = 0, ln = items.length; i < ln; i++) {
                me.updateListItem(items[i], topRenderedIndex + i, info);
            }
        }

        if (me.isPainted()) {
            if (me.getInfinite() && store && store.getCount()) {
                me.handleItemHeights();
            }
            me.refreshScroller();
        }
    },

    doRefresh: function() {
        var me = this,
            infinite = me.getInfinite(),
            scroller = me.container.getScrollable(),
            storeCount = me.getStore().getCount();

        if (infinite) {
            me.getItemMap().populate(storeCount, this.topRenderedIndex);
        }

        if (me.getGrouped()) {
            me.refreshHeaderIndices();
        }

        // This will refresh the items on the screen with the new data
        if (storeCount) {
            me.hideScrollDockItems();
            me.hideEmptyText();
            if (!infinite) {
                me.setItemsCount(storeCount);
                if (me.getScrollToTopOnRefresh()) {
                    scroller.scrollTo(0, 0);
                }
            } else {
                if (me.getScrollToTopOnRefresh()) {
                    me.topRenderedIndex = 0;
                    me.topVisibleIndex = 0;
                    scroller.scrollTo(null, 0);
                }
                me.updateAllListItems();
            }
        } else {
            me.onStoreClear();
        }
    },

    onLoad: function(store) {
        var me = this,
            container = me.container;

        me.callParent([store]);

        if (me._fireResizeOnNextLoad) {
            me._fireResizeOnNextLoad = false;
            me.onContainerResize(container, { height: container.element.getHeight() });
        }
    },

    onContainerResize: function(container, size) {
        var me = this,
            store = me.getStore(),
            currentVisibleCount, newVisibleCount, minHeight, listItems, itemMap, itemConfig;

        if (!me.headerHeight) {
            me.headerHeight = parseInt(me.pinnedHeader.renderElement.getHeight(), 10);
        }

        if (me.getInfinite()) {
            itemMap = me.getItemMap();
            minHeight = itemMap.getMinimumHeight();

            if (!store.getCount() && !store.isLoaded()) {
                // If the store is not yet loaded we can't measure the height of the first item
                // to determine minHeight
                // TODO: refactor
                me._fireResizeOnNextLoad = true;
                return;
            }

            if (!minHeight) {
                listItems = me.listItems;

                // If there was no itemHeight/minHeight specified, we measure and cache
                // the height of the first item for purposes of buffered rendering
                // caluclations.
                // TODO: this won't handle variable row heights

                if (!listItems.length) {
                    // make sure the list contains at least one item so that we can measure
                    // its height from the dom.  Don't worry about ending up with the wrong
                    // number of items - it will be corrected when we invoke setItemsCount
                    // shortly
                    itemConfig = me.getListItemConfig();
                    me.createItem(itemConfig);
                    me.updateListItem(listItems[0], 0, me.getListItemInfo());
                    me.visibleCount++;

                }

                minHeight = listItems[0].element.getHeight();
                // cache the minimum height on the itemMap for next time
                itemMap.setMinimumHeight(minHeight);
                me.getItemMap().populate(me.getStore().getCount(), me.topRenderedIndex);
            }

            currentVisibleCount = me.visibleCount;
            newVisibleCount = Math.ceil(size.height / minHeight);

            if (newVisibleCount != currentVisibleCount) {
                me.visibleCount = newVisibleCount;
                me.setItemsCount(newVisibleCount + me.getBufferSize(), itemConfig);
                // This is a private event used by some plugins
                me.fireEvent('updatevisiblecount', this, newVisibleCount, currentVisibleCount);
            }
        } else if (me.listItems.length && me.getGrouped() && me.getPinHeaders()) {
            // Whenever the container resizes, headers might be in different locations. For this reason
            // we refresh the header position map
            me.updateHeaderMap();
        }
    },

    refreshScroller: function() {
        var me = this;

        if (me.isPainted()) {
            if (!me.getInfinite() && me.getGrouped() && me.getPinHeaders()) {
                me.updateHeaderMap();
            }

            me.container.getScrollable().refresh();
        }
    },

    updateHeaderMap: function() {
        var me = this,
            headerMap = me.headerMap,
            headerIndices = me.headerIndices,
            header, i;

        headerMap.length = 0;
        for (i in headerIndices) {
            if (headerIndices.hasOwnProperty(i)) {
                header = me.getItemAt(i).getHeader();
                headerMap.push(header.renderElement.dom.offsetTop);
            }
        }
    },

    applyVariableHeights: function(value) {
        if (!this.getInfinite()) {
            return true;
        }
        return value;
    },

    applyDefaultType: function(defaultType) {
        if (!defaultType) {
            defaultType = this.getUseSimpleItems() ? 'simplelistitem' : 'listitem';
        }
        return defaultType;
    },

    applyItemMap: function(itemMap) {
        return Ext.factory(itemMap, Ext.util.PositionMap, this.getItemMap());
    },

    updateItemHeight: function(itemHeight) {
        this.getItemMap().setMinimumHeight(itemHeight);
    },

    applyIndexBar: function(indexBar) {
        return Ext.factory(indexBar, Ext.dataview.IndexBar, this.getIndexBar());
    },

    updatePinHeaders: function(pinnedHeaders) {
        if (this.isPainted()) {
            this.pinnedHeader.translate(0, pinnedHeaders ? this.pinnedHeader.$position : -10000);
        }
    },

    updateItemTpl: function(newTpl) {
        var me = this,
            listItems = me.listItems,
            ln = listItems.length || 0,
            i, listItem;

        for (i = 0; i < ln; i++) {
            listItem = listItems[i];
            listItem.setTpl(newTpl);
        }

        me.updateAllListItems();
    },

    updateItemCls: function(newCls, oldCls) {
        var items = this.listItems,
            ln = items.length,
            i, item;

        for (i = 0; i < ln; i++) {
            item = items[i];
            item.removeCls(oldCls);
            item.addCls(newCls);
        }
    },

    updateIndexBar: function(indexBar, oldIndexBar) {
        var me = this,
            scrollViewElement = me.scrollViewElement;

        if (oldIndexBar) {
            oldIndexBar.un({
                index: 'onIndex',
                scope: me
            });

            if (!indexBar) {
                me.element.removeCls(me.getBaseCls() + '-indexed');
            }

            if (scrollViewElement) {
                scrollViewElement.removeChild(oldIndexBar.renderElement);
            }
        }

        if (indexBar) {
            indexBar.on({
                index: 'onIndex',
                scope: me
            });

            if (!oldIndexBar) {
                me.element.addCls(me.getBaseCls() + '-indexed');
            }

            if (scrollViewElement) {
                scrollViewElement.appendChild(indexBar.renderElement);
            }
        }
    },

    updateGrouped: function(grouped) {
        this.handleGroupChange();
    },

    onStoreGroupChange: function() {
        this.handleGroupChange();
    },

    onStoreAdd: function() {
        this.doRefresh();
    },

    onStoreRemove: function() {
        this.doRefresh();
    },

    onStoreUpdate: function(store, record, type, modifiedFieldNames, info) {
        var me = this,
            index, item;

        if (me.getInfinite() || info.indexChanged) {
            me.doRefresh();
        } else {
            index = store.indexOf(record);
            item = me.listItems[index];
            if (item) {
                me.updateListItem(item, index, me.getListItemInfo());
            }
        }
    },

    onStoreClear: function() {
        var me = this,
            scroller = me.container.getScrollable(),
            infinite = me.getInfinite();

        if (me.pinnedHeader) {
            me.pinnedHeader.translate(0, -10000);
        }

        if (!infinite) {
            me.setItemsCount(0);
            scroller.scrollTo(0, 0);
        } else {
            me.topRenderedIndex = 0;
            me.topVisibleIndex = 0;
            scroller.scrollTo(null, 0);
            me.updateAllListItems();
        }
    },

    showEmptyScrollDock: function() {
        var me = this,
            infinite = me.getInfinite(),
            scrollDockItems = me.scrollDockItems,
            offset = 0,
            i, ln, item;

        for (i = 0, ln = scrollDockItems.top.length; i < ln; i++) {
            item = scrollDockItems.top[i];
            if (infinite) {
                item.translate(0, offset);
                offset += item.$scrollDockHeight;
            } else {
                this.scrollElement.appendChild(item.renderElement);
            }
        }

        for (i = 0, ln = scrollDockItems.bottom.length; i < ln; i++) {
            item = scrollDockItems.bottom[i];
            if (infinite) {
                item.translate(0, offset);
                offset += item.$scrollDockHeight;
            } else {
                this.scrollElement.appendChild(item.renderElement);
            }
        }
    },

    hideScrollDockItems: function() {
        var me = this,
            infinite = me.getInfinite(),
            scrollDockItems = me.scrollDockItems,
            i, ln, item;

        if (!infinite) {
            return;
        }

        for (i = 0, ln = scrollDockItems.top.length; i < ln; i++) {
            item = scrollDockItems.top[i];
            item.translate(0, -10000);
        }

        for (i = 0, ln = scrollDockItems.bottom.length; i < ln; i++) {
            item = scrollDockItems.bottom[i];
            item.translate(0, -10000);
        }
    },

    /**
     * Returns an item at the specified index.
     * @param {Number} index Index of the item.
     * @return {Ext.dom.Element/Ext.dataview.component.DataItem} item Item at the specified index.
     */
    getItemAt: function(index) {
        var listItems = this.listItems,
            ln = listItems.length,
            i, listItem;

        for (i = 0; i < ln; i++) {
            listItem = listItems[i];
            if (listItem.$dataIndex == index) {
                return listItem;
            }
        }
    },

    /**
     * Returns an index for the specified item.
     * @param {Number} item The item to locate.
     * @return {Number} Index for the specified item.
     */
    getItemIndex: function(item) {
        return item.$dataIndex;
    },

    /**
     * Returns an array of the current items in the DataView.
     * @return {Ext.dom.Element[]/Ext.dataview.component.DataItem[]} Array of Items.
     */
    getViewItems: function() {
        return this.listItems;
    },

    getListItemInfo: function() {
        var me = this,
            baseCls = me.getBaseCls();

        return {
            store: me.getStore(),
            grouped: me.isGrouping(),
            baseCls: baseCls,
            selectedCls: me.getSelectedCls(),
            headerCls: baseCls + '-header-wrap',
            footerCls: baseCls + '-footer-wrap',
            firstCls: baseCls + '-item-first',
            lastCls: baseCls + '-item-last',
            stripeCls: baseCls + '-item-odd',
            striped: me.getStriped(),
            itemMap: me.getItemMap(),
            defaultItemHeight: me.getItemHeight()
        };
    },

    getListItemConfig: function() {
        var me = this,
            minimumHeight = me.getItemMap().getMinimumHeight(),
            config = {
                xtype: me.getDefaultType(),
                tpl: me.getItemTpl(),
                minHeight: minimumHeight,
                cls: me.getItemCls()
            };

        if (me.getInfinite()) {
            config.translatable = {
                translationMethod: this.translationMethod
            };
        }

        if (!me.getVariableHeights()) {
            config.height = minimumHeight;
        }

        return Ext.merge(config, me.getItemConfig());
    },

    refreshHeaderIndices: function() {
        var me = this,
            store = me.getStore(),
            storeLn = store && store.getCount(),
            groups = store.getGrouper() ? store.getGroups() : null,
            grouped = me.getGrouped(),
            headerIndices = me.headerIndices = {},
            footerIndices = me.footerIndices = {},
            i, previousIndex, firstGroupedRecord, storeIndex, groupLn;

        if (!grouped || !groups) {
            return footerIndices;
        }
        groupLn = groups.length;
        me.groups = groups;

        for (i = 0; i < groupLn; i++) {
            firstGroupedRecord = groups.getAt(i).getAt(0);
            storeIndex = store.indexOf(firstGroupedRecord);
            headerIndices[storeIndex] = true;

            previousIndex = storeIndex - 1;
            if (previousIndex >= 0) {
                footerIndices[previousIndex] = true;
            }
        }

        footerIndices[storeLn - 1] = true;

        return headerIndices;
    },

    onIndex: function(indexBar, index) {
        var me = this,
            key = index.toLowerCase(),
            store = me.getStore(),
            groups = store.getGroups(),
            ln = groups.length,
            group, groupKey, i, closest;

        for (i = 0; i < ln; i++) {
            group = groups.getAt(i);
            groupKey = group.getGroupKey().toLowerCase();
            if (groupKey >= key) {
                closest = group;
                break;
            }
            else {
                closest = group;
            }
        }

        if (closest) {
            this.scrollToRecord(closest.getAt(0));
        }
    },

    /**
     *
     * Scrolls the list so that the specified record is at the top.
     *
     * @param record {Ext.data.Model} Record in the lists store to scroll to
     * @param animate {Boolean} Determines if scrolling is animated to a cut
     * @param overscroll {Boolean} Determines if list can be overscrolled
     */
    scrollToRecord: function(record, animate, overscroll) {
        var me = this,
            scroller = me.container.getScrollable(),
            store = me.getStore(),
            index = store.indexOf(record);

        //stop the scroller from scrolling
        scroller.stopAnimation();

        //make sure the new offsetTop is not out of bounds for the scroller
        var elementHeight = scroller.getElement().getHeight(),
            scrollHeight = scroller.getSize().y,
            maxOffset = scrollHeight - elementHeight,
            offset, item;

        if (me.getInfinite()) {
            offset = me.getItemMap().map[index];
        }
        else {
            item = me.listItems[index];
            if (item.getHeader().isPainted()) {
                offset = item.getHeader().renderElement.dom.offsetTop;
            }
            else {
                offset = item.renderElement.dom.offsetTop;
            }
        }

        if (!overscroll) {
            offset = Math.min(offset, maxOffset);
        }

        scroller.scrollTo(0, offset, !!animate);
    },

    onItemAdd: function(item) {
        var me = this,
            config = item.config;

        if (config.scrollDock) {
            if (config.scrollDock == 'bottom') {
                me.scrollDockItems.bottom.push(item);
            } else {
                me.scrollDockItems.top.push(item);
            }

            if (me.getInfinite()) {
                item.on({
                    resize: 'onScrollDockItemResize',
                    scope: this
                });

                item.addCls(me.getBaseCls() + '-scrolldockitem');
                item.setTranslatable({
                    translationMethod: this.translationMethod
                });
                item.translate(0, -10000);
                item.$scrollDockHeight = 0;
            }

            me.container.doAdd(item);
        } else {
            me.callParent(arguments);
        }
    },

    /**
     * Returns all the items that are docked in the scroller in this list.
     * @return {Array} An array of the scrollDock items
     */
    getScrollDockedItems: function() {
        return this.scrollDockItems.bottom.slice().concat(this.scrollDockItems.top.slice());
    },

    onScrollDockItemResize: function(dockItem, size) {
        var me = this,
            items = me.listItems,
            ln = items.length,
            i, item;

        Ext.getCmp(dockItem.id).$scrollDockHeight = size.height;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.isLast) {
                this.updatedItems.push(item);
                this.refreshScroller();
                break;
            }
        }
    },

    onItemTouchStart: function(e) {
        this.container.innerElement.on({
            touchmove: 'onItemTouchMove',
            delegate: '.' + Ext.baseCSSPrefix + 'list-item',
            single: true,
            scope: this
        });
        this.callParent(this.parseEvent(e));
    },

    onItemTouchMove: function(e) {
        this.callParent(this.parseEvent(e));
    },

    onItemTouchEnd: function(e) {
        this.container.innerElement.un({
            touchmove: 'onItemTouchMove',
            delegate: '.' + Ext.baseCSSPrefix + 'list-item',
            scope: this
        });
        this.callParent(this.parseEvent(e));
    },

    onItemTap: function(e) {
        this.callParent(this.parseEvent(e));
    },

    onItemTapHold: function(e) {
        this.callParent(this.parseEvent(e));
    },

    onItemSingleTap: function(e) {
        this.callParent(this.parseEvent(e));
    },

    onItemDoubleTap: function(e) {
        this.callParent(this.parseEvent(e));
    },

    onItemSwipe: function(e) {
        this.callParent(this.parseEvent(e));
    },

    parseEvent: function(e) {
        var me = this,
            target = Ext.fly(e.currentTarget).findParent('.' + Ext.baseCSSPrefix + 'list-item', 8),
            item = Ext.getCmp(target.id);

        return [me, item, item.$dataIndex, e];
    },

    doItemSelect: function(me, record) {
        this.callParent(arguments);

        var item = me.getItemAt(me.getStore().indexOf(record));
        if (me.container && !me.destroyed && item && item.isComponent) {
            item.classCache = item.renderElement.getData().classList.slice();
        }
    },

    doItemDeselect: function(me, record) {
        this.callParent(arguments);

        var item = me.getItemAt(me.getStore().indexOf(record));
        if (item && item.isComponent) {
            item.classCache = item.renderElement.getData().classList.slice();
        }
    },

    applyOnItemDisclosure: function(config) {
        if (Ext.isFunction(config)) {
            return {
                scope: this,
                handler: config
            };
        }
        return config;
    },

    handleItemDisclosure: function(e) {
        var me = this,
            item = Ext.getCmp(Ext.get(e.currentTarget).up('.x-list-item').id),
            index = item.$dataIndex,
            record = me.getStore().getAt(index);

        me.fireAction('disclose', [me, record, item, index, e], 'doDisclose');
    },

    doDisclose: function(me, record, item, index, e) {
        var onItemDisclosure = me.getOnItemDisclosure();

        if (onItemDisclosure && onItemDisclosure.handler) {
            onItemDisclosure.handler.call(onItemDisclosure.scope || me, record, item, index, e);
        }
    },

    // apply to the selection model to maintain visual UI cues
    onItemTrigger: function(me, index, target, record, e) {
        if (!(this.getPreventSelectionOnDisclose() && Ext.fly(e.target).hasCls(this.getBaseCls() + '-disclosure'))) {
            this.callParent(arguments);
        }
    },

    destroy: function() {
        var me = this,
            items = me.listItems,
            ln = items.length,
            i;
        
        if (me.pinnedHeader) {
            me.pinnedHeader.destroy();
            me.pinnedHeader = null;
        }

        me.callParent();

        if (me.onIdleBound) {
            Ext.AnimationQueue.unIdle(me.onAnimationIdle, me);
        }

        for (i = 0; i < ln; i++) {
            items[i].destroy();
        }
        me.listItems = null;
    },

    privates: {
        handleGroupChange: function() {
            var me = this,
                grouped = me.isGrouping(),
                baseCls = this.getBaseCls(),
                infinite = me.getInfinite(),
                pinnedHeader = me.pinnedHeader,
                cls = baseCls + '-grouped',
                unCls = baseCls + '-ungrouped';

            if (pinnedHeader) {
                pinnedHeader.translate(0, -10000);
            }

            if (grouped) {
                me.addCls(cls);
                me.removeCls(unCls);
            } else {
                me.addCls(unCls);
                me.removeCls(cls);
            }

            if (infinite) {
                me.refreshHeaderIndices();
                me.handleItemHeights();
            }
            me.updateAllListItems();
            if (infinite) {
                me.handleItemTransforms();
            }
        },

        isGrouping: function() {
            return Boolean(this.getGrouped() && this.getStore().getGrouper());
        }
    }
});
