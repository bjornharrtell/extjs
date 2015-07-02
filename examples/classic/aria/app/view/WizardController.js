Ext.define('Aria.view.WizardController', {
    extend: 'Ext.app.ViewController',
    alias:  'controller.wizard',
    
    onWizardButtonClick: function(button) {
        var direction = button.direction,
            layout, item;
        
        layout = this.getView().getLayout();
        item = direction === 'next' ? layout.getNext() : layout.getPrev();
        
        if (item) {
            layout.setActiveItem(item);
            item.focus();
        }
    }
});
