/**
 * Demonstrates how to use Ext.chart.ColumnChart3D
 */
Ext.define('KitchenSink.view.chart.Column3D', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.theme.Muted',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.grid.HorizontalGrid3D',
        'Ext.chart.series.Bar3D',
        'Ext.chart.axis.Category3D'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            bottom: [0, 0.2]
        }
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
        xtype: 'cartesian',
        store: {
            type: 'orderitems',
            numRecords: 25
        },
        theme: 'Muted',
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
            type: 'bar3d',
            xField: 'name',
            yField: ['g1', 'g2', 'g3']
        }],
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: ['g1', 'g2', 'g3'],
            grid: true,
            label: {
                rotate: {
                    degrees: -30
                }
            }
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'name',
            visibleRange: [0, 0.2]
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
