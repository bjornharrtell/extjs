Ext.define('Admin.view.dashboard.Members', {
    extend: 'Ext.grid.Panel',
    xtype: 'dashboardmemberspanel',
    
    cls: 'dashboard-member-grid shadow-panel',
    bodyPadding: 15,
    scroll: 'none',
    hideHeaders: true,
    title: 'Members',  

    bind: {
        store: '{subscriptionstore}'
    },

    columns: [
        {
            xtype: 'numbercolumn',
            cls: 'dashboard-member-header-background',
            minHeight: 35,
            width: 20,
            dataIndex: 'id',
            text: '#',
            format: '0,000'
        },
        {
            xtype: 'gridcolumn',
            cls: 'dashboard-member-header-background',
            flex: 1,
            dataIndex: 'name',
            text: 'Name'
        },
        {
            xtype: 'gridcolumn',
            cls: 'dashboard-member-header-background',
            flex: 1,
            dataIndex: 'subscription',
            text: 'Subscription',
            renderer: function(value) {
                return "<span class='" + value + "'>" + value + "</span>";
            }
        },
        {
            xtype: 'actioncolumn',                                   
            items:[
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-pencil'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-close'
                }
            ],
            cls: 'dashboard-member-header-background',
            width: 100,
            align: 'left',
            dataIndex: 'bool',
            text: 'Actions',
            tooltip: 'edit ',
            margin: '0 4 0 0'
        }
    ],
    viewConfig: {
        cls: 'dashboard-member-grid-view',
        width: '100%'
    }
});
