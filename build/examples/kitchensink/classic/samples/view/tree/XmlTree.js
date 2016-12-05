/**
 * This example is the same as the basic tree sample, however it loads
 * from an XML data source.
 */
Ext.define('KitchenSink.view.tree.XmlTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'tree-xml',

    requires: [
        'Ext.data.TreeStore'
    ],

    //<example>
    //</example>
    
    title: 'Files',
    height: 400,
    width: 350,
    useArrows: true,
    
    store: {
        type: 'tree',
        proxy: {
            type: 'ajax',
            url: '/xml-tree/get-nodes.php',
            reader: {
                type: 'xml',
                rootProperty: 'nodes',
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
    },

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            containerScroll: true
        }
    }
});
