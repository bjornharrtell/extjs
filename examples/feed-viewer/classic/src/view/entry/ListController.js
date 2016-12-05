Ext.define('FeedViewer.view.entry.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entrylist',

    /**
     * @event cycleregion
     * @param {FeedViewer.view.main.FeedGrid} sender
     * @param {"hidden"/"right"/"bottom"} region
     */

    onRegionCycleChange: function (button) {
        this.fireViewEvent('cycleregion', button.activeItem.cycleRegion);
    },

    /**
     * @param {Ext.button.Button} button The button
     * @param {Boolean} pressed button pressed state
     */
    onSummaryToggle: function (button, pressed) {
        this.getView().getView().getPlugin('preview').toggleExpanded(pressed);
    },

    /**
     * Reacts to a double click
     * @param {Object} view The view
     * @param {Object} record The row index
     */
    onRowDblClick: function (view, record, node, index, e) {
        this.fireEvent('feeditemdblclick', this.getView(), record);
    },

    /**
     * Title renderer.
     */
    formatTitle: function (value, p, record) {
        var author;

        return Ext.String.format(
            '<div class="topic"><b>{0}</b><span class="author">{1}</span></div>',
            value,
            (author = record.get('author')) ? ' by: ' + author : ''
        );
    },

    /**
     * Date renderer.
     */
    formatDate: function (date) {
        if (Ext.isDate(date)) {
            return '';
        }

        var now = new Date(), d = Ext.Date.clearTime(now, true), notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    },

    onReconfigure: function (entries) {
        var store = entries.getStore();

        if (store.getCount()) {
            entries.getSelectionModel().select(0);
        }
    }
});
