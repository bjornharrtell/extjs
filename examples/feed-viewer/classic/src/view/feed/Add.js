/**
 * Shows a dialog for creating and validating a new feed.
 */
Ext.define('FeedViewer.view.feed.Add', {
    extend: 'Ext.window.Window',
    xtype: 'feedadd',
    controller: 'feedadd',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],

    plain: true,
    resizable: false,
    modal: true,
    defaultFocus: 'form',
    defaultButton: 'addFeed',

    width: 500,
    title: 'Add Feed',
    iconCls: 'feed',
    layout: 'fit',

    items : [
        {
            xtype: 'form',
            bodyPadding: '12 10 10',
            reference: 'feedForm',
            border: false,
            unstyled: true,
            defaultFocus: 'combo',
            defaultButton: 'addFeed',

            items: [{
                xtype: 'combo',
                anchor: '100%',
                reference: 'feedUrl',
                emptyText: 'Select or enter the URL of the feed to add',
                labelAlign: 'top',
                msgTarget: 'under',
                valueField: 'field1',
                allowBlank: false,
                store: [
                    ['http://rssfeeds.usatoday.com/usatoday-NewsTopStories', 'USA Today Top Stories'],
                    ['http://sports.espn.go.com/espn/rss/news', 'ESPN Top News'],
                    ['http://news.google.com/news?ned=us&topic=t&output=rss', 'Sci/Tech - Google News'],
                    ['http://rss.news.yahoo.com/rss/software', 'Yahoo Software News']
                ],
                getInnerTpl: function () {
                    return '<div class="feed-picker-url">{field1}</div><div class="feed-picker-title">{field2}</div>';
                }
            }],

            bbar: [
                {
                    xtype: 'button',
                    text: 'Add Feed',
                    reference: 'addFeed',
                    formBind: true,
                    handler: 'onAddClick'
                }, {
                    xtype: 'button',
                    text: 'Cancel',
                    handler: 'onClose'
                }
            ]
        }
    ]
});
