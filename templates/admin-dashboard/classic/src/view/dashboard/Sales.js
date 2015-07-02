Ext.define('Admin.view.dashboard.Sales', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboardsalespanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar'
    ],

    cls: 'quick-graph-panel shadow-panel',
    height: 130,
    layout: 'fit',
    headerPosition: 'bottom',
    iconCls: 'x-fa fa-briefcase',

    title: 'Sales',
    tools: [
        {
            xtype: 'tool',
            cls: 'quick-graph-panel-tool x-fa fa-ellipsis-v'
        }
    ],
    
    items: [
        {
            xtype: 'cartesian',
            animation : !Ext.isIE9m && Ext.os.is.Desktop,
            height: 75,
            background: '#8561c5',
            colors: [
                '#ffffff'
            ],
            bind: {
                store: '{dashboard.QGBarStore}'
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
