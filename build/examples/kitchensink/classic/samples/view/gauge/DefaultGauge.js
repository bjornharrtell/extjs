/**
 */
Ext.define('KitchenSink.view.gauge.DefaultGauge', {
    extend: 'Ext.Panel',
    xtype: 'default-gauge',

    requires: [
        'Ext.ux.Gauge'
    ],

    //<example>
    otherContent: [{
        type: 'UI',
        path: 'classic/sass/src/view/gauge/DefaultGauge.scss'
    }],
    profiles: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    title: 'Gauge',
    width: 560,
    height: 400,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    viewModel: {
        data: {
            value: 30
        }
    },

    tbar: [{
        xtype: 'sliderfield',
        width: 300,
        fieldLabel: 'Value',
        labelWidth: 60,
        bind: '{value}'
    }],

    defaults: {
        margin: 10
    },

    items: [{
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
