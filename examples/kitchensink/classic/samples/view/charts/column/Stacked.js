/**
 * Stacked columns are multi-series column charts where categories are stacked on top of
 * each other. This is typically done to visually represent the total of all categories
 * for a given period or value.
 *
 * Tapping or hovering a column will highlight it.
 * Dragging a column will change the underlying data.
 */
Ext.define('KitchenSink.view.charts.column.Stacked', {
    extend: 'Ext.Panel',
    xtype: 'column-stacked',
    controller: 'column-stacked',
    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/column/StackedController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Browsers.js'
    }],
    // </example>

    width: 650,

    items: [{
        xtype: 'cartesian',
        reference: 'chart',

        width: '100%',
        height: 460,

        store: {
            type: 'browsers'
        },
        legend: {
            docked: 'bottom'
        },
        interactions: {
            type: 'itemedit',
            tooltip: {
                renderer: 'onEditTipRender'
            }
        },
        insetPadding: {
            top: 40,
            left: 40,
            right: 40,
            bottom: 40
        },
        sprites: [{
            type: 'text',
            text: 'Column Charts - Stacked Columns',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Browser Stats 2012',
            fontSize: 10,
            x: 12,
            y: 380
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 395
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            adjustByMajorUnit: true,
            grid: true,
            fields: ['data1'],
            renderer: 'onAxisLabelRender',
            minimum: 0
        }, {
            type: 'category',
            position: 'bottom',
            grid: true,
            fields: ['month'],
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'bar',
            title: [ 'IE', 'Firefox', 'Chrome', 'Safari' ],
            xField: 'month',
            yField: [ 'data1', 'data2', 'data3', 'data4' ],
            stacked: true,
            style: {
                opacity: 0.80
            },
            highlight: {
                fillStyle: 'yellow'
            },
            tooltip: {
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
                menuDisabled: true,
                renderer: 'onGridValueRender'
            },
            items: [
                { text: 'Month', dataIndex: 'month', renderer: 'onGridMonthRender' },
                { text: 'IE', dataIndex: 'data1' },
                { text: 'Firefox', dataIndex: 'data2' },
                { text: 'Chrome', dataIndex: 'data3' },
                { text: 'Safari', dataIndex: 'data4' }
            ]
        },
        store: {type: 'browsers'},
        width: '100%'
        //</example>
    }],

    tbar: [
        '->',
        {
            text: 'Switch Theme',
            handler: 'onThemeSwitch'
        },
        {
            xtype: 'segmentedbutton',
            width: 200,
            defaults: { ui: 'default-toolbar' },
            items: [
                {
                    text: 'Stack',
                    pressed: true
                },
                {
                    text: 'Group'
                }
            ],
            listeners: {
                toggle: 'onStackGroupToggle'
            }
        },
        {
            text: 'Preview',
            handler: 'onPreview'
        }
    ]
});
