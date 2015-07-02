Ext.define('Admin.view.main.Viewport', {
    extend: 'Ext.Container',
    xtype:'mainView',
    layout:'hbox',
    controller: 'dashboardController',
    items:[
        {
            xtype:'panel',
            width:250,
            type:'left-navigation',
            layout:'vbox',
            cls:'left-nav',
            items:[
                {
                    xtype:'nestedlist',
                    flex:1,
                    store:'NavigationTree',
                    itemTpl:'{text}',
                    listeners:{
                        itemtap:function( _this, list, index, target, record, e, eOpts ){
                            if(record.data.view)
                            {
                                window.location.hash=record.data.view;
                            }
                        }
                    }
                }    
            ]
        },
        {
            xtype:'panel',
            flex:1,
            height:'100%',
            type:'mainView',
            cls:'mainView',
            layout:'vbox',
            items:[
                {
                    xtype:'MainNavigationView',
                    flex:1
                }
            ]    
        }
        
    ]
});
