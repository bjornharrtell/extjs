Ext.define('KitchenSink.view.grid.LockingGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer'
    ],
    xtype: 'locking-grid',
    store: 'Companies',
    columnLines: true,
    height: 350,
    width: 600,
    title: 'Locking Grid Column',
    viewConfig: {
        stripeRows: true
    },

    //<example>
    exampleDescription: [
        '<p>This example shows how to achieve "freeze pane" locking functionality similar ',
        'to Excel.</p><p>Columns may be locked or unlocked by dragging them across into ',
        'the opposite side, or by using the column\'s header menu.</p><p>The "Price" column ',
        'is not lockable, and may not be dragged into the locked side, or locked using the ',
        'header menu.</p><p>It is not possible to lock <i>all</i> columns using the user ',
        'interface. The unlocked side must always contain at least one column.</p>',
        '<p>There is also an initially hidden "Tall Header" that shows wrapping header text.'
    ],
    themes: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                text     : 'Company Name',
                locked   : true,
                width    : 230,
                sortable : false,
                dataIndex: 'company'
            }, {
                text     : 'Price',
                lockable: false,
                width    : 80,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            }, {
                text     : 'Tall<br>Header',
                hidden   : true,
                width    : 70,
                sortable : false,
                renderer : function(val) {
                    return Math.round(val * 3.14 * 100) / 10;
                },
                dataIndex: 'change'
            }, {
                text     : 'Change',
                width    : 90,
                sortable : true,
                renderer : function(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '</span>';
                    }
                    return val;
                },
                dataIndex: 'change'
            }, {
                text     : '% Change',
                width    : 105,
                sortable : true,
                renderer : function(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '%</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '%</span>';
                    }
                    return val;
                },
                dataIndex: 'pctChange'
            }, {
                text     : 'Last Updated',
                width    : 135,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            }];

        this.callParent();
    }
});
