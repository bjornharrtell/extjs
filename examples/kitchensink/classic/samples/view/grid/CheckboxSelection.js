Ext.define('KitchenSink.view.grid.CheckboxSelection', {
    extend: 'Ext.panel.Panel',
    xtype: 'checkbox-selection',

    //<example>
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 700
        },
        neptune: {
            width: 750
        }
    },
    //</example>

    title: 'Grid with Checkbox Selection model',
    width: '${width}',
    height: 700,
    frame: true,
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'grid',
        flex: 0.5,
        title: 'checkOnly: false',
        
        store: 'Companies',
        columnLines: true,
        selType: 'checkboxmodel',
    
        columns: [{
            text: "Company",
            dataIndex: 'name',
    
            flex: 1
        }, {
            text: "Price",
            dataIndex: 'price',
    
            formatter: 'usMoney'
        }, {
            text: "Change",
            dataIndex: 'change'
        }, {
            text: "% Change",
            dataIndex: 'pctChange'
        }, {
            text: "Last Updated",
            dataIndex: 'lastChange',
    
            width: 120,
            formatter: 'date("m/d/Y")'
        }]
    }, {
        xtype: 'grid',
        flex: 0.5,
        title: 'checkOnly: true',
        
        store: 'Companies',
        columnLines: true,
        selModel: {
            type: 'checkboxmodel',
            checkOnly: true
        },
    
        columns: [{
            text: "Company",
            dataIndex: 'name',
    
            flex: 1
        }, {
            text: "Price",
            dataIndex: 'price',
    
            formatter: 'usMoney'
        }, {
            text: "Change",
            dataIndex: 'change'
        }, {
            text: "% Change",
            dataIndex: 'pctChange'
        }, {
            text: "Last Updated",
            dataIndex: 'lastChange',
    
            width: 120,
            formatter: 'date("m/d/Y")'
        }]
    }]
});
