/**
 * This example shows selection binding. The selection from each component
 * is bound to the same source and is automatically updated when a selection
 * in any component changes.
 */
Ext.define('KitchenSink.view.binding.Selection', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-selection',
    width: 600,
    height: 270,

    viewModel: {
        stores: {
            customers: {
                model: 'Customer',
                autoLoad: true
            }
        }
    },

    layout: 'vbox',

    items: [{
        xtype: 'combobox',
        margin: '10 0 0 10',
        forceSelection: true,
        editable: false,
        displayField: 'name',
        valueField: 'id',
        triggerAction: 'all',
        queryMode: 'local',
        labelWidth: 160,
        bind: {
            store: '{customers}',
            selection: '{selectedCustomer}'
        },
        fieldLabel: 'Customer Combo'
    }, {
        xtype: 'container',
        width: 600,
        margin: '15 0 0 0',
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            title: 'Customers Grid',
            flex: 1,
            xtype: 'grid',
            bind: {
                store: '{customers}',
                selection: '{selectedCustomer}'
            },
            columns: [{
                text: 'Name', dataIndex: 'name', flex: 1
            }, {
                text: 'Phone', dataIndex: 'phone'
            }]
        }, {
            flex: 1,
            cls: 'binding-selection-view',
            itemSelector: '.customer',
            xtype: 'dataview',
            tpl: '<h1>Customer View</h1><tpl for="."><div class="customer">{name}</div></tpl>',
            bind: {
                store: '{customers}',
                selection: '{selectedCustomer}'
            }
        }]
    }]
});
