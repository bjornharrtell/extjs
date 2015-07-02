/**
 * Demonstrates how to use Ext.chart.ColumnChart
 */
Ext.define('KitchenSink.view.chart.Column', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.ItemEdit',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],

    controller: 'column-chart',
    layout: 'fit',

    items: [{
        xtype: 'toolbar',
        top: 0,
        right: 0,
        zIndex: 50,
        cls: 'charttoolbar',
        style: {
            background: 'none',
            border: 'none'
        },
        items: [{
            xtype: 'spacer'
        }, {
            text: 'Preview',
            iconCls: 'x-fa fa-eye',
            platformConfig: {
                desktop: {
                    text: 'Download',
                    iconCls: 'x-fa fa-download'
                }
            },
            handler: 'onDownload'
        }, {
            text: 'Reload',
            iconCls: 'x-fa fa-refresh',
            handler: 'onReloadData'
        }]
    }, {
        xtype: 'cartesian',
        reference: 'chart',
        animation: Ext.isIE8 ? false : true,
        store: {
            type: 'climate'
        },
        insetPadding: {
            top: 50,
            bottom: 10,
            left: 0,
            right: 10
        },
        platformConfig: {
            desktop: {
                insetPadding: {
                    top: 50,
                    bottom: 40,
                    left: 20,
                    right: 40
                }
            }
        },
        interactions: [{
            type: 'itemedit',
            tooltip: {
                renderer: 'onEditTipRender'
            },
            renderer: 'onColumnEdit'
        }, {
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
        axes: [{
            type: 'numeric',
            position: 'left',
            minimum: 30,
            titleMargin: 20,
            title: {
                text: 'Temperature in °F'
            },
            listeners: {
                rangechange: 'onAxisRangeChange'
            }
        }, {
            type: 'category',
            position: 'bottom',
            visibleRange: [0, 0.5],
            platformConfig: {
                desktop: {
                    visibleRange: [0, 1]
                }
            }
        }],
        series: {
            type: 'bar',
            xField: 'month',
            yField: 'highF',
            style: {
                minGapWidth: 15
            },
            highlight: {
                strokeStyle: 'black',
                fillStyle: 'gold'
            },
            label: {
                field: 'highF',
                display: 'insideEnd',
                renderer: function (value) {
                    return value.toFixed(1);
                }
            }
        },
        sprites: {
            type: 'text',
            text: 'Redwood City Climate Data',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 30, // the sprite x position
            y: 30  // the sprite y position
        },
        listeners: {
            initialize: 'onInitialize',
            afterrender: 'onAfterRender',
            beginitemedit: 'onBeginItemEdit',
            enditemedit: 'onEndItemEdit'
        }
    }]

});