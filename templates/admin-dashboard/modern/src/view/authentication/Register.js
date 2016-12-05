Ext.define('Admin.view.authentication.Register', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'register',

    requires: [
        'Ext.field.Checkbox',
        'Ext.field.Password',
        'Ext.field.Text',
        'Ext.layout.HBox'
    ],

    items: [{
        xtype: 'panel',

        items: [{
            padding: '20 0 0 20',
            html: 'Create an Account'
        },{
            xtype: 'container',
            padding: 20,
            layout: 'vbox',
            defaults: {
                margin:'0 0 10 0'
            },
            items: [{
                xtype: 'textfield',
                placeHolder: 'Full Name',
                ui: 'light'
            },{
                xtype: 'textfield',
                placeHolder: 'Username',
                ui: 'light'
            },{
                xtype: 'textfield',
                placeHolder: 'Email',
                ui: 'light'
            },{
                xtype: 'passwordfield',
                placeHolder: 'Password',
                ui: 'light'
            },{
                layout: 'hbox',
                items: [{
                    xtype: 'checkboxfield'
                },{
                    html: 'I agree to the terms & conditions'
                }]
            },{
                xtype: 'button',
                text: 'Signup',
                iconAlign: 'right',
                iconCls: 'x-fa fa-user-plus',
                ui: 'confirm',
                handler: function(){
                    window.location.href = "#dashboard";
                }
            },{
                xtype: 'button',
                text: 'Login with Facebook',
                iconAlign: 'right',
                iconCls: 'x-fa fa-facebook',
                ui: 'facebook',
                handler: function(){
                    window.location.href = "#dashboard";
                }
            }]
        }]
    }]
});
