/**
 *
 * This example shows how to create a pivot grid and add custom row grand totals.
 *
 */
Ext.define('KitchenSink.view.pivot.GrandTotals', {
    extend: 'Ext.pivot.Grid',
    xtype: 'grandtotals-pivot-grid',
    controller: 'pivotgrandtotals',

    requires: [
        'KitchenSink.view.pivot.GrandTotalsController',
        'KitchenSink.store.pivot.Sales'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/GrandTotalsController.js'
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

    title: 'Pivot Grid with custom grand totals',
    width: '${width}',
    height: 350,
    collapsible: true,

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex: 'value',
            header: 'Total',
            aggregator: 'sum',
            width: 85
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex: 'company',
            header: 'Company'
        }, {
            dataIndex: 'country',
            header: 'Country',
            direction: 'DESC'
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex: 'year',
            header: 'Year'
        }]
    },

    listeners: {
        /**
         * This event helps us define more row grand totals in the pivot grid
         */
        pivotbuildtotals: 'onCreatePivotTotals'
    }
});
