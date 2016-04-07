Ext.define('Admin.view.forms.WizardOne', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.formswizardone',
    requires: [
        'Ext.form.field.Radio'
    ],

    cls: 'wizardone shadow',

    plugins: 'responsive',

    responsiveConfig: {
        'width >= 1000': {
            layout: {
                type: 'box',
                align: 'stretch',
                vertical: false
            }
        },

        'width < 1000': {
            layout: {
                type: 'box',
                align: 'stretch',
                vertical: true
            }
        }
    },

    items: [
        {
            xtype: 'specialoffer',
            plugins: 'responsive',
            height: 338,

            responsiveConfig: {
                'width < 1000': {
                    flex: null
                },

                'width >= 1000': {
                    flex: 1
                }
            }
        },
        {
            xtype: 'wizardform',
            cls: 'wizardone',
            colorScheme: 'blue',
            flex: 1
        }
    ]
});
