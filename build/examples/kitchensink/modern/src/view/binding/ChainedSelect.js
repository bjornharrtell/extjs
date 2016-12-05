Ext.define('KitchenSink.view.binding.ChainedSelect', {
    extend: 'Ext.form.Panel',

    // <example>
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/binding/ChainedSelectModel.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/Countries.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/States.js'
    }],
    // </example>

    referenceHolder: true,

    shadow: true,
    cls: 'demo-solid-background',

    viewModel: 'binding-chainedselect',

    items: {
        xtype: 'fieldset',
        instructions: [
            'The states store contains all states, however it filters based upon the ',
            'id of the selected record in the country field.'
        ].join(''),
        items: [{
            xtype: 'selectfield',
            label: 'Country',
            reference: 'countryField',
            valueField: 'id',
            displayField: 'name',
            bind: {
                store: '{countries}'
            }
        }, {
            xtype: 'selectfield',
            label: 'States',
            placeHolder: 'Choose a country',
            valueField: 'id',
            displayField: 'name',
            bind: {
                store: '{states}'
            }
        }]
    }
});
