Ext.define('Oreilly.store.Sessions', {
	extend: 'Ext.data.Store',

    config: {

        model: 'Oreilly.model.Session',

        grouper: {
            sortProperty: 'time',
            groupFn: function(record) {
                return Ext.Date.format(record.get('time'), 'g:ia');
            }
        },

        sorters: [
            {
                property: 'time',
                direction: 'ASC'
            },
            {
                property: 'title',
                direction: 'ASC'
            }
        ]
    }
});
