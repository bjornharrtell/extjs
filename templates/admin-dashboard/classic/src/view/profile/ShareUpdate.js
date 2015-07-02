Ext.define('Admin.view.profile.ShareUpdate', {
    extend: 'Ext.panel.Panel',
    xtype: 'profilesharepanel',

    bodyPadding : 10,
    layout: 'fit',
    cls:'share-panel shadow-panel',
    
    items: [
        {
            xtype: 'textareafield',
            emptyText: "What's on your mind?"
        }
    ],
    
    bbar: {
        defaults : {
                margin:'0 10 5 0'
        },
        items:[
            {
                xtype: 'button',
                iconCls: 'x-fa fa-video-camera'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-camera'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-file'
            },
            '->',
            {
                xtype: 'button',
                text: 'Share',
                ui: 'soft-blue'
            }
        ]
    }
});
