Ext.define('KitchenSink.view.charts.combination.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.combination-dashboard',

    form: null,
    selectedRec: null,

    onColumnRender: function (v) {
        return v + '%';
    },

    onItemHighlight: function (chart, item) {
        var gridPanel = this.lookupReference('gridPanel');
        gridPanel.getSelectionModel().select(item.record);
    },

    onBarChartAxisLabelRender: function (axis, label, layoutContext) {
        return Ext.String.ellipsis(label, 15, false);
    },

    onSelectionChange: function (model, records) {
        var me = this,
            fields;

        if (records[0]) {
            me.selectedRec = records[0];
            if (!me.form) {
                me.form = me.lookupReference('form').getForm();
                fields = me.form.getFields();
                fields.each(function(field){
                    if (field.name != 'name') {
                        field.setDisabled(false);
                    }
                });
            } else {
                fields = me.form.getFields();
            }

            // prevent change events from firing
            me.form.suspendEvents();
            me.form.loadRecord(me.selectedRec);
            me.lookupReference('fieldset').setTitle(me.selectedRec.get('name'));
            me.form.resumeEvents();
            me.highlightCompanyPriceBar(me.selectedRec);
        }
    },

    // Loads fresh records into the radar store
    // based upon the passed company record.
    updateRadarChart: function (rec) {
        var store = this.lookupReference('radarChart').getStore();;

        store.loadData([
            { 'Name': 'Price',     'Data': rec.get('price') },
            { 'Name': 'Revenue %', 'Data': rec.get('revenue') },
            { 'Name': 'Growth %',  'Data': rec.get('growth') },
            { 'Name': 'Product %', 'Data': rec.get('product') },
            { 'Name': 'Market %',  'Data': rec.get('market') }
        ]);
    },

    // Performs the highlight of an item in the bar series.
    highlightCompanyPriceBar: function (record) {
        var barChart = this.lookupReference('barChart'),
            store = barChart.getStore(),
            series = barChart.getSeries()[0],
            name = record.get('name');

        barChart.setHighlightItem(series.getItemByIndex(store.indexOf(record)));
    },

    onStoreRefresh: function () {
        if (this.selectedRec) {
            this.highlightCompanyPriceBar(this.selectedRec);
        }
    },

    onFormChange: function (field, newValue, oldValue, listener) {
        var me = this;

        if (me.selectedRec && me.form) {
            if (newValue > field.maxValue) {
                field.setValue(field.maxValue);
            } else {
                if (me.form.isValid()) {
                    me.form.updateRecord(me.selectedRec);
                    me.updateRadarChart(me.selectedRec);
                }
            }
        }
    },

    onAfterRender: function () {
        var barChart = this.lookupReference('barChart'),
            gridPanel = this.lookupReference('gridPanel');

        var store = Ext.create('KitchenSink.store.Dashboard', {
            listeners: {
                // Add listener to (re)select bar item
                // after sorting or refreshing the dataset.
                refresh: {
                    fn: 'onStoreRefresh',
                    scope: this,
                    // Jump over the chart's refresh listener.
                    delay: 1
                }
            }
        });

        barChart.setStore(store);
        gridPanel.setStore(store);
    }

});