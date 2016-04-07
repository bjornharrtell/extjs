Ext.define('Admin.view.dashboard.TopMovie', {
    extend: 'Ext.Panel',
    xtype: 'topmovies',
    ui: 'light',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    height: 130,
    layout: 'fit',

    title: 'Top Movie',
    cls: 'quick-graph-panel',
    header: {
        docked: 'bottom'
    },
    platformConfig: {
        '!phone': {
            iconCls: 'x-fa fa-video-camera'
        }
    },

    items: [
        {
            xtype: 'polar',
            animation : !Ext.isIE9m && Ext.os.is.Desktop,
            height: '100%',
            width: '100%',
            background: '#33abaa',

            colors: [
                '#115fa6',
                '#94ae0a',
                '#a61120',
                '#ff8809',
                '#ffd13e',
                '#a61187',
                '#24ad9a',
                '#7c7474',
                '#a66111'
            ],

            radius: 100,

            bind: '{topMovies}',

            series: [
                {
                    type: 'pie',
                    colors: [
                        '#ffffff'
                    ],
                    label: {
                        field: 'x',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Arial'
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
