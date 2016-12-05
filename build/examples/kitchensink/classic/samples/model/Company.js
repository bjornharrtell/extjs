Ext.define('KitchenSink.model.Company', {
    extend: 'KitchenSink.model.Base',
    requires: [
        "KitchenSink.model.field.PhoneNumber"
    ],
    fields: [
        {name: 'name'},
        {name: 'phone', type: 'phonenumber' },
        {name: 'price', type: 'float'},
        {name: 'change', type: 'float'},
        {name: 'pctChange', type: 'float'},
        {name: 'lastChange', type: 'date',  dateFormat: 'n/j'},
        {name: 'industry'},
        {name: 'desc'},
        // Trend begins with the cerrent price. Changes get pushed onto the end
        {
            name: 'trend',
            convert: function(value, record) {
                // Record creation call with no trend there: start with current price
                if (value === null) {
                    return [record.get('price')];
                }
                return Ext.isArray(value) ? value : [ value ];
            } 
        },
        // Rating dependent upon performance 0 = best, 2 = worst
        {
            name: 'rating',
            type: 'int',
            convert: function (value, rec) {
                if (value !== undefined) { // allow rating to be set
                    return value;
                }

                var pct = rec.data.pctChange;

                return (pct < 0) ? 2 : ((pct < 1) ? 1 : 0);
            }
        }
    ],

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: '/KitchenSink/Company'
    },

    validators: {
        name: 'presence'
    },

    // Override to keep the last 10 prices in the trend field
    set: function(fieldName, value) {
        if (fieldName === 'price') {
            this.callParent([{
                price: value,
                trend: this.addToTrend(fieldName.price)
            }]);
        }
        else {
            if (typeof fieldName !== 'string' && 'price' in fieldName) {
                fieldName.trend = this.addToTrend(fieldName.price);
            }
            this.callParent(arguments);
        }
    },

    // Override to keep the last 10 prices in the trend field
    addToTrend: function(value) {
        var trend = this.data.trend.concat(value);

        if (trend.length > 10) {
            Ext.Array.splice(trend, 0, trend.length - 10);
        }
        return trend;
    }
});
