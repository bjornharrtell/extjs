/**
 * Demonstrates how to use Ext.chart.AreaChart
 */
Ext.define('KitchenSink.view.chart.Area', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Area',
        'Ext.chart.axis.Numeric',
        'KitchenSink.view.chart.ChartController'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            bottom: [0, 0.25]
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
    
    shadow: true,
    layout: 'fit',
    items: [{
        xtype: 'toolbar',
        docked: 'top',
        cls: 'charttoolbar',
        items: [{
            xtype: 'spacer'
        }, {
            iconCls: 'x-fa fa-picture-o',
            text: 'Theme',
            handler: 'onThemeChange'
        }, {
            iconCls: 'x-fa fa-refresh',
            text: 'Refresh',
            handler: 'onRefresh'
        }]
    }, {
        xtype: 'cartesian',
        store: {
            type: 'orderitems',
            numRecords: 25
        },
        legend: {
            type: 'sprite',
            position: 'bottom'
        },
        insetPadding: {
            left: 10,
            bottom: 0,
            top: 15,
            right: 35
        },
        interactions: [{
            type: 'panzoom',
            axes: {
                left: {
                    allowPan: false,
                    allowZoom: false
                },
                bottom: {
                    allowPan: true,
                    allowZoom: true
                }
            }
        }],
        series: [{
            type: 'area',
            xField: 'name',
            yField: ['g1', 'g2', 'g3', 'g4', 'g5'],
            title: ['G1', 'G2', 'G3', 'G4', 'G5'],
            style: {
                stroke: 'black',
                lineWidth: 2,
                fillOpacity: 0.8
            }
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
            label: {
                rotate: {
                    degrees: -30
                }
            },
            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },
            title: {
                text: 'Summation of Data',
                fontSize: 20
            }
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'name',
            grid: true,
            visibleRange: [0, 0.25],
            title: {
                text: 'Item Names',
                fontSize: 20
            }
        }]
    }]
});
