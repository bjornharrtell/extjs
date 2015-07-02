/**
 * This example shows how to use a Tree with nodes loaded dynamically from Ext.Direct
 * back end.
 */
Ext.define('KitchenSink.view.direct.Tree', {
    extend: 'Ext.tree.Panel',
    xtype: 'direct-tree',
    controller: 'directtree',
    
    requires: [
        'KitchenSink.view.direct.TreeController'
    ],
    
    //<example>
    exampleTitle: 'Ext.Direct Tree integration',
    exampleDescription: [
        '<p>This example shows how to load Tree nodes dynamically from a Direct proxy.</p>'
    ].join(''),
    
    otherContent: [{
        type: 'ViewController',
        path: 'classic/samples/view/direct/TreeController.js'
    }, {
        type: 'Base ViewController',
        path: 'classic/samples/view/direct/DirectVC.js'
    }, {
        type: 'Server TestAction class',
        path: 'data/direct/source.php?file=testaction'
    }, {
        type: 'Server API configuration',
        path: 'data/direct/source.php?file=config'
    }],
    //</example>
    
    title: 'Direct Tree',
    width: 600,
    height: 350,
    
    rootVisible: false,
    
    store: {
        store: 'tree',
        
        // By default, a tree with a hidden root will expand
        // the root node automatically when the tree is created.
        // We don't want that to happen since Direct API may not
        // be ready at that point, so we set autoLoad to false
        // which will disable auto-expanding.
        // We will later expand the root node manually in the
        // ViewController's finishInit() method.
        autoLoad: false,
        
        proxy: {
            type: 'direct',
            directFn: 'TestAction.getTree',
            paramOrder: ['node']
        }
    }
});
