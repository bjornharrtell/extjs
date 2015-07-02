Ext.define('Admin.view.email.InboxViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.emailinbox',

    stores: {
        EmailInbox: {
            //Store reference
            type: 'emailinbox'
        }
    }
});
