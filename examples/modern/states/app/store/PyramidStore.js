Ext.define("States.store.PyramidStore", {
    extend: "Ext.data.Store",
    alias: 'store.PyramidStore',
    config: {
        fields: ['name', 'male', 'female']
    }
});