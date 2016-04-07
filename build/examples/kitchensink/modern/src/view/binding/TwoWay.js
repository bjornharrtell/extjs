Ext.define('KitchenSink.view.binding.TwoWay', {
    extend: 'Ext.form.Panel',

    //<example>
    requires: [
        'Ext.app.ViewModel'
    ],

    otherContent: [{
        type: 'ViewController',
        path: 'modern/src/view/binding/TwoWayController.js'
    }],
    //</example>

    controller: 'binding-twoway',

    viewModel: {
        data: {
            title: 'Default Title'
        }
    },

    items: [{
        xtype: 'titlebar',
        docked: 'top',
        bind: '{title}',
        items: [{
            text: 'Random Title',
            handler: 'makeRandomTitle'
        }]
    }, {
        xtype: 'fieldset',
        instructions: [
            'Change the text field which will alter the title bar text using binding. ',
            'The random title button sets the title on the ViewModel, which is propagated to ',
            'both the field and the title bar text.'
        ].join(''),
        items: {
            xtype: 'textfield',
            label: 'Title',
            bind: '{title}'
        }
    }]
});