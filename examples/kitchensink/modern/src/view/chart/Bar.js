/**
 * Demonstrates how to use Ext.chart.BarChart
 */
Ext.define('KitchenSink.view.chart.Bar', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart', 
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Bar', 
        'Ext.chart.axis.Numeric', 
        'Ext.chart.axis.Category'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            left: [0, 1]
        }
    },

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/chart/ChartController.js'
    },{
        type: 'Store',
        path: 'modern/src/store/Pie.js'
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
            type: 'pie',
            numRecords: 15
        },
        background: 'white',
        flipXY: true,
        interactions: [{
            type: 'panzoom',
            zoomOnPanGesture: true
        }, {
            type: 'itemhighlight'
        }],
        series: [{
            type: 'bar',
            xField: 'name',
            yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
            highlightCfg: {
                strokeStyle: 'red',
                lineWidth: 3
            },
            style: {
                lineWidth: 2,
                maxBarWidth: 30,
                stroke: 'rgb(40,40,40)'
            }
        }],
        axes: [{
            type: 'numeric',
            position: 'bottom',
            fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
            grid: {
                even: {
                    lineWidth: 1
                },
                odd: {
                    stroke: '#fff'
                }
            },
            label: {
                rotate: {
                    degrees: -90
                }
            },
            maxZoom: 1
        }, {
            type: 'category',
            position: 'left',
            fields: 'name',
            maxZoom: 4
        }]
    }],

    initialize: function() {
        this.callParent();
        
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        
        if (toolbar && interaction) {
            toolbar.add(interaction.getModeToggleButton());
        }
    },

    refreshData: function() {
        
    }
});
