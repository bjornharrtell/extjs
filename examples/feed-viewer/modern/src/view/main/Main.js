/**
 * The main FeedViewer view.
 */
Ext.define('FeedViewer.view.main.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',

    requires : [
        'Ext.Toolbar',
        'Ext.app.ViewModel'
    ],

    useTitleForBackButtonText: true,
    viewModel: {},
    controller: 'main',

    navigationBar: {
        ui: 'dark',
        docked: 'top'
    },

    items: [{
        xtype: 'feedlist',
        reference: 'feedList',
        title: 'Feeds',
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                iconCls: 'x-fa fa-pencil',
                reference: 'editFeed',
                enableToggle: true,
                listeners: {
                    pressedchange: 'onEditFeedChange'
                }
            }, {
                xtype: 'component',
                flex: 1
            }, {
                iconCls: 'x-fa fa-plus-square',
                hidden: true,
                reference: 'newFeed',
                handler: 'onNewFeed'
            }]
        }]
    }]
});
