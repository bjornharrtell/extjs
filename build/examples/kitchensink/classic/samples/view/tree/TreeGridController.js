/**
 * Controller for the Tree Grid example.
 */
Ext.define('KitchenSink.view.tree.TreeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree-grid',

    formatHours: function(v) {
        if (v < 1) {
            return Math.round(v * 60) + ' mins';
        }

        if (Math.floor(v) !== v) {
            var min = v - Math.floor(v);
            return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
        }

        return v + ' hour' + (v === 1 ? '' : 's');
    },

    isRowEditDisabled: function(view, rowIdx, colIdx, item, record) {
        // Only leaf level tasks may be edited
        return !record.data.leaf;
    },

    onEditRowAction: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') ,
            record.get('task'));
    }
});
