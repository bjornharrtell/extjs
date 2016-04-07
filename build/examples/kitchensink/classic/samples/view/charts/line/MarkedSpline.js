/**
 * Marked splines are multi-series splines displaying smooth curves across multiple
 * categories. Markers are placed at each connected point to clearly depict their position.
 */
Ext.define('KitchenSink.view.charts.line.MarkedSpline', {
    extend: 'Ext.Panel',
    xtype: 'line-marked-spline',
    controller: 'line-marked-spline',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/line/MarkedSplineController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Spline.js'
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
        height: 500,
        store: {
            type: 'spline'
        },
        insetPadding: {
            top: 40,
            right: 40,
            bottom: 20,
            left: 20
        },
        legend: {
            docked: 'right'
        },
        sprites: [{
            type: 'text',
            text: 'Line Charts - Marked Spline',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }],
        axes: [{
            type: 'numeric',
            fields: ['sin', 'cos', 'tan' ],
            position: 'left',
            grid: true,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            title: 'Theta',
            fields: 'theta',
            position: 'bottom',
            style: {
                textPadding: 0 // remove extra padding between labels to make sure no labels are skipped
            },
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'theta',
            yField: 'sin',
            smooth: true,
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            }
        }, {
            type: 'line',
            xField: 'theta',
            yField: 'cos',
            smooth: true,
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            }
        }, {
            type: 'line',
            xField: 'theta',
            yField: 'tan',
            smooth: true,
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            }
        }]
        //<example>
    }, {
        style: 'margin-top: 10px;',
        xtype: 'gridpanel',
        height: 240,
        columns : {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [
                { text: 'Theta', dataIndex: 'theta' },
                { text: 'Sin', dataIndex: 'sin' },
                { text: 'Cos', dataIndex: 'cos' },
                { text: 'Tan', dataIndex: 'tan' }
            ]
        },
        store: {
            type: 'spline'
        },
        width: '100%'
        //</example>
    }]
});
