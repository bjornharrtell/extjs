Ext.define('KitchenSink.view.direct.TreeController', {
    extend: 'KitchenSink.view.direct.DirectVC',
    alias: 'controller.directtree',
    
    finishInit: function() {
        var store = this.getView().getStore();
        
        store.getRoot().expand();
    }
});
