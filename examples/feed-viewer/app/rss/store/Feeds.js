Ext.define('FeedViewer.rss.store.Feeds', {
    extend: 'Ext.data.Store',
    alias: 'store.feeds',

    model: 'FeedViewer.rss.model.Feed',

    data: [
        {
            id: 1,
            title: "Sencha",
            feedUrl: "http://feeds.feedburner.com/sencha"
        },
        {
            id: 2,
            title: "Yahoo News - Latest News & Headlines",
            feedUrl: "http://news.yahoo.com/rss/"
        },
        {
            id: 3,
            title: "Technology - Google News",
            feedUrl: "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=tc&output=rss"
        },
        {
            id: 4,
            title: "Business - Google News",
            feedUrl: "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=b&output=rss"
        }
    ]
});
