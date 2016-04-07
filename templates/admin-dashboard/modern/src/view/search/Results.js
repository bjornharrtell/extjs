Ext.define('Admin.view.search.Results', {
    extend: 'Ext.tab.Panel',
    xtype:'searchresults',

    activeTab: 0,
    viewModel: {
        type: 'searchresults'
    },

    items: [{
        title: 'All',
        xtype: 'allresults',
        bind: {
            store: '{results}'
        }
    },{
        title: 'Users',
        xtype: 'searchusers',

        bind: {
            store: '{users}'
        }
    },{
        title: 'Messages',
        xtype: 'container',
        layout: 'fit',
        items: [{
            xtype: 'inbox',
            hideHeaders: true,
            bind: '{inbox}'
        }]
    }]
});
