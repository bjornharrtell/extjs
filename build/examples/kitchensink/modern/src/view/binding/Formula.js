Ext.define('KitchenSink.view.binding.Formula', {
    extend: 'Ext.form.Panel',

    //<example>
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/binding/FormulaModel.js'
    }],
    //</example>
    
    viewModel: 'binding-formula',

    items: {
        xtype: 'fieldset',
        instructions: 'As the field changes, the formula calculates the 2x and 4x values.',
        items: [{
            xtype: 'spinnerfield',
            label: 'Number',
            stepValue: 1,
            bind: '{x}'
        }, {
            xtype: 'textfield',
            readOnly: true,
            label: 'Times 2',
            bind: '{x} * 2 = {twice}'
        }, {
            xtype: 'textfield',
            readOnly: true,
            label: 'Times 4',
            bind: '{x} * 4 = {quad}'
        }]
    }
});