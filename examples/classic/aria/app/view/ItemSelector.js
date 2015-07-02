Ext.define('Aria.view.ItemSelector', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mysimpleitemselector',
    
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],

    title: 'Item Selector',
    referenceHolder: true,
    
    items: [{
        xtype: 'form',
        title: 'Sample ItemSelector widget',
        ariaRole: 'region',
        reference: 'form',
        
        width: 900,
        height: 500,
        layout: 'fit',
        
        bodyStyle: {
            'padding': '6px'
        },
        
        items: [{
            xtype: 'itemselector',
            name: 'itemselector',
            cls: 'aria-itemselector',
            reference: 'itemselector',
            fieldLabel: 'Select multiple items',
            displayField: 'text',
            valueField: 'value',
            value: ['3', '4', '6'],
            allowBlank: false,
            msgTarget: 'side',
            fromTitle: 'Available',
            toTitle: 'Selected',
            
            store: {
                type: 'array',
                fields: ['value', 'text'],
                data: [
                    [123, 'One Hundred Twenty Three'],
                    ['1', 'One'],
                    ['2', 'Two'],
                    ['3', 'Three'],
                    ['4', 'Four'],
                    ['5', 'Five'],
                    ['6', 'Six'],
                    ['7', 'Seven'],
                    ['8', 'Eight'],
                    ['9', 'Nine'],
                    ['10', 'Ten'],
                    ['11', 'Eleven'],
                    ['12', 'Twelve'],
                    ['13', 'Thirteen'],
                    ['14', 'Fourteen'],
                    ['15', 'Fifteen']
                ]
            }
        }],
        
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                minWidth: 75
            },
            items: ['->', {
                text: 'Clear',
                handler: function(btn) {
                    var field = btn.lookupReferenceHolder().lookupReference('itemselector');
                    
                    if (!field.disabled) {
                        field.clearValue();
                    }
                }
            }, {
                text: 'Reset',
                handler: function(btn) {
                    var form = btn.lookupReferenceHolder().lookupReference('form');
                    
                    form.getForm().reset();
                }
            }, {
                text: 'Save',
                handler: function(btn) {
                    var form = btn.lookupReferenceHolder().lookupReference('form');
                    
                    form.getValues(true);
                    
                    if (form.isValid()){
                        Aria.app.msg('Submitted Values', 'The following will be sent to the server: <br />'+
                            form.getValues(true));
                    }
                }
            }]
        }]
    }]
});
