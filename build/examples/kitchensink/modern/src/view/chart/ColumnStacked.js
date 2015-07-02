/**
 * Demonstrates how to use Ext.chart.ColumnChartStacked
 */
Ext.define('KitchenSink.view.chart.ColumnStacked', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.CartesianChart', 'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Category'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            bottom: [0, 0.5]
        }
    },

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
            handler: function() {
                Ext.getStore('OrderItems').generateData(25);
            }
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
        }, {
            text: 'Reset',
            handler: 'onReset'
        }]
    }, {
        xtype: 'cartesian',
        store: 'OrderItems',
        background: 'white',
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
        Ext.getStore('OrderItems').generateData(25);
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        if (toolbar && interaction && !interaction.isMultiTouch()) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});