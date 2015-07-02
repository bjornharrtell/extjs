Ext.define("States.store.GeoStore", {
    extend: "Ext.data.Store",
    alias: 'store.GeoStore',
    config: {
        fields: ['id', 'path', 'type', 'fill'],
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/states_geo.json',
            reader: {
                type: 'json',
                rootProperty: '',
                totalProperty: 'length',
                idProperty: 'id'
            }
        }
    }
});