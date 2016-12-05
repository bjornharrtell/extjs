Ext.define('KitchenSink.view.d3.TreeMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.treemap',
    
    onNodeValueToggle: function (segmentedButton, button, pressed) {
        var treemap = this.lookupReference('treemap'),
            value = segmentedButton.getValue();

        treemap.setNodeValue(value || 'cap');
    }
    
});