Ext.define('KitchenSink.Application', {
    extend: 'Ext.app.Application',
    namespace: 'KitchenSink',

    requires: [
        'Ext.app.*',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',
        'KitchenSink.*',
        'Ext.chart.*',
        'Ext.d3.*'
    ],

    controllers: [
        'Global',
        'Samples',
        'Direct'
    ],

    init: function() {
        if ('nocss3' in Ext.Object.fromQueryString(location.search)) {
            Ext.supports.CSS3BorderRadius = false;
            Ext.getBody().addCls('x-nbr x-nlg');
        }

        Ext.create('KitchenSink.store.Navigation', {
            storeId: 'navigation'
        });

        // Set the default route to start the application.
        this.setDefaultToken('all');

        Ext.setGlyphFontFamily('Pictos');
        Ext.tip.QuickTipManager.init();
        
        if (!Ext.platformTags.test) {
            Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        }
    },

    launch: function () {
        var view = 'KitchenSink.view.main.Main';
        if (/[?&]solo\b/.test(location.search)) {
            view = 'KitchenSink.view.main.Solo'
        }
        this.setMainView({
            xclass: view
        });
    }
}, function() {
    KitchenSink.toast = function (title) {
        var html = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));

        if (!html) {
            html = title;
            title = null;
        }

        new Ext.window.Toast({
            title: title,
            html: html,
            width: 400,
            align: 't'
        }).show();
    };
});
