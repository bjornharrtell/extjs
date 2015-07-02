Ext.define('KitchenSink.view.charts.line.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.line-basic',

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label) + '%';
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('month') + ': ' + record.get('data1') + '%');
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    }

});