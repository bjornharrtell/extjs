/**
 * The main view is a Card panel, initially containing the splash screen
 */
Ext.define('GeoCon.view.Main', {
    extend: 'Ext.Container',
    requires: ['GeoCon.view.Splash'],

    id: 'viewport',

    config: {
        layout: {
            type: 'card',
            animation: {
                duration: 300,
                easing: 'ease-in-out',
                type: 'slide',
                direction: 'left'
            }
        },
        fullscreen: true,

        items: [
            { xclass: 'GeoCon.view.Splash' }
        ]
    }
});
