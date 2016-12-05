Ext.define('KitchenSink.view.binding.ChainedSelectModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-chainedselect',

    stores: {
        countries: {
            type: 'countries'
        },
        states: {
            type: 'states',
            filters: [{
                property: 'countryId',
                value: '{countryField.selection.id}'
            }]
        }
    }
});
