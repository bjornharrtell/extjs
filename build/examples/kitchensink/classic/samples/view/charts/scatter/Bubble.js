/**
 * Demonstrates how to make a bubble chart using Ext.chart.series.Scatter
 *
 * Bubble charts, similarly to Line charts, allow to visualize the evolution of a
 * parameter over time or the ratio between any two parameters, but in addition they
 * can also display intrinsic values of these parameters by assigning them to the
 * diameter or the color of the bubbles.
 */
Ext.define('KitchenSink.view.charts.scatter.Bubble', {
    extend: 'Ext.Panel',
    xtype: 'scatter-bubble',
    controller: 'scatter-bubble',
    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/scatter/BubbleController.js'
    }],
    // </example>

    requires: [
        'Ext.draw.Color',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Scatter',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.*'
    ],

    layout: 'fit',
    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: 'onRefresh'
        },
        {
            text: 'Drop all bubbles',
            handler: 'onDropBubble'
        }
    ],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        background: '#242021',

        width: '100%',
        height: 500,
        insetPadding: 20,

        store: {
            fields: [ 'x', 'g1', 'g2', 'g3', 'g4', 'g5' ]
        },

        interactions: {
            type: 'itemedit',
            tooltip: {
                renderer: 'onEditTipRender'
            }
        },

        series: {
            type: 'scatter',
            xField: 'x',
            yField: 'g2',
            highlightCfg: {
                scale: 1.3
            },
            marker: {
                type: 'circle',
                radius: 5,
                fillStyle: 'rgb(203,143,203)',
                miterLimit: 1,
                lineCap: 'butt',
                lineWidth: 1,
                fx: {
                    duration: 200
                }
            },
            style: {
                renderer: 'onItemRender'
            }
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: 'g2',
            minimum: 0,
            style: {
                majorTickSize: 10,
                lineWidth: 3,
                stroke: '#888',
                estStepSize: 50
            },
            label: {
                color: '#888',
                fontFamily: 'Chalkboard, sans-serif',
                fontSize: 20
            },
            grid: {
                stroke: '#444',
                odd: {
                    fill: '#333'
                }
            }
        }, {
            type: 'numeric',
            position: 'bottom',
            fields: 'x',
            minimum: 0,
            maximum: 50,
            style: {
                majorTickSize: 10,
                lineWidth: 3,
                stroke: '#888',
                estStepSize: 100
            },
            label: {
                color: '#888',
                fontFamily: 'Chalkboard, sans-serif',
                fontSize: 20
            },
            grid: {
                stroke: '#444'
            }
        }],

        listeners: {
            afterrender: 'onAfterRender'
        }
    }]
});
