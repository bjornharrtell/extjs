Ext.define('KitchenSink.store.LinearGeoData', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'KitchenSink.model.tree.Country',
        'KitchenSink.model.tree.City'
    ],

    model: 'KitchenSink.model.tree.Territory',

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            typeProperty: 'mtype'
        },
        url: '/KitchenSink/LinearGeoData'
    },

    parentIdProperty: 'parentId'
});
