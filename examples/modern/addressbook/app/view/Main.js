Ext.define('AddressBook.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',

    requires: [
        'AddressBook.view.Contacts',
        'AddressBook.view.contact.Show',
        'AddressBook.view.contact.Edit'
    ],

    config: {
        autoDestroy: false,

        navigationBar: {
            splitNavigation: false,
            items: [
                {
                    xtype: 'button',
                    id: 'editButton',
                    text: 'Edit',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'button',
                    id: 'saveButton',
                    text: 'Save',
                    ui: 'sencha',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },

        platformConfig: {
            blackberry: {
                navigationBar: {
                    splitNavigation: {
                        xtype: 'toolbar',
                        items: [{
                            docked: 'right',
                            xtype: 'button',
                            iconCls: 'pencil',
                            id: 'editButton',
                            hidden: true
                        },{
                            docked: 'right',
                            xtype: 'button',
                            iconCls: 'check',
                            id: 'saveButton',
                            hidden: true
                        }]
                    }
                }
            }
        },

        items: [
            { xtype: 'contacts' }
        ]
    }
});
