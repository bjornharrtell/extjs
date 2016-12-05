Ext.define('KitchenSink.store.Sales', {
    extend: 'Ext.data.Store',
    alias: 'store.sales',

    model: 'KitchenSink.model.Sale',

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
