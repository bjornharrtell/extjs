Ext.define('Admin.view.email.Email', {
    extend: 'Ext.container.Container',

    xtype: 'email',

    controller: 'email',

    viewModel: {
        type: 'email'
    },

    itemId: 'emailMainContainer',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    margin: '20 0 0 20',

    items: [
        {
            xtype: 'container',

            itemId: 'navigationPanel',

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            width: '30%',
            minWidth: 180,
            maxWidth: 240,

            defaults: {
                cls: 'navigation-email',
                margin: '0 20 20 0'
            },

            items: [
                {
                    xtype: 'emailmenu',
                    listeners: {
                        click: 'onMenuClick'
                    }
                },
                {
                    xtype: 'emailfriendslist'
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'contentPanel',
            margin: '0 20 20 0',
            flex: 1,
            layout: {
                type : 'anchor',
                anchor : '100%'
            }
        }
    ]
});
