/**
 * This example demonstrates basic tree configuration.
 */
Ext.define('KitchenSink.view.tree.BasicTrees', {
    extend: 'Ext.Container',
    xtype: 'basic-trees',
    width: 640,

    //<example>
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Files.js'
    }],
    profiles: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 10px;' }
    },

    defaults: {
        xtype: 'treepanel',
        width: 300,
        height: 200,
        rootVisible: false,
        // Sharing the store synchronizes the views:
        store: 'Files'
    },

    items: [{
        title: 'Tree'
    }, {
        title: 'Tree with No Lines',
        lines: false
    }, {
        title: 'Tree with Arrows',
        useArrows: true,
        colspan: 2
    }]
});
