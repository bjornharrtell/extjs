Ext.define('Admin.view.charts.Polar', {
    extend: 'Admin.view.charts.ChartBase',
    xtype: 'chartspolarpanel',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.series.Radar'
    ],

    title: 'Radial Chart',
    iconCls: 'x-fa fa-dot-circle-o',

    items: [{
        xtype: 'polar',
        colors: ['#6aa5db'],
        bind: '{radialData}',
        axes: [{
            type: 'numeric',
            fields: [
                'yvalue'
            ],
            grid: true,
            position: 'radial'
        },{
            type: 'category',
            fields: [
                'xvalue'
            ],
            grid: true,
            position: 'angular'
        }],
        series: [{
            type: 'radar',
            xField: 'xvalue',
            yField: 'yvalue'
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
                interactions: 'rotate'
            }
        }
    }]
});
