Ext.define('Admin.view.charts.Pie3D', {
    extend: 'Admin.view.charts.ChartBase',
    xtype: 'chartspie3dpanel',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.series.Pie3D'
    ],

    title: '3D Pie Chart',
    iconCls: 'x-fa fa-pie-chart',

    items: [{
        xtype: 'polar',
        colors: [
            '#aed581',
            '#6aa5db',
            '#ee929c'
        ],
        platformConfig: {
            '!phone': {
                interactions: 'rotate'
            }
        },
        bind: '{pieData}',
        series: [{
            type: 'pie3d',
            angleField: 'yvalue',
            donut: 30
        }]
    }]
});
