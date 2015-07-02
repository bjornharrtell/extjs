/**
 * Demonstrates using YQL to fetch data from remote sources (in this case loading from the Sencha blog)
 */

Ext.require('Ext.data.JsonP', function() {
    Ext.YQL = {
        useAllPublicTables: true,
        yqlUrl: 'http://query.yahooapis.com/v1/public/yql',
        request: function(cfg) {
            var p = cfg.params || {};
            p.q = cfg.query;
            p.format = 'json';
            if (this.useAllPublicTables) {
                p.env = 'store://datatables.org/alltableswithkeys';
            }

            Ext.data.JsonP.request({
                url: this.yqlUrl,
                callbackKey: 'callback',
                params: p,
                callback: cfg.callback,
                scope: cfg.scope || window
            });
        }
    };

    Ext.define('KitchenSink.view.YQL', {
        extend: 'Ext.Container',
        config: {
            scrollable: true,
            items: [
                {
                    xtype: 'panel',
                    id   : 'YQL',
                    styleHtmlContent: true
                },
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    items: [{
                        text: 'Load using YQL',
                        handler: function() {
                            var panel = Ext.getCmp('YQL'),
                                tpl = new Ext.XTemplate([
                                    '<tpl for="item">',
                                        '<div class="blog-post">',
                                            '<h3><a href="{link}" target="_blank">{title}</a></h3>',
                                            '<p>{description}</p>',
                                        '</div>',
                                    '</tpl>'
                                ]);

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

                            Ext.YQL.request({
                                query: "select * from rss where url='http://feeds.feedburner.com/sencha' limit 5",
                                callback: function(success, response) {
                                    if (success && response.query && response.query.results) {
                                        panel.setHtml(tpl.apply(response.query.results));
                                    }
                                    else {
                                        Ext.Msg.alert('Error', 'There was an error retrieving the YQL request.', Ext.emptyFn);
                                    }

                                    panel.getParent().unmask();
                                }
                            });
                        }
                    }
                ]
            }]
        }
    });
});
