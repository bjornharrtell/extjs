Ext.define('KitchenSink.view.d3.heatmap.Pivot', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-heatmap-pivot',

    requires: [
        'KitchenSink.view.d3.heatmap.PivotController',
        'Ext.pivot.d3.HeatMap'
    ],

    controller: 'heatmap-pivot',
    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/d3/heatmap/PivotController.js'
    }],
    // </example>

    layout: 'fit',
    
    items: [{
        xtype: 'toolbar',
        docked: 'bottom',
        items: [{
            text: 'Refresh Data',
            handler: 'onRefreshData'
        }]
    },{
        xtype: 'pivotheatmap',
        reference: 'heatmap',

        matrix: {
            store: {
                type: 'salesperemployee'
            },
            leftAxis: {
                dataIndex: 'employee',
                header: 'Employee',
                sortable: false
            },
            topAxis: {
                dataIndex: 'day',
                sortIndex: 'dayNumber',
                header: 'Day'
            },
            aggregate: {
                dataIndex: 'sales',
                aggregator: 'sum'
            }
        },

        padding: {
            top: 0,
            right: 0,
            bottom: 5,
            left: 100
        },

        xAxis: {
            title: {
                attr: {
                    'font-size': '12px'
                }
            }
        },

        yAxis: {
            title: {
                attr: {
                    'font-size': '12px'
                }
            }
        },

        colorAxis: {
            scale: {
                type: 'linear',
                range: ['#ffffd9', '#49b6c4', '#225ea8']
            }
        },

        legend: {
            items: {
                count: 5
            }
        },

        tooltip: {
            renderer: 'onTooltip'
        },

        platformConfig: {
            phone: {
                tiles: {
                    cls: 'phone-tiles'
                }
            },
            tablet: {
                tiles: {
                    cls: 'tablet-tiles'
                }
            }
        }

    }]
});
