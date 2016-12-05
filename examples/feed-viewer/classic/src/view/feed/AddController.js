Ext.define('FeedViewer.view.feed.AddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedadd',

    onClose: function (button) {
        var view = this.getView();
        view[view.closeAction]();
    },

    /**
     * React to the add button being clicked.
     */
    onAddClick: function (addBtn) {
        addBtn.disable();
        var url = this.lookup('feedUrl').getValue(),
            feed = Ext.create('FeedViewer.rss.model.Feed');

        this.lookup('feedForm').setLoading({
            msg: 'Validating feed...'
        });

        feed.load({
            url: url,
            callback: 'validateFeed',
            scope: this
        });
    },

    /**
     * React to the feed validation responses
     */
    validateFeed: function (feed, operation, success) {
        var me = this,
            form = me.lookup('feedForm');

        me.lookup('addFeed').enable();
        form.setLoading(false);

        if (success) {
            me.fireViewEvent('addfeed', feed);
            me.onClose();
        } else {
            me.lookup('feedUrl').markInvalid('The URL specified is not a valid RSS2 feed.');
        }
    }
});
