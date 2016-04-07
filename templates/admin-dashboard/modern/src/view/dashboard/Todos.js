Ext.define('Admin.view.dashboard.Todos', {
    extend: 'Ext.Panel',
    xtype: 'todo',

    requires: [
        'Ext.grid.plugin.MultiSelection',
        'Ext.grid.Grid',
        'Ext.field.Text',
        'Ext.Button'
    ],

    cls: 'todo-list shadow',

    title: 'TODO List',
    bodyPadding:15,
    layout: 'vbox',
    items: [
        {
            xtype: 'grid',
            flex: 1,
            width: '100%',
            userCls: 'dashboard-todo-list',
            hideHeaders: true,
            bind: {
                store: '{todos}'
            },

            plugins: {
                type: 'gridmultiselection',

                selectionColumn: {
                    hidden: false,
                    width: 40  // Change column width from the default of 60px
                }
            },

            columns: [
                {
                    text: 'Task',
                    //width: 200,
                    flex: 1,
                    dataIndex: 'task'
                }
            ]
        },
        {
            xtype: 'toolbar',
            //layout: 'hbox',
            border: 0,
            padding: '10 0 0 0',
            items: [
                {
                    xtype: 'textfield',
                    flex: 1,
                    fieldLabel: 'Add Task',
                    hideLabel: true,
                    width:540,
                    placeHolder: 'Add New Task'
                },
                {
                    xtype: 'button',
                    ui: 'soft-green',
                    width: 40,
                    iconCls: 'x-fa fa-plus',
                    margin:'0 0 0 10'
                }
            ]
        }
    ]
});
