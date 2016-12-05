Ext.define('KitchenSink.view.toolbar.ToolbarMenusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbar-menus',
    
    onItemClick: function(item){
        KitchenSink.toast('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    },

    onItemCheck: function(item, checked){
        KitchenSink.toast('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    },

    onDateSelect: function(dp, date) {
        KitchenSink.toast('Date Selected', 'You choose {0}.', Ext.Date.format(date, 'M j, Y'));
    },

    onColorSelect: function(cm, color){
        KitchenSink.toast('Color Selected', '<span style="color:#' + color + ';">You choose {0}.</span>', color);
    },
    
    onButtonClick: function(btn){
        KitchenSink.toast('Button Click','You clicked the "{0}" button.', btn.displayText || btn.text);
    },

    onItemToggle: function(item, pressed){
        KitchenSink.toast('Button Toggled', 'Button "{0}" was toggled to {1}.', item.text, pressed);
    }
});