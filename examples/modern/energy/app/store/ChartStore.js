Ext.define("EnergyApp.store.ChartStore", {
    extend: "Ext.data.Store",
    alias: 'store.ChartStore',
    config: {
        id: 'ChartStore',
        rootProperty: 'items',
        idProperty: 'year',
        fields: [
            {
                name: 'year',
                type: 'int'
            },
            {
                name: 'coal',
                type: 'int'
            },
            {
                name: 'nuclear',
                type: 'int'
            },
            {
                name: 'crude-oil',
                type: 'int'
            },
            {
                name: 'gas',
                type: 'int'
            },
            {
                name: 'renewable',
                type: 'int'
            }
        ]
    }
});
