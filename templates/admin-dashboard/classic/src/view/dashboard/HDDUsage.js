Ext.define('Admin.view.dashboard.HDDUsage', {
    extend: 'Ext.panel.Panel',
    xtype: 'hddusage',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.PanZoom'

    ],

    title: 'HDD Usage',
    ui: 'light',
    iconCls: 'x-fa fa-database',
    headerPosition: 'bottom',

    cls: 'quick-graph-panel shadow',
    height: 130,
    layout: 'fit',

    items: [
        {
            xtype: 'cartesian',
            animation : !Ext.isIE9m && Ext.os.is.Desktop,
            constrain: true,
            constrainHeader: true,
            background: '#70bf73',
            colors: [
                '#a9d9ab'
            ],
            bind: {
                store: '{hddusage}'
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
                    type: 'area',
                    style: {
                        stroke: '#FFFFFF',
                        'stroke-width': '2px'
                    },
                    useDarkerStrokeColor: false,
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
