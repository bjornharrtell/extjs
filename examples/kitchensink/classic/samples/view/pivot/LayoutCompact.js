/**
 *
 * This example shows how to create a pivot grid and display the results in
 * a compact layout.
 *
 */
Ext.define('KitchenSink.view.pivot.LayoutCompact', {
    extend: 'Ext.pivot.Grid',
    xtype: 'compact-pivot-grid',
    controller: 'pivotlayout',

    requires: [
        'KitchenSink.store.pivot.Sales',
        'KitchenSink.view.pivot.LayoutController'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/LayoutController.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/pivot/Sale.js'
    },{
        type: 'Store',
        path: 'classic/samples/store/pivot/Sales.js'
    }],
    profiles: {
        classic: {
            width: 600
        },
        neptune: {
            width: 750
        }
    },
    //</example>

    title: 'Compact layout',
    width: '${width}',
    height: 350,
    collapsible: true,
    multiSelect: true,

    selModel: {
        type: 'cellmodel'
    },

    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    startRowGroupsCollapsed: false,

    // Set this to false if multiple dimensions are configured on topAxis and
    // you want to automatically expand the col groups when calculations are ready.
    startColGroupsCollapsed: false,

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // change the text of the column generated for all left axis dimensions
        textRowLabels: 'Custom header',
        // change the width of the column generated for all left axis dimensions
        compactViewColumnWidth: 210,
        // Set layout type to "compact"
        viewLayoutType: 'compact',

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex: 'value',
            header: 'Total',
            aggregator: 'sum',
            width: 90
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex: 'person',
            header: 'Person'
        }, {
            dataIndex: 'company',
            header: 'Company',
            sortable: false
        }, {
            dataIndex: 'country',
            header: 'Country'
        }],


        // Configure the top axis dimensions that will be used to generate the columns.
        // When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
        // are defined then each top axis result will have in the end a column header with children
        // columns for each aggregate dimension defined.
        topAxis: [{
            dataIndex: 'year',
            header: 'Year'
        }, {
            dataIndex: 'month',
            header: 'Month',
            labelRenderer: 'monthLabelRenderer'
        }]
    },

    listeners: {
        pivotgroupexpand: 'onPivotGroupExpand',
        pivotgroupcollapse: 'onPivotGroupCollapse'
    },

    tbar: [{
        text: 'Collapsing',
        menu: [{
            text: 'Collapse all',
            handler: 'collapseAll'
        },{
            text: 'Expand all',
            handler: 'expandAll'
        }]
    },{
        text: 'Subtotals position',
        menu: {
            defaults: {
                xtype: 'menucheckitem',
                group:  'subtotals',
                checkHandler: 'subtotalsHandler'
            },
            items: [{
                text: 'First',
                checked: true
            },{
                text: 'Last'
            },{
                text: 'None'
            }]
        }
    },{
        text: 'Totals position',
        menu: {
            defaults: {
                xtype: 'menucheckitem',
                group:  'totals',
                checkHandler: 'totalsHandler'
            },
            items: [{
                text: 'First'
            },{
                text: 'Last',
                checked: true
            },{
                text: 'None'
            }]
        }
    }]
});
