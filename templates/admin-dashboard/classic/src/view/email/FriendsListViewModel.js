Ext.define('Admin.view.email.FriendsListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.emailfriendslist',

    stores: {
        friends: {
            //Store reference
            type: 'emailfriends',

            //Auto load
            autoLoad: true
        }
    }
});
