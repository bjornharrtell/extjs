/**
 * A double donut chart is a variation on a donut chart, where two 'pie'
 * series are used instead of one. The inner series represents groups
 * of some components, and the outer series represents the components
 * themselves. Combined angular span of components in a group matches
 * the angular span of that group. This allows to easily see parent-child
 * relationships and their percentage in the whole.
 */
Ext.define('KitchenSink.view.charts.pie.DoubleDonut', {
    extend: 'Ext.Panel',
    xtype: 'pie-double-donut',
    controller: 'pie-double-donut',

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/pie/DoubleDonutController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/DoubleDonut.js'
    }],
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>
    width: 650,

    tbar: [
        '->',
        {
            text: 'Preview',
            handler: 'onPreview'
        }
    ],

    items: [{
        xtype: 'polar',
        reference: 'chart',
        width: '100%',
        height: 500,
        insetPadding: 20,
        innerPadding: 20,
        sprites: [{
            type: 'text',
            text: 'Double Donut Chart',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40,
            y: 20
        }],
        series: [{
            // Outer ring series.
            type: 'pie',
            angleField: 'usage',
            donut: 80,
            store: {
                type: 'double-donut'
            },
            label: {
                field: 'provider'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onOuterSeriesTooltipRender'
            }
        }],
        listeners: {
            afterrender: 'onAfterRender'
        }
    }]

});
