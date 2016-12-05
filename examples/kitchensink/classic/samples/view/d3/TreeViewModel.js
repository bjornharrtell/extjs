Ext.define('KitchenSink.view.d3.TreeViewModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'KitchenSink.model.Tree',
        'Ext.data.TreeStore'
    ],

    alias: 'viewmodel.tree',

    stores: {
        store: {
            type: 'tree',
            model: 'KitchenSink.model.Tree',
            rootVisible: true,
            autoLoad: true
        }
    },

    data: {
        selection: undefined
    }

});