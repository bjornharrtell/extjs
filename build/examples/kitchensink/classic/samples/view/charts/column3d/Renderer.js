/**
 * This example shows how to use a 3D column chart with a renderer
 * to alter the look of individual columns in the series based on
 * certain criteria (in this case column index).
 */
Ext.define('KitchenSink.view.charts.column3d.Renderer', {
    extend: 'Ext.Panel',
    xtype: 'column-renderer-3d',
    controller: 'column-renderer-3d',
    requires: ['Ext.chart.theme.Muted'],

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/column3d/RendererController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Browsers.js'
    }],
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
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            fields: 'month',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
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
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: 'onTooltipRender'
            },
            renderer: 'onColumnRender'

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