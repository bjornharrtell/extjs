Ext.define('KitchenSink.view.grid.PagingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.paging-grid',

    topicFmt:
        '<b><a href="http://sencha.com/forum/showthread.php?t={2}" target="_blank">{0}</a></b> ' +
        '<a href="http://sencha.com/forum/forumdisplay.php?f={3}" target="_blank">{1} Forum</a>',

    onToggleExpanded: function (btn, pressed) {
        var view = this.getView(),
            plugin = view.findPlugin('preview'),
            vm = this.getViewModel();

        plugin.toggleExpanded(pressed);
        vm.set({
            expanded: pressed
        });
    },

    renderTopic: function (value, p, record) {
        return Ext.String.format(this.topicFmt,
            value, record.get('forumtitle'), record.getId(), record.get('forumid'));
    },

    renderLast: function (value, p, model) {
        return Ext.String.format('{0}<br/>by {1}',
            Ext.Date.dateFormat(value, 'M j, Y, g:i a'), model.get('lastposter'));
    }
});
