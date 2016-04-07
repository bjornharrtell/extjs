/**
 * A variant of the pie chart, the spie chart allows the comparison of a set of data at
 * two different states.
 *
 * The example makes use of two interactions: 'itemhighlight' and 'rotate'. To use the
 * first one, hover over or tap on a pie sector. To use the second one, click or tap and
 * then drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.pie.Custom', {
    extend: 'Ext.Panel',
    xtype: 'pie-custom',
    controller: 'pie-basic',

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/pie/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/DeviceMarketShare.js'
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
        store: {
            type: 'device-market-share'
        },
        insetPadding: 30,
        innerPadding: 20,
        legend: {
            docked: 'bottom'
        },
        interactions: ['rotate', 'itemhighlight'],
        sprites: [{
            type: 'text',
            text: 'Pie Charts - Custom Slice Sizing',
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
            animation: {
                easing: 'easeOut',
                duration: 500
            },
            angleField: 'data1',  // bind pie slice angular span to market share
            radiusField: 'data2', // bind pie slice radius to growth rate
            clockwise: false,
            highlight: {
                margin: 20
            },
            label: {
                field: 'os',      // bind label text to name
                display: 'outside',
                fontSize: 14
            },
            style: {
                strokeStyle: 'white',
                lineWidth: 1
            },
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
                { text: 'Market Share', dataIndex: 'data1', width: 150, renderer: 'onDataRender' },
                { text: 'Growth', dataIndex: 'data2', width: 150, renderer: 'onDataRender' }
            ]
        },
        store: {
            type: 'device-market-share'
        },
        width: '100%'
        //</example>
    }]

});
