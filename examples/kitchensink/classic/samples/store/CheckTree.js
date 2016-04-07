Ext.define('KitchenSink.store.CheckTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.checktree',

    proxy: {
        type: 'ajax',
        url: 'data/tree/check-nodes.json'
    },
    sorters: [{
        property: 'leaf',
        direction: 'ASC'
    }, {
        property: 'text',
        direction: 'ASC'
    }]
});
