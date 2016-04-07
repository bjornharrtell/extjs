Ext.define('KitchenSink.view.charts.combination.BindingTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.combination-bindingtabs',

    onLineSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('month') + ': ' +
            Ext.util.Format.usMoney(record.get('price')));
    },

    onAxisLabelMoneyRender: function (axis, label, layoutContext) {
        return Ext.util.Format.usMoney(label);
    }

});