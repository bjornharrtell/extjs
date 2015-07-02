/**
 * Controls the Spreadsheet example view.
 */
Ext.define('KitchenSink.view.grid.SpreadsheetController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.spreadsheet',

    formatDays: function (value) {
        return (value === 1) ? '1 day' : (value + ' days');
    },

    getSelectionModel: function () {
        var grid = this.getView();
        return grid.getSelectionModel();
    },

    onRefresh: function () {
        var grid = this.getView();
        grid.store.reload();
    },

    onSelectionChange: function (grid, selection) {
        var status = this.lookupReference('status'),
            message = '??',
            firstRowIndex,
            firstColumnIndex,
            lastRowIndex,
            lastColumnIndex;

        if (!selection) {
            message = 'No selection';
        }
        else if (selection.isCells) {
            firstRowIndex = selection.getFirstRowIndex();
            firstColumnIndex = selection.getFirstColumnIndex();
            lastRowIndex = selection.getLastRowIndex();
            lastColumnIndex = selection.getLastColumnIndex();

            message = 'Selected cells: ' + (lastColumnIndex - firstColumnIndex + 1) + 'x' + (lastRowIndex - firstRowIndex + 1) +
                ' at (' + firstColumnIndex + ',' + firstRowIndex + ')';
        }
        else if (selection.isRows) {
            message = 'Selected rows: ' + selection.getCount();
        }
        else if (selection.isColumns) {
            message = 'Selected columns: ' + selection.getCount();
        }

        status.update(message);
    },

    toggleRowSelect: function(button, pressed) {
        var sel = this.getSelectionModel();
        sel.setRowSelect(pressed);
    },

    toggleCellSelect: function(button, pressed) {
        var sel = this.getSelectionModel();
        sel.setCellSelect(pressed);
    },

    toggleColumnSelect: function(button, pressed) {
        var sel = this.getSelectionModel();
        sel.setColumnSelect(pressed);
    }
});
