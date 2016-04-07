/**
 * This example shows how to create a grid from Array data. The grid is stateful so you
 * can move or hide columns, reload the page, and come back to the grid in the same state
 * you left it in.
 *
 * The cells are selectable due to use of the `enableTextSelection` option.
 */
Ext.define('KitchenSink.view.grid.ArrayGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action'
    ],
    xtype: 'array-grid',
    store: 'Companies',
    stateful: true,
    collapsible: true,
    multiSelect: true,
    stateId: 'stateGrid',
    height: 350,
    title: 'Array Grid',
    headerBorders: false,
    viewConfig: {
        enableTextSelection: true
    },
    //<example>
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 600,
            priceWidth: 75,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85,
            green: 'green',
            red: 'red'
        },
        neptune: {
            width: 750,
            priceWidth: 95,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115,
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>

    initComponent: function () {
        var me = this;

        me.width = this.profileInfo.width;
        me.columns = [
            {
                text     : 'Company',
                flex     : 1,
                sortable : false,
                dataIndex: 'name'
            },
            {
                text     : 'Price',
                width    : this.profileInfo.priceWidth,
                sortable : true,
                formatter: 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Change',
                width    : 80,
                sortable : true,
                renderer : function(val) {
                    var out = Ext.util.Format.number(val, '0.00');
                    if (val > 0) {
                        return '<span style="color:' + this.profileInfo.green + ';">' + out + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:' + this.profileInfo.red + ';">' + out + '</span>';
                    }
                    return out;
                },
                dataIndex: 'change'
            },
            {
                text     : '% Change',
                width    : this.profileInfo.percentChangeColumnWidth,
                sortable : true,
                renderer : function(val) {
                    var out = Ext.util.Format.number(val, '0.00%');
                    if (val > 0) {
                        return '<span style="color:' + this.profileInfo.green + ';">' + out + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:' + this.profileInfo.red + ';">' + out + '</span>';
                    }
                    return out;
                },
                dataIndex: 'pctChange'
            },
            {
                text     : 'Last Updated',
                width    : this.profileInfo.lastUpdatedColumnWidth,
                sortable : true,
                formatter: 'date("m/d/Y")',
                dataIndex: 'lastChange'
            },
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    iconCls: 'array-grid-sell-col',
                    tooltip: 'Sell stock',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.alert('Sell', 'Sell ' + rec.get('name'));
                    }
                }, {
                    getClass: function(v, meta, rec) {
                        if (rec.get('change') < 0) {
                            return 'array-grid-alert-col';
                        } else {
                            return 'array-grid-buy-col';
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

                        Ext.Msg.alert(action, action + ' ' + rec.get('name'));
                    }
                }]
            }
        ];

        me.callParent();
    }
});
