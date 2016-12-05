/**
 *
 * This example shows how to create a pivot grid and display the results in
 * a compact layout.
 *
 */
Ext.define('KitchenSink.view.pivot.LayoutOutline', {
    extend: 'Ext.pivot.Grid',

    requires: [
        'KitchenSink.store.Sales',
        'KitchenSink.view.pivot.PivotController'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/pivot/PivotController.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/Sales.js'
    }],
    // </example>
    
    controller: 'pivot',

    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    startRowGroupsCollapsed: false,
    // Set this to false if multiple dimensions are configured on topAxis and
    // you want to automatically expand the col groups when calculations are ready.
    startColGroupsCollapsed: false,

    cls: 'demo-solid-background',
    shadow: true,

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // Set layout type to "outline"
        viewLayoutType: 'outline',

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex:  'value',
            header:     'Total',
            aggregator: 'sum',
            width:      110
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex:  'person',
            header:     'Person',
            width:      100
        },{
            dataIndex:  'company',
            header:     'Company',
            sortable:   false,
            width:      150
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex:  'country',
            header:     'Country'
        }]
    },

    listeners: {
        pivotgroupexpand: 'onPivotGroupExpand',
        pivotgroupcollapse: 'onPivotGroupCollapse'
    },

    items: [{
        docked: 'top',
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Expand all',
            handler: 'expandAll'
        },{
            xtype: 'button',
            text: 'Collapse all',
            handler: 'collapseAll'
        }]
    }]

});
