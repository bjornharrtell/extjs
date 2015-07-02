//<example>
Ext.require('KitchenSink.model.Person', function() {
//</example>
Ext.define('KitchenSink.view.binding.ChainedStoreModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-chainedstore',

    stores: {
        everyone: {
            model: 'KitchenSink.model.Person',
            data: KitchenSink.model.Person.generateData(15, 10)
        },
        ageFiltered: {
            source: '{everyone}',
            filters: [{
                property: 'age',
                value: '{minimumAge}',
                operator: '>='
            }],
            sorters: [{
                property: 'age',
                direction: 'ASC'
            }]
        }
    },
    data: {
        minimumAge: 18
    }
});
//<example>
});
//</example>