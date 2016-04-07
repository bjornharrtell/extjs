Ext.define('Admin.view.charts.Area', {
    extend: 'Admin.view.charts.ChartBase',

    xtype: 'chartsareapanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    title: 'Area Chart',
    iconCls: 'x-fa fa-area-chart',

    items: [{
        xtype: 'cartesian',
        colors: [
            '#115fa6',
            '#94ae0a'
        ],
        bind: '{areaData}',
        series: [
            {
                type: 'line',
                colors: [
                    'rgba(103, 144, 199, 0.6)'
                ],
                xField: 'xvalue',
                yField: [
                    'y1value'
                ],
                fill: true,
                smooth: true
            },
            {
                type: 'line',
                colors: [
                    'rgba(238, 146, 156, 0.6)'
                ],
                xField: 'xvalue',
                yField: [
                    'y2value'
                ],
                fill: true,
                smooth: true
            }
        ],
        platformConfig: {
            '!phone': {
                interactions: {
                    type: 'panzoom',
                    zoomOnPanGesture: true
                }
            }
        },
        axes: [{
            type: 'category',
            fields: [
                'xvalue'
            ],
            hidden: true,
            position: 'bottom'
        },{
            type: 'numeric',
            fields: [
                'y1value',
                'y2value',
                'y3value'
            ],
            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },
            hidden: true,
            position: 'left'
        }]
    }]
});
