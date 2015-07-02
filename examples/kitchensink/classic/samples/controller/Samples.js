Ext.define('KitchenSink.controller.Samples', {
    extend: 'Ext.app.Controller',
    namespace: 'KitchenSink',

    stores: [
        'Companies',
        'Restaurants',
        'Files',
        'States',
        'RemoteStates',
        'BigData',
        "USD2EUR",
        'Widgets',
        'Posts',
        'GeoData',
        'StandardCharts',
        'Pie',
        'StockPrice',
        'LinearGeoData'
    ],

    controllers: [
        'Direct'
    ]
});