Ext.define('Oreilly.store.Speakers', {
	extend: 'Ext.data.Store',

    config: {
        model: 'Oreilly.model.Speaker',

        grouper: {
        	groupFn: function(record) {
        		return record.get('last_name').substr(0,1);
        	},
        	sortProperty: 'last_name'
        }
    }
});
