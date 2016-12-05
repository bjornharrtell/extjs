Ext.define('KitchenSink.view.chart.RendererController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.renderer',

    onRefresh: function() {
        var chart = this.lookupReference('chart');

        chart.getStore().generateData(10);
    }

});
