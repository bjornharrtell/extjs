/**
 * Demonstrates how to use Ext.chart.ScatterChart
 */
Ext.define('KitchenSink.view.chart.Scatter', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Scatter',
        'Ext.chart.axis.Numeric'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            left: [0, 1],
            bottom: [0, 0.5]
        }
    },

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/chart/ChartController.js'
    },{
        type: 'Store',
        path: 'modern/src/store/OrderItems.js'
    }],
    // </example>
    
    layout: 'fit',
    shadow: true,

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        cls: 'charttoolbar',
        items: [{
            iconCls: 'x-fa fa-refresh',
            text: 'Refresh',
            handler: 'onRefresh'
        }, {
            xtype: 'spacer'
        }]
    }, {
        xtype: 'cartesian',
        insetPadding: '20 20 10 10',
        store: {
            type: 'orderitems',
            numRecords: 25
        },
        legend: {
            position: 'bottom'
        },
        interactions: [
            'panzoom',
            'itemhighlight'
        ],
        series: [{
            type: 'scatter',
            xField: 'id',
            yField: 'g1',
            title: 'Group 1',
            highlightCfg: {
                strokeStyle: 'red',
                lineWidth: 5
            },
            marker: {
                type: 'path',
                path: [
                    ['M', 0, 1],
                    ['L', 1, 0],
                    ['L', 0, -1],
                    ['L', -1, 0],
                    ['Z']
                ],
                scale: 10,
                lineWidth: 2
            }
        }, {
            type: 'scatter',
            xField: 'id',
            yField: 'g2',
            title: 'Group 2',
            highlightCfg: {
                strokeStyle: 'red',
                lineWidth: 5
            },
            marker: {
                type: 'circle',
                radius: 10,
                lineWidth: 2
            }
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['g1', 'g2', 'g3', 'g4'],
            visibleRange: [0, 1],
            style: {
                estStepSize: 20
            },
            label: {
                rotate: {
                    degrees: -30
                }
            }
        }, {
            type: 'category',
            position: 'bottom',
            visibleRange: [0, 0.5],
            fields: 'id'
        }]
    }],

    initialize: function() {
        this.callParent();

        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];

        if (toolbar && interaction) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});
