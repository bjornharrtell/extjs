Ext.define('KitchenSink.view.AMF3', {
    extend: 'Ext.grid.Grid',

    //<example>
    requires: [
        'Ext.data.amf.Proxy'
    ],
    //</example>

    store: {
        model: 'KitchenSink.model.Pangram',
        proxy: {
            type: 'amf',
            url: 'data/enterprise/amf3-pangrams.amf'
        },
        autoLoad: true
    },
    columns: [
        {
            text: 'Language',
            dataIndex: 'language',
            width: 130
        },
        {
            text: 'Pangram',
            dataIndex: 'text',
            width: 400
        }
    ]
});