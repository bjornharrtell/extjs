Ext.define('Admin.view.charts.Pie3D', {
    extend: 'Ext.Panel',
    xtype: 'chartspie3dpanel',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.series.Pie3D',
        'Ext.chart.interactions.RotatePie3D'
    ],

    cls: 'quick-graph-panel shadow-panel',
    
    title: '3D Pie Chart',
    iconCls: 'x-fa fa-pie-chart',

    height: 300,
    ui: 'light', 
    layout: 'fit',
    headerPosition: 'bottom',

    bodyPadding:'15 15 0 15',

    items: [
        {
            xtype: 'polar',
            colors: [
                '#aed581',
                '#6aa5db',
                '#ee929c'
            ],
            interactions: 'rotate',
            insetPadding:0,
            bind: {
                store: '{piedatastore}'
            },
            series: [
                {
                    type: 'pie3d',
                    angleField: 'yvalue',
                    donut: 30
                }
            ]                                  
        }
    ]    
});
