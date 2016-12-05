/**
 * A data view that shows default rss feeds and allows you to add or view them.
 */
Ext.define('FeedViewer.view.entry.Detail', {
    extend: 'Ext.Panel',
    xtype: 'entrydetail',

    scrollable: true,

    bind: {
        record: '{entry}'
    },

    tpl: [
        '<div class="post-data">',
            '<span class="post-date">{publishedDate}</span>',
            '<h3 class="post-title">{title}</h3>',
            '<h4 class="post-author">{author:this.defaultValue}</h4>',
        '</div>',
        '<div class="post-body">{content}</div>',
        {
            defaultValue: function (v) {
                return v ? 'By: ' + v : '';
            }
        }
    ]
});
