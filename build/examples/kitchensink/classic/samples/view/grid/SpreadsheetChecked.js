/**
 * Demonstrates the Spreadsheet selection model.
 *
 * Supported features:
 *
 *  - Single / Range / Multiple individual row selection.
 *  - Single / Range cell selection.
 *  - Column selection by click selecting column headers.
 *  - Select / deselect all by clicking in the top-left, header.
 *  - Adds row number column to enable row selection.
 *  - Selection extensibility using a drag gesture. Configured in this case to be up or down.
 *
 * Copy/paste to system clipboard using CTRL+C, CTRL+X and CTRL+V.
 */
Ext.define('KitchenSink.view.grid.SpreadsheetChecked', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard',
        'KitchenSink.store.grid.MonthlySales'
    ],
    //<example>
    exampleTitle: 'Spreadsheet',
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/SpreadsheetController.js'
    },{
        type: 'Store',
        path: 'classic/samples/store/grid/MonthlySales.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/grid/MonthlySales.js'
    }],
    //</example>

    xtype: 'spreadsheet-checked',
    controller: 'spreadsheet',

    store: {
        type: 'monthlysales'
    },
    columnLines: true,
    height: 400,
    width: 750,
    title: 'Spreadsheet',
    frame: true,

    selModel: {
        type: 'spreadsheet',
        // Disables sorting by header click, though it will be still available via menu
        columnSelect: true,
        checkboxSelect: true,
        pruneRemoved: false,
        extensible: 'y'
    },

    // Enable CTRL+C/X/V hot-keys to copy/cut/paste to the system clipboard.
    plugins: [
        'clipboard',
        'selectionreplicator'
    ],

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    tools: [{
        type: 'refresh',
        handler: 'onRefresh',
        tooltip: 'Reload Data'
    }],

    tbar: [{
        xtype: 'component',
        html: 'Selectable: '
    }, {
        text: 'Rows',
        enableToggle: true,
        toggleHandler: 'toggleRowSelect',
        pressed: true
    }, {
        text: 'Cells',
        enableToggle: true,
        toggleHandler: 'toggleCellSelect',
        pressed: true
    }, {
        text: 'Columns',
        enableToggle: true,
        toggleHandler: 'toggleColumnSelect',
        pressed: true
    }, '->', {
        xtype: 'component',
        reference: 'status'
    }],

    columns:[
        { text: 'Year', dataIndex: 'year', flex: 1, minWidth: 70 },
        { text: 'Jan',  dataIndex: 'jan', width: 50 },
        { text: 'Feb',  dataIndex: 'feb', width: 50 },
        { text: 'Mar',  dataIndex: 'mar', width: 50 },
        { text: 'Apr',  dataIndex: 'apr', width: 50 },
        { text: 'May',  dataIndex: 'may', width: 50 },
        { text: 'Jun',  dataIndex: 'jun', width: 50 },
        { text: 'Jul',  dataIndex: 'jul', width: 50 },
        { text: 'Aug',  dataIndex: 'aug', width: 50 },
        { text: 'Sep',  dataIndex: 'sep', width: 50 },
        { text: 'Oct',  dataIndex: 'oct', width: 50 },
        { text: 'Nov',  dataIndex: 'nov', width: 50 },
        { text: 'Dec',  dataIndex: 'dec', width: 50 }
    ],
    forceFit: true,

    viewConfig: {
        columnLines: true,
        trackOver: false
    }
});
