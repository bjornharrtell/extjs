Ext.define('KitchenSink.model.grid.Employee', {
    extend: 'KitchenSink.model.Base',
    fields: [{
        name: 'employeeNo'
    }, {
        name: 'rating'
    }, {
        name: 'salary',
        type: 'float'
    }, {
        name: 'forename'
    }, {
        name: 'surname'
    }, {
        name: 'name',
        convert: function(v, rec) {
            return rec.editing ? v : rec.get('forename') + ' ' + rec.get('surname');
        }
    }, {
        name: 'email'
    }, {
        name: 'department'
    }, {
        name: 'dob',
        type: 'date',
        dateFormat: 'Ymd'
    }, {
        name: 'joinDate',
        type: 'date',
        dateFormat: 'Ymd'
    }, {
        name: 'noticePeriod'
    }, {
        name: 'sickDays',
        type: 'int'
    }, {
        name: 'holidayDays',
        type: 'int'
    }, {
        name: 'holidayAllowance',
        type: 'int'
    }, {
        name: 'avatar'
    }, {
        name: 'ratingLastYear',
        type: 'int'
    }, {
        name: 'ratingThisYear',
        type: 'int'
    }],
    idField: 'employeeNo',

    // Override set to update dependent fields
    set: function (name, value) {
        var data = name;

        // Convert 2 arg form to object form
        if (Ext.isString(name)) {
            data = {};
            data[name] = value;
        }

        // "name" is a calculated field, so update it on edit of "forename" or "surname".
        if (data.forename || data.surname) {
            data.name = (data.forename || this.get('forename')) + ' ' + (data.surname || this.get('surname'));
        }
        // Likewise, update two name fields if whole name gets updated
        else if (data.name) {
            var names = this.convertName(data.name);
            data.forename = names[0];
            data.surname = names[1];
        }

        return this.callParent([data]);
    },
    
    convertName: function(name) {
        var names = /([^\s+]+)(?:\s+(.*))?/.exec(name);
        return names ? [names[1], names[2]||''] : ['', ''];
    }
});
