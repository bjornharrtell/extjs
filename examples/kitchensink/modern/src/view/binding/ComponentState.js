Ext.define('KitchenSink.view.binding.ComponentState', {
    extend: 'Ext.form.Panel',

    //<example>
    requires: [
        'Ext.app.ViewModel'
    ],
    //</example>

    viewModel: true,

    items: {
        xtype: 'fieldset',
        instructions: [
            'The admin key field is disabled when the admin checkbox is not checked. ',
            'The high priority field is hidden when the priority is toggled.'
        ].join(''),
        items: [{
            xtype: 'checkboxfield',
            label: 'Is Admin',
            reference: 'isAdmin'
        }, {
            xtype: 'textfield',
            label: 'Admin Key',
            enforceMaxLength: true,
            bind: {
                disabled: '{!isAdmin.checked}'
            }
        }, {
            xtype: 'togglefield',
            label: 'Priority',
            reference: 'priority'
        }, {
            xtype: 'textfield',
            label: 'High Priority Code',
            bind: {
                hidden: '{!priority.value}'
            }
        }]
    }
});