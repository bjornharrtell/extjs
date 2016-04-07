Ext.define('KitchenSink.view.charts.area.NegativeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.area-negative',

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    },

    getSeriesConfig: function (field, title) {
        return {
            type: 'area',
            title: title,
            xField: 'quarter',
            yField: field,
            style: {
                opacity: 0.60
            },
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(title + ' (' + record.get('quarter') + '): ' +
                        record.get(field));
                }
            }
        };
    },

    onAfterRender: function () {
        var me = this,
            chart = me.lookupReference('chart');

        chart.setSeries([
            me.getSeriesConfig('phone', 'Phone Hardware'),
            me.getSeriesConfig('consumer', 'Consumer Licensing'),
            me.getSeriesConfig('gaming', 'Gaming Hardware'),
            me.getSeriesConfig('corporate', 'Corporate and Other')
        ]);
    }

});