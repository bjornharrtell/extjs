Ext.define('KitchenSink.model.Order', {
    extend: 'KitchenSink.model.Base',

    fields: ['id', 'status'],
    hasMany: 'OrderItem'
});