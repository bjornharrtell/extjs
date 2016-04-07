/**
 * Demonstrates a tabbed form panel. This uses a tab panel with 3 tabs - Basic, Sliders and Toolbars - each of which is
 * defined below.
 *
 * See this in action at http://dev.sencha.com/deploy/sencha-touch-2-b3/examples/kitchensink/index.html#demo/forms
 */
Ext.define('KitchenSink.view.GalleryPage', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio',
        'Ext.field.Slider',
        'Ext.field.Toggle',
        'Ext.field.Search'
    ],

    config: {
        tabBar: {
            layout: {
                pack : 'center',
                align: 'center'
            },
            docked: 'bottom'
        },
        items: [
            {
                title: 'basic controls',
                xtype: 'formpanel',
                id: 'gallertyform',
                iconCls: 'add',
                items: [
                    {
                        title: 'Form elements',
                        xtype: 'fieldset',
                        items: [{
                            html:'<h6>h6/Small</h6><h5>h5/Normal</h5><h4>h4/Medium</h4><h3>h3/MediumLarge</h3><h2>h2/Large</h2><h1>h1/ExtraLarge</h1>'
                        }]

                    },
                    {
                        xtype         : 'textfield',
                        name          : 'name',
                        label         : 'Text input'
                    },

                    {
                        xtype: 'textareafield',
                        name : 'bio',
                        label: 'Textarea'
                    },

                    {
                        xtype      : 'searchfield',
                        placeHolder: 'Search',
                        name       : 'searchfield',
                        label: 'Search Input'
                    },

                    {
                        xtype: 'fieldset',
                        title: 'Buttons',
                        defaults: {
                            xtype: 'button',
                            style: 'margin: 0.1em',
                            flex : 1
                        },
                        layout: {
                            type: 'vbox'
                        },
                        items: [
                            {
                                text: 'sample button',
                                scope: this,
                                hasDisabled: false
                            },
                            {
                                text: 'right-icon button',
                                scope: this,
                                iconCls: 'star',
                                iconAlign: 'right'
                            }
                        ]
                    },


                    {
                        xtype: 'fieldset',
                        title: 'Slider',
                        defaults: {
                            xtype     : 'sliderfield',
                            labelWidth: '35%'
                        },
                        items: [
                            {
                                name: 'slider',
                                value: 10
                            },
                            {
                                name: 'sliderdisabled',
                                value: 30,
                                disabled: true
                            },
                            {
                                xtype: 'togglefield',
                                name: 'toggle'
                            }
                        ]
                    },

                    {
                        xtype: 'fieldset',
                        title: 'Checkboxes',
                        defaults: {
                            xtype     : 'checkboxfield',
                            labelAlign: 'right'
                        },
                        items: [
                            {
                                name : 'cool',
                                label: 'Cheetos'
                            },
                            {
                                name : 'cool',
                                label: 'Doritos',
                                disabled: true
                            },
                            {
                                name : 'cool',
                                label: 'Fritos'
                            },
                            {
                                name : 'cool',
                                label: 'Sun Chips'
                            }
                        ]
                    },

                    {
                        xtype: 'fieldset',
                        title: 'Radio buttons',
                        defaults: {
                            xtype     : 'radiofield',
                            labelWidth: '35%'
                        },
                        items: [
                            {
                                name : 'color',
                                value: 'cat',
                                label: 'Cat'
                            },
                            {
                                name : 'color',
                                label: 'Dog',
                                value: 'Dog'
                            },
                            {
                                name : 'color',
                                label: 'Hamster',
                                value: 'Hamster'
                            },
                            {
                                name : 'color',
                                label: 'Lizard',
                                value: 'Lizard'
                            }
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        name : 'rank',
                        label: 'Dropbox (few items)',
                        options: [
                            {
                                text : 'Standard: 7 day',
                                value: 'standard'
                            },
                            {
                                text : 'Rush: 3 day',
                                value: 'rush'
                            },
                            {
                                text : 'Express: next day',
                                value: 'express'
                            },
                            {
                                text : 'Overnight',
                                value: 'overnight'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Listbox',
                        items: [
                            {
                                width: '100%',
                                height: 400,
                                xtype: 'list',
                                store: {
                                    fields: ['name'],
                                    grouper: function(record) {
                                        return record.get('name')[0];
                                    },
                                    data: [
                                        {name: 'Acura'},
                                        {name: 'Audi'},
                                        {name: 'BMW'},
                                        {name: 'Cadillac'},
                                        {name: 'Chrysler'}
                                    ]
                                },
                                itemTpl: '{name}',
                                grouped: true,
                                variableHeights: false
                            }
                        ]
                    },

                    {
                        xtype: 'fieldset',
                        title: 'Dialogs',
                        defaults: {
                            xtype: 'button',
                            style: 'margin: 0.1em',
                            flex : 1
                        },
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                text: 'Notifications',
                                handler: function() {
                                    Ext.Msg.alert('Title', 'Sample error message', Ext.emptyFn);
                                }
                            },
                            {
                                text: 'Dialog box',
                                handler: function() {
                                    Ext.Msg.confirm("Dialog caption", "This is a dialog box", Ext.emptyFn);
                                }
                            }
                        ]
                    }
                ]
            },
            {
                title: 'advanced',
                xtype: 'formpanel',
                iconCls: 'delete',
                items: [
                    {
                        xtype: 'datepickerfield',
                        destroyPickerOnHide: true,
                        name : 'date',
                        label: 'Date picker',
                        value: new Date(),
                        picker: {
                            yearFrom: 1990
                        }
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
                        xtype: 'sliderfield',
                        name: 'multithumb',
                        label: 'Multi slider',
                        values: [10, 70]
                    }
                ]
            }
        ]
    }
});
