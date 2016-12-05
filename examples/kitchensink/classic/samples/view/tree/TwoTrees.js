/**
 * The TreePanels have a TreeSorter applied in "folderSort" mode. Both TreePanels are in
 * "appendOnly" drop mode since they are sorted.
 *
 * Target node is sorted upon drop to maintain initially configured sort order.
 *
 * Hover at top or bottom edge of the tree to trigger auto scrolling while performing a
 * drag and drop.
 *
 * The data for this tree is asynchronously loaded with a TreeStore and AjaxProxy.
 */
Ext.define('KitchenSink.view.tree.TwoTrees', {
    extend: 'Ext.container.Container',
    xtype: 'tree-two',

    requires: [
        'Ext.data.TreeStore',
        'Ext.layout.container.HBox'
    ],

    //<example>
    //</example>
    
    height: 300,
    width: 550,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
        title: 'Source',
        xtype: 'treepanel',
        margin: '0 15 0 0',
        flex: 1,

        store: {
            type: 'tree',
            proxy: {
                type: 'ajax',
                url: '/tree/get-nodes.php'
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
                ddGroup: 'two-trees-drag-drop',
                appendOnly: true,
                sortOnDrop: true,
                containerScroll: true
            }
        }
    }, {
        title: 'Custom Build',
        xtype: 'treepanel',
        flex: 1,

        store: {
            type: 'tree',
            proxy: {
                type: 'ajax',
                url: '/tree/get-nodes.php'
            },
            root: {
                text: 'Custom Ext JS',
                id: 'src',
                expanded: true,
                children: []
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
                ddGroup: 'two-trees-drag-drop',
                appendOnly: true,
                sortOnDrop: true,
                containerScroll: true,
                allowContainerDrops: true
            }
        }
    }]
});
