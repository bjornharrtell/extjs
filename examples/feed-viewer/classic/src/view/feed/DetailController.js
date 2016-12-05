Ext.define('FeedViewer.view.feed.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feeddetail',

    /**
     * This method is called when the cycle button in the feedGrid is clicked.
     */
    onCycleRegion: function (sender, region) {
        var view = this.getView(),
            entry = this.lookup('entryDetail'),
            config;

        switch (region) {
            case 'south':
                config = {
                     region: region,
                     minHeight: 250,
                     minWidth: null,
                     height: '50%',
                     hidden: false,
                     width: null
                };
                break;

            case 'east':
                config = {
                    region: region,
                    minHeight: null,
                    minWidth: 250,
                    height: null,
                    hidden: false,
                    width: '50%'
                };
                break;

            default:
                config = {
                    hidden: true
                };
        }

        view.suspendLayouts();
        entry.setConfig(config);
        view.resumeLayouts({ root: true });
    },

    /**
     * This method is called when the preview region changes. This can
     * happen due to responsive updates or clicking the cycle button or just after
     * we layout for the first time. In the case where the region changes due to
     * clicking the cycle button, this logic to keep its state in sync is not needed
     * but it is also not worth trying to determine if that is cause. The menu item
     * will already be checked and setCheck will have nothing to do.
     */
    syncRegionCycler: function (panel) {
        var region = 'hidden',
            entries = this.lookup('entries'),
            cycler = entries.lookup('regionCycler'),
            cycleMenu = cycler.getMenu(),
            item;

        if (!panel.hidden) {
            region = panel.region;
        }

        item = cycleMenu.child('menuitem[cycleRegion=' + region + ']');
        item.setChecked(true);
    },

    onItemDblClick: function(view, record) {
        this.fireViewEvent('entrydblclick', record);
    }
});
