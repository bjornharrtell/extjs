Ext.define('KitchenSink.view.gauge.DefaultGauge', {
    extend: 'Ext.Panel',
    xtype: 'default-gauge',

    requires: [
        'Ext.ux.Gauge'
    ],

    // <example>
    otherContent: [{
        type: 'UI',
        path: 'modern/sass/src/view/gauge/DefaultGauge.scss'
    }],
    // </example>

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    shadow: true,

    viewModel: {
        data: {
            value: 40
        }
    },

    defaults: {
        padding: 20
    },

    items: [{
        xtype: 'sliderfield',
        margin: '20 0 0 0',
        label: 'Value',
        bind: '{value}'
    }, {
        xtype: 'gauge',
        flex: 1,
        bind: '{value}'
    }, {
        xtype: 'gauge',
        ui: 'green',
        flex: 1,
        bind: '{value}',

        trackStart: 180,
        trackLength: 360
    }]
});
