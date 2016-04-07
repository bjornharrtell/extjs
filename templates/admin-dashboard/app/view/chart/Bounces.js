Ext.define('Admin.view.chart.Bounces', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'chartbounces',

    requires: [
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.PanZoom'
    ],

    animation : !Ext.isIE9m && Ext.os.is.Desktop,

    height: 22,

    background: 'rgba(255, 255, 255, 1)',
    colors: [
        'rgba(250,222,225, 0.8)'
    ],

    insetPadding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    axes: [
        {
            type: 'category',
            fields: [
                'xvalue'
            ],
            hidden: true,
            position: 'bottom'
        },
        {
            type: 'numeric',
            fields: [
                'y2value'
            ],
            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },
            hidden: true,
            position: 'left'
        }
    ],

    series: [
        {
            type: 'area',
            xField: 'xvalue',
            yField: [
                'y2value'
            ]
        }
    ],

    interactions: [
        {
            type: 'panzoom'
        }
    ]
});
