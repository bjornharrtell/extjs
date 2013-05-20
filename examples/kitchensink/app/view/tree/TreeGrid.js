Ext.define('KitchenSink.view.tree.TreeGrid', {
    extend: 'Ext.tree.Panel',
    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn',
        'KitchenSink.model.tree.Task'
    ],    
    xtype: 'tree-grid',
    
    //<example>
    exampleTitle: 'TreeGrid',
    exampleDescription: [
        '<p>',
        '    This example is an advanced tree example. It illustrates:',
        '</p>',
        '<ul class="feature-list">',
        '    <li>Multiple headers</li>',
        '    <li>Preloading of nodes with a single AJAX request</li>',
        '    <li>Header hiding, showing, reordering and resizing</li>',
        '    <li>useArrows configuration</li>',
        '    <li>Keyboard Navigation</li>',
        '    <li>Discontiguous selection by holding the CTRL key</li>',
        '    <li>Using custom iconCls</li>',
        '    <li>singleExpand has been set to true</li>',
        '</ul>'
    ].join(''),
    themes: { 
        classic: {
            width: 500,
            colWidth: 40
        },
        neptune: {
            width: 600,
            colWidth: 55
        }
    },
    //</example>
    
    title: 'Core Team Projects',
    height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    
    initComponent: function() {
        this.width = this.themeInfo.width;
        
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                model: KitchenSink.model.tree.Task,
                proxy: {
                    type: 'ajax',
                    url: 'resources/data/tree/treegrid.json'
                },
                folderSort: true
            }),
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Task',
                flex: 2,
                sortable: true,
                dataIndex: 'task'
            },{
                //we must use the templateheader component so we can use a custom tpl
                xtype: 'templatecolumn',
                text: 'Duration',
                flex: 1,
                sortable: true,
                dataIndex: 'duration',
                align: 'center',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{duration:this.formatHours}', {
                    formatHours: function(v) {
                        if (v < 1) {
                            return Math.round(v * 60) + ' mins';
                        } else if (Math.floor(v) !== v) {
                            var min = v - Math.floor(v);
                            return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                        } else {
                            return v + ' hour' + (v === 1 ? '' : 's');
                        }
                    }
                })
            },{
                text: 'Assigned To',
                flex: 1,
                dataIndex: 'user',
                sortable: true
            }, {
                xtype: 'checkcolumn',
                header: 'Done',
                dataIndex: 'done',
                width: this.themeInfo.colWidth,
                stopSelection: false,
                menuDisabled: true
            }, {
                text: 'Edit',
                width: this.themeInfo.colWidth,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Edit task',
                align: 'center',
                icon: 'resources/images/edit_task.png',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
                },
                // Only leaf level tasks may be edited
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return !record.data.leaf;
                }
            }]
        });
        this.callParent();
    }
});
