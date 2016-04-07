/*
 * This example shows generic Ext Direct remoting and polling.
 */
Ext.define('KitchenSink.view.direct.Generic', {
    extend: 'Ext.panel.Panel',
    xtype: 'direct-generic',
    controller: 'directgeneric',
    
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Text',
        'KitchenSink.view.direct.GenericController'
    ],
    
    //<example>
    exampleTitle: 'Generic Ext Direct remoting and polling',
    exampleDescription: [
        '<p>This example demonstrates generic Ext Direct remoting and polling.</p>',
        '<p>To make the multiply request show a failure, enter a non-numeric value',
        ' into the field.</p>'
    ].join(''),
    
    otherContent: [{
        type: 'ViewController',
        path: 'classic/samples/view/direct/GenericController.js'
    }, {
        type: 'Base ViewController',
        path: 'classic/samples/view/direct/DirectVC.js'
    }, {
        type: 'Server TestAction class',
        path: 'data/direct/source.php?file=testaction'
    }, {
        type: 'Server API configuration',
        path: 'data/direct/source.php?file=config'
    }],
    //</example>
    
    title: 'Remote Call Log',
    width: 600,
    height: 300,
    
    scrollable: true,
    bodyPadding: 5,

    tpl: '<p style="margin: 3px 0 0 0">{data}</p>',
    tplWriteMode: 'append',
    
    header: {
        items: [{
            xtype: 'textfield',
            reference: 'fieldInterval',
            hideLabel: true,
            width: 60,
            directAction: 'setInterval',
            emptyText: 's',
            listeners: {
                specialkey: 'onFieldSpecialKey'
            }
        }, {
            xtype: 'button',
            text: 'Set polling interval',
            fieldReference: 'fieldInterval',
            style: {
                'margin-left': '10px'
            },
            listeners: {
                click: 'onButtonClick'
            }
        }]
    },
    
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        
        items: [{
            xtype: 'textfield',
            reference: 'fieldEcho',
            hideLabel: true,
            width: 300,
            directAction: 'doEcho',
            emptyText: 'Echo input',
            listeners: {
                specialkey: 'onFieldSpecialKey'
            }
        }, {
            xtype: 'button',
            text: 'Echo',
            fieldReference: 'fieldEcho',
            listeners: {
                click: 'onButtonClick'
            }
        }, '-', {
            xtype: 'textfield',
            reference: 'fieldMultiply',
            hideLabel: true,
            width: 90,
            directAction: 'doMultiply',
            emptyText: 'Multiply x 8',
            listeners: {
                specialkey: 'onFieldSpecialKey'
            }
        }, {
            xtype: 'button',
            text: 'Multiply',
            fieldReference: 'fieldMultiply',
            listeners: {
                click: 'onButtonClick'
            }
        }]
    }]
});
