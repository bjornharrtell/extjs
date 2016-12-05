Ext.define('KitchenSink.view.d3.heatmap.Pivot', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-heatmap-pivot',
    controller: 'heatmap-pivot',

    requires: [
        'KitchenSink.view.d3.heatmap.PivotController',
        'Ext.pivot.d3.HeatMap'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/heatmap/PivotController.js'
        },{
            type: 'Store',
            path: 'classic/samples/store/SalesPerEmployee.js'
        }
    ],
    // </example>

    width: 960,
    height: 600,

    layout: 'fit',
    resizable: true,

    items: {
        xtype: 'pivotheatmap',
        reference: 'heatmap',

        // pivot matrix configurations
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
            top: 20,
            right: 30,
            bottom: 70,
            left: 120
        },

        xAxis: {
            title: {
                attr: {
                    'font-size': '14px'
                }
            }
        },

        yAxis: {
            title: {
                attr: {
                    'font-size': '14px'
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
            docked: 'right',
            padding: 50,
            items: {
                count: 10,
                slice: [1],
                reverse: true,
                size: {
                    x: 60,
                    y: 30
                }
            }
        },

        tooltip: {
            renderer: 'onTooltip'
        }
    },

    tbar: [
        '->',
        {
            text: 'Refresh Data',
            handler: 'onRefreshData'
        }
    ]
});
