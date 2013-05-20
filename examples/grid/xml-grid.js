Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
    Ext.define('Book',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            // The first needs mapping, the others are very basic
            {name: 'Author', mapping: '@author.name'},
            'Title', 'Manufacturer', 'ProductGroup'
        ]
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        model: 'Book',
        autoLoad: true,
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: 'sheldon.xml',
            // the return will be XML, so lets set up a reader
            reader: {
                type: 'xml',
                // records will have an "Item" tag
                record: 'Item',
                idProperty: 'ASIN',
                totalRecords: '@total'
            }
        }
    });

    // create the grid
    Ext.create('Ext.grid.Panel', {
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
