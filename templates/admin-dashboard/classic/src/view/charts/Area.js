Ext.define('Admin.view.charts.Area', {
    extend: 'Ext.Panel',
    xtype: 'chartsareapanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    cls: 'quick-graph-panel shadow-panel',
   
    iconCls: 'x-fa fa-area-chart',
    title: 'Area Chart',
    
    height: 300,
    ui: 'light', 
    layout: 'fit',
    headerPosition: 'bottom',

    bodyPadding:'15 15 0 15',

    items: [
        {
            xtype: 'cartesian',
            colors: [
                '#115fa6',
                '#94ae0a'
            ],
            insetPadding:0,
            bind: {
                store: '{dashboardfulllinechartstore}'
            },
            innerPadding: { top : 10, left: 0, bottom: 0, right : 0 },
            series: [
                {
                    type: 'line',
                    colors: [
                        'rgba(103, 144, 199, 0.6)'
                    ],
                    xField: 'xvalue',
                    yField: [
                        'y1value'
                    ],
                    fill: true,
                    smooth: true
                },
                {
                    type: 'line',
                    colors: [
                        'rgba(238, 146, 156, 0.6)'
                    ],
                    xField: 'xvalue',
                    yField: [
                        'y2value'
                    ],
                    fill: true,
                    smooth: true
                }
            ],
            interactions: [
                {
                    type: 'panzoom'
                }
            ],
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
                }
            ]
        }
    ]
});
