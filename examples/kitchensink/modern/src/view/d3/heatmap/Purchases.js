/**
 * The 'd3-heatmap' component is great for visualizing matrices
 * where the individual values are represented as colors.
 * This particual example shows how many customers spent a given amount of money on each day
 * during the week. The example also showcases the use of tooltips to show extra info.
 */
Ext.define('KitchenSink.view.d3.heatmap.Purchases', {
    extend: 'Ext.Panel',
    xtype: 'd3-view-heatmap-purchases',

    requires: [
        'Ext.d3.HeatMap'
    ],

    controller: 'heatmap-heatmap',

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'modern/src/view/d3/heatmap/PurchasesController.js'
        },
        {
            type: 'Store',
            path: 'modern/src/store/HeatMap.js'
        }
    ],
    //  </example>

    layout: 'fit',
    shadow: true,
    items: {
        xtype: 'd3-heatmap',
        store: {
            type: 'heatmap'
        },

        platformConfig: {
            desktop: {
                labels: true,
                padding: {
                    top: 20,
                    right: 30,
                    bottom: 20,
                    left: 80
                },
                legend: {
                    docked: 'bottom',
                    padding: 60,
                    items: {
                        count: 7,
                        slice: [1],
                        reverse: true,
                        size: {
                            x: 60,
                            y: 30
                        }
                    }
                }
            }
        },

        padding: {
            top: 20,
            right: 30,
            bottom: 30,
            left: 50
        },

        xAxis: {
            platformConfig: {
                desktop: {
                    title: {
                        text: 'Date'
                    }
                }
            },
            axis: {
                ticks: 'd3.time.days',
                tickFormat: "d3.time.format('%b %d')",
                orient: 'bottom'
            },
            scale: {
                type: 'time'
            },
            field: 'date',
            step: 24 * 60 * 60 * 1000
        },

        yAxis: {
            platformConfig: {
                desktop: {
                    title: {
                        text: 'Total'
                    }
                }
            },
            axis: {
                orient: 'left',
                tickFormat: "d3.format('$ %d')"
            },
            scale: {
                type: 'linear'
            },
            field: 'bucket',
            step: 100
        },

        colorAxis: {
            scale: {
                type: 'linear',
                range: ['white', 'green']
            },
            field: 'count',
            minimum: 0
        },

        tiles: {
            attr: {
                'stroke': 'green',
                'stroke-width': 1
            }
        },

        labels: {
            attr: {
                'font-size': '10px'
            }
        },

        tooltip: {
            renderer: 'onTooltip'
        }
    }

});
