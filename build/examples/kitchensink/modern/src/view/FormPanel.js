/**
 * Demonstrates a tabbed form panel. This uses a tab panel with 3 tabs - Basic, Sliders and Toolbars - each of which is
 * defined below.
 *
 * See this in action at http://dev.sencha.com/deploy/sencha-touch-2-b3/examples/kitchensink/index.html#demo/forms
 */
Ext.define('KitchenSink.view.FormPanel', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio'
    ],
    id: 'basicform',
    config: {
        items: [
            {
                xtype: 'fieldset',
                id: 'fieldset1',
                title: 'Personal Info',
                instructions: 'Please enter the information above.',
                defaults: {
                    labelWidth: '35%'
                },
                items: [
                    {
                        xtype         : 'textfield',
                        name          : 'name',
                        label         : 'Name',
                        placeHolder   : 'Tom Roy',
                        autoCapitalize: true,
                        required      : true,
                        clearIcon     : true
                    },
                    {
                        xtype: 'passwordfield',
                        name : 'password',
                        label: 'Password',
                        clearIcon  : !Ext.theme.is.Blackberry
                    },
                    {
                        xtype      : 'emailfield',
                        name       : 'email',
                        label      : 'Email',
                        placeHolder: 'me@sencha.com',
                        clearIcon  : true
                    },
                    {
                        xtype      : 'urlfield',
                        name       : 'url',
                        label      : 'Url',
                        placeHolder: 'http://sencha.com',
                        clearIcon  : true
                    },
                    {
                        xtype      : 'spinnerfield',
                        name       : 'spinner',
                        label      : 'Spinner',
                        minValue   : 0,
                        maxValue   : 10,
                        stepValue  : 1,
                        cycle      : true
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'cool',
                        label: 'Cool'
                    },
                    {
                        xtype: 'datepickerfield',
                        destroyPickerOnHide: true,
                        name : 'date',
                        label: 'Start Date',
                        value: new Date(),
                        picker: {
                            yearFrom: 1990
                        }
                    },
                    {
                        xtype: 'selectfield',
                        name : 'rank',
                        label: 'Rank',
                        options: [
                            {
                                text : 'Master',
                                value: 'master'
                            },
                            {
                                text : 'Journeyman',
                                value: 'journeyman'
                            },
                            {
                                text : 'Apprentice',
                                value: 'apprentice'
                            }
                        ]
                    },
                    {
                        xtype: 'textareafield',
                        name : 'bio',
                        label: 'Bio'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                id: 'fieldset2',
                title: 'Favorite color',
                defaults: {
                    xtype     : 'radiofield',
                    labelWidth: '35%'
                },
                items: [
                    {
                        name : 'color',
                        value: 'red',
                        label: 'Red'
                    },
                    {
                        name : 'color',
                        label: 'Blue',
                        value: 'blue'
                    },
                    {
                        name : 'color',
                        label: 'Green',
                        value: 'green'
                    },
                    {
                        name : 'color',
                        label: 'Purple',
                        value: 'purple'
                    }
                ]
            },
            {
                xtype: 'container',
                defaults: {
                    xtype: 'button',
                    style: 'margin: 1em',
                    flex : 1
                },
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        text: 'Disable fields',
                        ui: 'action',
                        scope: this,
                        hasDisabled: false,
                        handler: function(btn){
                            var fieldset1 = Ext.getCmp('fieldset1'),
                                fieldset2 = Ext.getCmp('fieldset2');

                            if (btn.hasDisabled) {
                                fieldset1.enable();
                                fieldset2.enable();
                                btn.hasDisabled = false;
                                btn.setText('Disable fields');
                            } else {
                                fieldset1.disable();
                                fieldset2.disable();
                                btn.hasDisabled = true;
                                btn.setText('Enable fields');
                            }
                        }
                    },
                    {
                        text: 'Reset',
                        ui: 'action',
                        handler: function(){
                            Ext.getCmp('basicform').reset();
                        }
                    }
                ]
            }
        ]
    }
});
