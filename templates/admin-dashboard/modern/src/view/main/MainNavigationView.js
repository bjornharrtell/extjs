Ext.define('Admin.view.main.MainNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'MainNavigationView',
    config: {
        layout:{
            animation: false
        },
        items:[
            {
                xtype:'dashboard'
            }
        ]
    }
});
