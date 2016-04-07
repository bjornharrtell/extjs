Ext.define('Admin.view.profile.ShareUpdate', {
    extend: 'Ext.panel.Panel',
    xtype: 'profileshare',

    bodyPadding : 10,
    layout: 'fit',

    cls: 'share-panel',
    
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
                ui: 'header',
                iconCls: 'x-fa fa-video-camera'
            },
            {
                ui: 'header',
                iconCls: 'x-fa fa-camera'
            },
            {
                ui: 'header',
                iconCls: 'x-fa fa-file'
            },
            '->',
            {
                text: 'Share',
                ui: 'soft-blue'
            }
        ]
    }
});
