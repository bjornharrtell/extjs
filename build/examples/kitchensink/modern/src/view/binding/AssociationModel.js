// <example>
Ext.require('KitchenSink.model.Person', function() {
// </example>
Ext.define('KitchenSink.view.binding.AssociationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-association',

    formulas: {
        person: function(get) {
            return get('peopleList.selection');
        }
    },
    stores: {
        people: {
            model: 'Person',
            proxy: 'memory',
            data: KitchenSink.model.Person.generateData({
                includeAccounts: true,
                total: 5
            })
        }
    }
});
// <example>
});
// </example>
