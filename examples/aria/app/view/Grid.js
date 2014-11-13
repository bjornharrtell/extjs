Ext.define('Aria.view.Grid', {
    extend:'Ext.panel.Panel',
    alias:'widget.mysimplegrid',
    title:'Grid',
    requires:[
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Action',
        'Ext.form.field.ComboBox',
        'Ext.data.ArrayStore',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.CellEditing'
    ],
    layout:'vbox',

    initComponent:function () {
        var me = this;
        me.storeData = [
            ['Apple Inc.', 'AAPL', 123.43, -2.21, '10/11/12'],
            ['Cisco System Inc.', 'CSCO', 83.43, -2.21, '10/11/12'],
            ['Google Inc.', 'GOOG', 44.43, -2.21, '10/11/12'],
            ['Intel Corporation', 'INTC', 23.43, -2.21, '10/11/12'],
            ['Level 3 Communications, Inc.', 'LVLT', 43.43, 2.21, '10/11/12'],
            ['Microsoft Corporation', 'MSFT', 123.43, -2.21, '10/11/12'],
            ['Nokia Corporation', 'NOK', 52.43, -2.21, '10/11/12'],
            ['Oracle Corporation', 'ORCL', 31.31, -2.21, '10/11/12'],
            ['Starbucks Corporation', 'SBUX', 48.43, -2.21, '10/11/12'],
            ['Yahoo INc.', 'YHOO', 56.43, -2.21, '10/11/12']
        ];
        me.store = Ext.create('Ext.data.ArrayStore', {
            fields:[
                'company',
                'symbol',
                {
                    name:'last',
                    type:'float'
                },
                {
                    name:'change',
                    type:'float'
                },
                {
                    name:'updated',
                    type:'date'
                }
            ],
            data: me.storeData
        });

        me.curModel = "cellmodel";

        me.isEditable = false;

        me.items = [{
            xtype:'panel',
            title:'Basic Grid',
            width: 650,
            height: 300,
            layout: 'fit',
            
            tbar: [{
                xtype: 'checkbox',
                boxLabel: 'Editable',
                listeners:{
                    'change':function (checkbox, newvalue, oldvalue) {
                        var grid = me.down('grid');
                        var panel = checkbox.up('panel');

                        if (newvalue !== me.isEditable) {
                            me.isEditable = newvalue;
                            panel.remove(grid, true);
                            panel.insert(1, me.createGrid(me.curModel, me.isEditable, me.store));
                        }
                    }
                }
            }],
            
            items: [
                me.createGrid(me.curModel, me.isEditable, me.store)
            ],
            
            buttonAlign: 'left',
            buttons: [{
                xtype: 'button',
                text: 'Reset',
                handler: function () {
                    me.store.loadData(me.storeData);
                }
            }]
        }];

        me.callParent(arguments);
    },

    createGrid:function (selType, editable, store) {
        var plugins =[];
        if (editable) {
            if (selType === 'rowmodel') {
                plugins.push(Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 1
                    }));
            } else {
                plugins.push(Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                }));

            }
        }
        return Ext.widget('grid', {
            store:store,
            columns:[
                {
                    text: 'Company',
                    dataIndex: 'company',
                    sortable: true,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    text: 'Symbol',
                    dataIndex: 'symbol',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                    //sortable:false,
                    //menuDisabled:true
                }, {
                    text: 'Stock Price',
                    columns: [{
                        text: 'Price',
                        dataIndex: 'last',
                        xtype: 'numbercolumn',
                        formatter: 'usMoney'
                    },
                    {
                        text: 'Change',
                        dataIndex: 'change',
                        xtype: 'numbercolumn',
                        format: '0.00',
                        editor: {
                            xtype: 'numberfield'
                        }
                    },
                    {
                        text: 'Last Updated',
                        dataIndex: 'updated',
                        format: 'Y-m-d',
                        xtype: 'datecolumn',
                        editor: {
                            xtype: 'datefield'
                        }
                    }]
                }, {
                    xtype: 'actioncolumn',
                    iconCls: 'sell-col',
                    tooltip: 'Sell stock',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.alert('Sell', 'Sell ' + rec.get('company'));
                    },
                    width: 50
                },
                {
                    xtype: 'actioncolumn',
                    getClass: function(v, meta, rec) {
                        if (rec.get('change') < 0) {
                            return 'alert-col';
                        } else {
                            return 'buy-col';
                        }
                    },
                    getTip: function(v, meta, rec) {
                        if (rec.get('change') < 0) {
                            return 'Hold stock';
                        } else {
                            return 'Buy stock';
                        }
                    },
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex),
                            action = (rec.get('change') < 0 ? 'Hold' : 'Buy');

                        Ext.Msg.alert(action, action + ' ' + rec.get('company'));
                    },
                    width: 50
                }
            ],
            selType: selType,
            selModel: {
                mode: 'SINGLE'
            },
            plugins: plugins,
            header: false,
            title: 'Simple Grid'
        });
    }
});