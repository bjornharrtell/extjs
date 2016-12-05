Ext.define('KitchenSink.view.charts.pie.DoubleDonutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pie-double-donut',

    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('chart');
        chart.preview();
    },

    onDataRender: function (v) {
        return v + '%';
    },

    onOuterSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('provider') + ': ' + record.get('usage'));
    },

    onInnerSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(Ext.String.capitalize(record.get('type'))
            + ' sector: ' + record.get('usage'));
    },

    onAfterRender: function () {
        var chart = this.lookupReference('chart'),
            series = chart.getSeries(),
            outerSeries = series[0],
            store = outerSeries.getStore(),
            dataMap = {},
            dataList = [],
            rec, innerStore;

        store.sort('type', 'DESC');

        store.each(function () {
            var name = this.get('type'),
                value = dataMap[name];

            if (!value) {
                dataMap[name] = value = {};
                value.type = name;
                value.usage = this.get('usage');
            } else {
                value.usage += this.get('usage');
            }
        });

        for (rec in dataMap) {
            dataList.push(dataMap[rec]);
        }

        innerStore = Ext.create('Ext.data.Store', {
            data: dataList
        });

        chart.setSeries([{
            type: 'pie',
            angleField: 'usage',
            label: {
                field: 'type',
                display: 'inside'
            },
            store: innerStore,
            radiusFactor: 70,
            donut: 20,
            tooltip: {
                trackMouse: true,
                renderer: 'onInnerSeriesTooltipRender'
            }
        }, outerSeries]);
    }

});
