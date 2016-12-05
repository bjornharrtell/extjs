/**
 * Demonstrates how to use Ext.chart.series.Pie3D
 */
//<feature charts>
Ext.define('KitchenSink.view.chart.Pie3D', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie3D',
        'Ext.chart.interactions.RotatePie3D',
        'Ext.chart.theme.Muted'
    ],

    controller: 'chart',

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/chart/ChartController.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/Pie.js' 
    }],
    // </example>
    
    layout: 'fit',
    shadow: true,

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
            handler: 'onRefresh'
        }]
    }, {
        // Bug: When a theme is not specified, the pie disappears on 'rotate', leaving only the shadows.
        // Bug: With or without theme, the shadow doesn't show anymore - except the bug above.
        xtype: 'polar',
        store: {
            type: 'pie'
        },
        theme: 'Muted',
        innerPadding: 20,
        platformConfig: {
            desktop: {
                innerPadding: 60
            }
        },
        background: 'white',
        interactions: 'rotatePie3d',
        animate: {
            duration: 500,
            easing: 'easeIn'
        },
        series: [{
            type: 'pie3d',
            angleField: 'g1',
            donut: 30,
            distortion: 0.6,
            highlight: {
                margin: 40
            },
            thickness: 40,
            platformConfig: {
                desktop: {
                    thickness: 60
                }
            },
            label: {
                field: 'name',
                calloutColor: 'rgba(0,0,0,0)',
                calloutLine: {
                    length: 1
                }
            },
            style: {
                strokeStyle: 'none'
            }
        }]
    }]
});
//</feature>
