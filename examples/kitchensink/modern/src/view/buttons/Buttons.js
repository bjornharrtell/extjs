/**
 * Demonstrates a range of Button options the framework offers out of the box
 */
Ext.define('KitchenSink.view.buttons.Buttons', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.layout.VBox',
        'Ext.Button',
        'Ext.field.Checkbox',
        'Ext.Label'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/buttons/ButtonsController.js'
    }],
    // </example>
    controller: 'buttons',
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },
    shadow: true,
    cls: 'demo-solid-background',
    platformConfig: {
        phone: {
            width: '100%',
            height: '100%'
        }
    },
    width: 300,
    height: 300,
    items: [
        {
            xtype: 'button',
            reference: 'button',
            text: 'Button',
            margin: '0 0 16 0'
        },
        {
            xtype: 'container',
            itemId: 'checkContainer',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            defaults: {
                xtype: 'checkboxfield',
                labelWidth: 200,
                margin: '0 0 0 16'
            },
            items: [
                {
                    xtype: 'label',
                    html: 'Button UIs',
                    margin: null
                },
                {
                    label: 'Action',
                    value: 'action'
                },
                {
                    label: 'Alternative',
                    value: 'alt'
                },
                {
                    label: 'Confirm',
                    value: 'confirm'
                },
                {
                    label: 'Decline',
                    value: 'decline'
                },
                {
                    label: 'Round',
                    value: 'round'
                }
            ]
        }
    ]
});
