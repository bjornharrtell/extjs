Ext.define('Admin.view.widgets.WidgetC', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-c',

    cls:'admin-widget shadow-panel',

    items: [
        {
            xtype: 'image',
            cls: 'widget-top-container-first-img',
            height: 66,
            width: 66,
            alt: 'profile-image',
            src: 'resources/images/user-profile/1.png'
        },
        {
            xtype: 'component',
            cls: 'widget-top-first-third-container postion-class',
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
                    html: 'Donald Brown'
                },
                {
                    xtype: 'label',
                    html: 'Art Designer'
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    cls: 'widget-follower-toolbar',
                    width: '100%',
                    margin: '20 0 0 0',
                    defaults: {
                        xtype: 'displayfield',
                        flex: 1,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            value: '<div class="label">Following</div><div>1,345</div>'
                        },
                        {
                            cls: 'widget-follower-tool-label',
                            value: '<div class="label">Followers</div><div>23,456</div>'
                        },
                        {
                            value: '<div class="label">Likes</div><div>52,678</div>'
                        }
                    ]
                }
            ]
        }
    ]
});
