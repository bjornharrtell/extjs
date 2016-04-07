Ext.define('Admin.view.search.ResultsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.searchresults',

    stores: {
        results: {
            type: 'searchresults'
        },

        users: {
            type: 'searchusers'
        },

        inbox: {
            type: 'inbox'
        }
    }
});
