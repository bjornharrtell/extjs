Ext.define('Admin.view.authentication.LockScreen', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'lockscreen',

    requires: [
        'Ext.field.Text'
    ],

    padding:20,

    items: [{
        xtype: 'panel',

        items: [{
            xtype: 'container',
            userCls: 'lockscreen-header',
            padding:20,

            layout: 'hbox',
            items: [{
                xtype: 'img',
                src: 'resources/images/user-profile/2.png',
                height: 64,
                width: 64,
                userCls: 'circular'
            },{
                xtype: 'container',
                html: '<b>Goff Smith</b><br>Project Manager',
                padding:15
            }]
        },{
            padding:'20 20 0 20',
            html: 'It\'s been awhile.  Please enter your password to resume'
        },{
            xtype: 'container',
            padding: 20,
            defaults: {
                margin:'0 0 10 0'
            },
            items: [{
                xtype: 'passwordfield',
                placeHolder: 'Password',
                ui: 'light'
            },{
                xtype: 'button',
                text: 'Login',
                iconAlign: 'right',
                iconCls: 'x-fa fa-angle-right',
                width: '100%',
                ui: 'gray-button',
                handler: function(){
                    window.location.href = "#dashboard";
                }
            },{
                html: '<a href="#login">Sign in using a different account</a>'
            }]
        }]

    }]
});
