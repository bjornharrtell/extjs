Ext.define('KitchenSink.view.charts.column.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chart-column-basic',

    onDownload: function() {
        var chart = this.lookupReference('chart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Redwood City Climate Data Chart'
            });
        } else {
            chart.preview();
        }
    },

    onReloadData: function() {
        var chart = this.lookupReference('chart');
        chart.getStore().refreshData();
    },

    onAxisRangeChange: function (axis, range) {
        // this.lookupReference('chart') will fail here,
        // as at the time of this call
        // the chart is not yet in the component tree,
        // so we have to use axis.getChart() instead.
        var chart = axis.getChart(),
            store = chart.getStore(),
            min = Infinity,
            max = -Infinity,
            value;

        store.each(function (rec) {
            var value = rec.get('highF');
            if (value > max) {
                max = value;
            }
            if (value < min) {
                min = value;
            }
        });

        value = (min + max) / 2;
        axis.setLimits({
            value: value,
            line: {
                title: {
                    text: 'Average high: ' + value.toFixed(2) + '°F'
                },
                lineDash: [2,2]
            }
        });
    }

});