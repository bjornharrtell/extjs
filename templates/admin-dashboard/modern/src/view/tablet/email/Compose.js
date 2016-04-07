Ext.define('Admin.view.tablet.email.Compose', {
    extend: 'Ext.form.Panel',
    // xtype: 'compose', -- set by profile
    cls: 'email-compose',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.field.TextArea'
    ],

    layout: 'vbox',
    padding: 20,

    title: 'Compose',

    tools: [{
        iconCls: 'x-fa fa-close',
        handler: 'onCloseMessage'
    }],

    items: [{
        xtype: 'textfield',
        placeHolder: 'To',
        reference: 'toField',
        name: 'to',
        margin: '0 0 20 0'
    }, {
        xtype: 'textfield',
        placeHolder: 'Subject',
        name: 'subject',
        margin: '0 0 20 0'
    }, {
        xtype: 'textareafield',
        placeHolder: 'Content',
        name: 'message',
        flex: 1,
        height: '100%',
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        layout: 'hbox',
        height: 40,
        userCls: 'compose-email-tool',

        items: [{
            xtype: 'button',
            ui: 'header',
            padding: '0 12',
            iconCls: 'x-fa fa-floppy-o'
        }, {
            xtype: 'button',
            ui: 'header',
            padding: '0 12',
            iconCls: 'x-fa fa-paperclip'
        }, {
            xtype: 'component',
            flex: 1
        }, {
            xtype: 'button',
            ui: 'decline',
            text: 'Discard',
            minWidth: '6rem',
            margin: '0 12 0 0',
            handler: 'onCloseMessage'
        }, {
            xtype: 'button',
            ui: 'confirm',
            text: 'Send',
            minWidth: '6rem',
            handler: 'onSendMessage'
        }]
    }]
});
