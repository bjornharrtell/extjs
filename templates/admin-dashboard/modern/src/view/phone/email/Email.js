Ext.define('Admin.view.phone.email.Email', {
    extend: 'Ext.Container',

    controller: 'email-phone',
    viewModel: {
        type: 'email'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    listeners: {
        element: 'element',
        edgeswipeend: 'onSwipe'
    },

    items: [
        {
            xtype: 'button',
            iconCls:'x-fa fa-plus',
            ui: 'bright-blue round',
            userCls: 'pop-out',
            bind: {
                hidden: '{composing}'
            },
            width: 50,
            height: 50,

            // These cause the button to be floated / absolute positioned
            bottom: 10,
            right: 10,

            handler: 'onPlusButtonTap',
            listeners: {
                scope: 'controller',
                element: 'element',
                longpress: 'onLongPressCompose'
            }
        },
        {
            xtype: 'inbox',
            flex: 1,
            bind: {
                store: '{inbox}',
                hidden: '{composing}'
            },
            reference: 'messages',

            listeners: {
                select: 'onSelectMessage'
            }
        }
    ]
});
