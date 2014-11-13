Ext.define('KitchenSink.view.charts.combination.theme.CustomTheme', {
    extend: 'Ext.chart.theme.Base',
    singleton: true,
    alias: ['chart.theme.custom-theme'],

    config: {
        axis: {
            defaults: {
                style: {
                    strokeStyle: '#7F8C8D'
                },
                label: {
                    fillStyle: '#7F8C8D',
                    fontSize: 18
                }
            }
        },
        colors: [ '#1ABC9C', '#F1C40F', '#3498DB', '#C0392B', '#9B59B6' ]
    }

});