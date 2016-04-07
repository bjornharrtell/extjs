Ext.define('Admin.view.forms.Wizards', {
    extend: 'Ext.container.Container',
    xtype: 'forms',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    cls: 'wizards',
    defaultFocus : 'wizardform',
    layout: 'responsivecolumn',

    items: [
        {
            xtype: 'formswizardone',
            userCls: 'big-100'
        },
        {
            xtype: 'wizardform',
            cls: 'wizardtwo shadow',
            colorScheme: 'soft-purple',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'wizardform',
            cls: 'wizardthree shadow',
            colorScheme: 'soft-green',
            userCls: 'big-50 small-100'
        }
    ]
});
