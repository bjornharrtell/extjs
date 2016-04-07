Ext.define('Admin.view.search.ResultsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.searchresults',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],

    stores: {
        allResults: {
            type: 'searchresults'
        },

        usersResults: {
            type: 'searchusers'
        },
        
        inboxResults: {
            type: 'inbox'
        }
    }
});
