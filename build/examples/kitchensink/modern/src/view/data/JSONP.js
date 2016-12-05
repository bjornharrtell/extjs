/**
 * Demonstrates how to issue JSON-P request to fetch weather data from a web API
 */
Ext.define('KitchenSink.view.data.JSONP', {
    extend: 'Ext.Container',

    scrollable: true,
    shadow: true,
    cls: 'demo-solid-background',
    items: [{
        xtype: 'panel',
        id: 'JSONP'
    }, {
        docked: 'top',
        xtype: 'toolbar',
        items: [{
            text: 'Load using JSON-P',
            handler: function() {
                var panel = Ext.getCmp('JSONP'),
                    tpl = new Ext.XTemplate([
                        '<div class="demo-weather">',
                        '<tpl for=".">',
                        '<div class="day">',
                        '<div class="date">{date}</div>',
                        '<tpl for="weatherIconUrl">',
                        '<img src="{value}">',
                        '</tpl>',
                        '<span class="temp">{tempMaxF}&deg;<span class="temp_low">{tempMinF}&deg;</span></span>',
                        '</div>',
                        '</tpl>',
                        '</div>'
                    ]);

                    panel.getParent().setMasked({
                        xtype: 'loadmask',
                        message: 'Loading...'
                    });

                    Ext.data.JsonP.request({
                        url: 'http://api.worldweatheronline.com/free/v1/weather.ashx',
                        callbackKey: 'callback',
                        params: {
                            key: 'qfj4gk3t4u5u3bqc8atf69fn',
                            q: '94301', // Palo Alto
                            format: 'json',
                            num_of_days: 5
                        },

                        callback: function(success, result) {
                            var weather = result.data.weather;

                            if (weather) {
                                panel.updateHtml(tpl.applyTemplate(weather));
                            }
                            else {
                                alert('There was an error retrieving the weather.');
                            }

                            panel.getParent().unmask();
                        }
                    });
            }
        }]
    }]
});
