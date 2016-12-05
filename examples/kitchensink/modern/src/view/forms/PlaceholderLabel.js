Ext.define('KitchenSink.view.forms.PlaceholderLabel', {
    extend: 'Ext.form.Panel',
    xtype: 'placeholderlabel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.TextArea'
    ],

    shadow: true,
    cls: 'demo-solid-background',
    items: {
        xtype: 'fieldset',
        defaults: {
            labelAlign: 'top'
        },
        items: [
            {
                xtype: 'textfield',
                label: 'Title',
                labelAlign: 'placeholder'
            },
            {
                xtype: 'textfield',
                label: 'Price',
                labelAlign: 'placeholder'
            },
            {
                xtype: 'textfield',
                label: 'Specific Location (optional)',
                labelAlign: 'placeholder'
            },
            {
                xtype: 'textareafield',
                label: 'Description',
                labelAlign: 'placeholder'
            }
        ]
    }
});
