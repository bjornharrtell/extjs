Ext.define('KitchenSink.view.tablet.NavigationBar', {
    extend: 'Ext.TitleBar',
    xtype: 'tabletnavigationbar',

    config: {
        ui: 'dark'
    },

    platformConfig: {
        blackberry: {
            ui: 'light'
        }
    }
});
