/**
 * This example shows data binding using formatters in expressions.
 */
Ext.define('KitchenSink.view.binding.AlgebraFormatters', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-algebra-formatters',

    bodyPadding: 10,

    shadow: true,
    cls: 'demo-solid-background',

    viewModel: {
        type: 'default',
        data: {
            x: 10.52,
            y: 10.52
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
        xtype: 'spinnerfield',
        stepValue: 1,
        readOnly: false,
        label: 'y',
        bind: '{y}'
    }, {
        label: 'Single',
        bind: '{ ( x > y ) ? ( x:number("0") ) : ( (y/2):number("0.00") ) }'
    }, {
        label: 'Chained',
        bind: '{ (x*y*100):fileSize:lowercase }'
    }, {
        label: 'Nested',
        bind: '{ (x*y):currency( "USD":lowercase, (x/y):round(0):lessThanElse(20, 2, 5) ) }'
    }]
});
