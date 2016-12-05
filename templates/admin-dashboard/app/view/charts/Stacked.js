Ext.define('Admin.view.charts.Stacked', {
    extend: 'Admin.view.charts.ChartBase',
    xtype: 'chartsstackedpanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.PanZoom'
    ],

    title: 'Stacked Bar Chart',
    iconCls: 'x-fa fa-bar-chart',

    items: [{
        xtype: 'cartesian',
        colors: [
            '#6aa5db',
            '#ee929c'
        ],
        bind: '{stackedData}',
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
        }],
        series: [{
            type: 'bar',
            xField: 'xvalue',
            yField: [
                'y2value',
                'y3value'
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
