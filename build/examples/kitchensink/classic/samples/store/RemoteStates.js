Ext.define('KitchenSink.store.RemoteStates', {
    extend: 'Ext.data.Store',

    alias: 'store.remote-states',

    model: 'KitchenSink.model.State',
    
    storeId: 'remote-states',

    proxy: {
        type: 'ajax',
        url: 'data/form/states_remote.php',
        reader: {
            type: 'array',
            rootProperty: 'data'
        }
    }
});