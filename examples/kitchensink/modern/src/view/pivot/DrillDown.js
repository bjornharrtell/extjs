/**
 *
 * This example shows how to create a pivot grid and drill down the results.
 *
 * DblClick a cell to open the drill down window and see all records used to
 * aggregate that cell.
 *
 */
Ext.define('KitchenSink.view.pivot.DrillDown', {
    extend: 'Ext.pivot.Grid',

    requires: [
        'KitchenSink.store.Sales',
        'KitchenSink.view.pivot.PivotController',
        'Ext.pivot.plugin.DrillDown'
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
    
    controller: {
        type: 'pivot',
        events: ['showdrilldownpanel', 'hidedrilldownpanel']
    },

    plugins: [{
        type: 'pivotdrilldown'
    }],

    cls: 'demo-solid-background',
    shadow: true,

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex:  'value',
            header:     'Total',
            aggregator: 'sum',
            width:      120
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex:  'company',
            header:     'Company'
        },{
            dataIndex:  'country',
            header:     'Country',
            direction:  'DESC'
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex:  'year',
            header:     'Year'
        }, {
            dataIndex:  'month',
            header:     'Month',
            labelRenderer:  'monthLabelRenderer'
        }]
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
