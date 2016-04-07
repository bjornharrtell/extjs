Ext.define('KitchenSink.view.navigation.Breadcrumb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'navigation-toolbar',
    reference: 'navigation-toolbar',
    
    items: [{
        xtype: 'tool',
        type: 'down',
        tooltip: 'Switch to Tree View',
        listeners: {
            click: 'showTreeNav'
        }
    }, {
        xtype: 'breadcrumb',
        id: 'navigation-breadcrumb',
        reference: 'breadcrumb',
        bind: {
            selection: '{selectedView}'
        },
        flex: 1,
        // hide glyphs on the buttons (too busy)
        showIcons: false,
        store: 'navigation'
    }]
});
