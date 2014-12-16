Ext.define('KitchenSink.view.charts.column3d.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.column-basic-3d',

    onDownload: function () {
        var chart = this.lookupReference('chart');

        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Industry size in major economies for 2011'
            });
        } else {
            chart.preview();
        }
    }

})