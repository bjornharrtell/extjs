Ext.define('FeedViewer.view.tabs.TabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedtabs',

    listen: {
        controller: {
            feedlist: {
                feedselect: 'onFeedSelect'
            }
        },

        // These listeners "reach into" the sub-views to listen to their
        // toolbar buttons.
        component: {
            'feeddetail entrydetail button[action=openInTab]': {
                click: 'onEntryInTab'
            },
            'feeddetail button[action=openAll]': {
                click: 'onOpenAll'
            }
        }
    },

    /**
     * Reacts to a feed being selected.
     */
    onFeedSelect: function (controller, feed) {
        var feedDetails = this.getView().setActiveTab(0);
        feedDetails.setFeed(feed);
    },

    /**
    * This method inserts rss news items into the TabPanel (if not already present)
    * and sets the active tab to the first item processed or duplicated
    * @param {FeedViewer.rss.model.Entry/FeedViewer.rss.model.Entry[]} entries
    */
    entryToTab: function (entries) {
        var items = [],
            parent = this.getView(),
            duplicate;

        if (!parent) {
            return;
        }

        Ext.each(Ext.Array.from(entries), function (entry) {
            var title = entry.get('title'),
                link = entry.get('link'),
                item = parent.child('entrydetail[link="' + link + '"]');

            if (!item) {
                items.push({
                    xtype: 'entrydetail',
                    title: title,
                    link: link,
                    closable: true,
                    record: entry,
                    viewModel: {
                        data: {
                            inTab: true
                        }
                    }
                });
            } else {
               duplicate = duplicate || item;
            }
        });

        Ext.suspendLayouts();

        if (items.length) {
            items = parent.insert(1, items);
        }
        
        parent.setActiveTab(items[0] || duplicate);

        Ext.resumeLayouts(true);
    },

    /**
     * Opens all unique RSS Feed items available in the grid into tabs
     * @param {Ext.button.Button} button
     */
    onOpenAll: function (button) {
        this.entryToTab(
            this.getView().down('entrylist').getStore().getRange()
        );
    },

    /**
     * Loads the currently selected RSS Feed Item into a unique tab
     * @param button
     */
    onEntryInTab: function(button) {
        var entry = button.up('entrydetail');
        this.entryToTab(entry.getRecord());
    },

    /**
     * React to an entry dbl click
     */
    onEntryDblClick: function(view, entry) {
        this.entryToTab(entry);
    }
});
