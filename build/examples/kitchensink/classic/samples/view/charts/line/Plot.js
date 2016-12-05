/**
 * This example shows how to create a Plot chart with floating axes linked to each other
 * at the origin. Floating axes can track a value on another axis running in the oppsosite
 * direction. This is handy for visualizing mathematical functions. Try zooming and panning
 * the chart to see the effect.
 *
 * To zoom the chart, use the pinch-in/pinch-out gestures, if you are on a mobile device.
 * Or click and drag, if you are using a desktop browser. Click and drag also acts as a
 * panning gesture on desktops. You can use the Pan/Zoom toggle in the upper-left corner
 * of the chart to switch modes.
 */
Ext.define('KitchenSink.view.charts.line.Plot', {
    extend: 'Ext.panel.Panel',
    xtype: 'line-plot',
    controller: 'line-plot',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/line/PlotController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Plot.js'
    }],
    // </example>
    layout: 'fit',
    width: 650,

    tbar: {
        reference: 'toolbar',
        items: [
            '->',
            {
                text: 'Next function',
                handler: 'onRefresh'
            },
            {
                text: 'Preview',
                handler: 'onPreview'
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
            type: 'plot'
        },
        padding: 10,
        insetPadding: 0,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        // <example>
        // TODO: must be able to control how series are displayed
        // TODO: for undefined data points (apply fillStyle to the series
        // TODO: to see the issue)
        // </example>
        series: [
            {
                type: 'line',
                xField: 'x',
                yField: 'y1',
                style: {
                    lineWidth: 2,
                    strokeStyle: 'rgb(0, 119, 204)'
                }
            }
            // <example>
// TODO: The second line series does not render correctly, it should look the same
// TODO: as the blue series will look on next refresh button tap, but doesn't,
// TODO: even though the data looks alright.
// TODO: add 'me.fn[(me.fnIndex + 1) % me.fn.length]' to Plot store's traverseFunctions
// TODO: as a third parameter to test this.
// TODO:               {
// TODO:                   type: 'line',
// TODO:                   xField: 'x',
// TODO:                   yField: 'y2',
// TODO:                   style: {
// TODO:                       lineWidth: 2,
// TODO:                       lineDash: [3, 3],
// TODO:                       strokeStyle: 'rgb(230, 119, 204)'
// TODO:                   }
// TODO:               }
            // </example>
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['y1'],
                titleMargin: 20,
                title: {
                    text: 'f(x)',
                    fillStyle: 'rgb(255, 0, 136)'
                },
                minimum: -4,
                maximum: 4,
                minorTickSteps: 3,
                style: {
                    minorTickSize: 4,
                    majorTickSize: 7
                },
                floating: {
                    value: 0,
                    alongAxis: 1
                },
                grid: true
            },
            {
                type: 'numeric',
                position: 'bottom',
                fields: ['x'],
                titleMargin: 6,
                minorTickSteps: 3,
                style: {
                    minorTickSize: 4,
                    majorTickSize: 7
                },
                title: {
                    text: 'x',
                    fillStyle: 'rgb(255, 0, 136)'
                },
                floating: {
                    value: 0,
                    alongAxis: 0
                },
                grid: true
            }
        ]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
