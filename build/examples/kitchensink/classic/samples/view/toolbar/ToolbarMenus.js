/**
 * This example illustrates a Toolbar containing different button types, and an input field.
 *
 * It also illustrates button menus containing other children than MenuItems. For example
 * the second SplitButton shows a ButtonGroup as its menu.
 *
 * If you shrink the viewport width, the toolbar items are transferred into an
 * overflow menu. They still react as configured.
 */
Ext.define('KitchenSink.view.toolbar.ToolbarMenus', {
    extend: 'Ext.panel.Panel',
    xtype: 'toolbar-menus',
    controller: 'toolbar-menus',

    //<example>
    requires: [
        'Ext.tip.QuickTipManager',
        'Ext.menu.*',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.Table',
        'Ext.container.ButtonGroup',
        'KitchenSink.model.State',
        'KitchenSink.store.States'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'classic/samples/view/toolbar/StatusBarController.js'
    }],
    //</example>

    title: 'Panel with toolbar with diverse contents',
    frame: true,
    height: 300,
    tbar: {
        overflowHandler: 'menu',
        items: [{
            text:'Button w/ Menu',
            iconCls: 'x-fa fa-th',
            menu: {
                id: 'mainMenu',
                items: [{
                    xtype: 'combobox',
                    hideLabel: true,
                    store: {
                        type: 'states'
                    },
                    displayField: 'state',
                    typeAhead: true,
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText: 'Select a state...',
                    selectOnFocus: true,
                    width: 135,
                    indent: true
                }, {
                    text: 'I like Ext',
                    checked: true,       // when checked has a boolean value, it is assumed to be a CheckItem
                    checkHandler: 'onItemCheck'
                }, '-', {
                    text: 'Radio Options',
                    menu: {
                        items: [
                            // stick any markup in a menu
                            '<b class="menu-title">Choose a Theme</b>',
                            {
                                text: 'Aero Glass',
                                checked: true,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }, {
                                text: 'Vista Black',
                                checked: false,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }, {
                                text: 'Gray Theme',
                                checked: false,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }, {
                                text: 'Default Theme',
                                checked: false,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }
                        ]
                    }
                },{ 
                    text: 'Choose a Date',
                    iconCls: 'x-fa fa-calendar',
                    menu: {
                        xtype: 'datemenu',
                        handler: 'onDateSelect'
                    }
                }, {
                    text: 'Choose a Color',
                    menu: {
                        xtype: 'colormenu',
                        handler: 'onColorSelect'
                    }
                }, {
                    text: 'Disabled Item',
                    disabled: true
                }]
            }
        }, {
            text: 'Users',
            iconCls: 'x-fa fa-users',
            menu: {
                xtype: 'menu',
                plain: true,
                items: {
                    xtype: 'buttongroup',
                    title: 'User options',
                    columns: 2,
                    defaults: {
                        xtype: 'button',
                        scale: 'large',
                        iconAlign: 'left',
                        handler: 'onButtonClick'
                    },
                    items: [{
                        text: 'User<br/>manager',
                        iconCls: 'x-fa fa-user-md',
                        displayText: 'User manager',
                        height: '4em'
                    }, {
                        iconCls: 'x-fa fa-user-plus',
                        tooltip: 'Add user',
                        width: 40,
                        displayText: 'Add user',
                        height: '4em'
                    }, {
                        colspan: 2,
                        width: '100%',
                        text: 'Import',
                        scale: 'small'
                    }, {
                        colspan: 2,
                        width: '100%',
                        text: 'Who is online?',
                        scale: 'small'
                    }]
                }
            }
        }, {
            xtype: 'splitbutton',
            text: 'Split Button',
            handler: 'onButtonClick',
            tooltip: {
                text:'This is a an example QuickTip for a toolbar item',
                title:'Tip Title'
            },
            iconCls: 'x-fa fa-th-list',
            menu : {
                items: [{
                    text: '<b>Bold</b>', handler: 'onItemClick'
                }, {
                    text: '<i>Italic</i>', handler: 'onItemClick'
                }, {
                    text: '<u>Underline</u>', handler: 'onItemClick'
                }, '-', {
                    text: 'Pick a Color',
                    handler: 'onItemClick',
                    menu: {
                        showSeparator: false,
                        items: [{
                            xtype: 'colorpicker',
                            listeners: {
                                select: 'onColorSelect'
                            }
                        }, '-', {
                            text: 'More Colors...',
                            handler: 'onItemClick'
                        }]
                    }
                }, {
                    text: 'Extellent!',
                    handler: 'onItemClick'
                }]
            }
        }, '-', {
            text: 'Toggle Me',
            enableToggle: true,
            toggleHandler: 'onItemToggle',
            pressed: true
        }, {
            xtype: 'combobox',
            hideLabel: true,
            store: {
                type: 'states'
            },
            displayField: 'state',
            typeAhead: true,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Select a state...',
            selectOnFocus: true,
            width: 135,
            indent: true
        }]
    }
});