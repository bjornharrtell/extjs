Ext.define('Admin.view.profile.UserProfile', {
    extend: 'Ext.container.Container',
    xtype: 'userprofile',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    controller: 'userprofile',
    viewModel: {
        type: 'userprofile'
    },
    cls: 'userProfile-container',

    layout: 'responsivecolumn',

    items: [
        {
            xtype: 'profilesharepanel',
            
            // Always 100% of container
            responsiveCls: 'big-100'
        },
        {
            xtype: 'profilesocialpanel',
            
            // Use 50% of container when viewport is big enough, 100% otherwise
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'profiledescriptionpanel',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'profiletimelinepanel',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'profilenotificationspanel',
            responsiveCls: 'big-50 small-100'
        }
    ]
});
