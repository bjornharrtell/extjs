/**
 * This example shows data binding using binary operators in expressions.
 */
Ext.define('KitchenSink.view.binding.AlgebraBinary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-algebra-binary',

    bodyPadding: 10,
    shadow: true,
    cls: 'demo-solid-background',

    viewModel: {
        type: 'default',
        data: {
            x: 10,
            y: 10
        }
    },

    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        defaults: {
            xtype: 'textfield',
            readOnly: true
        }
    },

    layout: 'hbox',
    scrollable: true,

    items: [{
        layout: 'vbox',
        items: [{
            xtype: 'spinnerfield',
            stepValue: 1,
            readOnly: false,
            label: 'x',
            bind: '{x}'
        },{
            label: 'x + y',
            bind: '{x + y}'
        }, {
            label: 'x * y',
            bind: '{x * y}'
        }, {
            label: 'x > y',
            bind: '{x > y}'
        }, {
            label: 'x >= y',
            bind: '{x >= y}'
        }, {
            label: 'x == y',
            bind: '{x == y}'
        }, {
            label: 'x === y',
            bind: '{x === y}'
        }, {
            label: 'x > y && y >= 10',
            bind: '{x > y && y >= 10}'
        }]
    }, {
        layout: 'vbox',
        items: [{
            xtype: 'spinnerfield',
            stepValue: 1,
            readOnly: false,
            label: 'y',
            bind: '{y}'
        },{
            label: 'x - y',
            bind: '{x - y}'
        }, {
            label: 'x / y',
            bind: '{x / y}'
        }, {
            label: 'x < y',
            bind: '{x < y}'
        }, {
            label: 'x <= y',
            bind: '{x <= y}'
        }, {
            label: 'x != y',
            bind: '{x != y}'
        }, {
            label: 'x !== y',
            bind: '{x !== y}'
        }, {
            label: 'x > y || y >= 10',
            bind: '{x > y || y >= 10}'
        }]
    }]
});
