Ext.define("States.store.RaceStore", {
    extend: "Ext.data.Store",
    alias: 'store.RaceStore',
    config: {
        fields: ['name', 'white', 'black', 'amIndian', 'asian', 'hawaiian', 'other', 'two']
    }
});