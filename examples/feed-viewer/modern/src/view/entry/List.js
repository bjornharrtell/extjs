/**
 * A data view that shows items from an RSS list.
 */
Ext.define('FeedViewer.view.entry.List', {
    extend: 'Ext.dataview.List',
    xtype: 'entrylist',

    cls: 'entry-list',

    itemTpl: '{title}',

    bind: '{feed.entries}',

    listeners: {
        select: 'onEntrySelect',
        disclose: 'onEntrySelect'
    }
});
