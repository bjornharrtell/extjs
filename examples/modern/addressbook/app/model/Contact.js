Ext.define('AddressBook.model.Contact', {
    extend: 'Ext.data.Model',

    fields: [
        'firstName',
        'lastName',
        'headshot',
        'title',
        'telephone',
        'city',
        'state',
        'country',
        'latitude',
        'longitude'
    ]
});
