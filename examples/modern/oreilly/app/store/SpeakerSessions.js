Ext.define('Oreilly.store.SpeakerSessions', {
	extend: 'Ext.data.Store',

    config: {
        model: 'Oreilly.model.Session',

        sorters: [
            {
                property: 'time',
                direction: 'ASC'
            }
        ]
    }
});
