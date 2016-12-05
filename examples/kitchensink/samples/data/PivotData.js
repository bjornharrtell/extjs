Ext.define('KitchenSink.data.PivotData', {
    requires: [
        'KitchenSink.data.Init',
        'Ext.ux.ajax.PivotSimlet'
    ]
}, function(){
    var data = [],
        items = 500,
        rand = 37,
        companies = ['Google', 'Apple', 'Dell', 'Microsoft', 'Adobe'],
        countries = ['Belgium', 'Netherlands', 'United Kingdom', 'Canada', 'United States', 'Australia'],
        persons = ['John', 'Michael', 'Mary', 'Anne', 'Robert', 'Müller'],
        randomItem = function(data){
            var k = rand % data.length;

            rand = rand * 1664525 + 1013904223;
            rand &= 0x7FFFFFFF;
            return data[k];
        },
        randomDate = function(start, end){
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime() ));
        },
        i, j;

    for (i = 0; i < items; i++){
        j = rand % companies;
        data.push({
            id:         i,
            company:    randomItem(companies),
            country:    randomItem(countries),
            person:     randomItem(persons),
            date:       randomDate(new Date(2012, 0, 1), new Date()),
            value:      Math.random() * 1000 + 1,
            quantity:   Math.floor(Math.random() * 30 + 1)
        });
    }

    Ext.ux.ajax.SimManager.init({
        defaultSimlet: null
    });

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/SalesData': {
            type: 'json',
            data: data
        }
    });
    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/RemoteSalesData': {
            type: 'pivot',
            data: data
        }
    });

});