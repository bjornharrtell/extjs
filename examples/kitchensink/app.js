
//@require @packageOverrides

if (Ext.repoDevMode) {
    document.write('<link rel="stylesheet" type="text/css" href="../build/KitchenSink/ext-theme-' +
        Ext.themeName + '/resources/KitchenSink-all.css"/>');
}

Ext.application({

    name: 'KitchenSink',

    requires: [
        'KitchenSink.DummyText',
        'KitchenSink.data.DataSets',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager'
    ],

    controllers: [
        'Main'
    ],

    autoCreateViewport: true,

    init: function() {
        Ext.setGlyphFontFamily('Pictos');
        Ext.tip.QuickTipManager.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    }
});
