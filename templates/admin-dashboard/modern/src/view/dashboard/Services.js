Ext.define('Admin.view.dashboard.Services', {
    extend: 'Ext.Panel',
    xtype: 'services',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    cls: 'service-type',
    height: 320,
    bodyPadding: 15,
    title: 'Services',
    layout: 'vbox',

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'polar',
                    height: 124,
                    width: 132,
                    insetPadding: '4 8 7 0',
                    innerPadding: 2,
                    background: 'rgba(255, 255, 255, 1)',
                    colors: [
                        '#6aa5dc',
                        '#fdbf00',
                        '#ee929d'
                    ],
                    bind: '{servicePerformance}',
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
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
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
                            xtype: 'progress',
                            ui: 'finance',
                            userCls: 'bottom-indent service-finance',
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
                            xtype: 'progress',
                            ui: 'research',
                            userCls: 'bottom-indent service-research',
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
                            xtype: 'progress',
                            ui: 'marketing',
                            userCls: 'service-marketing',
                            height: 4,
                            value: 0.12
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [{
                xtype: 'polar',
                platformConfig: {
                    phone: {
                        hidden: true
                    }
                },
                height: 124,
                width: 132,
                insetPadding: '7 8 4 0',
                innerPadding: 2,
                background: 'rgba(255, 255, 255, 1)',
                colors: [
                    '#6aa5dc',
                    '#fdbf00',
                    '#ee929d'
                ],
                bind: {
                    store: '{servicePerformance}'
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
                interactions: 'rotate'
            },{
                xtype: 'component',
                flex: 1,
                html: '<div class="services-text">' +
                    'The year 2015 saw a significant change in the job market ' +
                    'for the industry. With increasing goverment expenditure on research & development, jobs in ' +
                    'the research sector rose to 68% from 47% in the previous financial year. Share of jobs in ' +
                    'the finance sector remained more or less constant while that in marketing sector dropped to ' +
                    '12%. The reduction in marketing jobs is attributed to increasing use of online advertising ' +
                    'in recent years, which is largely automated.' +
                '</div>' +
                '<div class="services-legend">' +
                    '<div class="legend-item"><span class="legend-icon legend-finance"></span><span class="legend-text">Finance</span></div>' +
                    '<div class="legend-item"><span class="legend-icon legend-research"></span><span class="legend-text">Research</span></div>' +
                    '<div class="legend-item"><span class="legend-icon legend-marketing"></span><span class="legend-text">Marketing</span></div>' +
                '<div>'
            }]
        }
    ]
});
