Ext.define('Admin.view.authentication.PasswordReset', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'passwordreset',

    requires: [
        'Ext.field.Text'
    ],

    items: [{
        xtype:'panel',
        padding:20,

        items: [{
            html: 'Forgot Password',
            padding: '0 0 10 0'
        },{
            xtype:'container',
            defaults: {
                margin:'0 0 10 0'
            },
            items: [{
                xtype: 'textfield',
                minWidth: 300,
                placeHolder: 'example@example.com',
                ui: 'light'
            },{
                xtype: 'button',
                text: 'Reset Password',
                iconAlign: 'right',
                iconCls: 'x-fa fa-angle-right',
                ui: 'action',
                width: '100%',
                handler: function(){
                    window.location.href = "#dashboard";
                }
            },{
                html: '<a href="#login">Back to Login</a>'
            }]
        }]
    }]
});
