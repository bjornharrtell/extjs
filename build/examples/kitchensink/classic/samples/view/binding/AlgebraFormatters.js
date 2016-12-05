/**
 * Data binding expressions can use formatters to process their bound
 * values in various ways (for example, "{x:round(2)}" rounds "x" to
 * 2 decimal places).
 * 
 * Formatters can be chained ("{x:round(2):currency:lowercase}").
 * 
 * Formatters can be nested in any expression including parameters to
 * other formatters.
 */
Ext.define('KitchenSink.view.binding.AlgebraFormatters', {
    extend: 'Ext.panel.Panel',
    xtype: 'binding-algebra-formatters',

    title: 'Formatters',

    width: 370,
    bodyPadding: '10 20',
    frame: true,

    viewModel: {
        data: {
            x: 10.52,
            y: 10.52
        }
    },

    items: [{
        fieldLabel: 'Single',
        bind: '{ ( x > y ) ? ( x:number("0") ) : ( (y/2):number("0.00") ) }'
    }, {
        fieldLabel: 'Chained',
        bind: '{ (x*y*100):fileSize:lowercase }'
    }, {
        fieldLabel: 'Nested',
        bind: '{ (x*y):currency( "USD":lowercase, (x/y):round(0):lessThanElse(20, 2, 5) ) }'
    }],

    defaultType: 'displayfield',

    tbar: {
        ui: 'footer',
        defaultType: 'numberfield',
        defaults: {
            labelWidth: 20,
            margin: '0 0 0 10',
            width: 120
        },

        items: [{
            fieldLabel: 'x',
            bind: '{x}'
        }, {
            fieldLabel: 'y',
            bind: '{y}'
        }]
    }
});
