/**
 * Demonstrates a NestedList, which uses a TreeStore to drill down through hierarchical data
 */
Ext.define('KitchenSink.view.NestedList', {
    extend: 'Ext.NestedList',
    requires: [
        'Ext.data.TreeStore',
        'KitchenSink.view.EditorPanel',
        'KitchenSink.model.Cars'
    ],

    config: {
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
        listeners: {
            leafitemtap: function(me, list, index, item) {
                var editorPanel = Ext.getCmp('editorPanel') || new KitchenSink.view.EditorPanel();
                editorPanel.setRecord(list.getStore().getAt(index));
                if (!editorPanel.getParent()) {
                    Ext.Viewport.add(editorPanel);
                }
                editorPanel.show();
            }
        }
    },

    platformConfig: {
        blackberry: {
            toolbar: {
                ui: 'dark'
            }
        }
    }
});
