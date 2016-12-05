Ext.define('Calendar.view.profile.Side', {
    extend: 'Ext.Container',
    xtype: 'app-profile-side',

    controller: 'app-side',

    viewModel: {
        type: 'app-side'
    },

    cls: 'profile-side',

    minWidth: 225,

    layout: {
        type: 'vbox',
        align: 'middle'
    },

    defaults: {
        margin: 5
    },

    items: [{
        xtype: 'image',
        cls: 'profile-side-icon',
        height: 128,
        width: 128,
        alt: 'User Image',
        bind: {
            src: '{icon}'
        }
    },{
        xtype: 'component',
        cls: 'profile-side-name',
        tpl: 'Google Calendar<br/><b>{name:uppercase}</b>',
        hidden: true,
        bind: {
            hidden: '{!user}',
            data: '{user}'
        }
    },{
        xtype: 'button',
        itemId: 'signin',
        text: 'Sign in with Google',
        iconCls: 'x-fa fa-google',
        ui: 'default-toolbar',
        handler: 'onSignIn',
        bind: {
            hidden: '{user}'
        }
    },{
        xtype: 'button',
        itemId: 'signout',
        text: 'Sign out',
        iconCls: 'x-fa fa-sign-out',
        ui: 'default-toolbar',
        hidden: true,
        handler: 'onSignOut',
        bind: {
            hidden: '{!user}'
        }
    }]
});
