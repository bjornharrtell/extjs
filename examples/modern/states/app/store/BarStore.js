Ext.define("States.store.BarStore", {
    extend: "Ext.data.Store",
    alias: 'store.BarStore',
    config: {
        fields: ['name', 'population']
    }
});