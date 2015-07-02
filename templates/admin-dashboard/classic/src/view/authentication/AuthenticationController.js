Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function(button, e) {
        this.redirectTo("dashboard");
    },

    onLoginButton: function(button, e, eOpts) {
        this.redirectTo("dashboard");
    },

    onLoginAsButton: function(button, e, eOpts) {
        this.redirectTo("authentication.login");
    },

    onNewAccount:  function(button, e, eOpts) {
        this.redirectTo("authentication.register");
    },

    onSignupClick:  function(button, e, eOpts) {
        this.redirectTo("dashboard");
    },

    onResetClick:  function(button, e, eOpts) {
        this.redirectTo("dashboard");
    }
});
