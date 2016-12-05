/**
 *
 * This example shows how to create a pivot grid and inline edit the results.
 *
 * Click into a cell to open the editor. The input value will be used to overwrite all records behind that cell.
 *
 */
Ext.define('KitchenSink.view.pivot.CellEditing', {
    extend: 'Ext.pivot.Grid',
    xtype: 'cellediting-pivot-grid',
    controller: 'pivot',

    requires: [
        'KitchenSink.view.pivot.PivotController',
        'KitchenSink.store.pivot.Sales',
        'Ext.pivot.plugin.CellEditing'
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

    title: 'Pivot Grid with CellEditing plugin',
    width: '${width}',
    height: 350,
    collapsible: true,
    multiSelect: true,

    selModel: {
        type: 'spreadsheet'
    },

    plugins: [{
        ptype: 'pivotcellediting',
        clicksToEdit: 1,
        defaultUpdater: 'uniform' // define here the type of editing: 'overwrite', 'increment', 'percentage', 'uniform'
    }],

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex: 'value',
            header: 'Sum of value',
            aggregator: 'sum',
            // if you want an aggregate dimension to be editable you need to specify its editor
            editor: 'numberfield'
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

    listeners: {
        pivotbeforeupdate: 'onPivotBeforeUpdate',
        pivotupdate: 'onPivotUpdate'
    }
});
