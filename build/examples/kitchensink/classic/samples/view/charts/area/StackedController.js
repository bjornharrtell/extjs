Ext.define('KitchenSink.view.charts.area.StackedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.area-stacked',

    onAxisLabelRender: function (axis, label) {
        return label.toFixed(label < 10 ? 1 : 0) + '%';
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(browser + ' on ' + record.get('month') + ': ' +
            record.get(item.field) + '%');
    },

    onColumnRender: function (v) {
        return v + '%';
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    }

});