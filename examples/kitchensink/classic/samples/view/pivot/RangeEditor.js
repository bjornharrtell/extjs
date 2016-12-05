/**
 *
 * This example shows how to create a pivot grid and range edit the results.
 *
 * DblClick a cell to open the range editor window which allows you to change
 * all records that were used to aggregate that cell.
 *
 */
Ext.define('KitchenSink.view.pivot.RangeEditor', {
    extend: 'Ext.pivot.Grid',
    xtype: 'rangeeditor-pivot-grid',
    controller: 'pivot',

    requires: [
        'KitchenSink.view.pivot.PivotController',
        'KitchenSink.store.pivot.Sales',
        'Ext.pivot.plugin.RangeEditor'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/PivotController.js'
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

    title: 'Pivot Grid with RangeEditor plugin',
    width: '${width}',
    height: 350,
    collapsible: true,
    multiSelect: true,

    selModel: {
        type: 'spreadsheet'
    },

    plugins: [{
        ptype: 'pivotrangeeditor'
    }],

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex: 'value',
            header: 'Total',
            aggregator: 'sum'
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex: 'year',
            header: 'Year'
        }, {
            dataIndex: 'person',
            header: 'Person'
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex: 'continent',
            header: 'Continent'
        }, {
            dataIndex: 'country',
            header: 'Country'
        }]
    },

    // These events are fired by the RangeEditor plugin
    listeners: {
        pivotbeforeupdate: 'onPivotBeforeUpdate',
        pivotupdate: 'onPivotUpdate'
    }
});
