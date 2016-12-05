/**
 * Demonstrates how to use stacked bar series.
 */
Ext.define('KitchenSink.view.chart.ColumnStacked', {
    extend: 'Ext.Panel',
    xtype: 'grid-column-stacked',
    requires: ['Ext.chart.CartesianChart', 'Ext.chart.interactions.PanZoom',
        'Ext.chart.theme.Midnight',
        'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Category'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            bottom: [0, 0.5]
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
        }, {
            iconCls: 'x-fa fa-bars',
            text: 'Group',
            handler: function(button) {
                var chart = this.up().up().down('cartesian'),
                    series = chart.getSeries()[0];
                    
                button.setText(series.getStacked() ? 'Stack' : 'Group');
                series.setStacked(!series.getStacked());
                chart.redraw();
            }
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
        innerPadding: '0 3 0 3',
        insetPadding: '30 10 10 10',
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
            type: 'bar',
            xField: 'name',
            yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
            title: ['Apples', 'Oranges', 'Bananas', 'Plums', 'Mangos', 'Pears'],
            stacked: true,
            style: {
                lineWidth: 2,
                maxBarWidth: 50
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
            }
        }, {
            type: 'category',
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
