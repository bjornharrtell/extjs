/**
 *
 * This example shows how to create a pivot grid with remote calculations
 * and how to drill down the results.
 *
 * DblClick a cell to open the drill down window and see all records used to
 * aggregate that cell.
 *
 */
Ext.define('KitchenSink.view.pivot.RemoteCalculations', {
    extend: 'Ext.pivot.Grid',

    requires: [
        'KitchenSink.view.pivot.PivotController',
        'Ext.pivot.plugin.DrillDown'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/pivot/PivotController.js'
    }, {
        type: 'Model',
        path: 'modern/src/Model/Sale.js' 
    }],
    // </example>
    
    controller: 'pivot',

    cls: 'demo-solid-background',
    shadow: true,

    plugins: [{
        type: 'pivotdrilldown',
        // define the columns used by the grid
        columns: [
            {dataIndex: 'company', text: 'Company'},
            {dataIndex: 'continent', text: 'Continent'},
            {dataIndex: 'country', text: 'Country'},
            {dataIndex: 'person', text: 'Person'},
            {dataIndex: 'date', text: 'Date', xtype: 'datecolumn'},
            {dataIndex: 'value', text: 'Value', xtype: 'numbercolumn', align: 'right'},
            {dataIndex: 'quantity', text: 'Qty', xtype: 'numbercolumn', align: 'right'},
            {dataIndex: 'year', text: 'Year', xtype: 'numbercolumn', formatter: 'number(0)', align: 'right'},
            {dataIndex: 'month', text: 'Month', xtype: 'numbercolumn', formatter: 'number(0)', align: 'right'}
        ],

        // define a remote store that will be used to filter the records
        remoteStore: {
            model: 'KitchenSink.model.Sale',

            proxy: {
                // load using HTTP
                type: 'ajax',
                url: '/KitchenSink/RemoteSalesData',
                // the return will be JSON, so lets set up a reader
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }],

    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    startRowGroupsCollapsed: false,

    matrix: {
        type:   'remote',
        url:    '/KitchenSink/RemoteSalesData',
        // Check remote.php script available in the "server" folder of the "pivot" package
        // Beware that you also need to change the remoteStore of the DrillDown plugin
        // to point to another script that filters that table.
        //url: 'path_to_remote.php'

        // Set layout type to "outline". If this config is missing then the default layout is "outline"
        viewLayoutType: 'outline',

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            // id was provided for a better understanding of the JSON response
            id:         'valueAgg',
            dataIndex:  'value',
            header:     'Total',
            aggregator: 'sum',
            width:      120
        },{
            // id was provided for a better understanding of the JSON response
            id:         'countAgg',
            dataIndex:  'id',
            header:     'Count',
            aggregator: 'count',
            width:      80
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            // id was provided for a better understanding of the JSON response
            id:         'person',
            dataIndex:  'person',
            header:     'Person',
            width:      130
        },{
            // id was provided for a better understanding of the JSON response
            id:         'company',
            dataIndex:  'company',
            header:     'Company',
            sortable:   false,
            width:      130
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            // id was provided for a better understanding of the JSON response
            id:         'country',
            dataIndex:  'country',
            header:     'Country'
        }]
    }

});
