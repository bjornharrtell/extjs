/**
 * 100% stacked 3D columns are column charts where categories are stacked
 * on top of each other. The value of each category is recalculated, so that
 * it represents a share of the whole, which is the full stack and is equal
 * to 100 by default.
 */
Ext.define('KitchenSink.view.charts.column.Stacked100', {
    extend: 'Ext.Panel',
    xtype: 'column-stacked-100',
    controller: 'column-stacked-100',
    requires: ['Ext.chart.theme.Muted'],
    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/column/Stacked100Controller.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Cars.js'
    }],
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
        xtype: 'cartesian',
        reference: 'chart',

        width: '100%',
        height: 460,

        legend: {
            docked: 'bottom'
        },
        store: {
            type: 'cars'
        },
        theme: 'Muted',

        insetPadding: {
            top: 40,
            left: 40,
            right: 40,
            bottom: 40
        },
        sprites: [{
            type: 'text',
            text: 'Car production by largest manufacturers',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Source: International Organization of Motor Vehicle Manufacturers',
            fontSize: 10,
            x: 12,
            y: 395
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            grid: true,
            fields: [ 'to', 'gm', 'vw', 'hy', 'fo' ],
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'year',
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'bar',
            stacked: true,
            fullStack: true,

            title: [ 'Toyota', 'GM', 'Volkswagen', 'Hyundai', 'Ford' ],

            xField: 'year',
            yField: [ 'to', 'gm', 'vw', 'hy', 'fo' ],

            style: {
                minGapWidth: 30
            },
            highlight: {
                fillStyle: 'yellow'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onBarTipRender'
            }
        }]
        //<example>
    }, {
        style: 'margin-top: 10px;',
        xtype: 'gridpanel',
        columns : {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [
                { text: 'Year', dataIndex: 'year' },
                { text: 'Toyota', dataIndex: 'to' },
                { text: 'GM', dataIndex: 'gm' },
                { text: 'Volkswagen', dataIndex: 'vw' },
                { text: 'Hyundai', dataIndex: 'hy' },
                { text: 'Ford', dataIndex: 'fo' }
            ]
        },
        store: {
            type: 'cars'
        },
        width: '100%'
        //</example>
    }]

});
