Ext.define('Admin.store.faq.FAQ', {
    extend: 'Ext.data.Store',
    alias: 'store.faq',

    model: 'Admin.model.faq.Category',

    proxy: {
        type: 'api',
        url: '~api/faq/faq'
    }
});
