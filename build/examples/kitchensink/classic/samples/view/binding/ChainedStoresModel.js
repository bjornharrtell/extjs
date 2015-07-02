//<example>
Ext.require('KitchenSink.model.Person', function() {
//</example>
Ext.define('KitchenSink.view.binding.ChainedStoresModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding.chainedstores',

    data: {
        minimumAge: 18
    },
    stores: {
        everyone: {
            model: 'Person',
            data: KitchenSink.model.Person.generateData(15, 10)
        },
        adults: {
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
    }
});
//<example>
});
//</example>