/**
 * Shows a list of available feeds. Also has the ability to add/remove and load feeds.
 */
Ext.define('FeedViewer.view.feed.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'feedlist',
    controller: 'feedlist',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.grid.column.Action',
        'Ext.button.Button',
        'Ext.ux.grid.plugin.AutoSelector'
    ],

    layout: 'fit',
    viewModel: {
        stores: {
            feeds: {
                type: 'feeds',
                autoLoad: true
            }
        }
    },

    tbar: [{
        handler: 'onAddFeedClick',
        text: 'Add',
        iconCls: 'feed-add x-fa fa-plus'
    }, {
        handler: 'onRemoveSelectedFeedClick',
        text: 'Remove',
        iconCls: 'feed-remove x-fa fa-minus',
        bind: {
            disabled: '{!feedGrid.selection}'
        }
    }],

    items: [{
        xtype: 'grid',
        reference: 'feedGrid',
        cls: 'feed-list',
        hideHeaders: true,
        plugins: 'gridautoselector',

        selModel: {
            mode: 'SINGLE',
            listeners: {
                select: 'onFeedSelection'
            }
        },

        bind: {
            selection: '{main.currentFeed}',
            store: '{feeds}'
        },

        columns: [{
            text: 'Feed',
            dataIndex: 'title',
            flex: 1
        }, {
            xtype: 'actioncolumn',
            width: 25,
            stopSelection: true,
            items: [{
                iconCls: 'x-fa fa-trash',
                handler: 'onRemoveFeedClick'
            }]
        }]
    }]
});
