Ext.define('KitchenSink.view.tablet.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
        'KitchenSink.view.ContentPanel',
        'KitchenSink.view.BreadcrumbBar',
        'KitchenSink.view.tablet.NavigationBar'
    ],

    fullscreen: true,
    id: 'mainPanel',

    layout: {
        type: 'hbox'
    },

    items: [
        {
            id: 'mainNavigationBar',
            xtype: 'tabletnavigationbar',
            title: 'Ext JS Kitchen Sink',
            docked: 'top',
            items: [
                {
                    xtype: 'component',
                    cls: ['ext', 'ext-sencha'],
                    style: 'padding-right: 10px'
                },
                {
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
                    scrollable: true,
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
                    scrollable: true,
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
            hidden: true,
            flex: 1
        }
    ]
});
