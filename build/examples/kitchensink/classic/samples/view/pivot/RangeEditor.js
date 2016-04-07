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

    requires: [
        'KitchenSink.store.pivot.Sales',
        'Ext.pivot.plugin.RangeEditor'
    ],

    title: 'Pivot Grid with RangeEditor plugin',
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
        ptype: 'pivotrangeeditor'
    }],

    // Configure the aggregate dimensions. Multiple dimensions are supported.
    aggregate: [{
        dataIndex:  'value',
        header:     'Sum of value',
        aggregator: 'sum'
    }],

    // Configure the left axis dimensions that will be used to generate the grid rows
    leftAxis: [{
        dataIndex:  'year',
        header:     'Year'
    }, {
        dataIndex:  'person',
        header:     'Person'
    }],

    /**
     * Configure the top axis dimensions that will be used to generate the columns.
     * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
     * are defined then each top axis result will have in the end a column header with children
     * columns for each aggregate dimension defined.
     */
    topAxis: [{
        dataIndex:  'continent',
        header:     'Continent'
    },{
        dataIndex:  'country',
        header:     'Country'
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
