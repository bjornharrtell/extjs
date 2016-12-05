/**
 * Demonstrates how to use Ext.chart.series.CandleStick
 */
Ext.define('KitchenSink.view.chart.Candlestick', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.series.CandleStick',
        'KitchenSink.store.StockPrice',
        'Ext.chart.interactions.Crosshair'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            bottom: [0, 0.3]
        }
    },
    
    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/chart/ChartController.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/StockPrice.js'
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
        }]
    }, {
        xtype: 'cartesian',
        store: {
            type: 'StockPrice'
        },
        interactions: [{
            type: 'panzoom',
            enabled: false,
            zoomOnPanGesture: false,
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
        }, {
            type: 'crosshair',
            axes: {
                label: {
                    fillStyle: 'white'
                },
                rect: {
                    fillStyle: '#344459',
                    opacity: 0.7,
                    radius: 5
                }
            }
        }],
        series: [{
            type: 'candlestick',
            xField: 'time',
            openField: 'open',
            highField: 'high',
            lowField: 'low',
            closeField: 'close',
            style: {
                barWidth: 10,
                opacity: 0.9,
                dropStyle: {
                    fill: 'rgb(237,123,43)',
                    stroke: 'rgb(237,123,43)'
                },
                raiseStyle: {
                    fill: 'rgb(55,153,19)',
                    stroke: 'rgb(55,153,19)'
                }
            }
        }],
        axes: [{
            type: 'numeric',
            fields: ['open', 'high', 'low', 'close'],
            position: 'left',
            maximum: 1000,
            minimum: 0
        }, {
            type: 'time',
            fields: ['time'],
            position: 'bottom',
            visibleRange: [0, 0.3],
            style: {
                axisLine: false
            }
        }]
    }],

    initialize: function() {
        this.callParent();
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interactions = Ext.ComponentQuery.query('interaction', this),
            panzoom = interactions[0],
            crosshair = interactions[1];

        toolbar.add({
            xtype: 'segmentedbutton',
            margin: '0 5 0 0',
            items: [{
                text: 'Crosshair',
                pressed: true,
                handler: function() {
                    crosshair.setEnabled(true);
                    panzoom.setEnabled(false);
                }
            }, {
                text: 'Pan/Zoom',
                handler: function() {
                    panzoom.setEnabled(true);
                    crosshair.setEnabled(false);
                }
            }]
        });
        if (toolbar && panzoom) {
            toolbar.add(panzoom.getModeToggleButton());
        }
    }
});
