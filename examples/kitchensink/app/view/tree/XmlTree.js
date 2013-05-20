Ext.define('KitchenSink.view.tree.XmlTree', {
    extend: 'Ext.tree.Panel',
    
    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ],
    xtype: 'tree-xml',
    
    //<example>
    exampleTitle: 'XML tree',
    exampleDescription: [
        '<p>This example is the same as the basic tree sample, however it loads from an XML data source.</p>'
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
                    url: 'resources/data/tree/get-nodes.php',
                    extraParams: {
                        path: 'extjs',
                        isXml: true
                    },
                    reader: {
                        type: 'xml',
                        root: 'nodes',
                        record: 'node'
                    }
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
            }
        });
        this.callParent();
    }
});
