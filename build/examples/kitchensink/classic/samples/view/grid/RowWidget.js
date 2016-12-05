/**
 * This is an example of using the grid with a RowWidget plugin that adds the ability
 * to have a second row body which expands/contracts and which contains a Component.
 *
 * The component in the expansion row is primed with the associated grid row's record.
 *
 * The expand/contract behavior is configurable to react on clicking of the column, double
 * click of the row, and/or hitting enter while a row is selected.
 */
Ext.define('KitchenSink.view.grid.RowWidget', {
    extend: 'Ext.grid.Panel',

    xtype: 'row-widget-grid',
    store: 'Companies',

    columns: [{
        text: 'Id',
        dataIndex: 'id'
    },{
        text: 'Name',
        dataIndex: 'name',
        flex: 1,
        hideable: false
    }, {
        width: 140,
        text: 'Phone',
        dataIndex: 'phone'
    }],
    width: 750,
    height: 450,
    leadingBufferZone: 8,
    trailingBufferZone: 8,

    //<example>
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/Order.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    //</example>

    plugins: [{
        ptype: 'rowwidget',

        // The widget definition describes a widget to be rendered into the expansion row.
        // It has access to the application's ViewModel hierarchy. Its immediate ViewModel
        // contains a record and recordIndex property. These, or any property of the record
        // (including association stores) may be bound to the widget.
        //
        // See the Order model definition with the association declared to Company.
        // Every Company record will be decorated with an "orders" method which,
        // when called yields a store containing associated orders.
        widget: {
            xtype: 'grid',
            autoLoad: true,
            bind: {
                store: '{record.orders}',
                title: 'Orders for {record.name}'
            },
            columns: [{
                text: 'Order Id',
                dataIndex: 'id',
                width: 75
            }, {
                text: 'Procuct code',
                dataIndex: 'productCode',
                width: 265
            }, {
                text: 'Quantity',
                dataIndex: 'quantity',
                xtype: 'numbercolumn',
                width: 100,
                align: 'right'
            }, {
                xtype: 'datecolumn',
                format: 'Y-m-d',
                width: 120,
                text: 'Date',
                dataIndex: 'date'
            }, {
                text: 'Shipped',
                xtype: 'checkcolumn',
                dataIndex: 'shipped',
                width: 75
            }]
        }
    }],
    title: "Expander Rows to show Company's orders"
});
