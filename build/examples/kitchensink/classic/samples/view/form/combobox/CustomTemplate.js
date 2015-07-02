/**
 * This example illustrates a combo box which loads data from a local array
 * and uses a custom item template.
 */
Ext.define('KitchenSink.view.form.combobox.CustomTemplate', {
    extend: 'Ext.form.Panel',
    xtype: 'custom-template-combo',

    //<example>
    requires: [
        'KitchenSink.model.State',
        'KitchenSink.store.States'
    ],
    
    exampleTitle: 'Custom Template ComboBox',
    otherContent: [{
        type: 'Model',
        path: 'classic/samples/model/State.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/States.js'
    }],
    //</example>
    
    title: 'Custom Template  ComboBox',
    width: 500,
    layout: 'form',
    viewModel: {},
    
    items: [{
        xtype: 'fieldset',
        layout: 'anchor',
        items: [{
            xtype: 'component',
            anchor: '100%',
            html: [
                '<h3>Custom Item Templates</h3>',
                '<p>This ComboBox uses the same data, but also illustrates ',
                'how to use an optional custom template to create custom UI ',
                'renditions for list items by overriding the getInnerTpl method. ',
                'In this case each item shows the state\'s abbreviation, and has ',
                'a QuickTip which displays the state\'s nickname when hovered over.</p>'
            ]
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Selected State',
            bind: '{states.value}'
        }, {
            xtype: 'combobox',
            reference: 'states',
            publishes: 'value',
            fieldLabel: 'Select State',
            displayField: 'state',
            anchor: '-15',
            store: {
                type: 'states'
            },
            queryMode: 'local',
            listConfig: {
                itemTpl: [
                    '<div data-qtip="{state}: {description}">{state} ({abbr})</div>'
                ]
            }
        }]
    }]
});
