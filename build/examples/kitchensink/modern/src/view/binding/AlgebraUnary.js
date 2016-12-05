/**
 * This example shows data binding using unary operators in expressions.
 */
Ext.define('KitchenSink.view.binding.AlgebraUnary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-algebra-unary',

    bodyPadding: 10,
    shadow: true,
    cls: 'demo-solid-background',

    viewModel: {
        type: 'default',
        data: {
            x: 1
        }
    },

    defaults: {
        xtype: 'textfield',
        readOnly: true
    },

    items: [{
        xtype: 'spinnerfield',
        stepValue: 1,
        readOnly: false,
        label: 'x',
        bind: '{x}'
    }, {
        label: '!x',
        bind: '{!x}'
    },{
        label: '+x',
        bind: '{+x}'
    },{
        label: '-x',
        bind: '{-x}'
    },{
        label: 'Globals',
        //expressions should have at least one token to be evaluated
        bind: 'Ext JS version: {@Ext.versions.ext.version}'
    }]
});
