Ext.define('KitchenSink.store.Months', {
    extend: 'Ext.data.Store',

    alias: 'store.months',

    fields: [
        'id',
        'name',
        'number'
    ],

    data: Ext.Array.map(Ext.Date.monthNames, function (name, number) {
        return {
            id: number,
            name: name,
            number: number + 1
        };
    })
});
