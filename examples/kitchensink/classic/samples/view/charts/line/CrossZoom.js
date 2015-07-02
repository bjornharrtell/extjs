/**
 * This example shows how to create a line chart. Line charts allow to visualize the
 * evolution of a value over time, or the ratio between any two values.
 *
 * This example also highlights data aggregation to effortlessly display over 1000 points.
 */
Ext.define('KitchenSink.view.charts.line.CrossZoom', {
    extend: 'Ext.Panel',
    xtype: 'line-crosszoom',
    controller: 'line-crosszoom',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom'
    ],

    layout: 'fit',
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/line/CrossZoomController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/USD2EUR.js'
    }],
    // </example>

    width: 650,

    tbar: [
        '->',
        {
            text: 'Undo Zoom',
            handler: 'onZoomUndo'
        }
    ],

    items: {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        store: 'USD2EUR',
        interactions: {
            type: 'crosszoom',
            zoomOnPanGesture: false
        },
        insetPadding: '20 20 10 10',
        series: {
            type: 'line',
            xField: 'time',
            yField: 'value',
            style: {
                lineWidth: 2,
                fillStyle: '#115fa6',
                strokeStyle: '#115fa6',
                fillOpacity: 0.6,
                miterLimit: 3,
                lineCap: 'miter'
            }
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['value'],
            titleMargin: 12,
            title: {
                text: 'USD to Euro'
            }
        }, {
            type: 'time',
            dateFormat: 'Y-m-d',
            visibleRange: [0, 1],
            position: 'bottom',
            fields: ['time'],
            titleMargin: 12,
            title: {
                text: 'Date'
            }
        }]
    }

});
