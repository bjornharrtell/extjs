Ext.define('Admin.view.forms.Wizards', {
    extend: 'Ext.container.Container',
    xtype: 'formswizardscontainer',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    cls: 'wizards',
    defaultFocus : 'wizardform',
    layout: 'responsivecolumn',

    items: [
        {
            xtype: 'formswizardone',
            responsiveCls: 'big-100'
        },
        {
            xtype: 'wizardform',
            cls: 'wizardtwo shadow-panel',
            colorScheme: 'soft-purple',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'wizardform',
            cls: 'wizardthree shadow-panel',
            colorScheme: 'soft-green',
            responsiveCls: 'big-50 small-100'
        }
    ]
});
