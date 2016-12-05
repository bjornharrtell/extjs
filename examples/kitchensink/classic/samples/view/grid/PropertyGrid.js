/**
 * This example shows how to create a property grid from an object. It
 * also demonstrates updating the grid with new values and also a whole
 * new dataset.
 */
Ext.define('KitchenSink.view.grid.PropertyGrid', {
    extend: 'Ext.container.Container',
    xtype: 'property-grid',
    controller: 'property-grid',

    requires: [
        'Ext.button.Button',
        'Ext.grid.property.*',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox',
        'Ext.form.field.ComboBox'
    ],

    //<example>
    //</example>

    width: 350,

    viewModel: {
        data: {
            nowShowing: 'primary'
        }
    },
    
    items: [{
        xtype: 'container',
        layout: 'hbox',
        margin: '0 0 10 0',
        defaultType: 'button',
        items: [{
            text: 'Primary',
            handler: 'onPrimary',
            bind: {
                disabled: '{nowShowing === "primary"}'
            }
        }, {
            text: 'Alternate',
            margin: '0 0 0 10',
            handler: 'onAlternate',
            bind: {
                disabled: '{nowShowing === "alternate"}'
            }
        }]
    }, {
        xtype: 'propertygrid',
        nameColumnWidth: 165,
        reference: 'propGrid'
    }],

    extra: {
        primary: {
            source: {
                '(name)': 'Property Grid',
                grouping: false,
                autoFitColumns: true,
                productionQuality: true,
                created: new Date(2016, 4, 20),
                tested: false,
                version: 0.8,
                borderWidth: 2
            },
        
            config: {
                borderWidth: {
                    displayName: 'Border Width'
                },
                tested: {
                    displayName: 'QA'
                }
            }
        },
        
        alternate: {
            source: {
                firstName: 'Mike',
                lastName: 'Bray',
                dob: new Date(1986, 3, 15),
                color: 'Red',
                score: null
            },
        
            config: {
                firstName: {
                    displayName: 'First Name'
                },
                lastName: {
                    displayName: 'Last Name'
                },
                dob: {
                    displayName: 'D.O.B'
                },
                color: {
                    displayName: 'Color',
                    editor: {
                        xtype: 'combobox',
                        store: ['Red', 'Green', 'Blue'],
                        forceSelection: true,
                        allowBlank: false
                    },
                    renderer: 'renderColor'
                }, 
                score: {
                    displayName: 'Score',
                    type: 'number'
                }
            }
        }
    }
});
