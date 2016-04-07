/**
 * A basic scatter chart or scatter plot uses Cartesian coordinates to display values for
 * two variables for a set of data. The data is displayed as a collection of points, each
 * having the value of one variable on the horizontal axis and the value of the other
 * variable vertical axis.
 */
Ext.define('KitchenSink.view.charts.scatter.Basic', {
    extend: 'Ext.Panel',
    xtype: 'scatter-basic',
    controller: 'scatter-basic',

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
        path: 'classic/samples/view/charts/scatter/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/LifeExpectancy.js'
    }],
    // </example>
    width: 650,

    tbar: {
        reference: 'toolbar',
        items: [
            '->',
            {
                text: 'Preview',
                handler: 'onPreview'
            },
            {
                text: 'Reset pan/zoom',
                handler: 'onPanZoomReset'
            }
        ]
    },

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        theme: 'Muted',
        width: '100%',
        height: 600,
        innerPadding: 20,
        insetPadding: '50 40 10 10',
        store: {
            type: 'life-expectancy'
        },
        interactions: [
            {
                type: 'panzoom',
                zoomOnPanGesture: true
            },
            'itemhighlight'
        ],
        axes: [{
            type: 'numeric',
            position: 'bottom',
            fields: 'spending',
            title: 'Health care spending per person, in U.S. dollars',
            minimum: 0,
            maximum: 10000,
            majorTickSteps: 10,
            limits: {
                value: 3980,
                line: {
                    title: {
                        text: 'OECD average',
                        fontWeight: 'bold'
                    },
                    lineDash: [2,2]
                }
            }
        }, {
            type: 'numeric',
            position: 'left',
            fields: 'expectancy',
            title: 'Average life expectancy at birth',
            limits: {
                value: 80.1,
                line: {
                    title: {
                        text: 'OECD average',
                        fontWeight: 'bold'
                    },
                    lineDash: [2,2]
                }
            }
        }],
        sprites: [{
            type: 'text',
            text: 'Life expectancy at birth in 2013',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 30  // the sprite y position
        }],
        series: [{
            type: 'scatter',
            xField: 'spending',
            yField: 'expectancy',
            marker: { // defaults to 'circle' sprite
                radius: 4
            },
            highlight: {
                fillStyle: 'yellow',
                lineWidth: 2
            },
            style: {
                // Defaults to 20. Scatter series use simple kind of hit testing:
                // hit point should be within selectionTolerance from the data point.
                // We make selectionTolerance equal to the marker's radius here.
                selectionTolerance: 4
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            },
            label: {
                field: 'country',
                display: 'over',
                fontSize: 10,
                translateY: 5, // lower label closer to the marker
                renderer: 'onSeriesLabelRender'
            }
        }]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
