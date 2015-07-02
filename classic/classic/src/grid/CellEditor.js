/**
 * Internal utility class that provides default configuration for cell editing.
 * @private
 */
Ext.define('Ext.grid.CellEditor', {
    extend: 'Ext.Editor',

    /**
     * @property {Boolean} isCellEditor
     * @readonly
     * `true` in this class to identify an object as an instantiated CellEditor, or subclass thereof.
     */
    isCellEditor: true,
    
    alignment: 'l-l?',

    hideEl : false,

    cls: Ext.baseCSSPrefix + 'small-editor ' +
        Ext.baseCSSPrefix + 'grid-editor ' +
        Ext.baseCSSPrefix + 'grid-cell-editor',

    treeNodeSelector: '.' + Ext.baseCSSPrefix + 'tree-node-text',

    shim: false,

    shadow: false,

    // Set the grid that owns this editor.
    // Called by CellEditing#getEditor
    setGrid: function(grid) {
        var me = this,
            oldGrid = me.grid,
            viewListeners;

        if (grid !== oldGrid) {
            viewListeners = {
                beforerefresh: me.beforeViewRefresh,
                refresh: me.onViewRefresh,
                beforeitemupdate: me.beforeItemUpdate,
                itemupdate: me.onItemUpdate,
                scope: me
            };
            // Remove previous refresh listener
            if (oldGrid) {
                oldGrid.getView().un(viewListeners);
            }

            me.grid = grid;

            // On view refresh, we need to copy our DOM into the detached body to prevent it from being garbage collected.
            grid.getView().on(viewListeners);
        }
    },

    beforeViewRefresh: function(view) {
        var me = this,
            dom = me.el && me.el.dom;

        if (dom) {
            me.wasAllowBlur = me.allowBlur;
            if (me.editing && !(me.field.column && me.field.column.sorting)) {

                // Clear the Panel's cellFocused flag prior to removing it from the DOM
                // This will prevent the Panels onFocusLeave from processing the resulting blurring.
                me.grid.view.cellFocused = false;

                // Set the Editor.allowBlur setting so that it does not process the upcoming field blur event and terminate the edit
                me.allowBlur = false;
            }

            // Remove the editor from the view to protect it from annihilation: https://sencha.jira.com/browse/EXTJSIV-11713
            if (dom.parentNode) {
                // Set refreshing flag so that onFocusLeave caused by removing a focused element
                // does not exit actionableMode
                view.refreshing = true;
                dom.parentNode.removeChild(dom);
            }
        }
    },

    onViewRefresh: function(view) {
        var me = this,
            dom = me.el && me.el.dom,
            sorting,
            cell,
            context = me.context;

        if (dom) {
            me.allowBlur = me.wasAllowBlur;
            sorting = me.field.column && me.field.column.sorting;

            // Update the context with the possibly new contextual data
            // (refresh might have been caused by a sort or column move etc)
            cell = view.getCellByPosition(context, true);

            // If the refresh was caused by eg column removal, the cell will not exist.
            // In this case, terminate the edit.
            if (!cell) {
                me.completeEdit();
                Ext.getDetachedBody().dom.appendChild(dom);
                return;
            }

            context.node = view.getNode(context.record);
            context.row = view.getRow(context.record);
            context.rowIdx = view.indexOf(context.row);
            cell.insertBefore(dom, cell.firstChild);
            me.boundEl = me.container = Ext.get(cell);
            me.realign(true);

            // If the view was refreshed while we were editing, replace it.
            if (me.editing && !sorting) {
                me.field.focus();
            }

            // If the column was sorted while editing, we must detect that and complete the edit
            // because the view will be refreshed and the editor will be removed from the dom.
            if (me.editing && sorting) {
                me.completeEdit();
            }
        }
    },

    beforeItemUpdate: function(record, recordIndex, oldItemDom, columnsToUpdate) {
        var me = this,
            context = me.context,
            l = columnsToUpdate.length,
            i;

        // If this CellEditor's row is to be updated, we *may* have to restore this editor
        // due to cell content possibly being changed.
        if (record === context.record) {
            for (i = 0; i < l; i++) {

                // If the cell is scheduled for update, we definitely will need restoration.
                if (columnsToUpdate[i] === context.column) {
                    me.needsFixOnItemUpdate = true;
                    me.beforeViewRefresh(me.editingPlugin.view);
                    return;
                }
            }
        }
    },

    onItemUpdate: function(record, recordIndex, oldItemDom) {
        var view = this.editingPlugin.view;

        if (this.needsFixOnItemUpdate) {

            // The refreshing flag was set to indicate to the onFocusLeave listener that it
            // should ignore focusleave caused by this Editor blurring.
            this.needsFixOnItemUpdate = view.refreshing = false;
            this.onViewRefresh(view);
        }
    },

    startEdit: function(boundEl, value, doFocus) {
        this.context = this.editingPlugin.context;
        this.callParent([boundEl, value, doFocus]);
    },

    /**
     * @private
     * Shows the editor, end ensures that it is rendered into the correct view
     * Hides the grid cell inner element when a cell editor is shown.
     */
    onShow: function() {
        var me = this,
            innerCell = me.boundEl.down(me.context.view.innerSelector);

        if (innerCell) {
            if (me.isForTree) {
                innerCell = innerCell.child(me.treeNodeSelector);
            }
            innerCell.hide();
        }

        me.callParent(arguments);
    },

    onFocusEnter: function() {
        this.callParent(arguments);

        // Ensure that hide processing does not throw focus back to the previously focused element.
        this.focusEnterEvent = null;
    },

    onEditComplete: function(remainVisible) {
        // When being asked to process edit completion, if we are not hiding, restore the cell now
        if (remainVisible) {
            this.restoreCell();
        }
        this.callParent(arguments);
    },

    /**
     * @private
     * Shows the grid cell inner element when a cell editor is hidden
     */
    onHide: function() {
        this.restoreCell();
        this.callParent(arguments);
    },

    onSpecialKey: function(field, event) {
        var me = this,
            key = event.getKey(),
            complete = me.completeOnEnter && key === event.ENTER,
            cancel = me.cancelOnEsc && key === event.ESC,
            view = me.editingPlugin.view;

        if (complete || cancel) {
            // Do not let the key event bubble into the NavigationModel after we're don processing it.
            // We control the navigation action here; we focus the cell.
            event.stopEvent();

            // Maintain visibility so that focus doesn't leak.
            // We need to direct focusback to the owning cell.
            if (complete) {
                me.completeEdit(true);
            } else if (cancel) {
                me.cancelEdit(true);
            }

            view.getNavigationModel().setPosition(me.context, null, event);
            view.ownerGrid.setActionableMode(false);
        }
    },

    getRefOwner: function() {
        return this.column && this.column.getView();
    },

    restoreCell: function() {
        var me = this,
            innerCell = me.boundEl.down(me.context.view.innerSelector);

        if (innerCell) {
            if (me.isForTree) {
                innerCell = innerCell.child(me.treeNodeSelector);
            }
            innerCell.show();
        }        
    },

    /**
     * @private
     * Fix checkbox blur when it is clicked.
     */
    afterRender: function() {
        var me = this,
            field = me.field;

        me.callParent(arguments);

        if (field.isCheckbox) {
            field.mon(field.inputEl, {
                mousedown: me.onCheckBoxMouseDown,
                click: me.onCheckBoxClick,
                scope: me
            });
        }
    },
    
    /**
     * @private
     * Because when checkbox is clicked it loses focus  completeEdit is bypassed.
     */
    onCheckBoxMouseDown: function() {
        this.completeEdit = Ext.emptyFn;
    },
     
    /**
     * @private
     * Restore checkbox focus and completeEdit method.
     */
    onCheckBoxClick: function() {
        delete this.completeEdit;
        this.field.focus(false, 10);
    },
    
    /**
     * @private
     * Realigns the Editor to the grid cell, or to the text node in the grid inner cell
     * if the inner cell contains multiple child nodes.
     */
    realign: function(autoSize) {
        var me = this,
            boundEl = me.boundEl,
            innerCell = boundEl.down(me.context.view.innerSelector),
            innerCellTextNode = innerCell.dom.firstChild,
            width = boundEl.getWidth(),
            offsets = Ext.Array.clone(me.offsets),
            grid = me.grid,
            xOffset,
            v = '',

            // innerCell is empty if there are no children, or there is one text node, and it contains whitespace
            isEmpty = !innerCellTextNode || (innerCellTextNode.nodeType === 3 && !(Ext.String.trim(v = innerCellTextNode.data).length));

        if (me.isForTree) {
            // When editing a tree, adjust the width and offsets of the editor to line
            // up with the tree cell's text element
            xOffset = me.getTreeNodeOffset(innerCell);
            width -= Math.abs(xOffset);
            offsets[0] += xOffset;
        }

        if (grid.columnLines) {
            // Subtract the column border width so that the editor displays inside the
            // borders. The column border could be either on the left or the right depending
            // on whether the grid is RTL - using the sum of both borders works in both modes.
            width -= boundEl.getBorderWidth('rl');
        }

        if (autoSize === true) {
            me.field.setWidth(width);
        }

        // https://sencha.jira.com/browse/EXTJSIV-10871 Ensure the data bearing element has a height from text.
        if (isEmpty) {
            innerCell.dom.innerHTML = 'X';
        }

        me.alignTo(innerCell, me.alignment, offsets);

        if (isEmpty) {
            innerCell.dom.firstChild.data = v;
        }
    },

    getTreeNodeOffset: function(innerCell) {
        return innerCell.child(this.treeNodeSelector).getOffsetsTo(innerCell)[0];
    }
});
