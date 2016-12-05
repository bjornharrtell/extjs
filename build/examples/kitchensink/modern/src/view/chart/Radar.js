/**
 * Demonstrates how to use Ext.chart.series.Radar
 */
Ext.define('KitchenSink.view.chart.Radar', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.PolarChart',
        'Ext.Toolbar',
        'Ext.TitleBar',
        'Ext.chart.series.Radar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.interactions.Rotate'
    ],

    controller: {
        type: 'chart'
    },

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/chart/ChartController.js'
    }, {
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
        xtype: 'polar',
        store: {
            type: 'orderitems',
            numRecords: 15
        },
        background: 'white',
        interactions: 'rotate',
        legend: {
            position: 'bottom'
        },
        series: [{
            type: 'radar',
            title: 'G1',
            xField: 'id',
            yField: 'g1',
            style: {
                lineWidth: 4,
                fillOpacity: 0.3
            }
        }, {
            type: 'radar',
            title: 'G2',
            xField: 'id',
            yField: 'g2',
            style: {
                lineWidth: 4,
                fillOpacity: 0.3
            }
        }],
        axes: [{
            type: 'numeric',
            position: 'radial',
            fields: ['g1', 'g2'],
            grid: true,
            style: {
                estStepSize: 20
            },
            label: {
                fill: 'black'
            },
            limits: {
                value: 500,
                line: {
                    strokeStyle: 'red',
                    lineDash: [6, 3],
                    title: {
                        text: "Limit #1"
                    }
                }
            }
        }, {
            type: 'category',
            position: 'angular',
            margin: 20,
            fields: 'id',
            grid: true,
            style: {
                estStepSize: 2
            },
            label: {
                fill: 'black'
            },
            limits: [{
                value: 12,
                line: {
                    strokeStyle: 'green',
                    lineWidth: 3,
                    lineDash: [6, 3],
                    title: {
                        text: 'Limit #2',
                        fontSize: 14
                    }
                }
            }, {
                value: 7,
                line: {
                    strokeStyle: 'green',
                    lineWidth: 3
                }
            }]
        }]
    }]
});
