Ext.define('KitchenSink.model.Account', {
    extend: 'KitchenSink.model.Base',
    fields: ['id', 'accountKey', 'created', {
        name: 'personId',
        reference: 'Person'
    }]
});