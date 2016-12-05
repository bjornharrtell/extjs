Ext.define('KitchenSink.view.desktop.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
        'KitchenSink.view.ContentPanel',
        'KitchenSink.view.BreadcrumbBar',
        'KitchenSink.view.desktop.NavigationBar'
    ],

    fullscreen: true,
    id: 'mainPanel',

    layout: {
        type: 'hbox'
    },

    items: [
        {
            id: 'mainNavigationBar',
            xtype: 'desktopnavigationbar',
            title: 'Ext JS Kitchen Sink',
            docked: 'top',
            items: [
                {
                    xtype: 'component',
                    cls: ['ext', 'ext-sencha'],
                    style: 'padding-right: 10px'
                },{
                    align: 'right',
                    action: 'material-theme-settings',
                    iconCls: 'palette',
                    hidden: true // !Ext.theme.is.Material
                },
                {
                    align: 'right',
                    action: 'burger',
                    iconCls: 'menu'
                }
            ]
        },
        {
            id: 'cardPanel',
            flex: 3,
            layout: {
                type: 'card'
            },
            items: [
                {
                    xtype: 'breadcrumb',
                    docked: 'top',
                    afterItems: [
                        '->',
                        {
                            iconCls: 'x-fa fa-code',
                            action: 'viewSource'
                        }
                    ]
                },
                {
                    xtype: 'contentPanel',
                    id: 'contentPanel1',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'center'
                    },
                    items: [
                        {
                            id: 'icons'
                        }
                    ]
                },
                {
                    xtype: 'contentPanel',
                    id: 'contentPanel2',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'center'
                    },
                    items: [
                        {
                            id: 'icons2'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'sourceoverlay',
            id: 'sourceoverlay',
            flex: 1
        }
    ]
});
