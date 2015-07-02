Ext.define('KitchenSink.store.pivot.Sales', {
    extend: 'Ext.data.Store',
    alias: 'store.sales',

    model: 'KitchenSink.model.pivot.Sale',

    proxy: {
        // load using HTTP
        type: 'ajax',
        limitParam: null,
        url: '/KitchenSink/SalesData',
        // the return will be JSON, so lets set up a reader
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
