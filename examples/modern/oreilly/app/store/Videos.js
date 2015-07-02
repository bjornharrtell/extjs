Ext.define('Oreilly.store.Videos', {
    extend: 'Ext.data.Store',

    config: {
        fields: ['thumbnail', 'title'],

        proxy: {
            type: 'jsonp',

            reader: {
                type: 'json',
                rootProperty: 'data.items',
                record: 'video'
            }
        }
    }
});
