/**
 * The Basic Column Chart displays a set of random data in a column series. The "Reload Data"
 * button will randomly generate a new set of data in the store.
 *
 * Tapping or hovering a column will highlight it.
 */
Ext.define('KitchenSink.view.charts.column.Basic', {
    extend: 'Ext.Panel',
    xtype: 'column-basic',
    controller: 'chart-column-basic',
    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: 'fit',
    otherContent: [{
        type: 'Controller',
        path: 'app/view/charts/column/BasicController.js'
    }],
    // </example>

    width: 650,
    height: 500,

    tbar: [
        '->',
        {
            text: 'Preview',
            platformConfig: {
                desktop: {
                    text: 'Download'
                }
            },
            handler: 'onDownload'
        },
        {
            text: 'Reload Data',
            handler: 'onReloadData'
        }
    ],

    items: {
        xtype: 'cartesian',
        reference: 'chart',
        store: {
            type: 'climate'
        },
        insetPadding: {
            top: 40,
            bottom: 40,
            left: 20,
            right: 40
        },
        interactions: 'itemhighlight',
        axes: [{
            type: 'numeric',
            position: 'left',
            minimum: 40,
            titleMargin: 20,
            title: {
                text: 'Temperature in °F'
            },
            listeners: {
                rangechange: 'onAxisRangeChange'
            }
        }, {
            type: 'category',
            position: 'bottom'
        }],
        animation: Ext.isIE8 ? false : {
            easing: 'backOut',
            duration: 500
        },
        series: {
            type: 'bar',
            xField: 'month',
            yField: 'highF',
            style: {
                minGapWidth: 20
            },
            highlight: {
                strokeStyle: 'black',
                fillStyle: 'gold',
                lineDash: [5, 3]
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
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }
    }

});
