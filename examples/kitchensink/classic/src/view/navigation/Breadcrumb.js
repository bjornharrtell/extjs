Ext.define('KitchenSink.view.navigation.Breadcrumb', {
    extend: 'Ext.toolbar.Breadcrumb',
    xtype: 'navigation-toolbar',
    id: 'navigation-toolbar',
    reference: 'navigation-toolbar',
    baseCls: Ext.baseCSSPrefix + 'toolbar',

    keyMap: {
        "ALT+N": 'showTreeNav',
        scope: 'controller'
    },

    bind: {
        selection: '{selectedView}'
    },
    flex: 1,
    // hide glyphs on the buttons (too busy)
    showIcons: false,
    store: 'navigation',
    items: [{
        xtype: 'tool',
        type: 'down',
        margin: '3 3 3 3',
        tooltip: 'Switch to Tree View \u2325N',
        listeners: {
            click: 'showTreeNav'
        }
    }]
});
