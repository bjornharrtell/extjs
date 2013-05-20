Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
    Ext.define('Book',{
        extend: 'Ext.data.Model',
        fields: [
            // set up the fields mapping into the xml doc
            // The first needs mapping, the others are very basic
            {name: 'Author', mapping: 'm|ItemAttributes > m|Author'},
            'Title', 'Manufacturer', 'ProductGroup'
        ]
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        model: 'Book',
        autoLoad: true,
        proxy: {
            type: 'soap',
            url: 'sheldon-soap.xml',
            api: {
                read: 'ItemSearch'
            },
            soapAction: {
                read: 'http://webservices.amazon.com/ItemSearch'
            },
            operationParam: 'operation',
            extraParams: {
                'Author': 'Sheldon'
            },
            targetNamespace: 'http://webservices.amazon.com/',
            reader: {
                type: 'soap',
                record: 'm|Item',
                idProperty: 'ASIN',
                namespace: 'm'
            }
        }
    });

    // create the grid
    var grid = Ext.create('Ext.grid.Panel', {
        frame: true,
        title: 'Soap Grid Example',
        store: store,
        columns: [
            {text: "Author", flex: 1, dataIndex: 'Author'},
            {text: "Title", width: 180, dataIndex: 'Title'},
            {text: "Manufacturer", width: 115, dataIndex: 'Manufacturer'},
            {text: "Product Group", width: 100, dataIndex: 'ProductGroup'}
        ],
        renderTo:'example-grid',
        width: 540,
        height: 200
    });
});
