/**
 *
 */
Ext.define('Ext.layout.Abstract', {
    mixins: ['Ext.mixin.Observable'],
    
    isLayout: true,

    constructor: function(config) {
        this.initialConfig = config;
    },

    setContainer: function(container) {
        var me = this;

        me.container = container;

        me.mixins.observable.constructor.call(me, me.initialConfig);

        return me;
    },

    onItemAdd: function() {},

    onItemRemove: function() {},

    onItemMove: function() {},

    onItemCenteredChange: function() {},

    onItemFloatingChange: function() {},

    onItemDockedChange: function() {},

    onItemInnerStateChange: function() {}
});
