Ext.define('Admin.view.widgets.WidgetB', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-b',

    cls: 'admin-widget shadow',

    items: [
        {
            xtype: 'image',
            cls: 'widget-top-container-first-img',
            height: 66,
            width: 66,
            alt: 'profile-image',
            src: 'resources/images/user-profile/4.png'
        },
        {
            xtype: 'component',
            cls: 'widget-top-second-container postion-class',
            height: 135
        },
        {
            xtype: 'container',
            cls: 'widget-bottom-first-container postion-class',
            height: 135,
            padding: '30 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'widget-name-text',
                    html: 'Lucy Moon'
                },
                {
                    xtype: 'label',
                    html: 'Web and Graphic designer'
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    items: [
                        {
                            ui: 'facebook',
                            iconCls: 'x-fa fa-facebook'
                        },
                        {
                            ui: 'soft-cyan',
                            iconCls: 'x-fa fa-twitter'
                        },
                        {
                            ui: 'soft-red',
                            iconCls: 'x-fa fa-google-plus'
                        },
                        {
                            ui: 'soft-purple',
                            iconCls: 'x-fa fa-envelope'
                        }
                    ]
                }
            ]
        }
    ]
});
