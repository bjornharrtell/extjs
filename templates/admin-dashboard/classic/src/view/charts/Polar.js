Ext.define('Admin.view.charts.Polar', {
    extend: 'Ext.Panel',
    xtype: 'chartspolarpanel',

    requires: [
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.PolarChart',
        'Ext.chart.series.Radar'
    ],

    cls: 'quick-graph-panel shadow-panel',

    title: 'Radial Chart',
    iconCls: 'x-fa fa-dot-circle-o',

    height: 300,
    ui: 'light', 
    layout: 'fit',
    headerPosition: 'bottom',

    bodyPadding:'15 15 0 15',

    items: [
        {
            xtype: 'polar',
            colors: [
                '#6aa5db'
            ],
            insetPadding:20,
            bind: {
                store: '{radialchartstore}'
            },
            axes: [
                {
                    type: 'numeric',
                    fields: [
                        'yvalue'
                    ],
                    grid: true,
                    position: 'radial'
                },
                {
                    type: 'category',
                    fields: [
                        'xvalue'
                    ],
                    grid: true,
                    position: 'angular'
                }
            ],
            series: [
                {
                    type: 'radar',
                    xField: 'xvalue',
                    yField: 'yvalue'
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
