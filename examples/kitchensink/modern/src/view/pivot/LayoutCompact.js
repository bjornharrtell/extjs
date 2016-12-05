/**
 *
 * This example shows how to create a pivot grid and display the results in
 * a compact layout.
 *
 */
Ext.define('KitchenSink.view.pivot.LayoutCompact', {
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

    cls: 'demo-solid-background',
    shadow: true,

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
            dataIndex:  'value',
            header:     'Total',
            aggregator: 'sum',
            width:      120
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex:  'person',
            header:     'Person'
        },{
            dataIndex:  'company',
            header:     'Company',
            sortable:   false
        },{
            dataIndex:  'country',
            header:     'Country'
        }],


        // Configure the top axis dimensions that will be used to generate the columns.
        // When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
        // are defined then each top axis result will have in the end a column header with children
        // columns for each aggregate dimension defined.
        topAxis: [{
            dataIndex:  'year',
            header:     'Year'
        }, {
            dataIndex:      'month',
            header:         'Month',
            labelRenderer:  'monthLabelRenderer'
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
