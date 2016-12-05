Ext.define('Admin.profile.Tablet', {
    extend: 'Ext.app.Profile',

    requires: [
        'Admin.view.tablet.*'
    ],

    // Map tablet/desktop profile views to generic xtype aliases:
    //
    views: {
        email: 'Admin.view.tablet.email.Email',
        inbox: 'Admin.view.tablet.email.Inbox',
        compose: 'Admin.view.tablet.email.Compose',

        searchusers: 'Admin.view.tablet.search.Users'
    },

    isActive: function () {
        return !Ext.platformTags.phone;
    }
});
