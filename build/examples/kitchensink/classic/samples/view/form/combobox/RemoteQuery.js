/**
 * This example illustrates a combo box which querys a remote data source.
 */
Ext.define('KitchenSink.view.form.combobox.RemoteQuery', {
    extend: 'Ext.form.Panel',
    xtype: 'remote-combo',

    //<example>
    requires: [
        'KitchenSink.model.State',
        'KitchenSink.store.RemoteStates'
    ],
    
    exampleTitle: 'Remote Query ComboBox',
    otherContent: [{
        type: 'Model',
        path: 'classic/samples/model/State.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/RemoteStates.js'
    }],
    //</example>
    
    title: 'Remote Query ComboBox',
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
                '<h3>Remote query mode</h3>',
                '<p>This ComboBox uses <code>queryMode: "remote"</code> ',
                'to perform the query on a remote API which returns states ',
                'that match the typed string.</p>'
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
                type: 'remote-states'
            },

            // We're forcing the query to run every time by setting minChars to 0
            // (default is 4)
            minChars: 0,
            queryParam: 'q',
            queryMode: 'remote'
        }]
    }]
});
