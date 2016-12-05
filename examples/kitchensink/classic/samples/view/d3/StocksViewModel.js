Ext.define('KitchenSink.view.d3.StocksViewModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'KitchenSink.model.Tree',
        'Ext.data.TreeStore'
    ],

    alias: 'viewmodel.stocks',

    stores: {
        store: {
            type: 'tree',
            model: 'KitchenSink.model.Stock',
            autoLoad: true
        }
    },

    data: {
        selection: undefined
    }

});