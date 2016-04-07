/**
 * The settings form panel
 */
Ext.define('GeoCon.view.Settings', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.field.Spinner'
    ],

    id: 'settingsForm',

    config: {
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'State',
                        store: 'States',
                        displayField: 'state',
                        valueField: 'abbr',
                        id: 'selectState'
                    },
                    {
                        xtype: 'spinnerfield',
                        label: 'District',
                        stepValue: 1,
                        minValue: 0,
                        maxValue: 0,
                        id: 'districtSpinner'
                    }
                ]
            },
            {
                xtype: 'button',
                margin: '0 25%',
                text: 'Lookup',
                ui: 'confirm',
                id: 'lookupBtn'
            }
        ]
    }
});
