/**
 * This example shows data binding using ternary operators in expressions.
 */
Ext.define('KitchenSink.view.binding.AlgebraTernary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-algebra-ternary',

    bodyPadding: 10,
    shadow: true,
    cls: 'demo-solid-background',

    viewModel: {
        type: 'default',
        data: {
            x: 10,
            y: 11
        }
    },

    items: [{
        xtype: 'spinnerfield',
        stepValue: 1,
        label: 'x',
        bind: '{x}'
    }, {
        xtype: 'spinnerfield',
        stepValue: 1,
        label: 'y',
        bind: '{y}'
    }, {
        xtype: 'textfield',
        readOnly: true,
        label: 'Calculated',
        bind: '{x > y ? "x is greater" : (x == y ? "x equals y" : "y is greater")}'
    }]
});
