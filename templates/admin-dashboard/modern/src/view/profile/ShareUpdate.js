Ext.define('Admin.view.profile.ShareUpdate', {
    extend: 'Ext.Panel',
    xtype: 'profileshare',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.Toolbar'
    ],

    padding: 10,
    layout: 'fit',

    cls: 'share-panel',

    items: [
        {
            xtype: 'textareafield',
            placeHolder: "What's on your mind?"
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            defaults : {
                margin:'0 10 5 0'
            },

            items: [
                {
                    iconCls: 'x-fa fa-video-camera',
                    ui: 'header'
                },
                {
                    iconCls: 'x-fa fa-camera',
                    ui: 'header'
                },
                {
                    iconCls: 'x-fa fa-file',
                    ui: 'header'
                },
                '->',
                {
                    text: 'Share',
                    ui: 'soft-blue'
                }
            ]
        }
    ]
});
