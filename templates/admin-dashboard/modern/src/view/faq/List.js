Ext.define('Admin.view.faq.List', {
    extend: 'Ext.dataview.List',
    xtype: 'faq',

    container: {
        userCls: 'dashboard'
    },

    store: {
        type: 'faq',
        autoLoad: true
    },

    defaultType: 'faqitems',

    itemConfig: {
        //ui: 'light', // TODO - timing issue
        userCls: 'dashboard-item shadow',
        viewModel: true,

        bind: {
            ui: 'light',
            title: '{record.name}',
            store: '{record.questions}'
        }
    }
});
