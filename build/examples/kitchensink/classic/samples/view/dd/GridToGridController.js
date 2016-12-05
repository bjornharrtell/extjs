Ext.define('KitchenSink.view.dd.GridToGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dd-grid-to-grid',

    beforeRender: function () {
        var store = this.lookup('grid1').store,
            data = (this.myData = []),
            obj;

        // Keep a copy of the original data for reset:
        store.each(function (rec) {
            data.push(obj = Ext.apply({}, rec.data));
            delete obj.id;
        });
    },

    onDrop: function (onRec, rec, dropPosition, title) {
        var dropOn = onRec ? ' ' + dropPosition + ' ' + onRec.get('name') : ' on empty view';

        KitchenSink.toast(title, 'Dropped ' + rec.get('name') + dropOn);
    },
    
    onDropGrid1: function (node, data, dropRec, dropPosition) {
        this.onDrop(dropRec, data.records[0], dropPosition, 'Drag from right to left');
    },
    
    onDropGrid2: function (node, data, dropRec, dropPosition) {
        this.onDrop(dropRec, data.records[0], dropPosition, 'Drag from left to right');
    },

    onResetClick: function () {
        this.lookup('grid1').getStore().loadData(this.myData);
        this.lookup('grid2').getStore().removeAll();
    }
});
