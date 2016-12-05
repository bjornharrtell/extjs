Ext.define('KitchenSink.view.grid.MultipleSortingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.multi-sort-grid',

    updateSort: function () {
        var store = this.getView().store,
            details = [],
            vm = this.getViewModel();

        store.getSorters().each(function(sorter) {
            details.push(sorter.getProperty() + ' ' + sorter.getDirection());
        });

        vm.set({
            sortOrder: details.join(', ')
        });
    }
});
