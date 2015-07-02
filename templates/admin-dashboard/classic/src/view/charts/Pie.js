Ext.define('Admin.view.charts.Pie', {
    extend: 'Ext.Panel',
    xtype: 'chartspiepanel',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice'
    ],

    cls: 'quick-graph-panel shadow-panel',

    title: '2D Pie Chart',
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
            insetPadding:0,
            bind: {
                store: '{piedatastore}'
            },
            series: [
                {
                    type: 'pie',
                    label: {
                        field: 'xvalue',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Open Sans',
                        color: '#888'
                    },
                    xField: 'yvalue'
                }
            ],
            interactions: [
                {
                    type: 'rotate'
                }
            ]
        }
    ]
});
