/**
 * Shows how the Slider control can be used in a form and participate like a form field.
 */
Ext.define('KitchenSink.view.form.SliderField', {
    extend: 'Ext.form.Panel',
    xtype: 'slider-field',
    controller: 'slider-field',

    requires: [
        'Ext.slider.Single'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/form/SliderFieldController.js'
    }],
    profiles: {
        classic: {
            labelWidth: 125
        },
        neptune: {
            labelWidth: 125
        },
        'neptune-touch': {
            labelWidth: 150
        }
    },
    //</example>
    
    title: 'Sound Settings',
    width: 400,
    bodyPadding: 10,
    msgTpl:
        'Sounds Effects: <b>{fx}%</b><br />' +
        'Ambient Sounds: <b>{ambient}%</b><br />' +
        'Interface Sounds: <b>{iface}%</b>',
   
    defaults: {
        labelWidth: '${labelWidth}',
        anchor: '95%',
        tipText: 'tipText'
    },
    
    defaultType: 'slider',
    
    items: [{
        fieldLabel: 'Sound Effects',
        value: 50,
        name: 'fx'
    }, {
        fieldLabel: 'Ambient Sounds',
        value: 80,
        name: 'ambient'
    }, {
        fieldLabel: 'Interface Sounds',
        value: 25,
        name: 'iface'
    }],

    bbar: [{
        text: 'Max All',
        handler: 'onMaxAllClick'
    }, '->', {
        text: 'Save',
        handler: 'onSaveClick'
    }, {
        text: 'Reset',
        handler: 'onResetClick'
    }]
});
