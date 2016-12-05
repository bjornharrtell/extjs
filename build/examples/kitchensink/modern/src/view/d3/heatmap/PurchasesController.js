Ext.define('KitchenSink.view.d3.heatmap.HeatMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.heatmap-heatmap',

    onTooltip: function (component, tooltip, datum, element, event) {
        var d = datum.data,
            field = component.getColorAxis().getField(),
            date = Ext.Date.monthNames[d.date.getMonth()] + ' ' + d.date.getDate();

        tooltip.setHtml(d[field] + ' customers purchased a total of $'
            + d.bucket + ' to $' + (d.bucket + 100) + '<br> of goods on ' + date);
    }

});
