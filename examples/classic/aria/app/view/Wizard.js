Ext.define('Aria.view.Wizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mysimplewizard',
    
    requires: [
        'Ext.layout.container.Card',
        'Ext.layout.container.Form',
        'Aria.view.WizardController'
    ],
    
    title: 'Wizard',
    
    ariaAttributes: {
        'aria-live': 'polite',
        'aria-atomic': true,
        'aria-relevant': 'all'
    },
    
    layout: 'fit',
    
    items: [{
        xtype: 'panel',
        title: 'Sample wizard widget',
        ariaRole: 'region',
        
        controller: 'wizard',
        
        layout: 'card',
        
        defaults: {
            bodyPadding: 30,
            layout: 'form',
            defaultFocus: 'textfield'
        },
        
        items: [{
            xtype: 'form',
            
            items: [{
                xtype: 'textfield',
                fieldLabel: 'First name'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Last name'
            }],
            
            buttons: [{
                direction: 'next',
                text: 'Next panel',
                listeners: {
                    click: 'onWizardButtonClick'
                }
            }]
        }, {
            xtype: 'form',
            
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Company'
            }, {
                xtype: 'textfield',
                fieldLabel: 'E-mail'
            }],
            
            buttons: [{
                direction: 'prev',
                text: 'Previous panel',
                listeners: {
                    click: 'onWizardButtonClick'
                }
            }, {
                direction: 'next',
                text: 'Third panel',
                listeners: {
                    click: 'onWizardButtonClick'
                }
            }]
        }, {
            xtype: 'form',
            
            items: [{
                xtype: 'datefield',
                fieldLabel: 'Birth date'
            }, {
                xtype: 'timefield',
                fieldLabel: 'Time'
            }],
            
            buttons: [{
                direction: 'prev',
                text: 'Back to Second panel',
                listeners: {
                    click: 'onWizardButtonClick'
                }
            }]
        }]
    }]
});
