Ext.define('Admin.view.profile.UserProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userprofile',

    stores: {
        userSharedItemsStore: {
            autoLoad: true,
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'parent_id'
                },
                {
                    name: 'name'
                },
                {
                    name: 'source'
                },
                {
                    name: 'date'
                },
                {
                    name: 'isActive'
                },
                {
                    name: 'time'
                },
                {
                    name: 'content'
                }
            ],
            proxy: {
                type: 'ajax',
                url: '~api/usershareditems',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }            
        },

        userNotificationStore: {
            autoLoad: true,
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'name'
                },
                {
                    name: 'content'
                },
                {
                    name: 'date'
                },
                {
                    name: 'time'
                }
            ],
            proxy: {
                type: 'ajax',
                url: '~api/usernotifications',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});
