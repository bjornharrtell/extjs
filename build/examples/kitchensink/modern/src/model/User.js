Ext.define('KitchenSink.model.User', {
    extend: 'KitchenSink.model.Base',

    fields: ['id', 'name'],
    hasMany: 'Order',
    proxy: {
        type: 'ajax',
        url : 'data/userData.json'
    }
});
