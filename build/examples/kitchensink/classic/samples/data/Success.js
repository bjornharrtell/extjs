Ext.define('KitchenSink.data.Success', {
    requires: [
        'Ext.ux.ajax.SimManager'
    ]
}, function() {
    Ext.ux.ajax.SimManager.register({
        '/kitchensink/success.php': {
            type: 'json',
            delay: 1000,
            data: {
                success: true
            }
        }
    });
});