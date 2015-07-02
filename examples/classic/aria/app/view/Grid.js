Ext.define('Aria.view.Grid', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.mysimplegrid',
    
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Action',
        'Ext.form.field.ComboBox',
        'Ext.data.ArrayStore',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.CellEditing'
    ],
    
    title: 'Grid',
//     layout: 'vbox',
    
    referenceHolder: true,
    defaultListenerScope: true,
    
    // Defaults
    selectionType: 'cellmodel',
    selectionMode: 'SINGLE',
    editableGrid:  false,
    columnHeaders: true,
    
    storeConfig: {
        type: 'array',
        
        fields: [
            'company',
            'symbol',
            { name: 'last',    type: 'float' },
            { name: 'change',  type: 'float' },
            { name: 'updated', type: 'date'  }
        ],
        
        data: [
            ['Apple Inc.', 'AAPL', 123.43, -2.21, '10/11/12'],
            ['Cisco System Inc.', 'CSCO', 83.43, -2.21, '10/11/12'],
            ['Google Inc.', 'GOOG', 44.43, 0, '10/11/12'],
            ['Intel Corporation', 'INTC', 23.43, -2.21, '10/11/12'],
            ['Level 3 Communications, Inc.', 'LVLT', 0, 2.21, '10/11/12'],
            ['Microsoft Corporation', 'MSFT', 123.43, -2.21, '10/11/12'],
            ['Nokia Corporation', 'NOK', 52.43, -2.21, '10/11/12'],
            ['Oracle Corporation', 'ORCL', 31.31, 42.43, '10/11/12'],
            ['Starbucks Corporation', 'SBUX', 48.43, -2.21, '10/11/12'],
            ['Yahoo INc.', 'YHOO', 56.43, -123.21, '10/11/12']
        ]
    },

    initComponent: function() {
        var me = this,
            selType = me.selectionType,
            selMode = me.selectionMode,
            editable = me.editableGrid;
        
        me.items = [{
            xtype: 'panel',
            title: 'Basic Grid',
            ariaRole: 'region',
            
            reference: 'gridPanel',
            
            width: 750,
            height: 400,
            layout: 'fit',
            
            tbar: [{
                xtype: 'combobox',
                fieldLabel: 'Selection type',
                labelWidth: 120,
                width: 260,
                
                forceSelect: true,
                editable: false,
                name: 'selectionType',
                
                value: me.selectionType,
                valueField: 'type',
                displayField: 'name',
                
                listeners: {
                    change: 'onSelectionTypeChange'
                },
                
                store: {
                    type: 'array',
                    fields: ['type', 'name'],
                    data: [
                        ['rowmodel', 'Row'],
                        ['cellmodel', 'Cell'],
                        ['checkboxmodel', 'Checkbox'],
                        ['spreadsheet', 'Spreadsheet']
                    ]
                }
            }, {
                xtype: 'combobox',
                fieldLabel: 'Mode',
                labelWidth: 60,
                
                forceSelect: true,
                editable: false,
                name: 'selectionMode',
                
                value: me.selectionMode,
                valueField: 'mode',
                displayField: 'name',
                
                listeners: {
                    change: 'onSelectionModeChange'
                },
                
                store: {
                    type: 'array',
                    fields: ['mode', 'name'],
                    data: [
                        ['SINGLE', 'Single'],
                        ['SIMPLE', 'Simple'],
                        ['MULTI',  'Multi']
                    ]
                }
            }, {
                xtype: 'checkbox',
                boxLabel: 'Editable',
                checked: me.editableGrid,
                
                listeners: {
                    change: 'onEditableChange'
                }
            }, {
                xtype: 'checkbox',
                boxLabel: 'Headers',
                checked: me.columnHeaders,
                
                listeners: {
                    change: 'onColumnHeadersChange'
                }
            }],
            
            items: [
                me.createGrid({
                    selectionType: me.selectionType,
                    selectionMode: me.selectionMode,
                    editable: me.editableGrid,
                    columnHeaders: me.columnHeaders
                })
            ],
            
            buttonAlign: 'left',
            buttons: [{
                xtype: 'button',
                text: 'Reset',
                listeners: {
                    click: 'resetGrid'
                }
            }]
        }];

        me.callParent();
    },
    
    onSelectionTypeChange: function(combo, newValue, oldValue) {
        var me = this;
        
        if (newValue !== me.selectionType) {
            me.selectionType = newValue;
            me.recreateGrid({
                selectionType: newValue,
                selectionMode: me.selectionMode,
                editable: me.editableGrid,
                columnHeaders: me.columnHeaders
            });
        }
    },
    
    onSelectionModeChange: function(combo, newValue, oldValue) {
        var me = this;
        
        if (newValue !== me.selectionMode) {
            me.selectionMode = newValue;
            me.recreateGrid({
                selectionType: me.selectionType,
                selectionMode: newValue,
                editable: me.editableGrid,
                columnHeaders: me.columnHeaders
            });
        }
    },
    
    onEditableChange: function(checkbox, newValue, oldValue) {
        var me = this;
        
        if (newValue !== me.editableGrid) {
            me.editableGrid = newValue;
            me.recreateGrid({
                selectionType: me.selectionType,
                selectionMode: me.selectionMode,
                editable: newValue,
                columnHeaders: me.columnHeaders
            });
        }
    },
    
    onColumnHeadersChange: function(checkbox, newValue, oldValue) {
        var me = this;
        
        if (newValue !== me.columnHeaders) {
            me.columnHeaders = newValue;
            me.recreateGrid({
                selectionType: me.selectionType,
                selectionMode: me.selectionMode,
                editable: me.editableGrid,
                columnHeaders: newValue
            });
        }
    },
    
    resetGrid: function() {
        this.down('grid').store.reload();
    },
    
    handleStock: function(grid, rowIndex, colIndex, item, e, rec) {
        var company, change, action;
        
        company = rec.get('company');
        change  = rec.get('change');
        
        action = change === 0 ? 'Hold '
               : change  <  0 ? 'Sell '
               :                'Buy '
               ;
        
        Ext.Msg.alert('Market analyst says', action + company);
    },
    
    recreateGrid: function(options) {
        var me = this,
            panel, grid;
        
        panel = me.lookupReference('gridPanel');
        grid = panel.down('grid');
        
        Ext.suspendLayouts();
        panel.remove(grid, true);
        panel.insert(0, me.createGrid(options));
        Ext.resumeLayouts(true);
    },
    
    createGrid: function(options) {
        var me = this,
            plugins = [],
            selType = options.selectionType,
            selMode = options.selectionMode,
            editable = options.editable,
            headers = options.columnHeaders;
        
        if (editable) {
            plugins.push({
//                 ptype: selType === 'rowmodel' ? 'rowediting' : 'cellediting',
                ptype: 'cellediting',
                clicksToEdit: 1
            });
        }
        
        return {
            xtype: 'grid',
            header: false,
            
            store: me.storeConfig,
            
            plugins: plugins,
            hideHeaders: !headers,
            
            selModel: {
                type: selType,
                mode: selMode
            },
            
            columns: [{
                text: 'Company',
                dataIndex: 'company',
                sortable: true,
                width: 140,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }, {
                text: 'Symbol',
                dataIndex: 'symbol',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
                // sortable: false,
                // menuDisabled: true
            }, {
                text: 'Stock',
                
                columns: [{
                    xtype: 'numbercolumn',
                    text: 'Price',
                    dataIndex: 'last',
                    formatter: 'usMoney'
                }, {
                    xtype: 'numbercolumn',
                    text: 'Change',
                    dataIndex: 'change',
                    format: '0.00',
                    editor: {
                        xtype: 'numberfield'
                    }
                }, {
                    xtype: 'datecolumn',
                    text: 'Last Updated',
                    dataIndex: 'updated',
                    width: 120,
                    format: 'm/d/Y',
                    editor: {
                        xtype: 'datefield'
                    }
                }]
            }, {
                xtype: 'templatecolumn',
                text: 'Quotes',
                tpl: '<a href="http://www.nasdaq.com/symbol/{symbol}/real-time" target="_blank">Get quote</a>'
            }, {
                xtype: 'actioncolumn',
                text: 'Action',
                width: 70,
                
                getClass: function(v, meta, rec) {
                    var change = rec.get('change');
                    
                    return change === 0 ? 'alert-col'
                         : change  <  0 ? 'sell-col'
                         :                'buy-col'
                         ;
                },
            
                getTip: function(v, meta, rec) {
                    var change = rec.get('change');
                    
                    return change === 0 ? 'Hold stock'
                         : change  <  0 ? 'Sell stock'
                         :                'Buy stock'
                         ;
                },
            
                getAltText: function(v, meta, rec) {
                    var change = rec.get('change');
                    
                    return change === 0 ? 'Hold stock'
                         : change  <  0 ? 'Sell stock'
                         :                'Buy stock'
                         ;
                },
                
                handler: 'handleStock'
            }]
        };
    }
});
