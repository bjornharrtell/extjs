Ext.define('GeoCon.store.Districts', {
    extend  : 'Ext.data.Store',

    config: {
        fields: [ 'state', 'district' ],

        proxy: {
            type: 'jsonp',
            url: 'http://congress.api.sunlightfoundation.com/districts/locate',
            preventNamespacing: true,
            extraParams: {
                apikey: '8a341f85c657435989e75c9a83294762',
                per_page: 'all'
            },
            reader: {
                rootProperty: 'results'
            }
        }
    }
});
