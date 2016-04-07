Ext.define('Neptune.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: [
        'FileSystem',
        'Company'
    ],

    refs: [
        {
            ref: 'navigation',
            selector: 'navigation'
        },
        {
            ref: 'content',
            selector: 'content'
        }
    ],

    init: function() {
        this.control({
            'navigation': {
                selectionchange: this.onNavSelectionChange
            },
            'content': {
                afterrender: this.afterContentRender
            }
        });
    },

    onNavSelectionChange: function(selModel, records) {
        var id = records[0].get('id');

        if (id && records[0].get('leaf')) {
            this.getContent().getLayout().setActiveItem(id);
            location.hash = id;
        }
    },

    afterContentRender: function(contentPanel) {
        var id = location.hash.substring(1) || 'panels',
            navigation = this.getNavigation();

        navigation.getSelectionModel().select(navigation.getStore().getNodeById(id));
    }
});