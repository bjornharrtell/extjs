/**
 * This example shows simple checkbox selection in a tree. It is enabled on leaf nodes by
 * simply setting `checked: true/false` at the node level.
 *
 * This example also shows loading an entire tree structure statically in one load call,
 * rather than loading each node asynchronously.
 *
 * The beforecheckchange event is used to veto the taking of a nap.
 */
Ext.define('KitchenSink.view.tree.CheckTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'check-tree',
    
    //<example>
    exampleTitle: 'Checkbox Selection in a TreePanel',
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/tree/CheckTreeController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/CheckTree.js'
    }, {
        type: 'Data',
        path: 'data/tree/check-nodes.json'
    }],
    //</example>

    // Checking propagates up and down
    checkPropagation: 'both',
    controller: 'check-tree',
    store: 'CheckTree',
    rootVisible: false,
    useArrows: true,
    frame: true,
    title: 'Check Tree',
    width: 280,
    height: 300,
    bufferedRenderer: false,
    animate: true,
    listeners: {
        beforecheckchange: 'onBeforeCheckChange'
    },
    tbar: [{
        text: 'Get checked nodes',
        handler: 'onCheckedNodesClick'
    }]
});
