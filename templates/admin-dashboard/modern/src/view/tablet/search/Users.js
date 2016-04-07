Ext.define('Admin.view.tablet.search.Users', {
    extend: 'Ext.Container',

    requires: [
        'Ext.grid.Grid'
    ],

    config: {
        store: null
    },

    defaultBindProperty: 'store',

    layout: 'fit',

    items: [{
        xtype: 'grid',
        width: '100%',
        height: '100%',

        columns: [{
            text: '#',
            width: 40,
            dataIndex: 'identifier'
        },{
            text: 'User',
            sortable: false,
            cell: {
                encodeHtml: false
            },
            renderer: function(value) {
                return "<img src='resources/images/user-profile/" + value +
                        "' alt='Profile Pic' height='40px' width='40px' class='circular'>";
            },
            width: 75,
            dataIndex: 'profile_pic'
        },{
            text: 'Name',
            cls: 'content-column',
            flex: 1,
            dataIndex: 'fullname'
        },{
            text: 'Email',
            cls: 'content-column',
            dataIndex: 'email',
            flex: 1
        },{
            xtype: 'datecolumn',
            text: 'Date',
            cls: 'content-column',
            width: 120,
            dataIndex: 'joinDate'
        },{
            text: 'Subscription',
            cls: 'content-column',
            dataIndex: 'subscription',
            flex: 1
        //},{
        //    xtype: 'actioncolumn',
        //    text: 'Actions',
        //    cls: 'content-column',
        //
        //    items: [{
        //        xtype: 'button',
        //        iconCls: 'x-fa fa-pencil'
        //    },{
        //        xtype: 'button',
        //        iconCls: 'x-fa fa-close'
        //    },{
        //        xtype: 'button',
        //        iconCls: 'x-fa fa-ban'
        //    }],
        //
        //    width: 120,
        //    tooltip: 'edit',
        //    dataIndex: 'bool'
        }]
    }],

    updateStore: function (store) {
        var grid = this.getComponent(0);
        grid.setStore(store);
    }
});
