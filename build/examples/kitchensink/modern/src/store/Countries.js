Ext.define('KitchenSink.store.Countries', {
    extend: 'Ext.data.Store',
    alias: 'store.countries',

    fields: ['id', 'name'],

    data: [{
        id: 1,
        name: 'USA'
    }, {
        id: 2,
        name: 'Canada'
    }]
});