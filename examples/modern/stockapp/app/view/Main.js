Ext.define("StockApp.view.Main", {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.CandleStick',
        'Ext.chart.interactions.PanZoom',
        'Ext.SegmentedButton',
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'StockApp.view.Preview',
        'StockApp.store.MovingAverage'
    ],
    controller: 'main',
    config: {
        id: 'StockAppMain',
        layout: 'fit',
        items: [
            {
                xtype: 'titlebar',
                top: 0,
                right: 0,
                zIndex: 50,
                style: {
                    background: 'none'
                },
                items: [
                    {
                        xtype: 'spacer',
                        width: 3,
                        align: 'right'
                    },
                    {
                        xtype: 'segmentedbutton',
                        align: 'right',
                        defaults: {
                            width: 100
                        },
                        items: [
                            {
                                text: 'CandleStick',
                                pressed: true,
                                handler: function () {
                                    var series = Ext.ComponentQuery.query('chart series[type=candlestick]'),
                                        i, ln, seriesItem;

                                    for (i = 0, ln = series.length; i < ln; i++) {
                                        seriesItem = series[i];
                                        seriesItem.getSprites()[0].setAttributes({
                                            ohlcType: 'candlestick'
                                        });
                                        seriesItem.getSurface().renderFrame();
                                    }
                                }
                            },
                            {
                                text: 'OHLC',
                                handler: function () {
                                    var series = Ext.ComponentQuery.query('chart series[type=candlestick]'),
                                        i, ln, seriesItem;

                                    for (i = 0, ln = series.length; i < ln; i++) {
                                        seriesItem = series[i];
                                        seriesItem.getSprites()[0].setAttributes({
                                            ohlcType: 'ohlc'
                                        });
                                        seriesItem.getSurface().renderFrame();
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 'mainChart',
                xtype: 'cartesian',
                background: 'white',
                interactions: {
                    type: 'panzoom',
                    axes: {
                        // TODO: Try to simplify this API.
                        "left": {
                            allowPan: false,
                            allowZoom: false
                        },
                        "bottom": {
                            allowPan: true,
                            allowZoom: true
                        }
                    }
                },
                insetPadding: {
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                series: [
                    {
                        store: 'Apple',
                        type: 'candlestick',
                        xField: 'date',
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
                        },
                        aggregator: {
                            strategy: 'time'
                        }
                    },
                    {
                        store: {
                            xclass: 'StockApp.store.MovingAverage',
                            source: 'Apple',
                            window: 50
                        },
                        type: 'line',
                        xField: 'date',
                        yField: 'close',
                        style: {
                            opacity: 0.9,
                            stroke: 'rgb(237,123,43)'
                        },
                        aggregator: {
                            strategy: 'time'
                        }
                    },
                    {
                        store: 'Google',
                        type: 'candlestick',
                        xField: 'date',
                        openField: 'open',
                        highField: 'high',
                        lowField: 'low',
                        closeField: 'close',
                        style: {
                            barWidth: 10,
                            opacity: 0.9,
                            dropStyle: {
                                fill: 'rgb(228,124,124)',
                                stroke: 'rgb(228,124,124)'
                            },
                            raiseStyle: {
                                fill: 'rgb(67,175,174)',
                                stroke: 'rgb(67,175,174)'
                            }
                        },
                        aggregator: {
                            stretagy: 'time'
                        }
                    },
                    {
                        store: {
                            xclass: 'StockApp.store.MovingAverage',
                            source: 'Google',
                            window: 50
                        },
                        type: 'line',
                        xField: 'date',
                        yField: 'close',
                        style: {
                            opacity: 0.9,
                            stroke: 'rgb(228,124,124)'
                        },
                        aggregator: {
                            strategy: 'time'
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        fields: ['open', 'high', 'low', 'close'],
                        position: 'left',
                        style: {
                            floating: true,
                            axisLine: false,
                            strokeStyle: '#666',
                            estStepSize: 40
                        },
                        label: {
                            font: 'bold 12px sans-serif',
                            fillStyle: '#666'
                        },
                        maximum: 750,
                        minimum: 0,
                        background: {
                            fill: {
                                type: 'linear',
                                degrees: 180,
                                stops: [
                                    {
                                        offset: 0.3,
                                        color: 'white'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0)'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        type: 'time',
                        fields: ['date'],
                        position: 'bottom',
                        background: {
                            fill: 'gray'
                        },
                        visibleRange: [0.5, 0.9],
                        style: {
                            axisLine: false,
                            strokeStyle: '#888',
                            estStepSize: 50,
                            textPadding: 10
                        },
                        label: {
                            font: 'bold 12px sans-serif',
                            fillStyle: '#666'
                        },
                        renderer: function (axis, value, layoutContext, lastValue) {
                            var month, day;
                            switch (layoutContext.majorTicks.unit) {
                                case Ext.Date.YEAR:
                                    return Ext.Date.format(value, 'Y');
                                case Ext.Date.MONTH:
                                    month = Ext.Date.format(value, 'M');
                                    if (month === 'Jan') {
                                        return Ext.Date.format(value, 'Y');
                                    } else {
                                        return month;
                                    }
                                    break;
                                case Ext.Date.DAY:
                                    day = Ext.Date.format(value, 'j');
                                    if (lastValue && value.getMonth() !== lastValue.getMonth()) {
                                        month = Ext.Date.format(value, 'M');
                                        if (month === 'Jan') {
                                            return Ext.Date.format(value, 'M j y');
                                        } else {
                                            return Ext.Date.format(value, 'M j');
                                        }
                                    } else {
                                        return day;
                                    }
                                    break;
                                default:
                                    return Ext.Date.format(value, 'h:i:s');
                            }
                        },
                        listeners: {
                            visiblerangechange: 'onVisibleRangeChange'
                        }
                    }
                ]
            },
            {
                xclass: 'StockApp.view.Preview',
                reference: 'preview',
                height: 75
            }
        ]
    }
});