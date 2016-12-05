Ext.define('KitchenSink.store.DoubleDonut', {
    extend: 'Ext.data.Store',
    alias: 'store.double-donut',

    data: [
        {provider: 'Amazon', usage: 370, type: 'public'},
        {provider: 'Azure', usage: 120, type: 'public'},
        {provider: 'TB', usage: 80, type: 'public'},
        {provider: 'Telstra', usage: 50, type: 'public'},
        {provider: 'VMWare', usage: 380, type: 'private'}
    ]

});