/**
 * @class Ext.grid.HeaderContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('Ext.grid.HeaderContainer', {
    extend: 'Ext.Container',
    xtype: 'headercontainer',

    config: {
        baseCls: Ext.baseCSSPrefix + 'grid-header-container',
        docked: 'top',
        translationMethod: 'auto',
        defaultType: 'column',

        /**
         * @private
         * Set this to `false` to disable sorting via tap on all column headers
         */
        sortable: true
    },

    initialize: function() {
        var me = this;

        me.columns = [];

        me.callParent();

        me.on({
            tap: 'onHeaderTap',
            columnresize: 'onColumnResize',
            show: 'onColumnShow',
            hide: 'onColumnHide',
            sort: 'onColumnSort',
            scope: me,
            delegate: 'column'
        });

        me.on({
            show: 'onGroupShow',
            hide: 'onGroupHide',
            add: 'onColumnAdd',
            move: 'onColumnMove',
            remove: 'onColumnRemove',
            scope: me,
            delegate: 'gridheadergroup'
        });

        me.on({
            add: 'onColumnAdd',
            move: 'onColumnMove',
            remove: 'onColumnRemove',
            scope: me
        });

        if (Ext.browser.getPreferredTranslationMethod({translationMethod: this.getTranslationMethod()}) == 'scrollposition') {
            me.innerElement.setLeft(500000);
        }
    },

    getColumns: function() {
        return this.columns;
    },

    getAbsoluteColumnIndex: function(column) {
        var items = this.getInnerItems(),
            ln = items.length,
            index = 0,
            innerIndex, i, item;

        for (i = 0; i < ln; i++) {
            item = items[i];

            if (item === column) {
                return index;
            }
            else if (item.isHeaderGroup) {
                innerIndex = item.innerIndexOf(column);
                if (innerIndex !== -1) {
                    index += innerIndex;
                    return index;
                }
                else {
                    index += item.getInnerItems().length;
                }
            }
            else {
                index += 1;
            }
        }
    },

    onColumnAdd: function(parent, column) {
        var me = this,
            columns = me.columns,
            columnIndex = me.getAbsoluteColumnIndex(column),
            groupColumns, ln, i;

        if (column.isHeaderGroup) {
            groupColumns = column.getItems().items;

            for (i = 0, ln = groupColumns.length; i < ln; i++) {
                columns.splice(columnIndex + i, 0, groupColumns[i]);
                me.fireEvent('columnadd', me, groupColumns[i], column);
            }
        } else {
            columns.splice(columnIndex, 0, column);
            me.fireEvent('columnadd', me, column, null);
        }
    },

    onColumnMove: function(parent, column) {
        var me = this,
            columns = me.columns,
            columnIndex = me.getAbsoluteColumnIndex(column),
            groupColumns, ln, i, groupColumn,
            after, fromIdx, toIdx;

        if (column.isHeaderGroup) {
            groupColumns = column.getItems().items;

            for (i = 0, ln = groupColumns.length; i < ln; i++) {
                groupColumn = groupColumns[i];

                if (i === 0) {
                    oldIndex = columns.indexOf(groupColumn);
                    after = oldIndex - columnIndex < 0;
                }

                // Treat the moves as sequential
                if (after) {
                    // |  Group   | c | d     ->     | c | d |   Group   | 
                    //    a   b                                  a   b
                    //    
                    // We need to fire:
                    // a from 0 -> 3, since b is still in place
                    // b from 0 -> 3, to account for a still in place
                    toIdx = columnIndex + ln - 1;
                    fromIdx = oldIndex;
                } else {
                    // | c | d |   Group   |      ->     |  Group   | c | d 
                    //             a   b                    a   b
                    //    
                    // We need to fire:
                    // a from 2 -> 0
                    // b from 2 -> 1, to account for a moving
                    fromIdx = oldIndex + i;
                    toIdx = columnIndex + i;
                }
                Ext.Array.move(columns, fromIdx, toIdx);
                me.fireEvent('columnmove', me, groupColumn, column, fromIdx, toIdx);
            }
        } else {
            fromIdx = columns.indexOf(column);
            toIdx = columnIndex;
            Ext.Array.move(columns, fromIdx, toIdx);
            me.fireEvent('columnmove', me, column, null, fromIdx, toIdx);
        }
    },

    onColumnRemove: function(parent, column) {
        if (column.isHeaderGroup) {
            var columns = column.getItems().items,
                ln = columns.length,
                i;

            for (i = 0; i < ln; i++) {
                Ext.Array.remove(this.columns, columns[i]);
                this.fireEvent('columnremove', this, columns[i]);
            }
        } else {
            Ext.Array.remove(this.columns, column);
            this.fireEvent('columnremove', this, column);
        }
    },

    onHeaderTap: function(column) {
        if (this.getSortable() && !column.getIgnore() && column.getSortable()) {
            var sortDirection = column.getSortDirection() || 'DESC',
                newDirection = (sortDirection === 'DESC') ? 'ASC' : 'DESC';

            column.setSortDirection(newDirection);
        }

        this.fireEvent('columntap', this, column);
    },

    onColumnShow: function(column) {
        this.fireEvent('columnshow', this, column);
    },

    onColumnHide: function(column) {
        this.fireEvent('columnhide', this, column);
    },

    onGroupShow: function(group) {
        var columns = group.getInnerItems(),
            ln = columns.length,
            i, column;

        for (i = 0; i < ln; i++) {
            column = columns[i];
            if (!column.isHidden()) {
                this.fireEvent('columnshow', this, column);
            }
        }
    },

    onGroupHide: function(group) {
        var columns = group.getInnerItems(),
            ln = columns.length,
            i, column;

        for (i = 0; i < ln; i++) {
            column = columns[i];
            this.fireEvent('columnhide', this, column);
        }
    },

    onColumnResize: function(column, width) {
        this.fireEvent('columnresize', this, column, width);
    },

    onColumnSort: function(column, direction, newDirection) {
        if (direction !== null) {
            this.fireEvent('columnsort', this, column, direction, newDirection);
        }
    },

    scrollTo: function(x) {
        switch (Ext.browser.getPreferredTranslationMethod({translationMethod: this.getTranslationMethod()})) {
            case 'scrollposition':
                this.renderElement.dom.scrollLeft = 500000 + x;
                break;
            case 'csstransform':
                this.innerElement.translate(-x, 0);
                break;
        }
    }
});