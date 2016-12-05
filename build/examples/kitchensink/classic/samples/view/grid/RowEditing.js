/**
 * This example shows how to enable row editing in grids.
 */
Ext.define('KitchenSink.view.grid.RowEditing', {
    extend: 'Ext.grid.Panel',
    xtype: 'row-editing',
    controller: 'row-editing',
    
    title: 'Row Editing Employees',
    width: 700,
    height: 400,
    
    store: {
        type: 'big-data'
    },
    
    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        autoCancel: false
    }],
    
    columns: [{
        header: 'Name',
        dataIndex: 'name',
        width: 100,
        flex: 1,
        dirtyText: 'Name has been edited',
        editor: {
            // defaults to textfield if no xtype is supplied
            allowBlank: false
        }
    }, {
        header: 'Email',
        dataIndex: 'email',
        dirtyText: 'E-mail was changed',
        flex: 1,
        editor: {
            allowBlank: false,
            vtype: 'email'
        }
    }, {
        xtype: 'datecolumn',
        header: 'Start Date',
        dataIndex: 'joinDate',
        width: 135,
        editor: {
            xtype: 'datefield',
            allowBlank: false,
            format: 'm/d/Y',
            minValue: '01/01/2006',
            minText: 'Cannot have a start date before the company existed!',
            maxValue: Ext.Date.format(new Date(), 'm/d/Y')
        }
    }, {
        xtype: 'numbercolumn',
        header: 'Salary',
        dataIndex: 'salary',
        format: '$0,0',
        width: 130,
        dirtyText: null,
        editor: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 1,
            maxValue: 150000
        }
    }, {
        xtype: 'checkcolumn',
        header: 'Active?',
        dataIndex: 'active',
        width: 60,
        editor: {
            xtype: 'checkbox',
            cls: 'x-grid-checkheader-editor'
        }
    }],

    tbar: [{
        text: 'Add Employee',
        handler: 'onAddClick'
    }, {
        text: 'Remove Employee',
        reference: 'removeEmployee',
        handler: 'onRemoveClick',
        disabled: true
    }],
    
    listeners: {
        selectionchange: 'onSelectionChange'
    }
});
