Ext.define('Admin.view.charts.Line', {
    extend: 'Ext.Panel',
    xtype: 'chartslinepanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Line'

    ],

    cls: 'quick-graph-panel shadow-panel',

    title: 'Line Chart',
    iconCls: 'x-fa fa-line-chart',

    height: 300,
    ui: 'light', 
    layout: 'fit',
    headerPosition: 'bottom',

    bodyPadding:'15 15 0 15',

    items: [
        {
            xtype: 'cartesian',
            colors: [
                '#6aa5db',
                '#94ae0a'
            ],
            insetPadding:0,
            bind: {
                store: '{marketshareoneentitystore}'
            },
            axes: [
                {
                    type: 'category',
                    fields: [
                        'xvalue'
                    ],
                    hidden: true,
                    position: 'bottom'
                },
                {
                    type: 'numeric',
                    fields: [
                        'yvalue',
                        'y1value',
                        'y2value',
                        'y3value',
                        'y4value',
                        'y5value'
                    ],
                    hidden: true,
                    position: 'left'
                }
            ],
            series: [
                {
                    type: 'line',
                    xField: 'xvalue',
                    yField: [
                        'yvalue'
                    ]
                },
                {
                    type: 'line',
                    xField: 'xvalue',
                    yField: [
                        'y1value'
                    ]
                }                                       
            ],
            interactions: [
                {
                    type: 'panzoom'
                }
            ]
        }
    ]

});
