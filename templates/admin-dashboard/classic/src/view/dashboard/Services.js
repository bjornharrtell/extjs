Ext.define('Admin.view.dashboard.Services', {
    extend: 'Ext.Panel',
    xtype: 'dashboardservicespanel',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    cls: 'service-type shadow-panel',
    height: 320,
    bodyPadding: 15,
    title: 'Services',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'container',
            width: 140,
            defaults: {
                height:126,
                insetPadding: '7.5 7.5 7.5 7.5',
                background: 'rgba(255, 255, 255, 1)',
                colors: [
                    '#6aa5dc',
                    '#fdbf00',
                    '#ee929d'
                ],
                bind: {
                    store: '{dashboard.QGPieStore}'
                },
                series: [
                    {
                        type: 'pie',
                        label: {
                            field: 'xField',
                            display: 'rotate',
                            contrast: true,
                            font: '12px Arial'
                        },
                        useDarkerStrokeColor: false,
                        xField: 'yvalue',
                        donut: 50,
                        padding:0
                    }
                ],
                interactions: [
                    {
                        type: 'rotate'
                    }
                ]
            },
            items: [
                {
                    xtype: 'polar'
                },
                {
                    xtype: 'polar'
                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype:'component',
                    data: {
                        name: 'Finance',
                        value: '20%'
                    },
                    tpl: '<div class="left-aligned-div">{name}</div><div class="right-aligned-div">{value}</div>'
                },
                {
                    xtype: 'progressbar',
                    cls: 'bottom-indent service-finance',
                    height: 4,
                    minHeight: 4,
                    value: 0.2
                },
                {
                    xtype:'component',
                    data: {
                        name: 'Research',
                        value: '68%'
                    },
                    tpl: '<div class="left-aligned-div">{name}</div><div class="right-aligned-div">{value}</div>'
                },
                {
                    xtype: 'progressbar',
                    cls: 'bottom-indent service-research',
                    height: 4,
                    minHeight: 4,
                    value: 0.68
                },
                {
                    xtype:'component',
                    data: {
                        name: 'Marketing',
                        value: '12%'
                    },
                    tpl: '<div class="left-aligned-div">{name}</div><div class="right-aligned-div">{value}</div>'
                },
                {
                    xtype: 'progressbar',
                    cls: 'bottom-indent service-marketing',
                    height: 4,
                    value: 0.12
                },
                {
                    xtype:'component',
                    html: '<div class="services-text">'+
                        'The year 2015 saw a significant change in the job market '+
                        'for the industry. With increasing goverment expenditure on research & development, jobs in '+
                        'the research sector rose to 68% from 47% in the previous financial year. Share of jobs in '+
                        'the finance sector remained more or less constant while that in marketing sector dropped to '+
                        '12%. The reduction in marketing jobs is attributed to increasing use of online advertising '+
                        'in recent years, which is largely automated.'+
                    '</div>' +
                    '<div class="services-legend">' +
                        '<span><div class="legend-finance"></div>Finance</span>' +
                        '<span><div class="legend-research"></div>Research</span>' +
                        '<span><div class="legend-marketing"></div>Marketing</span>' +
                    '<div>'
                }
            ]
        }
    ]
});
