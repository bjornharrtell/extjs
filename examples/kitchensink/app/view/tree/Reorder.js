Ext.define('KitchenSink.view.tree.Reorder', {
    extend: 'Ext.tree.Panel',
    
    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ],
    xtype: 'tree-reorder',
    
    //<example>
    exampleTitle: 'Drag and Drop ordering in a TreePanel',
    exampleDescription: [
        '<p>This example shows basic drag and drop node moving in a tree. In this implementation there are no restrictions and',
        'anything can be dropped anywhere except appending to nodes marked "leaf" (the files).</p>',
        '<p>In order to demonstrate drag and drop insertion points, sorting was <b>not</b> enabled.</p>',
        '<p>The data for this tree is asynchronously loaded through a TreeStore and AjaxProxy.</p>'
    ].join(''),
    //</example>
    
    height: 400,
    width: 350,
    title: 'Files',
    useArrows: true,
    
    initComponent: function() {
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    //<example>
                    extraParams: {
                        path: Ext.repoDevMode ? '' : 'extjs'
                    },
                    //</example>
                    url: 'resources/data/tree/get-nodes.php'
                },
                root: {
                    text: 'Ext JS',
                    id: 'src',
                    expanded: true
                },
                folderSort: true,
                sorters: [{
                    property: 'text',
                    direction: 'ASC'
                }]
            }),
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                }
            },
            tbar: [{
                text: 'Expand All',
                scope: this,
                handler: this.onExpandAllClick
            }, {
                text: 'Collapse All',
                scope: this,
                handler: this.onCollapseAllClick
            }]
        });
        this.callParent();
    },
    
    onExpandAllClick: function(){
        var me = this,
            toolbar = me.down('toolbar');
            
        me.getEl().mask('Expanding tree...');
        toolbar.disable();
                    
        this.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
    },
    
    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');
        
        toolbar.disable();
        this.collapseAll(function() {
            toolbar.enable();
        });
    }
});
