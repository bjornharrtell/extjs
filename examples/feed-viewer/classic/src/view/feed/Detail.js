/**
 * Shows the details of a particular feed.
 */
Ext.define('FeedViewer.view.feed.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'feeddetail',
    controller: 'feeddetail',

    requires : [
        'Ext.button.Cycle',
        'Ext.app.ViewModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        // In the future we may want to add the capability to view
        // a detail in a tab, so we may want to have independent 
        // viewmodels.
        data: {
            feed: null
        }
    },

    renderConfig: {
        feed: null
    },

    layout: 'border',
    iconCls: 'x-fa fa-rss',

    tabConfig: {
        cls: 'tab-feed-details'
    },

    bind: {
        title: '{feed.title:or("Loading...")}'
    },

    defaults: {
        border: false
    },

    items:[{
        xtype: 'entrylist',
        region: 'center',
        reference: 'entries',
        bind: {
            store: '{feed.entries}'
        },
        minHeight: 200,
        minWidth: 200,
        split: true,

        // The feedGrid fires this view event when the cycle button changes state.
        listeners: {
            cycleregion: 'onCycleRegion',
            itemdblclick: 'onItemDblClick'
        }
    },
    {
        xtype: 'entrydetail',
        reference: 'entryDetail',
        split: true,
        bind: {
            record: '{entries.selection}'
        },

        // Keep the cycle button in sync with the region/hidden state.
        listeners: {
            changeregion: 'syncRegionCycler',
            hide: 'syncRegionCycler',
            show: 'syncRegionCycler',
            boxready: 'syncRegionCycler',
            buffer: 10
        },

        responsiveConfig: {
             tall: {
                 region: 'south',
                 height: '50%',
                 width: null,
                 minHeight: 200
             },

             wide: {
                 region: 'east',
                 width: '50%',
                 height: null,
                 minHeight: null,
                 minWidth: 200
             }
        }
    }],

    updateFeed: function (feed) {
        this.getViewModel().set('feed', feed);
    }
});
