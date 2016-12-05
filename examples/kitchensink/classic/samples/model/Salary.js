Ext.define('KitchenSink.model.Salary', {
    extend: 'Ext.data.TreeModel',

    requires: [
        'KitchenSink.reader.Salary'
    ],

    fields: [
        'state',
        'text',
        'salary'
    ],

    proxy: {
        type: 'ajax',
        url: 'data/tree/salary.json',
        reader: {
            type: 'salary'
        }
    }

});