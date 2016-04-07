Ext.define('KitchenSink.view.charts.bar3d.Stacked100Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bar-stacked-100-3d',

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label) + '%';
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(browser + ' on ' + record.get('month') + ': ' +
            record.get(item.field) + '%');
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    },

    onColumnRender: function (v) {
        return v + '%';
    }

});