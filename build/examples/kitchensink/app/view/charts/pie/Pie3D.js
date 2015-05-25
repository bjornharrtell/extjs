/**
 * This example shows how to create a 3D Pie chart.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.pie.Pie3D', {
    extend: 'Ext.Panel',
    xtype: 'pie-3d',
    controller: 'pie-3d',
    requires: [
        'Ext.chart.PolarChart'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'app/view/charts/pie/Pie3DController.js'
    }, {
        type: 'Store',
        path: 'app/store/Pie.js'
    }],
    // </example>

    layout: 'fit',
    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: 'onRefresh'
        },
        {
            xtype: 'segmentedbutton',
            defaults: {
                width: 80
            },
            items: [{
                text: 'Opaque',
                pressed: true
            }, {
                text: 'Translucent'
            }],
            listeners: {
                toggle: 'onStyleToggle'
            }
        },
        {
            text: 'Switch Theme',
            handler: 'onThemeSwitch'
        }
    ],

    items: [{
        xtype: 'polar',
        reference: 'chart',
        innerPadding: 20,
        width: '100%',
        height: 500,
        color: ['red', 'green', 'blue'],
        store: {
            type: 'pie'
        },
        theme: 'Category1',
        interactions: 'rotatePie3d',
        animation: {
            duration: 500,
            easing: 'easeIn'
        },
        series: [
            {
                type: 'pie3d',
                field: 'g1',
                donut: 30,
                distortion: 0.6,
                style: {
                    strokeOpacity: 0.2
                }
            }
        ]
    }]
});
