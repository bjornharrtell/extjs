Ext.define('GeoCon.store.Votes', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.JsonP'],

    config: {
        model: 'GeoCon.model.Vote',
        groupField: 'voted_at_str',
        groupDir: 'DESC',

        proxy: {
            type: 'jsonp',
            url: 'https://congress.api.sunlightfoundation.com/votes',

            // The following must be set to disable extra parameters being sent to the API, which breaks it
            noCache: false,
            startParam: '',
            pageParam: '',
            limitParam: '',

            extraParams: {
                apikey: '8a341f85c657435989e75c9a83294762'
            },

            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});
