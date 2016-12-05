Ext.define('KitchenSink.view.charts.column3d.Stacked100Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.column-stacked-100-3d',

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label) + '%';
    },

    onTooltipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex],
            value = item.sprite.attr.dataY[item.index] -
                item.sprite.attr.dataStartY[item.index];

        tooltip.setHtml(browser + ' on ' + record.get('month') + ': ' +
            Ext.util.Format.number(value, '0.##') + '%');
    },

    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('chart');
        chart.preview();
    }

});