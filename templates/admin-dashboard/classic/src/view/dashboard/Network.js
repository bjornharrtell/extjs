Ext.define('Admin.view.dashboard.Network', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.ProgressBar'
    ],

    xtype: 'dashboardnetworkpanel',
    cls: 'dashboard-main-chart shadow-panel',
    height: 380,

    bodyPadding: 15,

    title: 'Network',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tools: [
        {
            xtype: 'tool',
            toggleValue: false,
            cls: 'x-fa fa-refresh dashboard-tools',
            listeners: {
                click: 'onRefreshToggle'
            },
            width: 20,
            height: 20
        },
        {
            xtype: 'tool',                                    
            cls: 'x-fa fa-wrench dashboard-tools',
            width: 20,
            height: 20
        }
    ],

    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'cartesian',
                    animation : !Ext.isIE9m && Ext.os.is.Desktop,
                    insetPadding:0,
                    bind: {
                        store: '{dashboardfulllinechartstore}'
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
                                'y2value'
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
                            colors: [
                                'rgba(103, 144, 199, 0.6)'
                            ],
                            useDarkerStrokeColor: false,
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
                            useDarkerStrokeColor: false,
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
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            cls: 'graph-analysis-left',
            height: 138,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'dashboard-graph-analysis-left',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            padding: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'top-info-container',
                                    html: '<div class="inner"><span class="x-fa fa-pie-chart"></span><span class="dashboard-analytics-percentage"> 25% </span>server load</div>',
                                    padding: '15 10 10 0'
                                },
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'top-info-container',
                                    html: '<div class="inner"><span class="x-fa fa-user"></span><span class="dashboard-analytics-percentage"> 156 </span> online users</div>',
                                    padding: '15 10 10 0'
                                }
                            ]
                        },
                        {
                            xtype: 'progressbar',
                            flex: 1,
                            cls: 'left-top-text progressbar-no-text',
                            height: 3,
                            hideMode: 'offsets',
                            margin: '0 15 0 0',
                            maxHeight: 5,
                            minHeight: 3,
                            value: 0.4
                        },
                        {
                            xtype: 'box',
                            flex: 1,
                            cls: 'left-top-text',
                            html: 'Tip: Download the analytics mobile app for real time updates on the server.',
                            padding: '15 5 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'graph-analysis-right',
                    margin:'15 0 0 0',
                    padding:'0 0 0 15',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    itemPadding:'0 0 10 0',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            padding:'0 0 10 0',
                            items: [
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'graph-analysis-right-inner-container',
                                    html: 'Visitors'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    alignTarget: 'right',
                                    cls: 'graph-analysis-right-inner-container right-value',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            animation : !Ext.isIE9m && Ext.os.is.Desktop,
                                            minHeight: 50,
                                            background: 'rgba(255, 255, 255, 1)',
                                            colors: [
                                                'rgba(225,233,244, 0.8)'
                                            ],
                                            insetPadding: {
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0
                                            },
                                            bind: {
                                                store: '{dashboardvisitorchartstore}'
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
                                                        'y1value'
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
                                                    xField: 'xvalue',
                                                    yField: [
                                                        'y1value'
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
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            padding:'0 0 10 0',
                            items: [
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'graph-analysis-right-inner-container',
                                    html: 'Bounce Rates'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    cls: 'graph-analysis-right-inner-container right-value',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            animation : !Ext.isIE9m && Ext.os.is.Desktop,
                                            minHeight: 50,
                                            background: 'rgba(255, 255, 255, 1)',
                                            colors: [
                                                'rgba(250,222,225, 0.8)'
                                            ],
                                            insetPadding: {
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0
                                            },
                                            bind: {
                                                store: '{dashboardcouncechartstore}'
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
                                                        'y2value'
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
                                                    xField: 'xvalue',
                                                    yField: [
                                                        'y2value'
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
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            padding:'0 0 10 0',
                            items: [
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'graph-analysis-right-inner-container',
                                    html: 'Today\'s Sales'
                                },
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'graph-analysis-right-inner-container right-value',
                                    html: '189,000'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            padding:'0 0 10 0',
                            items: [
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'graph-analysis-right-inner-container',
                                    html: 'Broken Links'
                                },
                                {
                                    xtype: 'box',
                                    flex: 1,
                                    cls: 'graph-analysis-right-inner-container right-value',
                                    html: '4'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
