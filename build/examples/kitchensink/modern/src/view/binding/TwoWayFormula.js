Ext.define('KitchenSink.view.binding.TwoWayFormula', {
    extend: 'Ext.form.Panel',

    // <example>
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/binding/TwoWayFormulaModel.js'
    }],
    // </example>

    viewModel: 'binding-twowayformula',

    shadow: true,
    cls: 'demo-solid-background',

    items: {
        xtype: 'fieldset',
        instructions: [
            'The Celcius value is calculated from Kelvin. When the Celcius ',
            'value changes, the Kelvin value is updated via the formula. ',
            'The Fahrenheight value is calculated from Celcius. When the ',
            'Fahrenheit value changes, the Celcius value is updated via the formula.'
        ].join(''),
        defaultType: 'spinnerfield',
        items: [{
            label: 'Kelvin \u00b0',
            stepValue: 0.1,
            bind: '{kelvin}'
        }, {
            label: 'Fahrenheit \u00b0',
            stepValue: 0.1,
            bind: '{fahrenheit}'
        }, {
            label: 'Celcius \u00b0',
            stepValue: 0.1,
            bind: '{celcius}'
        }]
    }
});
