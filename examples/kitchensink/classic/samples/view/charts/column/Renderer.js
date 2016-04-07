/**
 * This example shows how to create a column chart with a renderer to customize colors
 * and use sprites to draw lines and labels.
 */
Ext.define('KitchenSink.view.charts.column.Renderer', {
    extend: 'Ext.Panel',
    xtype: 'column-renderer',
    controller: 'column-renderer',

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
        path: 'classic/samples/view/charts/column/RendererController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Pie.js'
    }],
    // </example>
    layout: 'fit',
    width: 650,
    height: 500,

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
        store: {
            type: 'pie'
        },
        series: [{
            type: 'bar',
            xField: 'name',
            yField: ['g1'],
            style: {
                lineWidth: 2,
                maxBarWidth: 30,
                stroke: 'dodgerblue',
                opacity: 0.6
            },
            renderer: 'onG1SeriesRender'
        }, {
            type: 'bar',
            xField: 'name',
            yField: ['g2'],
            style: {
                lineWidth: 2,
                maxBarWidth: 12,
                stroke: 'tomato',
                fill: 'mistyrose',
                radius: 20
            },
            renderer: 'onG2SeriesRender'
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['g1','g2'],
            minimum: 0
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'name'
        }]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
