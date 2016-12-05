Ext.define('FeedViewer.view.feed.ListController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlist',

    requires: [
        'Ext.fx.Anim'
    ],

    /**
     * Add a feed to the store.
     * @param {FeedViewer.rss.model.Feed} feed The feed.
     */
    addFeed: function (feed) {
        var feedGrid = this.lookup('feedGrid'),
            store = feedGrid.getStore();

        store.add(feed);
    },

    /**
     * Returns the selected feed or null if nothing is selected.
     * @return {FeedViewer.rss.model.Feed}
     */
    getSelectedItem: function () {
        var feedGrid = this.lookup('feedGrid'),
            selection = feedGrid.getSelection();

        return selection ? selection[0] : null;
    },

    /**
     * React to feed selection.
     */
    onFeedSelection: function (selModel) {
        var feed = this.getSelectedItem();

        if (feed) {
            feed.populateEntries();
        }

        // Fire a controller event to allow the tabController to setActiveTab
        this.fireEvent('feedselect', this, feed);
    },

    /**
     * React to a feed being removed via the toolbar remove button
     */
    onRemoveSelectedFeedClick: function() {
        var me = this,
            selected = this.getSelectedItem();

        if (selected) {
            me.doRemoveFeed(selected);
        }    
    },

    /**
     * React to a feed being removed via the delete icon in the grid
     */
    onRemoveFeedClick: function (view, recordIndex, cellIndex, item, e, record, row) {
        this.doRemoveFeed(record);
    },

    /**
     * React to a feed attempting to be added
     */
    onAddFeedClick: function () {
        var me = this;

        Ext.create({
            xtype: 'feedadd',
            autoShow: true,
            closeAction: 'destroy',

            listeners: {
                addfeed: function (feedAdd, feed) {
                    var feedGrid = me.lookup('feedGrid');

                    me.addFeed(feed); 
                    me.animateNode(feedGrid.getView().getNode(feed), 0, 1);
                    me.fireViewEvent('feedadd', feed);
                }
            }
        });
    },

    /**
     * Animate a node in the view when it is added/removed
     * @param {Mixed} el The element to animate
     * @param {Number} start The start opacity
     * @param {Number} end The end opacity
     * @param {Object} listeners (optional) Any listeners
     */
    animateNode: function (el, start, end, listeners) {
        Ext.create({
            xclass: 'Ext.fx.Anim',
            target: Ext.getDom(el),
            duration: 500,
            from: {
                opacity: start
            },
            to: {
                opacity: end
            },
            listeners: listeners
        });
    },

    privates: {
        doRemoveFeed: function(record) {
            var view = this.lookup('feedGrid').getView();
            this.animateNode(view.getNode(record), 1, 0, {
                afteranimate: function() {
                    record.drop();
                }
            });

            this.fireViewEvent('feedremove', record);
        }
    }
});
