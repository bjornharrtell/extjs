/**
 * This example shows how to create a line chart with images as markers. Line charts allow
 * to visualize the evolution of a value over time, or the ratio between any two values.
 */
Ext.define('KitchenSink.view.charts.line.ImageMarkers', {
    extend: 'Ext.panel.Panel',
    xtype: 'line-markers',
    controller: 'line-markers',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/line/ImageMarkersController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Pie.js'
    }],
    // </example>

    layout: 'fit',

    width: 650,

    tbar: {
        reference: 'toolbar',
        items: [
            '->',
            {
                text: 'Refresh',
                handler: 'onRefresh'
            },
            {
                text: 'Switch Theme',
                handler: 'onThemeSwitch'
            },
            {
                text: 'Reset pan/zoom',
                handler: 'onPanZoomReset'
            }
        ]
    },

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        height: 500,
        store: {
            type: 'pie'
        },
        interactions: [
            'panzoom',
            'itemhighlight'
        ],
        legend: {
            position: 'bottom'
        },
        series: [
            {
                type: 'line',
                xField: 'name',
                yField: 'g1',
                fill: true,
                style: {
                    smooth: true,
                    miterLimit: 3,
                    lineCap: 'miter',
                    strokeOpacity: 1,
                    fillOpacity: 0.7,
                    lineWidth: 8
                },
                title: 'Square',
                highlight: {
                    scale: 0.9
                },
                marker: {
                    type: 'image',
                    src: 'classic/resources/images/square.png',
                    width: 48,
                    height: 48,
                    x: -24,
                    y: -24,
                    scale: 0.7,
                    fx: {
                        duration: 200
                    }
                }
            },
            {
                type: 'line',
                xField: 'name',
                yField: 'g2',
                style: {
                    opacity: 0.7,
                    lineWidth: 8
                },
                title: 'Circle',
                highlight: {
                    scale: 0.9
                },
                marker: {
                    type: 'image',
                    src: 'classic/resources/images/circle.png',
                    width: 48,
                    height: 48,
                    x: -24,
                    y: -24,
                    scale: 0.7,
                    fx: {
                        duration: 200
                    }
                }
            },
            {
                type: 'line',
                xField: 'name',
                yField: 'g3',
                style: {
                    opacity: 0.7,
                    lineWidth: 8
                },
                title: 'Pentagon',
                highlight: {
                    scale: 0.9
                },
                marker: {
                    type: 'image',
                    src: 'classic/resources/images/pentagon.png',
                    width: 48,
                    height: 48,
                    x: -24,
                    y: -24,
                    scale: 0.7,
                    fx: {
                        duration: 200
                    }
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1', 'g2', 'g3'],
                minimum: 0,
                listeners: {
                    rangechange: 'onAxisRangeChange'
                }
            },
            {
                type: 'category',
                position: 'bottom',
                visibleRange: [0, 0.75],
                fields: 'name'
            }
        ]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
