/**
 * This example shows how to use a Grid with a back end Store via Ext Direct proxy.
 *
 * The grid will be populated with the data queried from a virtual "table" hardcoded
 * in the PHP script that handles the requests; sorting is also performed remotely.
 */
Ext.define('KitchenSink.view.direct.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'direct-grid',
    controller: 'directgrid',
    
    requires: [
        'KitchenSink.view.direct.GridController'
    ],
    
    //<example>
    exampleTitle: 'Grid with Ext Direct back end',
    exampleDescription: [
        '<p>This example shows how to connect a Grid to the remote server via a Direct proxy.</p>',
        '<p>The data is queried from a virtual "table"; there are two datasets hardcoded',
        'in the example PHP script that handles the requests. Data sorting is also remote</p>'
    ].join(''),
    
    otherContent: [{
        type: 'ViewController',
        path: 'classic/samples/view/direct/GridController.js'
    }, {
        type: 'Base ViewController',
        path: 'classic/samples/view/direct/DirectVC.js'
    }, {
        type: 'Server TestAction class',
        path: 'data/direct/source.php?file=testaction'
    }, {
        type: 'Server API configuration',
        path: 'data/direct/source.php?file=config'
    }],
    //</example>

    title: 'Company Grid',
    width: 600,
    height: 350,
    
    store: {
        fields: ['name', 'revenue'],
        remoteSort: true,
        sorters: [{
            property: 'name',
            direction: 'ASC'
        }],
        proxy: {
            type: 'direct',
            directFn: 'TestAction.getGrid',
            metadata: {
                table: 'companies'
            }
        }
    },
    
    columns: [{
        dataIndex: 'name',
        flex: 1,
        text: 'Name'
    }, {
        dataIndex: 'revenue',
        align: 'right',
        width: 140,
        text: 'Annual revenue',
        renderer: Ext.util.Format.usMoney
    }],
    
    header: {
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Choose table',
            queryMode: 'local',
            displayField: 'desc',
            valueField: 'table',
            forceSelection: true,
            editable: false,
            value: 'companies',
            store: {
                fields: ['table', 'desc'],
                data: [
                    { table: 'companies', desc: 'Existing companies' },
                    { table: 'leads',     desc: 'Sales leads' }
                ]
            },
            listeners: {
                change: 'onTableChange'
            }
        }]
    }
});
