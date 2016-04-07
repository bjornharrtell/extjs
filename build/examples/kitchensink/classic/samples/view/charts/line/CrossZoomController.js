Ext.define('KitchenSink.view.charts.line.CrossZoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.line-crosszoom',

    onZoomUndo: function() {
        var chart = this.lookupReference('chart'),
            interaction = chart && Ext.ComponentQuery.query('interaction', chart)[0],
            undoButton = interaction && interaction.getUndoButton(),
            handler = undoButton && undoButton.handler;
        if (handler) {
            handler();
        }
    }

});