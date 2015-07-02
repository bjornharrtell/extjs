Ext.define('Admin.view.forms.WizardForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'wizardform',
    requires: ['Admin.view.forms.WizardFormModel'],

    bodyPadding: 15,

    height: 340,

    layout: 'card',

    viewModel: {
        type: 'wizardform'
    },

    controller: 'wizardform',

    defaults : {
        /*
         * Seek out the first enabled, focusable, empty textfield when the form is focused
         */
        defaultFocus: 'textfield:not([value]):focusable:not([disabled])',

        defaultButton : 'nextbutton'
    },

    tbar: {
        reference: 'progress',
        cls: 'wizardprogressbar',
        defaults: {
            disabled: true,
            iconAlign:'top'
        },
        layout: {
            pack: 'center'
        },
        items: [
            {
                step: 0,
                iconCls: 'fa fa-info',
                cls:'active',
                text: 'Account'
            },
            {
                step: 1,
                iconCls: 'fa fa-user',
                text: 'Profile'
            },
            {
                step: 2,
                iconCls: 'fa fa-home',
                text: 'Address'
            },
            {
                step: 3,
                iconCls: 'fa fa-heart',
                text: 'Finish'
            }
        ]
    },

    items: [
        {
            xtype: 'form',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 90,
                labelAlign: 'top',
                labelSeparator: '',
                submitEmptyText: false,
                anchor: '100%'
            },
            items:[
                {
                    emptyText : 'Username must be unique.'
                },
                {
                    emptyText : 'ex: me@somewhere.com'
                },
                {
                    emptyText : 'Enter a password',
                    inputType: 'password',
                    cls: 'wizard-form-break'
                },
                {
                    emptyText : 'Passwords must match',
                    inputType: 'password'
                }
            ]
        },
        {
            xtype: 'form',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 90,
                labelAlign: 'top',
                labelSeparator: '',
                submitEmptyText: false,
                anchor: '100%'
            },
            items:[
                {
                    emptyText : 'First Name'
                },
                {
                    emptyText : 'Last Name'
                },
                {
                    emptyText : 'Company'
                },
                {
                    xtype      : 'fieldcontainer',
                    cls: 'wizard-form-break',
                    fieldLabel : 'MemberType',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel  : 'Free',
                            name      : 'MemberType',
                            inputValue: 'Free'
                        }, {
                            boxLabel  : 'Personal',
                            name      : 'MemberType',
                            inputValue: 'Perosnal'
                        }, {
                            boxLabel  : 'Black',
                            name      : 'MemberType',
                            inputValue: 'Business'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 90,
                labelAlign: 'top',
                labelSeparator: '',
                submitEmptyText: false,
                anchor: '100%'
            },
            items:[
                {
                    emptyText : 'Phone number'
                },
                {
                    emptyText : 'Address'
                },
                {
                    emptyText : 'City'
                },
                {
                    emptyText : 'Postal Code / Zip Code'
                }
            ]
        },
        {
            xtype: 'form',
            items:[
                {
                    html : '<h2>Thank You</h2><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>'
                }
            ]
        }
    ],
    
    bbar: {
        reference: 'navigation-toolbar',
        margin: 8,
        items: [
            '->',
            {
                text: 'Previous',
                ui: 'blue',
                formBind: true,
                bind: {
                    disabled: '{atBeginning}'
                },
                listeners: {
                    click: 'onPreviousClick'
                }
            },
            {
                text: 'Next',
                ui: 'blue',
                formBind: true,
                reference : 'nextbutton',
                bind: {
                    disabled: '{atEnd}'
                },
                listeners: {
                    click: 'onNextClick'
                }
            }
        ]
    }
});
