Ext.define('KitchenSink.model.Company', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'company'},
       {name: 'price', type: 'float'},
       {name: 'change', type: 'float'},
       {name: 'pctChange', type: 'float'},
       {name: 'lastChange', type: 'date',  dateFormat: 'n/j h:ia'},
        // Rating dependent upon performance 0 = best, 2 = worst
        {
            name: 'rating',
            type: 'int',
            convert: function(value, record) {
                var pct = record.get('pctChange');
                if (pct < 0)
                    return 2;
                if (pct < 1)
                    return 1;
                return 0;
            }
        }
    ]
});
