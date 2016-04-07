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
    },

    onSeriesLabelRender: function (v) {
        return Ext.util.Format.number(v / 1000, '0,000');
    },

    onTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('country') + ': ' +
            Ext.util.Format.number(record.get('ind'), '0,000 (millions of USD)'));
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
    }

});