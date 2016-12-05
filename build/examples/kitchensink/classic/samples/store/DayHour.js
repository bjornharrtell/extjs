Ext.define('KitchenSink.store.DayHour', {
    extend: 'Ext.data.Store',
    alias: 'store.dayhour',

    fields: [
        {name: 'day', type: 'number'},
        {name: 'hour', type: 'number'},
        {name: 'value', type: 'number'}
    ],

    proxy: {
        type: 'ajax',
        url: 'data/heatmap/heatmap1.json',
        reader: {
            type: 'json'
        }
    },

    autoLoad: true

});
