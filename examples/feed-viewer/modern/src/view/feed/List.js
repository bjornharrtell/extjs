/**
 * A data view that shows default rss feeds and allows you to add or view them.
 */
Ext.define('FeedViewer.view.feed.List', {
    extend: 'Ext.dataview.List',
    xtype: 'feedlist',

    config: {
        editing: false
    },

    cls: 'feed-list',
    onItemDisclosure : true,

    itemTpl: '{title}',

    store: {
        type: 'feeds'
    },

    listeners: {
        select: 'onFeedSelect',
        disclose: 'onFeedDisclose'
    },

    updateEditing: function(editing) {
        this.toggleCls('feed-list-editing', editing);
    }
});
