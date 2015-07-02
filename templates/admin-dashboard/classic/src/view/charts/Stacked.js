Ext.define('Admin.view.charts.Stacked', {
    extend: 'Ext.Panel',
    xtype: 'chartsstackedpanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.PanZoom'
    ],

    cls: 'quick-graph-panel shadow-panel',

    title: 'Stacked Bar Chart',
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
                '#6aa5db',
                '#ee929c'
            ],
            insetPadding:0,
            bind: {
                store: '{marketsharemultiyear}'
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
            ],
            series: [
                {
                    type: 'bar',
                    xField: 'xvalue',
                    yField: [
                        'y2value',
                        'y3value'
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
