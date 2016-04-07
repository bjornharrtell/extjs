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
    xtype: 'remote-pivot-grid',
    controller: 'remotecalculations',

    requires: [
        'KitchenSink.view.pivot.RemoteCalculationsController'
    ],

    title: 'Remote calculations',
    collapsible: true,
    multiSelect: true,
    height: 350,

    selModel: {
        type: 'spreadsheet'
    },

    // Set matrix specific configuration
    matrixConfig: {
        type:   'remote',
        url:    '/KitchenSink/RemoteSalesData'
    },

    plugins: [{
        ptype: 'pivotdrilldown',
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
            model: 'KitchenSink.model.pivot.Sale',

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

    // Set layout type to "outline". If this config is missing then the default layout is "outline"
    viewLayoutType: 'outline',

    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    startRowGroupsCollapsed: false,

    // Configure the aggregate dimensions. Multiple dimensions are supported.
    aggregate: [{
        // id was provided for a better understanding of the JSON response
        id:         'valueAgg',
        dataIndex:  'value',
        header:     'Sum of value',
        aggregator: 'sum',
        width:      90
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
        width:      80
    },{
        // id was provided for a better understanding of the JSON response
        id:         'company',
        dataIndex:  'company',
        header:     'Company',
        sortable:   false,
        width:      80
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
    }],

    listeners: {
        pivotdone:  'onPivotDone'
    },

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/RemoteCalculationsController.js'
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

    initComponent: function () {
        var me = this;

        me.width = me.profileInfo.width;

        me.callParent();
    }
});
