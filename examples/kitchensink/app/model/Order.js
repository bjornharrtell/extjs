Ext.define('KitchenSink.model.Order', {
    extend: 'KitchenSink.model.Base',

    fields: [
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
        'shipped',
        { 
            name: 'customerId',
            reference: {
                parent: 'Customer'
            }
        }
    ],

    proxy: {
        type: 'rest',
        url: '/KitchenSink/Order'
    }
});
