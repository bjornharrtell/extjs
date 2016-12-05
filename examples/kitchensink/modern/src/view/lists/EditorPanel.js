/**
 * This is used by the NestedList example to allow editing of an item in the Store
 */
Ext.define('KitchenSink.view.lists.EditorPanel', {
    extend: 'Ext.form.Panel',
    id: 'editorPanel',
    modal: true,
    hideOnMaskTap: false,
    centered: true,
    width: Ext.filterPlatform('ie10') ? '100%' : 300,
    scrollable: null,
    header: {
        title: 'Edit Item'
    },
    items: [{
        xtype: 'textfield',
        name: 'text',
        label: 'Name',
        listeners: {
            keyup: function(field) {
                Ext.getCmp('changeButton').setDisabled(field.getValue() ? false : true);
            }
        }
    }, {
        docked: 'bottom',
        ui: 'light',
        xtype: 'toolbar',
        items: [
            {
                text: 'Cancel',
                handler: function() {
                    Ext.getCmp('changeButton').setDisabled(false);
                    Ext.getCmp('editorPanel').hide();
                }
            }, {
                xtype: 'spacer'
            }, {
                text: 'Change',
                id: 'changeButton',
                handler: function() {
                    var formPanel = Ext.getCmp('editorPanel'),
                        formRecord = formPanel.getRecord(),
                        values = formPanel.getValues();

                    if (formRecord) {
                        formRecord.set(values);
                        formRecord.commit();
                    }

                    formPanel.hide();
                }
            }
        ]
    }]
});
