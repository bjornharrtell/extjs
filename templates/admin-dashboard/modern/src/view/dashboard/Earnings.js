Ext.define('Admin.view.dashboard.Earnings', {
    extend: 'Ext.Panel',
    xtype: 'earnings',
    ui: 'light',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    height: 130,
    layout: 'fit',

    title: 'Earnings',
    cls: 'quick-graph-panel',
    header: {
        docked: 'bottom'
    },
    platformConfig: {
        '!phone': {
            iconCls: 'x-fa fa-dollar'
        }
    },

    items: [
        {
            xtype: 'cartesian',
            animation : !Ext.isIE9m && Ext.os.is.Desktop,
            background: '#35baf6',
            colors: [
                '#483D8B',
                '#94ae0a',
                '#a61120',
                '#ff8809',
                '#ffd13e',
                '#a61187',
                '#24ad9a',
                '#7c7474',
                '#a66111'
            ],
            height: '100%',
            width: '100%',

            bind: {
                store: '{earnings}'
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
                    type: 'line',
                    style: {
                        stroke: '#FFFFFF',
                        'stroke-width': '2px'
                    },
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
