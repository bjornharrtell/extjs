Ext.define('KitchenSink.view.charts.gauge.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gauge-basic',

    onRefresh: function () {
        var r = Math.random;

        if (this.store) {
            this.store.setData([{
                mph: r() * 100,
                fuel: r() * 100,
                temp: r() * 250,
                rpm: r() * 8000
            }]);
        }
    },

    onAfterRender: function () {
        var me = this,
            gauges = me.getView().query('polar'),
            i, gauge;

        me.store = Ext.create('Ext.data.JsonStore', {
            fields: ['mph', 'fuel', 'temp', 'rpm' ],
            data: [
                { mph: 65, fuel: 50, temp: 150, rpm: 6000 }
            ]
        });

        for (i = 0; i < gauges.length; i++) {
            gauge = gauges[i];
            gauge.setStore(me.store);
        }
    },

    onFuelAxisLabelRender: function (axis, label, layoutContext) {
        if (label === 0) return 'E';
        if (label === 25) return '1/4';
        if (label === 50) return '1/2';
        if (label === 75) return '3/4';
        if (label === 100) return 'F';
        return ' ';
    },

    onTempAxisLabelRender: function (axis, label, layoutContext) {
        if (label === 0) return 'Cold';
        if (label === 125) return 'Comfortable';
        if (label === 250) return 'Hot';
        return ' ';
    },

    onRPMAxisLabelRender: function (axis, label, layoutContext) {
        return (label / 1000) + 'k';
    }

});