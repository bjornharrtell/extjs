/**
 * A basic 3D bar chart is a chart with horizontal bars of lengths proportional to the
 * magnitudes of the data it represents. Basic 3D bars can be used in the same manner as the
 * 3D column charts. Categories are typically organized along the vertical axis and values
 * along the horizontal axis. Tapping or hovering a bar will highlight it.
 */
Ext.define('KitchenSink.view.charts.bar3d.Basic', {
    extend: 'Ext.Panel',
    xtype: 'bar-basic-3d',
    controller: 'bar-basic-3d',

    requires: [
        'Ext.chart.theme.Muted'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/bar3d/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/EconomySectors.js'
    }],
    // </example>
    width: 650,

    items: [{
        xtype: 'cartesian',
        flipXY: true,
        reference: 'chart',
        width: '100%',
        height: 500,
        insetPadding: '40 40 30 40',
        innerPadding: '3 0 0 0',
        theme: {
            type: 'muted'
        },
        store: {
            type: 'economy-sectors'
        },
        animation: {
            easing: 'easeOut',
            duration: 500
        },
        interactions: ['itemhighlight'],
        axes: [{
            type: 'numeric3d',
            position: 'bottom',
            fields: 'ind',
            maximum: 4000000,
            majorTickSteps: 10,
            renderer: 'onAxisLabelRender',
            title: 'Billions of USD',
            grid: {
                odd: {
                    fillStyle: 'rgba(245, 245, 245, 1.0)'
                },
                even: {
                    fillStyle: 'rgba(255, 255, 255, 1.0)'
                }
            }
        }, {
            type: 'category3d',
            position: 'left',
            fields: 'country',
            label: {
                textAlign: 'right'
            },
            grid: true
        }],
        series: [{
            type: 'bar3d',
            xField: 'country',
            yField: 'ind',
            style: {
                minGapWidth: 10
            },
            highlight: true,
            label: {
                field: 'ind',
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }],
        sprites: [{
            type: 'text',
            text: 'Industry size in major economies (2011)',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition',
            fontSize: 10,
            x: 12,
            y: 490
        }]
    }],

    tbar: [
        '->',
        {
            text: 'Preview',
            handler: 'onPreview'
        }
    ]

});
