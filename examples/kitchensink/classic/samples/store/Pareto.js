Ext.define('KitchenSink.store.Pareto', {
    extend: 'Ext.data.Store',
    alias: 'store.pareto',

    fields: ['complaint', 'count', 'cumnumber', 'cumpercent' ],

    constructor: function (config) {
        config = config || {};

        // Create data in construct time instead of defining it
        // on the prototype, so that each example that's using
        // this store works on its own set of data.
        config.data = [
            { complaint: 'Overpriced', count: 543, cumnumber: 543, cumpercent: 31 },
            { complaint: 'Small Portions', count: 412, cumnumber: 955, cumpercent: 55 },
            { complaint: 'High Wait Time', count: 245, cumnumber: 1200, cumpercent: 69 },
            { complaint: 'Tasteless Food', count: 187, cumnumber: 1387, cumpercent: 80 },
            { complaint: 'Bad Ambiance', count: 134, cumnumber: 1521, cumpercent: 88 },
            { complaint: 'Not Clean', count: 98, cumnumber: 1619, cumpercent: 93 },
            { complaint: 'Too Noisy', count: 65, cumnumber: 1684, cumpercent: 97 },
            { complaint: 'Salty Food', count: 41, cumnumber: 1725, cumpercent: 99 },
            { complaint: 'Unfriendly Staff', count: 12, cumnumber: 1737, cumpercent: 100 }
        ];

        this.callParent([config]);
    }

});