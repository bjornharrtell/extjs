/**
 * A container class for showing a series of feed details.
 */
Ext.define('FeedViewer.view.tabs.Tabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'feedtabs',
    controller: 'feedtabs',

    requires: [
        'Ext.ux.TabCloseMenu'
    ],

    maxTabWidth: 250,
    border: false,

    plugins: [
        'tabclosemenu'
    ],

    defaults: {
        border: false
    },

    tabBar: {
        border: true
    },

    items: [{
        xtype: 'feeddetail',
        closable: false,
        bind: {
            feed: '{main.currentFeed}'
        },
        listeners: {
            entrydblclick: 'onEntryDblClick'
        }
    }]
});
