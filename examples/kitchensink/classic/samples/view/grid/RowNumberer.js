Ext.define('KitchenSink.view.grid.RowNumberer', {
    extend: 'Ext.grid.Panel',
    xtype: 'row-numberer',

    //<example>
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 700
        },
        neptune: {
            width: 750
        }
    },
    //</example>

    title: 'Grid with Numbered Rows',
    width: '${width}',
    height: 300,

    columnLines: true,
    store: 'Companies',

    columns: [{
        xtype: 'rownumberer'
    }, {
        text: "Company",
        flex: 1,
        sortable: true,
        dataIndex: 'name'
    }, {
        text: "Price",
        width: 120,
        sortable: true,
        formatter: 'usMoney',
        dataIndex: 'price'
    }, {
        text: "Change",
        width: 120,
        sortable: true,
        dataIndex: 'change'
    }, {
        text: "% Change",
        width: 120,
        sortable: true,
        dataIndex: 'pctChange'
    }, {
        text: "Last Updated",
        width: 120,
        sortable: true,
        formatter: 'date("m/d/Y")',
        dataIndex: 'lastChange'
    }]
});
