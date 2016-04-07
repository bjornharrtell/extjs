Ext.define('Admin.view.profile.UserProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userprofile',

    stores: {
        userSharedItems: {
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
                type: 'api',
                url: '~api/usershareditems'
            }            
        },

        userTimeline: {
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
                    name: 'date',
                    type: 'date'
                },
                {
                    name: 'userId'
                },
                {
                    name: 'notificationType'
                }
            ],
            proxy: {
                type: 'api',
                url: '~api/usertimeline'
            }
        }
    }
});
