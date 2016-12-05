Ext.define('KitchenSink.store.SalesPerEmployeeAlt', {
    extend: 'Ext.data.Store',
    alias: 'store.salesperemployee-alt',

    fields: [
        {name: 'employee', type: 'number'},
        {name: 'day', type: 'number'},
        {name: 'sales', type: 'number'}
    ],

    proxy: {
        type: 'ajax',
        url: 'data/heatmap/SalesPerEmployee.json',
        reader: {
            type: 'json'
        }
    },

    autoLoad: true

});
