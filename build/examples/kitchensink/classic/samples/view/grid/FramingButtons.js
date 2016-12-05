Ext.define('KitchenSink.view.grid.FramingButtons', {
    extend: 'Ext.grid.Panel',
    xtype: 'framing-buttons',

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

    title: 'Support for standard Panel features such as framing, buttons and toolbars',
    width: '${width}',
    height: 300,

    columnLines: true,
    frame: true,
    iconCls: 'framing-buttons-grid',
    store: 'Companies',
    viewModel: true,
    buttonAlign: 'center',

    bind: {
        selection: '{theRow}'
    },

    selModel: {
        type: 'checkboxmodel'
    },

    columns: [{
        text: "Company",
        dataIndex: 'name',

        flex: 1,
        sortable: true
    }, {
        text: "Price",
        dataIndex: 'price',

        width: 120,
        sortable: true,
        formatter: 'usMoney'
    }, {
        text: "Change",
        dataIndex: 'change',

        width: 120,
        sortable: true
    }, {
        text: "% Change",
        dataIndex: 'pctChange',

        width: 120,
        sortable: true
    }, {
        text: "Last Updated",
        dataIndex: 'lastChange',

        width: 120,
        sortable: true,
        formatter: 'date("m/d/Y")'
    }],

    tbar: [{
        text: 'Add Something',
        tooltip: 'Add a new row',
        iconCls: 'framing-buttons-add'
    }, '-', {
        text: 'Options',
        tooltip: 'Set options',
        iconCls: 'framing-buttons-option'
    },'-',{
        text: 'Remove Something',
        tooltip: 'Remove the selected item',
        iconCls:'framing-buttons-remove',
        disabled: true,

        bind: {
            disabled: '{!theRow}'
        }
    }],

    fbar: [{
        minWidth: 80,
        text: 'Save'
    }, {
        minWidth: 80,
        text: 'Cancel'
    }]
});
