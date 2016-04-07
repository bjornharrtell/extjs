Ext.define('KitchenSink.view.grid.BigDataRowModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.grid-bigdata-row',

    formulas: {
        ageGroup: function (get) {
            var age = get('record.age');

            if (age < 25) {
                return 0;
            }
            if (age < 30) {
                return 1;
            }
            if (age < 35) {
                return 2;
            }

            return 3;
        }
    }
});
