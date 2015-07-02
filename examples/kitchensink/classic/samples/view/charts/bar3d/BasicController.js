Ext.define('KitchenSink.view.charts.bar3d.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bar-basic-3d',

    onAxisLabelRender: function (axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
    },

    onSeriesLabelRender: function (v) {
        return Ext.util.Format.number(v / 1000, '0,000');
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var formatString = '0,000 (millions of USD)';

        tooltip.setHtml(record.get('country') + ': ' +
            Ext.util.Format.number(record.get('ind'), formatString));
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    }

});