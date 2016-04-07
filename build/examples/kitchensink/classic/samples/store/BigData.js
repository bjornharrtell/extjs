Ext.define('KitchenSink.store.BigData', {
    extend: 'Ext.data.Store',
    alias: 'store.big-data',

    model: 'KitchenSink.model.grid.Employee',

    groupField: 'department',

    proxy: {
        type: 'ajax',
        limitParam: null,
        url: '/KitchenSink/BigData',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
