Ext.define('KitchenSink.profile.Tablet', {
    extend: 'KitchenSink.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main', 'TouchEvents'],
        mainView: 'KitchenSink.view.tablet.Main'
    },

    isActive: function() {
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    }
});
