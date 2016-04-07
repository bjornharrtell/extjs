/**
 * This example shows how to use multiple floating axes in a polar chart. Similar to the
 * Plot Line Chart example, floating axes don't have a fixed position, instead they track
 * a specified value on another axis that is running in the opposite direction.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.radar.MultiAxis', {
    extend: 'Ext.Panel',
    xtype: 'radar-multi-axis',
    controller: 'radar-basic',
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/radar/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Climate.js'
    }],
    layout: 'vbox',
    // </example>

    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: 'onRefresh'
        },
        {
            text: 'Preview',
            handler: 'onPreview'
        }
    ],

    items: {
        xtype: 'polar',
        reference: 'chart',
        width: '100%',
        height: 500,
        insetPadding: 20,
        innerPadding: 40,
        store: {
            type: 'climate'
        },
        interactions: 'rotate',
        axes: [
            {
                type: 'category',
                position: 'angular',
                id: 'main-angular-axis',
                grid: true,
                style: {
                    majorTickSize: 20,
                    strokeStyle: 'rgb(73,112,142)'
                }
            },
            {
                type: 'category',
                position: 'angular',
                linkedTo: 'main-angular-axis',
                renderer: 'onMultiAxisLabelRender',
                floating: {
                    value: 20,
                    alongAxis: 'radial-axis'
                }
            },
            {
                type: 'numeric',
                id: 'radial-axis',
                position: 'radial',
                label: {
                    fontWeight: 'bold'
                },
                floating: {
                    value: 'Jan',
                    alongAxis: 'main-angular-axis'
                }
            }
        ],
        series: [{
            type: 'radar',
            angleField: 'month',
            radiusField: 'high',
            style: {
                globalAlpha: 0.7
            }
        }]
    }

});
