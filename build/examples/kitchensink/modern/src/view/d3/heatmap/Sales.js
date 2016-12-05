/**
 * Another use of heatmap to visualize sales per employee by day.
 * This example also shows off the use of a polylinear scale, where
 * three range colors are specified and the (automatically calculated)
 * domain is split into two equal size segments that correspond to
 * color subranges. One can also specify the domain manually if segments
 * of irregular size are desired.
 */
Ext.define('KitchenSink.view.d3.heatmap.Sales', {
    extend: 'Ext.Panel',
    xtype: 'd3-view-heatmap-sales',
    controller: 'heatmap-sales',

    requires: [
        'Ext.d3.HeatMap'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'modern/src/view/d3/heatmap/SalesController.js'
        },
        {
            type: 'Store',
            path: 'modern/src/store/SalesPerEmployee.js'
        }
    ],
    //  </example>

    layout: 'vbox',
    padding: 0,

    items: [{
        xtype: 'toolbar',
        items: [{
            text: 'Refresh Data',
            handler: 'onRefreshData'
        }, {
            text: 'Refresh Data and Size',
            handler: 'onRefreshDataAndSize'
        }]
    }, {
        xtype: 'd3-heatmap',
        reference: 'heatmap',
        flex: 1,

        store: {
            type: 'salesperemployee'
        },

        padding: {
            top: 30,
            right: 30,
            bottom: 40,
            left: 80
        },

        platformConfig: {
            '!phone': {
                padding: {
                    top: 40,
                    right: 30,
                    bottom: 70,
                    left: 120
                },
                legend: {
                    docked: 'right',
                    padding: 50,
                    items: {
                        count: 10,
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

        xAxis: {
            platformConfig: {
                '!phone': {
                    title: {
                        text: 'Employee',
                        attr: {
                            'font-size': '14px'
                        }
                    }
                }
            },
            axis: {
                orient: 'bottom'
            },
            scale: {
                type: 'ordinal'
            },
            field: 'employee'
        },

        yAxis: {
            platformConfig: {
                '!phone': {
                    title: {
                        text: 'Day',
                        attr: {
                            'font-size': '14px'
                        }
                    }
                }
            },
            axis: {
                orient: 'left'
            },
            scale: {
                type: 'ordinal'
            },
            field: 'day'
        },

        colorAxis: {
            scale: {
                type: 'linear',
                range: ['#ffffd9', '#49b6c4', '#225ea8']
            },
            field: 'sales'
        },

        tiles: {
            attr: {
                'stroke': '#081d58',
                'stroke-width': 2
            }
        },

        labels: true
    }]

});
