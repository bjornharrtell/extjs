Ext.define('FeedViewer.rss.model.Feed', {
    extend: 'FeedViewer.rss.model.Base',

    requires: [
        'FeedViewer.rss.model.Entry'
    ],

    fields: [
        'title', 'author', 'link', 'description', 'feedUrl', 'type'
    ],

    hasMany: {
        model: 'FeedViewer.rss.model.Entry',
        name: 'entries'
    },

    proxy: {
        type: 'googglerss'
    },

    populateEntries: function(callback) {
        var me = this;

        if (me.loaded) {
            return;
        }

        // Start loading the feed's entries
        me.load({
            url: me.get('feedUrl'),
            limit: 10,
            callback: function (record, operation, success) {
                me.loaded = success;
                if (callback) {
                    callback(success);
                }
            }
        });
    }
});
