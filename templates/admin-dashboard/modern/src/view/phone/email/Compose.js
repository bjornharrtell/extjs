Ext.define('Admin.view.phone.email.Compose', {
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
    scrollable: false,

    title: 'Compose',

    tools: [{
        iconCls: 'x-fa fa-send',
        handler: 'onSendMessage'
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
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        layout: 'hbox',
        height: 40,
        userCls: 'compose-email-tool',

        items: [{
            xtype: 'component',
            flex: 1
        }, {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-floppy-o'
        }, {
            xtype: 'button',
            ui: 'header',
            padding: '0 12',
            iconCls: 'x-fa fa-paperclip'
        }, {
            xtype: 'button',
            ui: 'header',
            padding: '0 12',
            iconCls: 'x-fa fa-trash',
            handler: 'onCloseMessage'
        }]
    }]
});
