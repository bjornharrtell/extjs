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

    layout: 'fit',

    items: {
        xtype: 'fieldset',
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
                labelWidth: '35%',
                width: 200,
                bind: '{red}',
                margin: '0 10 0 0'
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
                labelWidth: '35%',
                width: 200,
                bind: '{green}',
                margin: '0 10 0 0'
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
                labelWidth: '35%',
                width: 200,
                bind: '{blue}',
                margin: '0 10 0 0'
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