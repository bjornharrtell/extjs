Ext.define('Admin.model.search.Attachment', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'url'
        },
        {
            type: 'string',
            name: 'title'
        }
    ]
});
