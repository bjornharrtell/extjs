Ext.define('FeedViewer.rss.model.Entry', {
    extend: 'FeedViewer.rss.model.Base',

    isRssEntry: true,

    fields: [
        'title',
        'author',
        'link',
        'categories',
        'url',
        {
            name: 'publishedDate',
            type: 'date',
            dateFormat : 'c'
        },
        'content',
        'contentSnippet'
    ]
});
