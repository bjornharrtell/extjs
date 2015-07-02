Ext.define('GeoCon.store.Committees', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'GeoCon.model.Committee',
        groupField: 'chamber',

        proxy: {
            type: 'jsonp',
            url: 'http://congress.api.sunlightfoundation.com/committees',
            extraParams: {
                apikey: '8a341f85c657435989e75c9a83294762'
            },
            noCache: false,
            startParam: '',
            pageParam: '',
            limitParam: '',
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});
