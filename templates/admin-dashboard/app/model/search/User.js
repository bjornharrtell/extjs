Ext.define('Admin.model.search.User', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'identifier'
        },
        {
            type: 'string',
            name: 'fullname'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            name: 'subscription'
        },
        {
            type: 'date',
            name: 'joinDate'
        },
        {
            type: 'boolean',
            name: 'isActive'
        },
        {
            name: 'profile_pic'
        }
    ]
});
