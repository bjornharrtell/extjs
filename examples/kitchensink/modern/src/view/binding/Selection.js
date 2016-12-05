Ext.define('KitchenSink.view.binding.Selection', {
    extend: 'Ext.Container',

    // <example>
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/binding/SelectionModel.js'
    }, {
        type: 'Model',
        path: 'modern/src/model/Person.js'
    }],
    // </example>

    referenceHolder: true,

    viewModel: 'binding-selection',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    shadow: true,
    cls: 'demo-solid-background',

    items: [{
        xtype: 'list',
        flex: 1,
        itemTpl: '{lastName}, {firstName}',
        bind: '{people}',
        reference: 'peopleList'
    }, {
        xtype: 'formpanel',
        flex: 1,
        items: {
            xtype: 'fieldset',
            instructions: [
                'The form is bound to the selection in the list. As the form ',
                'fields change, the models in the list are automatically updated ',
                'with the field input.'
            ].join(''),
            items: [{
                xtype: 'textfield',
                label: 'First Name',
                bind: '{peopleList.selection.firstName}'
            }, {
                xtype: 'textfield',
                label: 'Last Name',
                bind: '{peopleList.selection.lastName}'
            }]
        }
    }]
});
