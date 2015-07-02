Ext.define('Admin.store.search.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.searchusers',

    model: 'Admin.model.search.User',

    proxy: {
        type: 'ajax',
        url: '~api/search/users',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: 'true',

    sorters: {
        direction: 'ASC',
        property: 'fullname'
    }
});
