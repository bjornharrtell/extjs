Ext.define('KitchenSink.view.d3.SalaryViewModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'KitchenSink.model.Salary',
        'Ext.data.TreeStore'
    ],

    alias: 'viewmodel.salary',

    stores: {
        store: {
            type: 'tree',
            model: 'KitchenSink.model.Salary',
            autoLoad: true,
            root: {
                text: 'States'
            }
        }
    },

    data: {
        selection: undefined
    }

});