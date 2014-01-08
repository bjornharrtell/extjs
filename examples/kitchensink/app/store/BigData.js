Ext.define('KitchenSink.store.BigData', {
    extend: 'Ext.data.Store',

    requires: [
        'KitchenSink.data.BigData',
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],

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
}, function() {
    Ext.ux.ajax.SimManager.init({
        defaultSimlet: null
    }).register({
        '/KitchenSink/BigData': {
            data: KitchenSink.data.BigData.data,
            stype: 'json'
        }
    });
});