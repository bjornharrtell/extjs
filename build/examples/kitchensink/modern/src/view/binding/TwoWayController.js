Ext.define('KitchenSink.view.binding.TwoWayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding-twoway',

    onClearIconTap: function() {
        this.getViewModel().set('title', '');
    },

    makeRandomTitle: function() {
        var num = Ext.Number.randomInt(0, 1000);
        this.getViewModel().set('title', 'Title ' + num);
    }
});
