Ext.define('KitchenSink.model.Stock', {
    extend: 'Ext.data.TreeModel',

    fields: [
        'name',
        'description',
        'cap',
        {
            name: 'leaf',
            calculate: function (data) {
                return data.root ? false : !data.children;
            }
        },
        {
            name: 'change',
            calculate: function () {
                return (-5 + Math.random() * 10).toFixed(2); // percentages
            }
        },
        {
            name: 'expanded',
            type: 'boolean',
            defaultValue: true
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'data/tree/stocks.json'
    }

});