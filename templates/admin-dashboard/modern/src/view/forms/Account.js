Ext.define('Admin.view.forms.Account', {
    extend: 'Ext.form.Panel',
    xtype: 'accountform',
    cls: 'wizardform',

    requires: [
        'Ext.field.Password',
        'Ext.field.Text'
    ],

    title: 'Account',
    iconCls: 'x-fa fa-info',

    bodyPadding: '0 20 10 20',
    defaults: {
        margin: '0 0 10 0'
    },

    items: [{
        xtype: 'textfield',
        placeHolder: 'Username must be unique'
    }, {
        xtype: 'textfield',
        placeHolder: 'Email (ex: me@somewhere.com)'
    }, {
        xtype: 'passwordfield',
        placeHolder: 'Enter a password'
    }, {
        xtype: 'passwordfield',
        placeHolder: 'Passwords must match'
    }]
});
