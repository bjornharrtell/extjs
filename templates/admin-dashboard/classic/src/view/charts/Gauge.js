Ext.define('Admin.view.charts.Gauge', {
    extend: 'Ext.Panel',
    xtype: 'chartsgaugepanel',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Gauge'
    ],

    cls: 'quick-graph-panel shadow-panel',

    title: 'Gauge Chart',
    iconCls: 'x-fa fa-wifi',

    height: 300,
    ui: 'light', 
    layout: 'fit',
    headerPosition: 'bottom',

    bodyPadding:'15 15 0 15',

    items: [
        {
            xtype: 'polar',
            colors: [
                '#6aa5db',
                '#aed581'
            ],
            insetPadding:0,
            bind: {
                store: '{gaugechartstore}'
            },
            series: [
                {
                    type: 'gauge',
                    angleField: 'position',
                    needleLength: 100
                }
            ]
        }
    ]

});
