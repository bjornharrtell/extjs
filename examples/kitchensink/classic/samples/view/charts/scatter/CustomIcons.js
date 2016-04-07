/**
 * This example shows how to create a scatter chart with custom icons.
 */
Ext.define('KitchenSink.view.charts.scatter.CustomIcons', {
    extend: 'Ext.panel.Panel',
    xtype: 'scatter-custom-icons',
    controller: 'scatter-custom-icons',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/scatter/CustomIconsController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Pie.js'
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
            text: 'Switch Theme',
            handler: 'onThemeSwitch'
        }
    ],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        store: {
            type: 'pie'
        },
        interactions: {
            type: 'itemedit',
            style: {
                strokeStyle: 'gray'
            }
        },
        series: [
            {
                type: 'scatter',
                xField: 'id',
                yField: 'g1',
                highlight: true,
                marker: {
                    type: 'path',
                    path: [
                        ['M' , 0, 1],
                        ['L', 1, 0],
                        ['L', 0, -1],
                        ['L', -1, 0],
                        ['Z']
                    ],
                    scale: 10,
                    lineWidth: 2
                }
            },
            {
                type: 'scatter',
                xField: 'id',
                yField: 'g2',
                highlight: true,
                marker: {
                    type: 'path',
                    path: [
                        ['M',0,-145],
                        ['L',48,-50],
                        ['L',153,-36],
                        ['L',76,39],
                        ['L',93,143],
                        ['L',0,95],
                        ['L',-93,143],
                        ['L',-76,39],
                        ['L',-153,-36],
                        ['L',-48,-50],
                        ['Z']
                    ],
                    scalingX: 0.1,
                    scalingY: -0.1
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1', 'g2', 'g3', 'g4'],
                label: {
                    rotate: {
                        degrees: -30
                    }
                }
            },
            {
                type: 'category',
                position: 'bottom',
                fields: 'id'
            }
        ]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }
    
});
