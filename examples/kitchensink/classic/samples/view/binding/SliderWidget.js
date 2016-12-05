/*
 * Shows how a Slider widget can be used with a ViewModel.
 */
Ext.define('KitchenSink.view.binding.SliderWidget', {
    extend: 'Ext.panel.Panel',
    xtype: 'binding-slider-form',

    requires: [
        'Ext.slider.Widget'
    ],

    title: 'Color Components',
    width: 400,
    bodyPadding: 10,

    viewModel: {
        data: {
            red: 64,
            green: 110,
            blue: 220
        }
    },

    layout: 'anchor',
    defaultType: 'fieldcontainer',
    defaults: {
        anchor: '0',
        labelWidth: 60,
        layout: {
            type: 'hbox',
            align: 'center'
        }
    },

    items: [{
        fieldLabel: 'Red',
        defaults: {
            maxValue: 255,
            minValue: 0
        },
        items: [
            { xtype: 'numberfield', width: 100, bind: '{red}', margin: '0 10 0 0' },
            { xtype: 'sliderwidget', flex: 1, bind: '{red}', publishOnComplete: false }
        ]
    },{
        fieldLabel: 'Green',
        defaults: {
            maxValue: 255,
            minValue: 0
        },
        items: [
            { xtype: 'numberfield', width: 100, bind: '{green}', margin: '0 10 0 0' },
            { xtype: 'sliderwidget', flex: 1, bind: '{green}', publishOnComplete: false }
        ]
    },{
        fieldLabel: 'Blue',
        defaults: {
            maxValue: 255,
            minValue: 0
        },
        items: [
            { xtype: 'numberfield', width: 100, bind: '{blue}', margin: '0 10 0 0' },
            { xtype: 'sliderwidget', flex: 1, bind: '{blue}', publishOnComplete: false }
        ]
    }, {
        xtype: 'component',
        height: 100,
        bind: {
            style: {
                backgroundColor: '#{red:hex(2)}{green:hex(2)}{blue:hex(2)}'
            }
        }
    }]
});
