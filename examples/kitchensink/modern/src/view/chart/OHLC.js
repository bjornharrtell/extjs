/**
 * Demonstrates how to use Ext.chart.series.CandleStick in OHLC mode
 */
Ext.define('KitchenSink.view.chart.OHLC', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.series.CandleStick',
        'Ext.chart.interactions.Crosshair'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            bottom: [0, 0.3]            
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
            text: 'Reset',
            handler: 'onReset'
        }]
    }, {
        xtype: 'cartesian',
        background: 'white',
        interactions: [{
            type: 'panzoom',
            zoomOnPanGesture: false,
            axes: {
                "left": {
                    allowPan: false,
                    allowZoom: false
                },
                "bottom": {
                    allowPan: true,
                    allowZoom: true
                }
            }
        }],
        series: [{
            store: 'StockPrice',
            type: 'candlestick',
            xField: 'time',
            openField: 'open',
            highField: 'high',
            lowField: 'low',
            closeField: 'close',
            style: {
                ohlcType: 'ohlc',
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
            },
            aggregator: {
                strategy: 'time'
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
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        if (toolbar && interaction && !interaction.isMultiTouch()) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});