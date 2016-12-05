Ext.define('KitchenSink.view.binding.Association', {
    extend: 'Ext.Container',

    viewModel: 'binding-association',

    // <example>
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/binding/AssociationModel.js'
    }, {
        type: 'Model',
        path: 'modern/src/model/Person.js'
    }],
    // </example>

    referenceHolder: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    shadow: true,
    cls: 'demo-solid-background',
    items: [{
        xtype: 'list',
        flex: 2,
        title: 'People',
        itemTpl: '{firstName} {lastName}',
        reference: 'peopleList',
        bind: '{people}'
    }, {
        xtype: 'list',
        flex: 3,
        itemTpl: 'Created: {created:date("Y-m-d")}, Key: {accountKey}',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Accounts',
            bind: 'Accounts for {person.firstName} {person.lastName}'
        }],
        bind: '{person.accounts}'
    }]
});
