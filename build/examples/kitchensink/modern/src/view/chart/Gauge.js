/**
 * Demonstrates how to use Ext.chart.series.Gauge
 */
Ext.define('KitchenSink.view.chart.Gauge', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Gauge'
    ],

    layout: 'fit',
    items: [{
        xtype: 'toolbar',
        docked: 'top',
        cls: 'charttoolbar',
        items: [{
            xtype: 'spacer'
        }, {
            iconCls: 'x-fa fa-refresh',
            text: 'Refresh',
            handler: function() {
                Ext.getStore('Pie').generateData(1);
            }
        }]
    }, {
        layout: 'vbox',
        items: [{
            layout: 'hbox',
            flex: 1,
            items: [{
                xtype: 'polar',
                insetPadding: 20,
                flex: 1,
                store: 'Pie',
                animate: {
                    easing: 'elasticIn',
                    duration: 1000
                },
                series: [{
                    type: 'gauge',
                    angleField: 'g1',
                    minimum: 100,
                    maximum: 800,
                    donut: 30,
                    colors: ["#115fa6", "lightgrey"]
                }]
            }]
        }, {
            layout: 'hbox',
            flex: 1,
            items: [{
                xtype: 'polar',
                innerPadding: 20,
                flex: 1,
                store: 'Pie',
                series: [{
                    type: 'gauge',
                    angleField: 'g1',
                    donut: 30,
                    value: 60,
                    minimum: 100,
                    maximum: 800,
                    needle: true,
                    needleLength: 95,
                    needleWidth: 8,
                    totalAngle: Math.PI,
                    label: {
                        fontSize: 12,
                        fontWeight: 'bold'
                    },
                    colors: ['maroon', 'blue', 'lightgray', 'red'],
                    sectors: [{
                        end: 300,
                        label: 'Cold',
                        color: 'dodgerblue'
                    }, {
                        end: 300,
                        style: {
                            strokeStyle: 'black',
                            strokeOpacity: 1,
                            lineWidth: 4
                        }
                    }, {
                        end: 600,
                        label: 'Temp.',
                        color: 'lightgray'
                    }, {
                        end: 600,
                        style: {
                            strokeStyle: 'black',
                            strokeOpacity: 1,
                            lineWidth: 4
                        }
                    }, {
                        end: 800,
                        label: 'Hot',
                        color: 'tomato'
                    }, {
                        start: 0,
                        style: {
                            strokeStyle: 'gray',
                            strokeOpacity: 1,
                            lineWidth: 4,
                            fillOpacity: 0
                        }
                    }],
                    renderer: function(sprite, config, rendererData, spriteIndex) {
                        var surface = sprite.getParent(),
                            chart = rendererData.series.getChart(),
                            mainRect = chart.getMainRect(),
                            width = mainRect[2],
                            height = mainRect[3],
                            bigChart = (width >= 250 && height >= 150),
                            changes, fontSize;
                        // This renderer function draws the "Temp." label in big white letters,
                        // the "Cold" label in blue, and the "Hot" label in red.
                        if (config.type == "label") {
                            changes = {
                                x: config.x + 10,
                                y: config.y + 10
                            };
                            if (spriteIndex == 3) {
                                Ext.apply(changes, {
                                    fontSize: (bigChart ? 32 : 16),
                                    strokeStyle: 'black'
                                });
                            } else {
                                Ext.apply(changes, {
                                    fontSize: (bigChart ? 24 : 12)
                                });
                            }
                            switch (spriteIndex) {
                                case 1:
                                    Ext.apply(changes, {
                                        color: 'blue'
                                    });
                                    break;
                                case 3:
                                    Ext.apply(changes, {
                                        color: 'white'
                                    });
                                    break;
                                case 5:
                                    Ext.apply(changes, {
                                        color: 'darkred'
                                    });
                                    break;
                            }
                            return changes;
                        }
                    }
                }]
            }]
        }]
    }],

    initialize: function() {
        this.callParent();
        Ext.getStore('Pie').generateData(9);
    }
});