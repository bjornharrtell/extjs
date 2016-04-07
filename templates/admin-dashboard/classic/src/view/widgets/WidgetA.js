Ext.define('Admin.view.widgets.WidgetA', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-a',

    cls: 'admin-widget shadow',

    items: [
        {
            xtype: 'image',
            cls: 'widget-top-container-first-img',
            height: 66,
            width: 66,
            alt: 'profile-image',
            src: 'resources/images/user-profile/3.png'
        },
        {
            xtype: 'component',
            cls: 'widget-top-first-container postion-class',
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
                    html: 'John Doe'
                },
                {
                    xtype: 'label',
                    html: 'Administrator'
                },
                {
                    xtype: 'toolbar',
                    cls: 'widget-tool-button',
                    flex: 1,
                    items: [
                        {
                            ui: 'soft-green',
                            text: 'Follow'
                        },
                        {
                            ui: 'soft-blue',
                            text: 'Message'
                        }
                    ]
                }
            ]
        }
    ]
});
