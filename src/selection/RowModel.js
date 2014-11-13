/**
 * A selection model for {@link Ext.grid.Panel grid panels} which allows selection grid rows..
 *
 * Implements row based navigation via keyboard.
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         fields  : ['name', 'email', 'phone'],
 *         data    : {
 *             items : [
 *                 { name : 'Lisa',  email : 'lisa@simpsons.com',  phone : '555-111-1224' },
 *                 { name : 'Bart',  email : 'bart@simpsons.com',  phone : '555-222-1234' },
 *                 { name : 'Homer', email : 'homer@simpsons.com', phone : '555-222-1244' },
 *                 { name : 'Marge', email : 'marge@simpsons.com', phone : '555-222-1254' }
 *             ]
 *         },
 *         proxy   : {
 *             type   : 'memory',
 *             reader : {
 *                 type : 'json',
 *                 root : 'items'
 *             }
 *         }
 *     });
 *     Ext.create('Ext.grid.Panel', {
 *         title    : 'Simpsons',
 *         store    : store,
 *         width    : 400,
 *         renderTo : Ext.getBody(),
 *         columns  : [
 *             { text : 'Name',  dataIndex : 'name'  },
 *             { text : 'Email', dataIndex : 'email', flex : 1 },
 *             { text : 'Phone', dataIndex : 'phone' }
 *         ]
 *     });
 */
Ext.define('Ext.selection.RowModel', {
    extend: 'Ext.selection.DataViewModel',
    alias: 'selection.rowmodel',
    requires: [
        'Ext.grid.CellContext'
    ],


    /**
     * @cfg {Boolean} enableKeyNav
     *
     * Turns on/off keyboard navigation within the grid.
     */
    enableKeyNav: true,

    /**
     * @event beforedeselect
     * Fired before a record is deselected. If any listener returns false, the
     * deselection is cancelled.
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The deselected record
     * @param {Number} index The row index deselected
     */

    /**
     * @event beforeselect
     * Fired before a record is selected. If any listener returns false, the
     * selection is cancelled.
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The selected record
     * @param {Number} index The row index selected
     */

    /**
     * @event deselect
     * Fired after a record is deselected
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The deselected record
     * @param {Number} index The row index deselected
     */

    /**
     * @event select
     * Fired after a record is selected
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The selected record
     * @param {Number} index The row index selected
     */

    isRowModel: true,

    onUpdate: function(record) {
        var me = this,
            view = me.view,
            index;

        if (view && me.isSelected(record)) {
            index = view.indexOf(record);
            view.onRowSelect(index);
            if (record === me.lastFocused) {
                view.onRowFocus(index, true);
            }
        }
    },

    // Returns the number of rows currently visible on the screen or
    // false if there were no rows. This assumes that all rows are
    // of the same height and the first view is accurate.
    getRowsVisible: function() {
        var rowsVisible = false,
            view = this.view,
            firstRow = view.all.first(),
            rowHeight, gridViewHeight;

        if (firstRow) {
            rowHeight = firstRow.getHeight();
            gridViewHeight = view.el.getHeight();
            rowsVisible = Math.floor(gridViewHeight / rowHeight);
        }

        return rowsVisible;
    },

    // Allow the GridView to update the UI by
    // adding/removing a CSS class from the row.
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me      = this,
            views   = me.views || [me.view],
            viewsLn = views.length,
            rowIdx,
            eventName = isSelected ? 'select' : 'deselect',
            i, view;

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record, rowIdx)) !== false &&
                commitFn() !== false) {

            for (i = 0; i < viewsLn; i++) {
                view = views[i];
                rowIdx  = view.indexOf(record);

                // The record might not be rendered due to either buffered rendering,
                // or removal/hiding of all columns (eg empty locked side).
                if (rowIdx !== -1) {
                    if (isSelected) {
                        view.onRowSelect(rowIdx, suppressEvent);
                    } else {
                        view.onRowDeselect(rowIdx, suppressEvent);
                    }
                }
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record, rowIdx);
            }
        }
    },

    // Provide indication of what row was last focused via
    // the gridview.
    onLastFocusChanged: function(oldFocused, newFocused, supressFocus) {
        var views   = this.views || [this.view],
            viewsLn = views.length,
            rowIdx,
            i = 0;

        if (oldFocused && viewsLn) {
            rowIdx = views[0].indexOf(oldFocused);
            if (rowIdx !== -1) {
                for (; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, false, true);
                }
            }
        }

        if (newFocused && viewsLn) {
            rowIdx = views[0].indexOf(newFocused);
            if (rowIdx !== -1) {
                for (i = 0; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, true, supressFocus);
                }
            }
        }
    },

    onEditorTab: function(editingPlugin, e) {
        var me = this,
            view = editingPlugin.context.view,
            record = editingPlugin.getActiveRecord(),
            position = editingPlugin.context,
            direction = e.shiftKey ? 'left' : 'right',
            lastPos;

        // We want to continue looping while:
        // 1) We have a valid position
        // 2) There is no editor at that position
        // 3) There is an editor, but editing has been cancelled (veto event)

        do {
            lastPos = position;
            position  = view.walkCells(position, direction, e, me.preventWrap);
            if (lastPos && lastPos.isEqual(position)) {
                // If we end up with the same result twice, it means that we weren't able to progress
                // via walkCells, for example if the remaining records are non-record rows, so gracefully
                // fall out here.
                return;
            }
        } while (position && (!position.column.getEditor(record) || !editingPlugin.startEditByPosition(position)));
    },

    /**
     * Returns position of the first selected cell in the selection in the format {row: row, column: column}
     * @deprecated 5.0.1 Use the {@link Ext.view.Table#getNavigationModel NavigationModel} instead.
     */
    getCurrentPosition: function() {
        var firstSelection = this.selected.getAt(0);
        if (firstSelection) {
            return new Ext.grid.CellContext(this.view).setPosition(this.store.indexOf(firstSelection), 0);
        }
    },

    selectByPosition: function (position, keepExisting) {
        var context = new Ext.grid.CellContext(this.view);
            
        context.setPosition(position.row, position.column);
        this.select(context.record, keepExisting);
    },

    /**
     * Selects the record immediately following the currently selected record.
     * @param {Boolean} [keepExisting] True to retain existing selections
     * @param {Boolean} [suppressEvent] Set to false to not fire a select event
     * @return {Boolean} `true` if there is a next record, else `false`
     */
    selectNext: function(keepExisting, suppressEvent) {
        var me = this,
            store = me.store,
            selection = me.getSelection(),
            record = selection[selection.length - 1],
            index = me.view.indexOf(record) + 1,
            success;

        if (index === store.getCount() || index === 0) {
            success = false;
        } else {
            me.doSelect(index, keepExisting, suppressEvent);
            success = true;
        }
        return success;
    },

    /**
     * Selects the record that precedes the currently selected record.
     * @param {Boolean} [keepExisting] True to retain existing selections
     * @param {Boolean} [suppressEvent] Set to false to not fire a select event
     * @return {Boolean} `true` if there is a previous record, else `false`
     */
    selectPrevious: function(keepExisting, suppressEvent) {
        var me = this,
            selection = me.getSelection(),
            record = selection[0],
            index = me.view.indexOf(record) - 1,
            success;

        if (index < 0) {
            success = false;
        } else {
            me.doSelect(index, keepExisting, suppressEvent);
            success = true;
        }
        return success;
    },

    isRowSelected: function(record) {
        return this.isSelected(record);
    },

    isCellSelected: function(view, record, columnHeader) {
        return this.isSelected(record);
    } 
});
