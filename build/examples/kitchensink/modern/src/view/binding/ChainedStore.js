Ext.define('KitchenSink.view.binding.ChainedStore', {
    extend: 'Ext.Container',

    //<example>
    requires: ['Ext.grid.Grid'],
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/binding/ChainedStoreModel.js'
    }, {
        type: 'Model',
        path: 'modern/src/model/Person.js'
    }],
    //</example>

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    referenceHolder: true,

    viewModel: 'binding-chainedstore',

    items: [{
        xtype: 'grid',
        flex: 1,
        title: 'All People',
        bind: '{everyone}',
        columns: [{
            text: 'First Name',
            width: 200,
            dataIndex: 'firstName'
        }, {
            text: 'Last Name',
            width: 200,
            dataIndex: 'lastName'
        }, {
            text: 'Age',
            width: 100,
            dataIndex: 'age'
        }]
    }, {
        xtype: 'grid',
        flex: 1,
        bind: '{ageFiltered}',
        titleBar: null,
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            bind: 'People aged {minimumAge} or over'
        }, {
            xtype: 'singlesliderfield',
            docked: 'top',
            label: 'Minimum Age',
            bind: '{minimumAge}'
        }],
        columns: [{
            text: 'First Name',
            width: 200,
            dataIndex: 'firstName'
        }, {
            text: 'Last Name',
            width: 200,
            dataIndex: 'lastName'
        }, {
            text: 'Age',
            width: 100,
            dataIndex: 'age'
        }]
    }]
});