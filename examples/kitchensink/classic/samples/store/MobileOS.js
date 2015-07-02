Ext.define('KitchenSink.store.MobileOS', {
    extend: 'Ext.data.Store',
    alias: 'store.mobile-os',

    fields: ['os', 'data1' ],
    data: [
        { os: 'Android', data1: 68.3 },
        { os: 'BlackBerry', data1: 1.7 },
        { os: 'iOS', data1: 17.9 },
        { os: 'Windows Phone', data1: 10.2 },
        { os: 'Others', data1: 1.9 }
    ]

});