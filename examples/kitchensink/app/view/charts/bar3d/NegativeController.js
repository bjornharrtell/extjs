Ext.define('KitchenSink.view.charts.bar3d.NegativeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bar-negative-3d',

    onDownload: function () {
        var chart = this.lookupReference('chart');

        if (Ext.os.is.Desktop) {
            chart.download({
                filename: '3D Bar Chart with Negative Values'
            });
        } else {
            chart.preview();
        }
    }

});