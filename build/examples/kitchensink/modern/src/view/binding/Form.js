Ext.define('KitchenSink.view.binding.Form', {
    extend: 'Ext.form.Panel',

    //<example>
    requires: [
        'Ext.app.ViewModel'
    ],
    //</example>

    viewModel: {
        data: {
            red: 255,
            green: 100,
            blue: 150
        }
    },

    layout: 'vbox',
    scrollable: true,

    items: {
        xtype: 'fieldset',
        flex: 1,
        minHeight: 400,
        defaultType: 'container',
        layout: 'vbox',
        instructions: [
            'The style of the color block is controlled by either the numeric ',
            'field or the slider. Both the numeric fields and the slider are bound to ',
            'the same value in the View Model.'
        ].join(''),
        items: [{
            layout: 'hbox',
            defaults: {
                maxValue: 255,
                minValue: 0
            },
            items: [{
                xtype: 'numberfield',
                label: 'Red',
                labelWidth: '50%',
                width: 150,
                bind: '{red}'
            }, {
                xtype: 'singlesliderfield',
                flex: 1,
                bind: '{red}',
                liveUpdate: true
            }]
        }, {
            layout: 'hbox',
            defaults: {
                maxValue: 255,
                minValue: 0
            },
            items: [{
                xtype: 'numberfield',
                label: 'Green',
                labelWidth: '50%',
                width: 150,
                bind: '{green}'
            }, {
                xtype: 'singlesliderfield',
                flex: 1,
                bind: '{green}',
                liveUpdate: true
            }]
        }, {
            layout: 'hbox',
            defaults: {
                maxValue: 255,
                minValue: 0
            },
            items: [{
                xtype: 'numberfield',
                label: 'Blue',
                labelWidth: '50%',
                width: 150,
                bind: '{blue}'
            }, {
                xtype: 'singlesliderfield',
                flex: 1,
                bind: '{blue}',
                liveUpdate: true
            }]
        }, {
            xtype: 'component',
            flex: 1,
            bind: {
                style: {
                    backgroundColor: 'rgba({red}, {green}, {blue}, 1)'
                }
            }
        }]
    }
});
