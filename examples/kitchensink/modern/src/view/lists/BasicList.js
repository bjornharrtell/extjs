/**
 * Demonstrates how to create a simple List based on inline data.
 * First we create a simple Person model with first and last name fields, then we create a Store to contain
 * the data, finally we create the List itself, which gets its data out of the Store
 */

Ext.define('KitchenSink.view.lists.BasicList', {
    extend: 'Ext.Container',
    requires: ['KitchenSink.model.Person'],
    // <example>
    otherContent: [{
        type: 'Model',
        path: 'modern/src/model/Person.js'
    }],
    // </example>
    layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    cls: 'demo-list',
    items: [{
        width: Ext.os.deviceType == 'Phone' ? null : '50%',
        height: Ext.os.deviceType == 'Phone' ? null : '80%',
        xtype: 'list',
        shadow: true,
        store: 'List',
        itemTpl: '{firstName} {lastName}'
    }]
});
