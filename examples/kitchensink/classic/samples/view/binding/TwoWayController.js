Ext.define('KitchenSink.view.binding.TwoWayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding.twoway',

    onTitleButtonClick: function() {
        var title = 'Title' + Ext.Number.randomInt(1, 100);
        this.getViewModel().set('title', title);
    }
});