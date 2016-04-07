/**
 * This example shows how to create a line chart with a renderer function that changes the
 * stroke and fill colors when the line goes down.
 *
 * Line charts allow to visualize the evolution of a value over time, or the ratio between
 * any two values.
 */
Ext.define('KitchenSink.view.charts.line.Renderer', {
    extend: 'Ext.panel.Panel',
    xtype: 'line-renderer',
    controller: 'line-renderer',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',

    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: 'onRefresh'
        }
    ],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        store: {
            type: 'pie'
        },
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        series: [
            {
                type: 'line',
                xField: 'name',
                yField: 'g1',
                fill: true,
                smooth: true,
                style: {
                    lineWidth: 4
                },
                marker: {
                    type: 'circle',
                    radius: 10,
                    lineWidth: 2
                },
                renderer: 'onSeriesRender'
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1'],
                minimum: 0,
                listeners: {
                    rangechange: 'onAxisRangeChange'
                }
            },
            {
                type: 'category',
                position: 'bottom',
                fields: 'name'
            }
        ]
    }]

});
