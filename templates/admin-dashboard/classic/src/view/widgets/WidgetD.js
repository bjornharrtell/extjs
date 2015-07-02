Ext.define('Admin.view.widgets.WidgetD', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-d',

    cls:'admin-widget shadow-panel',

    items: [
        {
            xtype: 'image',
            cls: 'widget-top-container-first-img',
            height: 66,
            width: 66,
            alt: 'profile-image',
            src: 'resources/images/user-profile/2.png'
        },
        {
            xtype: 'component',
            cls: 'widget-top-first-fourth-container postion-class',
            height: 135
        },
        {
            xtype: 'container',
            cls: 'widget-bottom-first-container postion-class',
            height: 135,
            padding: '30 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'widget-name-text',
                    html: 'Goff Smith'
                },
                {
                    xtype: 'label',
                    html: 'Project manager'
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    cls: 'widget-tool-button',
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
