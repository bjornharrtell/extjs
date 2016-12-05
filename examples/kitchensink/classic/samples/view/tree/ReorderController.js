Ext.define('KitchenSink.view.tree.ReorderController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tree-reorder',
    
    onExpandAllClick: function () {
        var view = this.getView(),
            toolbar = view.lookup('tbar');

        view.getEl().mask('Expanding tree...');
        toolbar.disable();

        view.expandAll(function() {
            view.getEl().unmask();
            toolbar.enable();
        });
    },

    onCollapseAllClick: function () {
        var view = this.getView(),
            toolbar = view.lookup('tbar');

        toolbar.disable();

        view.collapseAll(function() {
            toolbar.enable();
        });
    }
});
