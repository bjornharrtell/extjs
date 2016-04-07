/**
 * Demonstrates how to use Ext.chart.series.Line with Markers
 */
Ext.define('KitchenSink.view.chart.LineWithMarker', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],

    controller: {
        type: 'chart',
        defaultVisibleRange: {
            left: [0, 1],
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
            handler: function () {
                Ext.getStore('Pie').generateData(10);
            }
        }, {
            text: 'Reset',
            handler: 'onReset'
        }]
    }, {
        xtype: 'cartesian',
        store: 'Pie',
        background: 'white',
        interactions: [{
                type: 'panzoom',
                zoomOnPanGesture: false
            },
            'itemhighlight'
        ],
        legend: {
            position: 'bottom'
        },
        series: [{
            type: 'line',
            xField: 'name',
            yField: 'g1',
            fill: true,
            style: {
                smooth: true,
                miterLimit: 3,
                lineCap: 'miter',
                opacity: 0.7,
                lineWidth: 8
            },
            title: 'Square',

            highlightCfg: {
                scale: 0.9
            },

            marker: {
                type: 'image',
                src: 'modern/resources/images/glyphicons_094_vector_path_square.png',
                width: 46,
                height: 46,
                x: -23,
                y: -23,
                scale: 0.7,
                fx: {
                    duration: 200
                }
            }
        }, {
            type: 'line',
            xField: 'name',
            yField: 'g2',
            style: {
                opacity: 0.7,
                lineWidth: 8
            },
            title: 'Circle',


            highlightCfg: {
                scale: 0.9
            },

            marker: {
                type: 'image',
                src: 'modern/resources/images/glyphicons_095_vector_path_circle.png',
                width: 46,
                height: 46,
                x: -23,
                y: -23,
                scale: 0.7,
                fx: {
                    duration: 200
                }
            }
        }, {
            type: 'line',
            xField: 'name',
            yField: 'g3',
            style: {
                opacity: 0.7,
                lineWidth: 8
            },
            title: 'Polygon',

            highlightCfg: {
                scale: 0.9
            },

            marker: {
                type: 'image',
                src: 'modern/resources/images/glyphicons_096_vector_path_polygon.png',
                width: 48,
                height: 48,
                x: -24,
                y: -24,
                scale: 0.7,
                fx: {
                    duration: 200
                }
            }
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['g1', 'g2', 'g3'],
            minimum: 0
        }, {
            type: 'category',
            position: 'bottom',
            visibleRange: [0, 0.5],
            fields: 'name'
        }]
    }],

    initialize: function() {
        this.callParent();
        Ext.getStore('Pie').generateData(10);
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        if (toolbar && interaction && !interaction.isMultiTouch()) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});