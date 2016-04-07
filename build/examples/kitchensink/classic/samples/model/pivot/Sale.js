Ext.define('KitchenSink.model.pivot.Sale', function() {
    var regions = {
        "Belgium": 'Europe',
        "Netherlands": 'Europe',
        "United Kingdom": 'Europe',
        "Canada": 'North America',
        "United States": 'North America',
        "Australia": 'Australia'
    };
    
    return {
        extend: 'KitchenSink.model.Base',

        fields: [
            {name: 'id',        type: 'int'},
            {name: 'company',   type: 'string'},
            {name: 'country',   type: 'string'},
            {name: 'person',    type: 'string'},
            {name: 'date',      type: 'date', dateFormat: 'c'},
            {name: 'value',     type: 'float'},
            {name: 'quantity',  type: 'float'},
            {
                name: 'year',
                convert: function(v, record){
                    return Ext.Date.format(record.get('date'), "Y");
                }
            },{
                name: 'month',
                convert: function(v, record){
                    return parseInt(Ext.Date.format(record.get('date'), "m"), 10) - 1;
                }
            },{
                name: 'continent',
                convert: function(v, record){
                    return regions[record.get('country')];
                }
            }
        ]
    };
});
