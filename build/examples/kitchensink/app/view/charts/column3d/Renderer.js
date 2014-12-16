/**
 * This example shows how to use a 3D column chart with a renderer
 * to alter the look of individual columns in the series based on
 * certain criteria (in this case column index).
 */
Ext.define('KitchenSink.view.charts.column3d.Renderer', {
    extend: 'Ext.Panel',
    xtype: 'column-renderer-3d',
    requires: ['Ext.chart.theme.Muted'],

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>
    width: 650,

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 500,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        store: {
            type: 'browsers'
        },
        theme: {
            type: 'muted'
        },
        insetPadding: '60 40 40 40',
        innerPadding: '0 4 0 3',
        axes: [{
            type: 'numeric3d',
            fields: 'data3',
            position: 'left',
            grid: true,
            renderer: function (v, layoutContext) {
                // Custom renderer overrides the native axis label renderer.
                // Since we don't want to do anything fancy with the value
                // ourselves except appending a '%' sign, but at the same time
                // don't want to loose the formatting done by the native renderer,
                // we let the native renderer process the value first.
                return layoutContext.renderer(v) + '%';
            }
        }, {
            type: 'category',
            fields: 'month',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            },
            visibleRange: [0, 0.75]
        }],
        series: [{
            type: 'bar3d',
            xField: 'month',
            yField: 'data3',
            label: {
                field: 'data3',
                display: 'over'
            },
            highlight: {
                fillStyle: 'rgba(43, 130, 186, 1.0)',
                strokeStyle: 'brown',
                showStroke: true,
                lineWidth: 2
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function (record, item) {
                    this.setHtml(record.get('month') + ': ' + record.get('data3') + '%');
                }
            },
            renderer: (function () {
                var colors = [
                    '#8ca640',
                    '#974144',
                    '#4091ba',
                    '#8e658e',
                    '#3b8d8b',
                    '#b86465',
                    '#d2af69',
                    '#6e8852',
                    '#3dcc7e',
                    '#a6bed1',
                    '#cbaa4b',
                    '#998baa'
                ];

                return function (sprite, config, data, index) {
                    return {
                        fillStyle: colors[index],
                        strokeStyle: index % 2 ? 'none' : 'black',
                        opacity: index % 2 ? 1 : 0.5
                    };
                };
            })()

        }],
        sprites: [{
            type: 'text',
            text: 'Renderer assigns a unique color to each column in a series',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 40  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Google Chrome marker share in 2012 (Browser Stats)',
            fontSize: 10,
            x: 12,
            y: 470
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 485
        }]
    }]

});