/**
 * @class Ext.grid.plugin.ColumnResizing
 * @extends Ext.Component
 * Description
 */
Ext.define('Ext.grid.plugin.ColumnResizing', {
    extend: 'Ext.Component',

    alias: 'plugin.gridcolumnresizing',

    config: {
        grid: null
    },

    init: function(grid) {
        this.setGrid(grid);
    },

    updateGrid: function(grid, oldGrid) {
        if (oldGrid) {
            oldGrid.getHeaderContainer().renderElement.un({
                pinchstart: 'onContainerPinchStart',
                pinch: 'onContainerPinch',
                pinchend: 'onContainerPinchEnd',
                scope: this
            });
        }

        if (grid) {
            grid.getHeaderContainer().renderElement.on({
                pinchstart: 'onContainerPinchStart',
                pinch: 'onContainerPinch',
                pinchend: 'onContainerPinchEnd',
                scope: this
            });
        }
    },

    onContainerPinchStart: function(e) {
        var target = e.getTarget('.' + Ext.baseCSSPrefix + 'grid-column'),
            column;

        if (target) {
            column = Ext.getCmp(target.id);
            if (column && column.getResizable()) {
                this.startColumnWidth = column.getWidth();
                this.resizeColumn = column;
                this.startDistance = e.distance;
                column.renderElement.addCls(Ext.baseCSSPrefix + 'grid-column-resizing');
            } else {
                e.preventDefault();
            }
        }
    },

    onContainerPinch: function(e) {
        var column = this.resizeColumn,
            resizeAmount = e.distance - this.startDistance;

        if (column) {
            this.currentColumnWidth = Math.ceil(this.startColumnWidth + resizeAmount);
            column.renderElement.setWidth(this.currentColumnWidth);
        }
    },

    onContainerPinchEnd: function() {
        var column = this.resizeColumn;
        if (column) {
            column.setWidth(this.currentColumnWidth + 1);
            column.renderElement.removeCls(Ext.baseCSSPrefix + 'grid-column-resizing');
            delete this.resizeColumn;
        }
    }
});