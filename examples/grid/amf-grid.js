Ext.require([
    'Ext.grid.Panel',
    'Ext.data.amf.*'
]);

Ext.onReady(function() {

    Ext.define('Pangram', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'language', type: 'string' },
            { name: 'text', type: 'string' }
        ]
    });

    Ext.create('Ext.grid.Panel', {
        title: 'AMF0 Pangrams',
        height: 350,
        width: 700,
        margin: '0 0 10 0',
        store: Ext.create('Ext.data.Store', {
            model: 'Pangram',
            proxy: {
                type: 'amf',
                url: 'amf0-pangrams.amf'
            },
            autoLoad: true
        }),
        columns: [
            { text: 'Language', dataIndex: 'language', width: 130 },
            { text: 'Pangram', dataIndex: 'text', flex: 1 }
        ],
        renderTo: Ext.getBody()
    });

    Ext.create('Ext.grid.Panel', {
        title: 'AMF3 Pangrams',
        height: 350,
        width: 700,
        store: Ext.create('Ext.data.Store', {
            model: 'Pangram',
            proxy: {
                type: 'amf',
                url: 'amf3-pangrams.amf'
            },
            autoLoad: true
        }),
        columns: [
            { text: 'Language', dataIndex: 'language', width: 130 },
            { text: 'Pangram', dataIndex: 'text', flex: 1 }
        ],
        renderTo: Ext.getBody()
    });

});
