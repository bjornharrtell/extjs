/**
 * Data binding expressions can use binary operators (+, -, *, /, etc.)
 * to convert their bound value into the desired replacement.
 */
Ext.define('KitchenSink.view.binding.AlgebraBinary', {
    extend: 'Ext.panel.Panel',
    xtype: 'binding-algebra-binary',

    title: 'Binary operators',

    width: 470,
    layout: 'hbox',
    bodyPadding: '10 20',
    frame: true,

    viewModel: {
        data: {
            x: 10,
            y: 10
        }
    },

    items: [{
        items: [{
            fieldLabel: 'x + y',
            bind: '{x + y}'
        }, {
            fieldLabel: 'x * y',
            bind: '{x * y}'
        }, {
            fieldLabel: 'x > y',
            bind: '{x > y}'
        }, {
            fieldLabel: 'x >= y',
            bind: '{x >= y}'
        }, {
            fieldLabel: 'x == y',
            bind: '{x == y}'
        }, {
            fieldLabel: 'x === y',
            bind: '{x === y}'
        }, {
            fieldLabel: 'x > y && y >= 10',
            bind: '{x > y && y >= 10}'
        }]
    }, {
        items: [{
            fieldLabel: 'x - y',
            bind: '{x - y}'
        }, {
            fieldLabel: 'x / y',
            bind: '{x / y}'
        }, {
            fieldLabel: 'x < y',
            bind: '{x < y}'
        }, {
            fieldLabel: 'x <= y',
            bind: '{x <= y}'
        }, {
            fieldLabel: 'x != y',
            bind: '{x != y}'
        }, {
            fieldLabel: 'x !== y',
            bind: '{x !== y}'
        }, {
            fieldLabel: 'x > y || y >= 10',
            bind: '{x > y || y >= 10}'
        }]
    }],

    defaults: {
        border: false,
        flex: 1,
        layout: 'anchor',
        defaultType: 'displayfield',
        defaults: {
            anchor: '0'
        }
    },

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
