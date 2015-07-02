/**
 * This example shows how to define multiple axes in a single direction. It also shows
 * how to have slave axes linked to the master axis. Slave axes mirror the data and the
 * layout of the master axis, but can be styled and positioned differently. The example
 * also shows how to use gradients in charts.
 *
 * Click and drag to select a region to zoom into. Double-click to undo the last zoom.
 */
Ext.define('KitchenSink.view.charts.column.MultiAxis', {
    extend: 'Ext.container.Container',
    xtype: 'column-multi-axis',
    controller: 'column-multi-axis',

    // <example>
    // Content between example tags is omitted from code preview.
    layout: 'fit',
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/column/MultiAxisController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Climate.js'
    }],
    // </example>
    width: 650,
    height: 500,

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        store: {
            type: 'climate'
        },
        insetPadding: 10,
        innerPadding: {
            left: 20,
            right: 20
        },
        interactions: 'crosszoom',
        axes: [
            {
                type: 'numeric',
                id: 'fahrenheit-axis',
                adjustByMajorUnit: true,
                position: 'left',
                titleMargin: 20,
                minimum: 32,
                grid: true,
                title: {
                    text: 'Temperature in °F'
                },
                listeners: {
                    rangechange: 'onAxisRangeChange'
                }
            },
            {
                id: 'celsius-axis',
                type: 'numeric',
                titleMargin: 20,
                position: 'right',
                title: {
                    text: 'Temperature in °C',
                    fillStyle: 'red'
                }
            },
            {
                id: 'months-axis',
                type: 'category',
                position: 'bottom'
            },
            {
                position: 'top',
                linkedTo: 'months-axis',
                title: {
                    text: 'Climate data for Redwood City, California',
                    fillStyle: 'green'
                },
                titleMargin: 20
            }
        ],
        // Series are dynamically added in the view controller.
        gradients: [{
            id: 'rainbow',
            type: 'linear',
            degrees: 270,
            stops: [
                {
                    offset: 0,
                    color: '#78C5D6'
                },
                {
                    offset: 0.14,
                    color: '#449AA7'
                },
                {
                    offset: 0.28,
                    color: '#79C267'
                },
                {
                    offset: 0.42,
                    color: '#C4D546'
                },
                {
                    offset: 0.56,
                    color: '#F5D63D'
                },
                {
                    offset: 0.70,
                    color: '#F18B32'
                },
                {
                    offset: 0.84,
                    color: '#E767A1'
                },
                {
                    offset: 1,
                    color: '#BF62A6'
                }
            ]
        }]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
