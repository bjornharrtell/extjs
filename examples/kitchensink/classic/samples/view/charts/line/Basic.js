/**
 * A basic line chart displays information as a series of data points connected through
 * straight lines. It is similar to scatter plot, except that the points are connected.
 * Line charts are often used to visualize trends in data over a period.
 */
Ext.define('KitchenSink.view.charts.line.Basic', {
    extend: 'Ext.Panel',
    xtype: 'line-basic',
    controller: 'line-basic',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/line/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Browsers.js'
    }],
    // </example>
    width: 650,

    items: {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        animation: {
            duration: 200
        },
        store: {
            type: 'browsers'
        },
        insetPadding: 40,
        innerPadding: {
            left: 40,
            right: 40
        },
        sprites: [{
            type: 'text',
            text: 'Line Charts - Basic Line',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Browser Stats 2012',
            fontSize: 10,
            x: 12,
            y: 470
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 485
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            grid: true,
            minimum: 0,
            maximum: 24,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'month',
            yField: 'data1',
            style: {
                lineWidth: 2
            },
            marker: {
                radius: 4,
                lineWidth: 2
            },
            label: {
                field: 'data1',
                display: 'over'
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: 'onSeriesTooltipRender'
            }
        }],
        listeners: {
            itemhighlightchange: 'onItemHighlightChange'
        }
    },

    tbar: ['->', {
        text: 'Preview',
        handler: 'onPreview'
    }]

});
