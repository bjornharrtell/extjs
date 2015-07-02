/**
 * See this in action at http://dev.sencha.com/deploy/sencha-touch-2-b3/examples/kitchensink/index.html#demo/placeholderlabel
 */
Ext.define('KitchenSink.view.PlaceHolderLabel', {
    extend : 'Ext.form.Panel',
    xtype  : 'placeholderlabel',

    requires : [
        'Ext.plugin.field.PlaceHolderLabel'
    ],

    config   : {
        cls     : 'placeholderlabel-form',
        padding : '2em',
        items   : [
            {
                xtype       : 'textfield',
                placeHolder : 'Title',
                plugins     : [
                    {
                        type : 'placeholderlabel'
                    }
                ]
            },
            {
                xtype    : 'container',
                cls      : 'container-borders',
                layout   : {
                    type : 'hbox'
                },
                defaults : {
                    flex : 1
                },
                items    : [
                    {
                        xtype       : 'textfield',
                        placeHolder : 'Price',
                        plugins     : [
                            {
                                type : 'placeholderlabel'
                            }
                        ]
                    },
                    {
                        xtype       : 'textfield',
                        placeHolder : 'Specific Location (optional)',
                        plugins     : [
                            {
                                type : 'placeholderlabel'
                            }
                        ]
                    }
                ]
            },
            {
                xtype       : 'textareafield',
                placeHolder : 'Description',
                plugins     : [
                    {
                        type : 'placeholderlabel'
                    }
                ]
            }
        ]
    }
});
