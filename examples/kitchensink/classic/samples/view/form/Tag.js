/**
 * This example shows how to use the "tagfield" multi-value selector.
 */
Ext.define('KitchenSink.view.form.Tag', {
    extend: 'Ext.panel.Panel',
    xtype: 'form-tag',

    //<example>
    requires: [
        'Ext.form.field.Tag'
    ],
    
    exampleTitle: 'Tag Field',
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/States.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/State.js'
    }],
    //</example>
    
    title: 'Select State(s)',
    bodyPadding: 5,
    frame: true,
    width: 600,
    layout: 'form',
    viewModel: {},
    items: [{
        xtype: 'displayfield',
        fieldLabel: 'Selected States',
        bind: '{states.value}'
    }, {
        xtype: 'tagfield',
        fieldLabel: 'Select a state',
        store: {
            type: 'states'
        },
        value: ['CA'],
        reference: 'states',
        displayField: 'state',
        valueField: 'abbr',
        filterPickList: true,
        queryMode: 'local',
        publishes: 'value'
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Selected Locations',
        bind: '{locations.value}'
    }, {
        xtype: 'tagfield',
        fieldLabel: 'Select/add location',
        store: {
            type: 'states'
        },
        value: ['KS'],
        reference: 'locations',
        displayField: 'state',
        valueField: 'abbr',
        createNewOnEnter: true,
        createNewOnBlur: true,
        filterPickList: true,
        queryMode: 'local',
        publishes: 'value'
    }],
    buttons: [{
        text: 'OK'
    }, {
        text: 'Cancel'
    }]
});
