Ext.define('KitchenSink.view.grid.BigDataRowModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.grid-bigdata-row',

    formulas: {
        ratingGroup: function (get) {
            var age = get('record.averageRating');

            if (age < 4) {
                return 0;
            }
            if (age < 5) {
                return 1;
            }
            if (age < 6) {
                return 2;
            }

            return 3;
        }
    }
});
