/**
 * Demonstrates a NestedList, which uses a TreeStore to drill down through hierarchical data
 */
Ext.define('KitchenSink.view.lists.NestedList', {
    extend: 'Ext.NestedList',
    requires: [
        'Ext.data.TreeStore',
        'KitchenSink.view.lists.EditorPanel',
        'KitchenSink.model.Cars'
    ],

    // <example>
    otherContent: [{
        type: 'View',
        path: 'modern/src/view/lists/EditorPanel.js'
    }, {
        type: 'Model',
        path: 'modern/src/model/Cars.js'
    }],
    // </example>

    store: {
        type: 'tree',
        id: 'NestedListStore',
        model: 'KitchenSink.model.Cars',
        root: {},
        proxy: {
            type: 'ajax',
            url: 'data/carregions.json'
        }
    },
    displayField: 'text',
    shadow: true,
    cls: 'demo-solid-background',
    listeners: {
        leafitemtap: function(me, list, index, item) {
            var editorPanel = Ext.getCmp('editorPanel') || new KitchenSink.view.lists.EditorPanel();
            editorPanel.setRecord(list.getStore().getAt(index));
            if (!editorPanel.getParent()) {
                Ext.Viewport.add(editorPanel);
            }
            editorPanel.show();
        }
    }
});
