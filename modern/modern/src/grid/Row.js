/**
 * This class is created by a {@link Ext.grid.Grid grid} to manage each record. Rows act
 * as containers for {@link Ext.grid.cell.Base cells}.
 *
 * Row does not extend {@link Ext.Container} to keep overhead to a minimum. Application
 * code should not need to create instances of this class directly. Rows are created by
 * the {@link Ext.dataview.List} base as configured by {@link Ext.grid.Grid}.
 */
Ext.define('Ext.grid.Row', {
    extend: 'Ext.Component',
    xtype: 'gridrow',

    requires: [
        'Ext.grid.cell.Cell'
    ],

    mixins: [
        'Ext.mixin.Queryable'
    ],

    config: {
        baseCls: Ext.baseCSSPrefix + 'grid-row',

        header: {
            xtype: 'component',
            cls: 'x-grid-header',
            html: ' '
        },

        grid: null
    },

    constructor: function(config) {
        this.cells = [];
        this.columnMap = {};
        this.callParent([config]);
    },

    applyHeader: function(header) {
        if (header && !header.isComponent) {
            header = Ext.factory(header, Ext.Component, this.getHeader());
        }
        return header;
    },

    updateHeader: function(header, oldHeader) {
        if (oldHeader) {
            oldHeader.destroy();
        }
    },

    updateGrid: function(grid) {
        var me = this,
            i, columns, ln;

        if (grid) {
            columns = grid.getColumns();
            for (i = 0, ln = columns.length; i < ln; i++) {
                me.addColumn(columns[i]);
            }
        }
    },

    addColumn: function(column) {
        this.insertColumn(this.cells.length, column);
    },

    getRefItems: function() {
        return this.cells;
    },

    insertColumn: function(index, column) {
        var me = this,
            cells = me.cells,
            cell = me.createCell(column);

        if (index === cells.length) {
            me.element.appendChild(cell.element);
            cells.push(cell);
        } else {
            cell.element.insertBefore(cells[index].element);
            cells.splice(index, 0, cell);
        }

        me.columnMap[column.getId()] = cell;
    },

    moveColumn: function(column, fromIdx, toIdx) {
        var cells = this.cells,
            cell = cells[fromIdx];

        Ext.Array.move(cells, fromIdx, toIdx);
        if (toIdx === cells.length - 1) {
            this.element.appendChild(cell.element);
        } else {
            cell.element.insertBefore(cells[toIdx + 1].element);
        }
    },

    removeColumn: function(column) {
        var me = this,
            columnMap = me.columnMap,
            columnId = column.getId(),
            cell = columnMap[columnId];

        if (cell) {
            Ext.Array.remove(me.cells, cell);
            delete columnMap[columnId];
            cell.destroy();
        }
    },

    updateRecord: function(record) {
        if (!record) {
            return;
        }

        var cells = this.cells,
            len = cells.length,
            i, cell;

        for (i = 0; i < len; ++i) {
            cell = cells[i];
            if (cell.getRecord() === record) {
                cell.updateRecord(record);
            } else {
                cell.setRecord(record);
            }
        }
    },

    setColumnWidth: function(column, width) {
        var cell = this.getCellByColumn(column);
        if (cell) {
            cell.setWidth(width);
        }
    },

    showColumn: function(column) {
        this.setCellHidden(column, false);
    },

    hideColumn: function(column) {
        this.setCellHidden(column, true);
    },

    getCellByColumn: function(column) {
        return this.columnMap[column.getId()];
    },

    getColumnByCell: function(cell) {
        return cell.getColumn();
    },

    destroy: function() {
        var me = this;

        me.cells = Ext.destroy(me.cells, me.getHeader());
        me.setRecord(null);
        me.callParent();
    },

    privates: {
        createCell: function(column) {
            var cell = this.getCellCfg(column);

            cell.$initParent = this;
            cell = Ext.create(cell);
            delete cell.$initParent;

            return cell;
        },

        getCellCfg: function(column) {
            return Ext.apply({
                parent: this,
                column: column,
                record: this.getRecord(),
                hidden: column.getHidden(),
                width: column.getComputedWidth()
            }, column.getCell());
        },

        setCellHidden: function(column, hidden) {
            var cell = this.getCellByColumn(column);
            if (cell) {
                cell.setHidden(hidden);
            }
        }
    }
});
