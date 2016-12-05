/**
 * This example shows basic drag and drop node moving in a tree. In this implementation
 * there are no restrictions and anything can be dropped anywhere except appending to nodes
 * marked "leaf" (the files).
 *
 * In order to demonstrate drag and drop insertion points, sorting is not enabled.
 *
 * The data for this tree is asynchronously loaded through a TreeStore and AjaxProxy.
 */
Ext.define('KitchenSink.view.tree.Reorder', {
    extend: 'Ext.tree.Panel',
    xtype: 'tree-reorder',
    controller: 'tree-reorder',

    requires: [
        'Ext.data.TreeStore'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/tree/ReorderController.js'
    }],
    //</example>

    title: 'Files',
    height: 400,
    width: 350,

    useArrows: true,

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
            containerScroll: true
        }
    },

    tbar: {
        reference: 'tbar',
        items: [{
            text: 'Expand All',
            handler: 'onExpandAllClick'
        }, {
            text: 'Collapse All',
            handler: 'onCollapseAllClick'
        }]
    }
});
