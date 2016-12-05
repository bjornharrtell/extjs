/**
 * Demonstrates a form with two columns.
 */
Ext.define('KitchenSink.view.form.MultiColumn', {
    extend: 'Ext.form.Panel',
    xtype: 'form-multicolumn',
    
    //<example>
    exampleTitle: 'Multi Column Form',
    profiles: {
        classic: {
            width: 520,
            height: 250
        },
        neptune: {
            width: 610,
            height: 300
        },
        'neptune-touch': {
            width: 700,
            height: 350
        }
    },
    //</example>
    
    title: 'Multi Column Form',
    frame: true,
    resizable: true,
    width: '${width}',
    minWidth: '${width}',
    minHeight: '${height}',

    layout: 'column',
    
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield',
        style: 'width: 50%'
    },
    
    items: [{
        items: [
            { fieldLabel: 'First Name' },
            { fieldLabel: 'Last Name' },
            { fieldLabel: 'Phone Number' },
            { fieldLabel: 'Email Address' }
        ]
    }, {
        items: [
            { fieldLabel: 'Street Address 1' },
            { fieldLabel: 'Street Address 2' },
            { fieldLabel: 'City, State' },
            { fieldLabel: 'ZIP code' }
        ]
    }],
    
    buttons: [
        { text: 'OK' },
        { text: 'Cancel' }
    ]
});
