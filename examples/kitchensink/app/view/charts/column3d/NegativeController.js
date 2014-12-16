Ext.define('KitchenSink.view.charts.column3d.NegativeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.column-negative-3d',

    onDownload: function () {
        var chart = this.lookupReference('chart');

        if (Ext.os.is.Desktop) {
            chart.download({
                filename: '3D Column Chart with Negative Values'
            });
        } else {
            chart.preview();
        }
    }

})