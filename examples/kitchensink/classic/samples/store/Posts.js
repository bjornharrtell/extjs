Ext.define('KitchenSink.store.Posts', {
    extend: 'Ext.data.TreeStore',

    model: 'KitchenSink.model.tree.Post',

    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/KitchenSink/Posts'
    },

    // Preload child nodes before expand request
    lazyFill: false,

    // If a leaf node passes the filter, all its ancestors will be filtered in
    filterer: 'bottomup'
});
