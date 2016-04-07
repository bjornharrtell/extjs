/**
 * The Basic 3D Column Chart displays a set of random data in a column series.
 * The "Download" button will trigger the download of the chart's image or
 * show the preview of the chart, if triggering the download is not permitted
 * on the target platform.
 *
 * Tapping or hovering a column will highlight it.
 */
Ext.define('KitchenSink.view.charts.column3d.Basic', {
    extend: 'Ext.Panel',
    xtype: 'column-basic-3d',
    requires: ['Ext.chart.theme.Muted'],
    controller: 'column-basic-3d',
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/column3d/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/EconomySectors.js'
    }],
    bodyStyle: 'background: transparent !important',
    layout: 'fit',
    // </example>

    width: 650,
    height: 500,

    tbar: [
        '->',
        {
            text: Ext.os.is.Desktop ? 'Download' : 'Preview',
            handler: 'onDownload'
        }
    ],

    items: {
        xtype: 'cartesian',
        reference: 'chart',
        theme: {
            type: 'muted'
        },
        store: {
            type: 'economy-sectors'
        },
        insetPadding: '40 40 40 20',
        animation: Ext.isIE8 ? false : {
            easing: 'backOut',
            duration: 500
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: 'ind',
            maximum: 4000000,
            majorTickSteps: 10,
            label: {
                textAlign: 'right'
            },
            renderer: 'onAxisLabelRender',
            title: 'Billions of USD',
            grid: {
                odd: {
                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                },
                even: {
                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                }
            }
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'country',
            grid: true
        }],
        series: [{
            type: 'bar3d',
            xField: 'country',
            yField: 'ind',
            style: {
                minGapWidth: 20
            },
            highlightCfg: {
                saturationFactor: 1.5
            },
            label: {
                field: 'ind',
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onTooltipRender'
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
    }

});
