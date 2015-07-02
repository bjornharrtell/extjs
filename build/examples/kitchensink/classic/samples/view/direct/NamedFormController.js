Ext.define('KitchenSink.view.direct.NamedFormController', {
    extend: 'KitchenSink.view.direct.DirectVC',
    alias: 'controller.directnamed',
    
    requires: [
        'Ext.window.Toast'
    ],
    
    onFormSubmit: function() {
        var values = this.getView().getForm().getValues();
        
        TestAction.showDetails(values, this.onShowDetails, this);
    },
    
    onShowDetails: function(result, event, success) {
        if (success) {
            Ext.toast(result, 'Server response', 't');
        }
        else {
            Ext.toast('An error occured: ' + event.error);
        }
    }
});
