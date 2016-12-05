/**
 * Example that shows how to style the pivot grid results using ViewModels on cell level.
 *
 * Inside the bind you can either define a template or a formula. The following data is
 * available in both:
 *
 * - record:
 *      - isRowGroupHeader
 *      - isRowGroupTotal
 *      - isRowGrandTotal
 *      - leftAxisKey
 *
 * - column:
 *      - isColGroupTotal
 *      - isColGrandTotal
 *      - leftAxisColumn
 *      - topAxisColumn
 *      - topAxisKey
 *
 * - value: cell value
 */
Ext.define('KitchenSink.view.pivot.CellStyling', {
    extend: 'Ext.pivot.Grid',

    requires: [
        'KitchenSink.store.Sales',
        'KitchenSink.view.pivot.PivotCellModel',
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
        path: 'modern/src/view/pivot/PivotCellModel.js'
    }],
    // </example>
    
    controller: 'pivot',

    cls: 'demo-solid-background',
    shadow: true,

    // Use this config to apply a rule to all cells generated for aggregate dimensions
    // Or use `leftAxisCellConfig` to apply a rule to all cells generated for leftAxis dimensions
    topAxisCellConfig: {
        viewModel: {
            type: 'pivot-cell-model'
        },
        bind: {
            userCls: '{cellStyle}'
        }
    },

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        rowSubTotalsPosition: 'last',
        viewLayoutType: 'outline',

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex:  'value',
            header:     'Value',
            aggregator: 'sum',
            align:      'right',
            width:      120
            // You can also define here a `cellConfig` for binding
            //cellConfig: {
            //    viewModel: {
            //        type: 'pivot-cell-model'
            //    },
            //    bind: {
            //        userCls: '{cellStyle}'
            //    }
            //}
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex:  'person',
            header:     'Person',
            // You can also define here a `cellConfig` for binding
            // This is used only when `viewLayoutType` is `outline`
            cellConfig: {
                viewModel: {
                    type: 'default'
                },
                bind: {
                    userCls: '{record.isRowGroupHeader:pick("","pivotCellGroupHeader")}'
                }
            }
        },{
            dataIndex:  'company',
            header:     'Company',
            width:      130
        },{
            dataIndex:  'country',
            header:     'Country',
            width:      130
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
