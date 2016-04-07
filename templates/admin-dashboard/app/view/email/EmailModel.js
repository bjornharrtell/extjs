Ext.define('Admin.view.email.EmailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.email',

    stores: {
        inbox: {
            type: 'inbox'
        },

        friends: {
            type: 'emailfriends'
        }
    }
});
