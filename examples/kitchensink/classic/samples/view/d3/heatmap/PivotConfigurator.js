/**
 * This example shows how to integrate the D3 HeatMap component with the pivot matrix
 * and the pivot configurator plugin.
 */
Ext.define('KitchenSink.view.d3.heatmap.PivotConfigurator', {
    extend: 'Ext.pivot.d3.Container',
    xtype: 'd3-view-heatmap-pivot-configurator',
    controller: 'heatmap-pivot',

    requires: [
        'KitchenSink.view.d3.heatmap.PivotController',
        'KitchenSink.store.pivot.Sales'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/heatmap/PivotController.js'
        },{
            type: 'Model',
            path: 'classic/samples/model/pivot/Sale.js'
        },{
            type: 'Store',
            path: 'classic/samples/store/pivot/Sales.js'
        }
    ],
    // </example>

    title: 'D3 HeatMap and Pivot Matrix integration',
    width: 960,
    height: 600,

    layout: 'fit',
    collapsible: true,
    resizable: true,

    matrix: {
        store: {
            type: 'sales'
        },

        aggregate: [{
            dataIndex: 'value',
            header: 'Value',
            aggregator: 'avg'
        }],

        leftAxis: [{
            dataIndex: 'person',
            header: 'Person'
        }],

        topAxis: [{
            dataIndex: 'year',
            header: 'Year'
        }]
    },

    // configurations specific to the HeatMap component
    drawing: {
        xtype: 'pivotheatmap',
        tooltip: {
            renderer: 'onTooltip'
        }
    },

    // configurations specific to the pivot configurator plugin
    configurator: {
        // It is possible to configure a list of fields that can be used to configure the pivot matrix
        // If no fields list is supplied then all fields from the Store model are fetched automatically
        fields: [{
            dataIndex:  'quantity',
            header:     'Qty',
            // You can even provide a default aggregator function to be used when this field is dropped
            // on the agg dimensions
            aggregator: 'sum',
            formatter: 'number("0")',

            settings: {
                // Define here in which areas this field could be used
                allowed: ['aggregate'],
                // Set a custom style for this field to inform the user that it can be dragged only to "Values"
                style: {
                    fontWeight: 'bold'
                },
                // Define here custom formatters that ca be used on this dimension
                formatters: {
                    '0': 'number("0")',
                    '0%': 'number("0%")'
                }
            }
        }, {
            dataIndex:  'value',
            header:     'Value',

            settings: {
                // Define here in which areas this field could be used
                allowed: 'aggregate',
                // Define here what aggregator functions can be used when this field is
                // used as an aggregate dimension
                aggregators: ['sum', 'avg', 'count'],
                // Set a custom style for this field to inform the user that it can be dragged only to "Values"
                style: {
                    fontWeight: 'bold'
                },
                // Define here custom formatters that ca be used on this dimension
                formatters: {
                    '0': 'number("0")',
                    '0.00': 'number("0.00")',
                    '0,000.00': 'number("0,000.00")',
                    '0%': 'number("0%")',
                    '0.00%': 'number("0.00%")'
                }
            }
        }, {
            dataIndex:  'company',
            header:     'Company',

            settings: {
                // Define here what aggregator functions can be used when this field is
                // used as an aggregate dimension
                aggregators: ['count']
            }
        }, {
            dataIndex:  'country',
            header:     'Country',

            settings: {
                // Define here what aggregator functions can be used when this field is
                // used as an aggregate dimension
                aggregators: ['count']
            }
        }, {
            dataIndex: 'person',
            header: 'Person',

            settings: {
                // Define here what aggregator functions can be used when this field is
                // used as an aggregate dimension
                aggregators: 'count'
            }
        }, {
            dataIndex:  'year',
            header:     'Year',

            settings: {
                // Define here in which areas this field could be used
                allowed: ['leftAxis', 'topAxis']
            }
        }, {
            dataIndex:      'month',
            header:         'Month',
            labelRenderer:  'monthLabelRenderer',

            settings: {
                // Define here in which areas this field could be used
                allowed: ['leftAxis', 'topAxis']
            }
        }]
    },

    listeners: {
        beforemoveconfigfield: 'onBeforeAddConfigField',
        showconfigfieldsettings: 'onShowFieldSettings'
    },

    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            text: 'Dock',
            menu: {
                defaults: {
                    xtype: 'menucheckitem',
                    group:  'docking',
                    checkHandler: 'changeDock'
                },
                items: [{
                    text: 'Top'
                },{
                    text: 'Right',
                    checked: true
                },{
                    text: 'Bottom'
                },{
                    text: 'Left'
                }]
            }
        }]
    }
});
