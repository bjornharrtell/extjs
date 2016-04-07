Ext.define('Admin.view.profile.UserProfile', {
    extend: 'Admin.view.profile.UserProfileBase',
    xtype: 'profile',
    cls: 'userProfile-container',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    layout: 'responsivecolumn',

    items: [
        {
            xtype: 'profileshare',
            
            // Always 100% of container
            userCls: 'big-100 small-100 shadow'
        },
        {
            xtype: 'profilesocial',
            
            // Use 50% of container when viewport is big enough, 100% otherwise
            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'profiledescription',

            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'profilenotifications',

            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'profiletimeline',

            userCls: 'big-50 small-100 shadow'
        }
    ]
});
