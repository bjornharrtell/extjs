Ext.define('Admin.view.dashboard.TopMovie', {
    extend: 'Ext.panel.Panel',
    xtype: 'topmovies',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    title: 'Top Movie',
    ui: 'light',
    iconCls: 'x-fa fa-video-camera',
    headerPosition: 'bottom',

    cls: 'quick-graph-panel shadow',
    height: 130,
    layout: 'fit',

    items: [
        {
            xtype: 'polar',
            animation : !Ext.isIE9m && Ext.os.is.Desktop,
            height: 75,
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
