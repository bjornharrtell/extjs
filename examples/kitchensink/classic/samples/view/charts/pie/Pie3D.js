/**
 * This example shows how to create a 3D Pie chart.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.pie.Pie3D', {
    extend: 'Ext.Panel',
    xtype: 'pie-3d',
    controller: 'pie-3d',
    requires: [
        'Ext.chart.PolarChart'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/pie/Pie3DController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Pie.js'
    }],
    // </example>

    layout: 'vbox',
    width: 650,

    tbar: [
        '->',
        {
            xtype: 'segmentedbutton',
            defaults: {
                width: 100
            },
            items: [{
                text: 'Opaque',
                pressed: true
            }, {
                text: 'Translucent'
            }],
            listeners: {
                toggle: 'onStyleToggle'
            }
        },
        {
            text: 'Switch Theme',
            handler: 'onThemeSwitch'
        }
    ],

    items: [{
        xtype: 'polar',
        reference: 'chart',
        innerPadding: 40,
        width: '100%',
        height: 500,
        store: {
            type: 'device-market-share'
        },
        theme: 'Muted',
        interactions: ['itemhighlight', 'rotatePie3d'],
        legend: {
            docked: 'bottom'
        },
        series: [
            {
                type: 'pie3d',
                angleField: 'data1',
                donut: 30,
                distortion: 0.6,
                highlight: {
                    margin: 40
                },
                label: {
                    field: 'os'
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }
        ]
    }, {
        xtype: 'container',
        width: '100%',
        padding: 10,
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: {
            xtype: 'form',
            defaults: {
                labelAlign: 'right',
                labelPad: 15,
                width: 400
            },
            items: [{
                xtype: 'sliderfield',
                fieldLabel: 'Thickness',
                value: 35,
                minValue: 20,
                maxValue: 70,
                listeners: {
                    change: 'onThicknessChange',
                    dragstart: 'onSliderDragStart',
                    dragend: 'onSliderDragEnd'
                }
            }, {
                xtype: 'sliderfield',
                fieldLabel: 'Distortion',
                value: 50,
                minValue: 35,
                maxValue: 65,
                listeners: {
                    change: 'onDistortionChange',
                    dragstart: 'onSliderDragStart',
                    dragend: 'onSliderDragEnd'
                }
            }, {
                xtype: 'sliderfield',
                fieldLabel: 'Bevel',
                value: 5,
                maxValue: 15,
                listeners: {
                    change: 'onBevelChange',
                    dragstart: 'onSliderDragStart',
                    dragend: 'onSliderDragEnd'
                }
            }, {
                xtype: 'sliderfield',
                fieldLabel: 'Donut',
                value: 30,
                maxValue: 50,
                listeners: {
                    change: 'onDonutChange',
                    dragstart: 'onSliderDragStart',
                    dragend: 'onSliderDragEnd'
                }
            }, {
                xtype: 'sliderfield',
                fieldLabel: 'Color Spread',
                value: 1,
                maxValue: 2,
                increment: 0.05,
                decimalPrecision: 2,
                listeners: {
                    change: 'onColorSpreadChange',
                    dragstart: 'onSliderDragStart',
                    dragend: 'onSliderDragEnd'
                }
            }]
        }
    }]
});
