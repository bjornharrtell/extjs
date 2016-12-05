Ext.define('KitchenSink.model.Contact', {
    extend: 'KitchenSink.model.Base',

    fields: [{
        name: 'id'
    }, {
        name: 'verified',
        type: 'boolean'
    }, {
        name: 'guid',
        type: 'string'
    }, {
        name: 'picture',
        type: 'string'
    }, {
        name: 'firstName'
    }, {
        name: 'lastName'
    }, {
        name: 'fullName',
        calculate: function(data) {
            return data.firstName + ' ' + data.lastName;
        }
    }, {
        name: 'gender',
        type: 'string'
    }, {
        name: 'age',
        type: 'integer'
    }, {
        name: 'company',
        type: 'string'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'address',
        type: 'string'
    }, {
        name: 'about',
        type: 'string'
    }, {
        name: 'registered',
        type: 'date',
        dateFormat: 'c'
    }]
});