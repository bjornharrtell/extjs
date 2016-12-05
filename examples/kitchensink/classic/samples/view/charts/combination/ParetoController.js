Ext.define('KitchenSink.view.charts.combination.ParetoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.combination-pareto',

    onDownload: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('chart');

        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Redwood City Climate Data Chart'
            });
        } else {
            chart.preview();
        }
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        var total = axis.getRange()[1];
        return (label / total * 100).toFixed(0) + '%';
    },

    onBarSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('complaint') + ': ' +
            record.get('count') + ' responses.');
    },

    onLineSeriesTooltipRender: function (tooltip, record, item) {
        var store = record.store,
            i, complaints = [];

        for (i = 0; i <= item.index; i++) {
            complaints.push(store.getAt(i).get('complaint'));
        }
        tooltip.setHtml('<div style="text-align: center; font-weight: bold">' +
            record.get('cumpercent') + '%</div>' + complaints.join('<br>'));
    },

    onPercentRender: function (v) {
        return v + '%';
    }

});