/**
 * Example that shows how to style the pivot grid results using ViewModels on row level (itemConfig).
 *
 * Inside the bind on itemConfig you can define templates or formulas. The following data is
 * available:
 *
 * - record:
 *      - isRowGroupHeader
 *      - isRowGroupTotal
 *      - isRowGrandTotal
 *      - leftAxisKey
 *
 */
Ext.define('KitchenSink.view.pivot.RowStyling', {
    extend: 'Ext.pivot.Grid',

    requires: [
        'KitchenSink.store.Sales',
        'KitchenSink.view.pivot.PivotRowModel',
        'KitchenSink.view.pivot.PivotController'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/pivot/PivotController.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/Sales.js'
    }, {
        type: 'Model',
        path: 'modern/src/view/pivot/PivotRowModel.js'
    }],
    // </example>
    
    controller: 'pivot',

    cls: 'demo-solid-background',
    shadow: true,

    itemConfig: {
        viewModel: {
            // use a default viewModel when using bind templates
            type: 'default'
            // or a user defined viewModel when using bind formulas
            //type: 'pivot-row-model'
        },
        bind: {
            // bind template usage
            userCls: '{record.isRowGrandTotal ? "pivotRowGrandTotal" : (record.isRowGroupHeader ? "pivotRowHeader" : (record.isRowGroupTotal ? "pivotRowTotal" : ""))}'
            // or bind formula
            //userCls: '{rowStyle}'
        }
    },

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        rowSubTotalsPosition: 'last',
        // Set layout type to "compact". If this config is missing then the default layout is "outline"
        viewLayoutType: 'compact',

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex:  'value',
            header:     'Value',
            aggregator: 'sum',
            align:      'right',
            width:      130
        },{
            dataIndex:  'value',
            header:     'Count',
            aggregator: 'count',
            align:      'right',
            width:      100
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex:  'person',
            header:     'Person'
        },{
            dataIndex:  'company',
            header:     'Company'
        },{
            dataIndex:  'country',
            header:     'Country'
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex:  'year',
            header:     'Year',
            labelRenderer: 'yearLabelRenderer'
        },{
            dataIndex:  'month',
            header:     'Month',
            labelRenderer:  'monthLabelRenderer'
        }]
    }
});
