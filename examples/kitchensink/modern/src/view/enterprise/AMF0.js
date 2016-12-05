Ext.define('KitchenSink.view.enterprise.AMF0', {
    extend: 'Ext.grid.Grid',

    requires: [
        'Ext.data.amf.Proxy'
    ],

    // <example>
    otherContent: [{
        type: 'Model',
        path: 'modern/src/model/Pangram.js'
    }],
    // </example>
    
    shadow: true,
    cls: 'demo-solid-background',

    store: {
        model: 'KitchenSink.model.Pangram',
        proxy: {
            type: 'amf',
            url: 'data/enterprise/amf0-pangrams.amf'
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
