Ext.define('Admin.view.charts.Bar', {
    extend: 'Admin.view.charts.ChartBase',
    xtype: 'chartsbarpanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Bar'
    ],

    title: 'Bar Chart',
    iconCls: 'x-fa fa-bar-chart',

    items: [{
        xtype: 'cartesian',
        colors: [
            '#6aa5db'
        ],
        bind: '{barData}',
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
                'yvalue'
            ],
            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },
            hidden: true,
            position: 'left'
        }],
        series: [{
            type: 'bar',
            xField: 'xvalue',
            yField: [
                'yvalue'
            ]
        }],
        platformConfig: {
            phone: {
                // On a phone the whole view becomes a vertical strip of charts,
                // which makes it impossible to scroll the view if touch action
                // started on a chart. So we use a custom touchAction config.
                touchAction: {
                    panX: true,
                    panY: true
                }
            },
            '!phone': {
                interactions: {
                    type: 'panzoom',
                    zoomOnPanGesture: true
                }
            }
        }
    }]
});
