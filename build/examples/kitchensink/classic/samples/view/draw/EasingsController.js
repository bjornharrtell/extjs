Ext.define('KitchenSink.view.draw.EasingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.easing-functions',

    sprite: null,
    timeoutId: 0,

    cyStart: 100,
    cyEnd: 400,
    fxTime: 1000,

    onSelect: function (combo, record) {
        var me = this,
            name = record.get('name'),
            sprite = me.sprite;

        sprite.fx.setConfig({
            easing: name === 'custom' ? me.customEasing : name,
            duration: me.fxTime
        });
        sprite.setAttributes({
            cy: me.cyEnd
        });
    },

    // p is time here in the [0, 1] interval.
    customEasing: function (p) {
        return Math.round(p * 5) / 5; // Round to 0.2.
    },

    onAnimationEnd: function (fx) {
        var me = this,
            sprite = fx.getSprite();

        me.timeoutId = Ext.defer(function () {
            sprite.setAttributes({
                cy: sprite.attr.cy === me.cyEnd ? me.cyStart : me.cyEnd
            });
        }, me.fxTime);
    },

    onAfterRender: function () {
        var me = this,
            easingsCombo = me.lookupReference('easings'),
            easingMap = Ext.draw.TimingFunctions.easingMap,
            draw = me.lookupReference('draw'),
            surface = draw.getSurface(),
            sprite = surface.getItems()[0],
            data = [],
            store, name, easing, record;

        me.sprite = sprite;
        sprite.fx.on('animationend', me.onAnimationEnd, me);

        for (name in easingMap) {
            easing = easingMap[name];
            data.push({
                name: name
            });
        }
        data.push({
            name: 'custom'
        });

        store = new Ext.data.Store({
            fields: ['name'],
            data: data,
            sorters: 'name'
        });

        easingsCombo.setStore(store);
        record = store.findRecord('name', 'linear');
        easingsCombo.setValue(record);
        me.onSelect(easingsCombo, record);
    },

    destroy: function () {
        clearTimeout(this.timeoutId);
        this.callParent();
    }

});