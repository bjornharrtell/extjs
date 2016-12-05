Ext.define('FeedViewer.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onFeedDisclose: function(view, feed) {
        if (this.isEditing) {
            view.getStore().remove(feed);
        } else {
            this.onFeedSelect(view, feed);
        }
    },

    /**
     * React to selection of a feed, load the items.
     */
    onFeedSelect: function (view, feed) {
        feed.populateEntries();
        this.getViewModel().set('feed', feed);

        this.getView().push({
            xtype: 'entrylist',
            title: feed.get('title')
        });

        view.deselectAll();
    },

    /**
     * React to selection of an entry, load the detail.
     */
    onEntrySelect: function (view, entry) {
        this.getViewModel().set('entry', entry);

        this.getView().push({
            xtype: 'entrydetail',
            title: entry.get('title')
        });

        view.deselectAll();
    },

    /**
     * React to the new form save button being clicked.
     */
    onSaveClick: function () {
        var me = this,
            url = me.lookup('form').getValues().feedUrl,
            feed = new FeedViewer.rss.model.Feed({
                feedUrl: url
            });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });

        feed.populateEntries(function(success) {
            Ext.Viewport.setMasked(false);
            if (success) {
                me.getView().pop();
                // Toggle editing off
                me.lookup('editFeed').setPressed(false);
                me.lookup('feedList').getStore().add(feed);
            }
        });
    },

    /**
     * React to new button to open form.
     */
    onNewFeed: function () {
        this.getView().push({
            xtype: 'feedform'
        });
    },

    /**
     * React to edit feed list
     */
    onEditFeedChange: function () {
        this.isEditing = editing = !this.isEditing;

        this.lookup('newFeed').setHidden(!editing);
        this.lookup('feedList').setEditing(editing);
    }
});
