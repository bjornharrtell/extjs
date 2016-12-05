/**
 * This example shows how a grid can have its store and columns reconfigured dynamically.
 * By default, we start with no store or columns, we can define them later using the
 * reconfigure method.
 */
Ext.define('KitchenSink.view.grid.Reconfigure', {
    extend: 'Ext.container.Container',
    xtype: 'reconfigure-grid',
    controller: 'reconfigure-grid',

    requires: [
        'Ext.grid.*',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/ReconfigureController.js'
    }],
    profiles: {
        classic: {
            employeeWidth: 100    
        },
        neptune: {
            employeeWidth: 130
        }
    },
    //</example>
    
    width: 500,
    height: 330,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    viewModel: {
        data: {
            nowShowing: 'Click a button...'
        }
    },
    
    items: [{
        xtype: 'container',
        layout: 'hbox',
        defaultType: 'button',
        items: [{
            text: 'Show Offices',
            itemId: 'Offices',
            handler: 'onShowClick',
            reference: 'showOffices'
        }, {
            text: 'Show Employees',
            itemId: 'Employees',
            margin: '0 0 0 10',
            handler: 'onShowClick',
            reference: 'showEmployees'
        }]
    }, {
        xtype: 'grid',
        reference: 'reconGrid',
        margin: '10 0 0 0',
        flex: 1,
        bind: {
            title: '{nowShowing}'
        },

        columns: [],
        viewConfig: {
            emptyText: 'Click a button to show a dataset',
            deferEmptyText: false
        }
    }],
    
    etc: {
        Employees: {
            store: 'createEmployeeStore',
            columns: [{
                text: 'First Name',
                dataIndex: 'forename'
            }, {
                text: 'Last Name',
                dataIndex: 'surname'
            }, {
                text: 'Employee No.',
                dataIndex: 'employeeNo',
                
                width: '${employeeWidth}'
            }, {
                text: 'Department',
                dataIndex: 'department',
                
                flex: 1
            }]
        },

        Offices: {
            store: 'createOfficeStore',
            columns: [{
                text: 'City',
                dataIndex: 'city',
                
                flex: 1
            }, {
                text: 'Total Employees',
                dataIndex: 'totalEmployees',
                
                width: 140
            }, {
                text: 'Manager',
                dataIndex: 'manager',
                
                width: 120
            }]
        }
    }
});
