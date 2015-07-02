Ext.define('Admin.view.search.Results', {
    extend: 'Ext.tab.Panel',
    xtype:'SearchResults',
    activeTab  : 0,
    items:[

        {
            title: 'All',
            html:  'All'

        },
        {
            title: 'Users',
            html:  'Users'
        },
        {
            title: 'Messages',
            html: 'Messages'
        }
    ]
});
