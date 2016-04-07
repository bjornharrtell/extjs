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
            '!phone': {
                interactions: 'rotate'
            }
        }
    }]
});
