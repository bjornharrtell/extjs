Ext.define('KitchenSink.view.charts.column3d.GroupedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.column-grouped-3d',

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        var value = layoutContext.renderer(label) / 1000;
        return value === 0 ? '$0' : Ext.util.Format.number(value, '$0K');
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value / 1000, '$0K');
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v, '$0,000');
    }

});