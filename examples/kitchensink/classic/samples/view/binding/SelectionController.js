Ext.define('KitchenSink.view.binding.SelectionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding.selection',

    initViewModel: function(vm) {
        vm.bind('{selectedCompany}', 'onSelect', this);
    },

    onSelect: function(selection) {
        var dataview;
        if (selection) {
            this.lookup('grid').ensureVisible(selection);
            dataview = this.lookup('dataview');
            dataview.getScrollable().scrollIntoView(dataview.getNode(selection));
        }
    }
});