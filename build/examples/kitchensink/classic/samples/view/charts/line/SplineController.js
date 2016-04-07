Ext.define('KitchenSink.view.charts.line.SplineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.line-spline',

    onAxisLabelRender: function(axis, label, layoutContext) {
        return Ext.util.Format.number(label, '0.00');
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    }

});