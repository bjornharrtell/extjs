/*
 Twitter has deprecated the public Search. This application will simulate tweet data using schematic-ipsum.
 until an oauth solution is developed.
*/

Ext.define('Oreilly.store.Tweets', {
    extend: 'Ext.data.Store',

    require: ['Ext.data.proxy.Ajax'],

    config: {
        fields: ['from_user', 'profile_image_url', 'text', 'created_at'],
        pageSize: 10,
        proxy: {
            type: 'ajax',
            reader: {
                rootProperty: 'data'
            },
            url: '/tweets'
        }
    }
});
