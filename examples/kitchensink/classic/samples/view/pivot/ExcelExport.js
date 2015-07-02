/**
 *
 * This example shows how to create a pivot grid and export the results to Excel.
 *
 */
Ext.define('KitchenSink.view.pivot.ExcelExport', {
    extend: 'Ext.pivot.Grid',
    xtype: 'excel-pivot-grid',
    controller: 'pivotexport',

    requires: [
        'KitchenSink.store.pivot.Sales',
        'Ext.pivot.plugin.Exporter'
    ],

    title: 'Pivot Grid with Exporter plugin',
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
        ptype: 'pivotexporter',
        pluginId: 'exporter'
    }],

    // Configure the aggregate dimensions. Multiple dimensions are supported.
    aggregate: [{
        dataIndex:  'value',
        header:     'Sum of value',
        aggregator: 'sum'
    }],

    // Configure the left axis dimensions that will be used to generate the grid rows
    leftAxis: [{
        dataIndex:  'person',
        header:     'Person'
    },{
        dataIndex:  'company',
        header:     'Company',
        sortable:   false
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
        dataIndex:  'country',
        header:     'Country'
    }],

    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            text: 'Export to Excel',
            handler: 'exportToExcel'
        }]
    },

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/ExcelExportController.js'
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

    initComponent: function () {
        var me = this;

        me.width = me.profileInfo.width;

        me.callParent();
    }
});
