Ext.define('Admin.view.dashboard.Todos', {
    extend: 'Ext.panel.Panel',
    xtype: 'todo',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.selection.CheckboxModel'
    ],

    cls: 'todo-list shadow-panel',

    title: 'TODO List',
    height: 320,
    bodyPadding: 15,
    layout: 'fit',
    items: [
        {
            xtype: 'gridpanel',
            cls: 'dashboard-todo-list',
            header: false,
            title: 'My Grid Panel',
            hideHeaders: true,
            scroll: 'none',
            bind: {
                store: '{todos}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'task',
                    text: 'Task',
                    flex: 1
                }
            ],

            dockedItems: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    dock: 'bottom',
                    padding: '10 0 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            fieldLabel: 'Add Task',
                            hideLabel: true,
                            width:540,
                            emptyText: 'Add New Task'
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
            ],
            selModel: {
                selType: 'checkboxmodel'
            }
        }
    ]
});
