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
    xtype: 'drilldown-pivot-grid',

    requires: [
        'KitchenSink.store.pivot.Sales',
        'Ext.pivot.plugin.DrillDown'
    ],

    title: 'Pivot Grid with DrillDown plugin',
    collapsible: true,
    multiSelect: true,
    height: 350,

    store: {
        type: 'sales'
    },
    selModel: {
        type: 'spreadsheet'
    },

    plugins: [{
        ptype: 'pivotdrilldown'
    }],

    // Configure the aggregate dimensions. Multiple dimensions are supported.
    aggregate: [{
        dataIndex:  'value',
        header:     'Sum of value',
        aggregator: 'sum',
        width:      85
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
        renderer: function(v){ return Ext.Date.monthNames[v]; }
    }],

    //<example>
    otherContent: [{
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

    initComponent: function () {
        var me = this;

        me.width = me.profileInfo.width;

        me.callParent();
    }
});
