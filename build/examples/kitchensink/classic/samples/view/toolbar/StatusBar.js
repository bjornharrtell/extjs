/**
 * This View illustrates the use of the StatusBar extension to the Toolbar class
 * which offers utility functions to display various types of information as
 * well as Buttons and other Components.
 */
Ext.define('KitchenSink.view.toolbar.StatusBar', {
    extend: 'Ext.container.Container',
    xtype: 'statusbar-demo',
    controller: 'statusbar-demo',

    //<example>
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.statusbar.ValidationStatus'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'classic/samples/view/toolbar/StatusBarController.js'
    }],
    //</example>

    // Base container layout using a <center> tag gives us centering.
    layout: 'container',
    autoEl: 'center',
    defaults: {
        style: 'margin-bottom: 20px'
    },
    items: [{
        xtype: 'panel',
        title: 'Basic StatusBar',
        width: 600,
        manageHeight: false,
        bodyPadding: 10,
        bodyStyle: 'text-align:left',
        items: [{
            xtype: 'button',
            text: 'Do Loading',
            handler: 'loadFn'
        }],
        bbar: {
            xtype: 'statusbar',
            reference: 'basic-statusbar',

            // defaults to use when the status is cleared:
            defaultText: 'Default status text',
            //defaultIconCls: 'default-icon',
        
            // values to set initially:
            text: 'Ready',
            iconCls: 'x-status-valid',

            // any standard Toolbar items:
            items: [{
                xtype: 'button',
                text: 'Show Warning & Clear',
                handler: 'showWarning'
            }, {
                xtype: 'button',
                text: 'Show Busy',
                handler: 'showBusy'
            }, {
                xtype: 'button',
                text: 'Clear status',
                handler: 'clearStatus'
            },
            '-',
            'Plain Text'
            ]
        }
    }, {
        xtype: 'form',
        title: 'StatusBar with Integrated Form Validation',
        width: 600,
        autoHeight: true,
        reference: 'status-form',
        labelWidth: 75,
        bodyPadding: 10,
        waitMsgTarget: true,
        defaults: {
            anchor: '95%',
            allowBlank: false,
            selectOnFocus: true,
            msgTarget: 'side'
        },
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Name',
            blankText: 'Name is required'
        },{
            xtype: 'datefield',
            fieldLabel: 'Birthdate',
            blankText: 'Birthdate is required'
        }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: ['->', {
                text: 'Save',
                handler: 'saveStatusForm'
            }]
        }, {
            xtype: 'statusbar',
            dock: 'bottom',
            reference: 'form-statusbar',
            defaultText: 'Ready',
            plugins: {
                ptype: 'validationstatus',
                form: 'status-form'
            }
        }]
    }, {
        title: 'Ext Word Processor',
        width: 600,
        bodyPadding: 5,
        layout: 'fit',
        bbar: {
            xtype: 'statusbar',
            reference: 'wordStatus',
            // These are just the standard toolbar TextItems we created above.  They get
            // custom classes below in the render handler which is what gives them their
            // customized inset appearance.
            items: [{
                reference: 'wordCount',
                xtype: 'tbtext',
                text: 'Words: 0'
            }, ' ', {
                reference: 'charCount',
                xtype: 'tbtext',
                text: 'Chars: 0'
            }, ' ', {
                reference: 'clock',
                xtype: 'tbtext',
                text: Ext.Date.format(new Date(), 'g:i:s A')
            }, ' ']
        },
        items: {
            xtype: 'textarea',
            reference: 'wordTextarea',
            enableKeyEvents: true,
            hideLabel: true,
            grow: true,
            growMin: 100,
            growMax: 200
        },
        listeners: {
            render: 'onWpRender',
            delay: 100
        }
    }]
});