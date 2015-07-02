/**
 * A basic donut chart functions precisely like a pie chart. The only difference is that
 * the center is blank. This is typically done to increase the readability of the data
 * labels that may be around. The example makes use of two interactions: 'itemhighlight'
 * and 'rotate'. To use the first one, hover over or tap on a pie sector. To use the
 * second one, click or tap and then drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.pie.Donut', {
    extend: 'Ext.Panel',
    xtype: 'pie-donut',
    controller: 'pie-basic',

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/pie/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/MobileOS.js'
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
        insetPadding: 50,
        innerPadding: 20,
        store: {
            type: 'mobile-os'
        },
        legend: {
            docked: 'bottom'
        },
        interactions: ['rotate', 'itemhighlight'],
        sprites: [{
            type: 'text',
            text: 'Donut Charts - Basic',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: IDC Predictions - 2017',
            x: 12,
            y: 425
        }, {
            type: 'text',
            text: 'Source: Internet',
            x: 12,
            y: 440
        }],
        series: [{
            type: 'pie',
            angleField: 'data1',
            donut: 50,
            label: {
                field: 'os',
                display: 'outside'
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
        //<example>
    }, {
        style: 'padding-top: 10px;',
        xtype: 'gridpanel',
        columns : {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [
                { text: 'OS', dataIndex: 'os' },
                { text: 'Market Share', dataIndex: 'data1', width: 150, renderer: 'onDataRender' }
            ]
        },
        store: {
            type: 'mobile-os'
        },
        width: '100%'
        //</example>
    }]

});
