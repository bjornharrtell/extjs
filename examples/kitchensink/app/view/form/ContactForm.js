Ext.define('KitchenSink.view.form.ContactForm', {
    extend: 'Ext.form.Panel',
    xtype: 'contact-form',
    
    //<example>
    exampleTitle: 'Contact Form',
    exampleDescription: [
        '<p>Demonstrates a simple contact form.</p>'
    ].join(''),
    //</example>
    
    title: 'Contact Us',
    frame: true,

    width: 400,
    layout: 'anchor',
    border: false,
    bodyPadding: 10,
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 100,
        labelStyle: 'font-weight:bold'
    },
    defaults: {
        anchor: '100%',
        margins: '0 0 10 0'
    },
    items: [{
        xtype: 'fieldcontainer',
        fieldLabel: 'Your Name',
        labelStyle: 'font-weight:bold;padding:0',
        layout: 'hbox',
        defaultType: 'textfield',
        fieldDefaults: {
            labelAlign: 'top'
        },
        items: [{
            flex: 1,
            name: 'firstName',
            fieldLabel: 'First',
            allowBlank: false
        },
        {
            width: 30,
            name: 'middleInitial',
            fieldLabel: 'MI',
            margins: '0 0 0 5'
        },
        {
            flex: 2,
            name: 'lastName',
            fieldLabel: 'Last',
            allowBlank: false,
            margins: '0 0 0 5'
        }]
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Your Email Address',
        vtype: 'email',
        allowBlank: false
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Subject',
        allowBlank: false
    },
    {
        xtype: 'textareafield',
        fieldLabel: 'Message',
        labelAlign: 'top',
        height: 120,
        margin: '0',
        allowBlank: false
    }],
    buttons: [{
        text: 'Cancel'
    },
    {
        text: 'Send'
    }]
});