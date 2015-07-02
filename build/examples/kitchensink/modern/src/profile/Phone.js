Ext.define('KitchenSink.profile.Phone', {
    extend: 'KitchenSink.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main', 'TouchEvents'],
        mainView: 'KitchenSink.view.phone.Main'
    },

    isActive: function() {
        return Ext.os.is.Phone; // || Ext.os.is.Desktop;
    }
});
