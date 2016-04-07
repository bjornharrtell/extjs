Ext.define('Admin.view.dashboard.Network', {
    extend: 'Ext.Panel',
    xtype: 'network',

    requires: [
        'Ext.Progress',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Area',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    height: 380,

    platformConfig: {
        phone: {
            height: 300
        }
    },

    bodyPadding: 15,

    title: 'Network',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tools: [
        {
            type: 'refresh',
            listeners: {
                click: 'onRefreshToggle'
            }
        },
        {
            type: 'wrench'
        }
    ],

    items: [
        {
            xtype: 'chartnetwork',
            flex: 1,
            bind: '{networkData}'
        },
        {
            xtype: 'container',
            userCls: 'graph-analysis-left',
            height: 138,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    userCls: 'dashboard-graph-analysis-left',
                    padding: '0 15 0 0',
                    margin: '15 0 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 700': {
                            hidden: true
                        },
                        'width >= 700': {
                            hidden: false
                        }
                    },
                    items: [
                        {
                            xtype: 'container',
                            padding: '0 0 15 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'top-info-container',
                                    html: '<div class="inner"><span class="x-fa fa-pie-chart"></span><span class="dashboard-analytics-percentage"> 25% </span>server load</div>',
                                    padding: '10 10 10 0'
                                },
                                {
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'top-info-container',
                                    html: '<div class="inner"><span class="x-fa fa-user"></span><span class="dashboard-analytics-percentage"> 156 </span> online users</div>',
                                    padding: '10 10 10 0'
                                }
                            ]
                        },
                        {
                            xtype: 'progress',
                            ui: 'plain',
                            margin: '0 15 0 0',
                            maxHeight: 5,
                            minHeight: 3,
                            value: 0.4
                        },
                        {
                            xtype: 'component',
                            flex: 1,
                            userCls: 'left-top-text',
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
                    userCls: 'graph-analysis-right',
                    margin:'15 0 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '0 0 10 0'
                    },
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
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container',
                                    html: 'Visitors'
                                },
                                {
                                    xtype: 'chartvisitors',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container right-value',
                                    bind: {
                                        store: '{visitors}'
                                    }
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
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container',
                                    html: 'Bounce Rates'
                                },
                                {
                                    xtype: 'chartbounces',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container right-value',
                                    bind: {
                                        store: '{bounces}'
                                    }
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
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container',
                                    html: 'Today\'s Sales'
                                },
                                {
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container right-value',
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
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container',
                                    html: 'Broken Links'
                                },
                                {
                                    xtype: 'component',
                                    flex: 1,
                                    userCls: 'graph-analysis-right-inner-container right-value',
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
