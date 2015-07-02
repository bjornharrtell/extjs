Ext.define('Admin.view.charts.Bar', {
    extend: 'Ext.Panel',
    xtype: 'chartsbarpanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.PanZoom'        
    ],

    cls: 'quick-graph-panel shadow-panel',

    title: 'Bar Chart',
    iconCls: 'x-fa fa-bar-chart',
    
    height: 300,
    ui: 'light', 
    layout: 'fit',
    headerPosition: 'bottom',

    bodyPadding:'15 15 0 15',

    items: [
        {
            xtype: 'cartesian',
            colors: [
                '#6aa5db'
            ],
            insetPadding:0,
            bind: {
                store: '{marketshareoneyear}'
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
                        'yvalue'
                    ],
                    grid: {
                        odd: {
                            fill: '#e8e8e8'
                        }
                    },
                    hidden: true,
                    position: 'left'
                }
            ],
            series: [
                {
                    type: 'bar',
                    xField: 'xvalue',
                    yField: [
                        'yvalue'
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
