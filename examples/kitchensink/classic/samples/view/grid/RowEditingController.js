Ext.define('KitchenSink.view.grid.RowEditingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.row-editing',
    
    onAddClick: function() {
        var grid, plugin, record;
        
        grid = this.getView();
        plugin = grid.findPlugin('rowediting');
        
        plugin.cancelEdit();
        
        record = new KitchenSink.model.grid.Employee({
            forename: 'New',
            surname: 'Guy',
            email: 'new@sencha-test.com',
            joinDate: Ext.Date.clearTime(new Date()),
            salary: 50000,
            active: true
        });
        
        grid.getStore().insert(0, record);
        plugin.startEdit(record, 0);
    },
    
    onRemoveClick: function() {
        var grid, store, selModel;
        
        grid = this.getView();
        store = grid.getStore();
        selModel = grid.getSelectionModel();
        
        grid.findPlugin('rowediting').cancelEdit();
        
        store.remove(selModel.getSelection());
        
        if (store.getCount() > 0) {
            selModel.select(0);
        }
    },
    
    onSelectionChange: function(view, records) {
        var button = this.lookupReference('removeEmployee');
        
        button.setDisabled(!records.length);
    }
});
