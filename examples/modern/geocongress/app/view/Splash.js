/**
 * Splash screen
 */
Ext.define('GeoCon.view.Splash', {
    extend: 'Ext.Container',
    id: 'splashScreen',

    requires: [
        'GeoCon.view.legislator.List',
        'GeoCon.view.Settings'
    ],

    config: {
        layout: {
            type: 'card',
            animation: {
                type: 'flip'
            }
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'splashToolbar',

                title: 'Finding location...',

                items: [
                    {
                        id: 'settingsBtn',
                        xtype: 'button',
                        iconCls: 'x-fa fa-gear',
                        ui: 'plain'
                    }
                ]
            },
            {
                xclass: 'GeoCon.view.legislator.List'
            },
            {
                xclass: 'GeoCon.view.Settings'
            }
        ]
    },

    animateTo: function(dir) {
        Ext.getCmp('viewport').getLayout().setAnimation({
            duration: 300,
            easing: 'ease-in-out',
            type: 'slide',
            direction: dir
        });
    }

});
