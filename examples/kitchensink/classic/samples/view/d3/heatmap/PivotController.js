Ext.define('KitchenSink.view.d3.heatmap.PivotController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.heatmap-pivot',

    changeDock: function(button, checked){
        if(checked) {
            this.getView().getConfigurator().setDock(button.text.toLowerCase());
        }
    },

    monthLabelRenderer: function(v){
        return Ext.Date.monthNames[v];
    },

    onRefreshData: function () {
        var me = this,
            heatmap = me.lookupReference('heatmap'),
            store = heatmap.getMatrix().store;

        store.refreshRandomData(100);
    },

    onBeforeAddConfigField: function(panel, config){
        var dest = config.toContainer;

        if(dest.getFieldType() !== 'all' && dest.items.getCount() >= 1){
            // this will force single fields on both axis and aggregate
            dest.removeAll();
        }
    },

    onShowFieldSettings: function(panel, config){
        var align = config.container.down('[name=align]');
        // hide the alignment field in settings since it's useless
        if(align) {
            align.hide();
        }
    },

    onTooltip: function (component, tooltip, datum, element, event) {
        var d = datum.data,
            x = component.getXAxis().getField(),
            y = component.getYAxis().getField(),
            z = component.getColorAxis().getField();

        tooltip.setHtml(
            '<div>X: ' + d[x] + '</div>' +
            '<div>Y: ' + d[y] + '</div>' +
            '<div>Z: ' + d[z] + '</div>' +
            '<div>Records: ' + d.records + '</div>'
        );
    }

});