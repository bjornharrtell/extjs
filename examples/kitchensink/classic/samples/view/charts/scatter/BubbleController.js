Ext.define('KitchenSink.view.charts.scatter.BubbleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scatter-bubble',

    seed: 1.3,
    fromHSL: null,
    toHSL: null,

    onRefresh: function() {
        var me = this,
            chart = me.lookupReference('chart'),
            leftAxis = chart.getAxes()[0],
            store = chart.getStore();

        chart.setAnimation(true);
        // We want the maximum to be derived from the store (series data).
        leftAxis.setMaximum(NaN);
        me.fromHSL = Ext.draw.Color.fly('blue').getHSL();
        store.setData(me.createData(50));
    },

    onDropBubble: function () {
        var me = this,
            chart = me.lookupReference('chart'),
            store = chart.getStore(),
            leftAxis = chart.getAxes()[0];

        chart.setAnimation({
            easing: 'bounceOut',
            duration: 1000
        });
        me.fromHSL = Ext.draw.Color.fly('cyan').getHSL();
        // Fix the maximum for a nice bubble drop animation.
        leftAxis.setMaximum(leftAxis.getRange()[1]);
        store.setData(me.createData(50, true));
    },

    // The 'target' here is an object that contains information
    // about the target value when the drag operation on the column ends.
    onEditTipRender: function (tooltip, item, target, e) {
        tooltip.setHtml('Temperature °F: ' + target.yValue.toFixed(1));

        var parts = [];

        if (target.xField) {
            parts.push('X: ' + target.xValue.toFixed(2));
        }
        if (target.yField) {
            parts.push('Y: ' + target.yValue.toFixed(2));
        }

        tooltip.setHtml(parts.join('<br>'));
    },

    onAfterRender: function () {
        var me = this,
            chart = me.lookupReference('chart'),
            store = chart.getStore();

        store.setData(me.createData(50));

        me.fromHSL = Ext.draw.Color.fly('blue').getHSL();
        me.toHSL = Ext.draw.Color.fly('red').getHSL();
        me.fromHSL[2] = 0.3;
    },

    // Controllable random.
    random: function () {
        var me = this;

        me.seed *= 7.3;
        me.seed -= Math.floor(me.seed);

        return me.seed;
    },

    interpolate: function (lambda, minSrc, maxSrc, minDst, maxDst) {
        var value = Math.min(1, (lambda - minSrc) / (maxSrc - minSrc));
        return minDst + (maxDst - minDst) * Math.max(0, value);
    },

    interpolateColor: function (lambda, minSrc, maxSrc) {
        var me = this,
            fromHSL = me.fromHSL,
            toHSL = me.toHSL;

        return Ext.draw.Color.fly(0, 0, 0, 0).setHSL(
            me.interpolate(lambda, minSrc, maxSrc, fromHSL[0], toHSL[0]),
            me.interpolate(lambda, minSrc, maxSrc, fromHSL[1], toHSL[1]),
            me.interpolate(lambda, minSrc, maxSrc, fromHSL[2], toHSL[2])
        ).toString();
    },

    onItemRender: function (sprite, config, rendererData, index) {
        var me = this,
            store = rendererData.store,
            storeItem = store.getData().items[index];

        config.radius = me.interpolate(storeItem.data.g3, 0, 1000, 5, 30);
        config.fillOpacity = me.interpolate(storeItem.data.g3, 0, 1000, 1, 0.7);
        config.fill = me.interpolateColor(storeItem.data.g3, 0, 1000);
        config.stroke = config.fill;
        config.lineWidth = 3;
    },

    createData: function (count, isZeroed) {
        var me = this,
            data = [],
            record = isZeroed ?
            {
                x: 0,
                g0: 0,
                g1: 0,
                g2: 0,
                g3: 0,
                name: 'Item-0'
            } : {
                x: 0,
                g0: 300,
                g1: 700 * me.random() + 100,
                g2: 700 * me.random() + 100,
                g3: 700 * me.random() + 100,
                name: 'Item-0'
            },
            i;

        data.push(record);
        for (i = 1; i < count; i++) {
            record = isZeroed ?
            {
                x: i,
                g0: 0,
                g1: 0,
                g2: 0,
                g3: 0
            } : {
                x: i,
                g0: record.g0 + 30 * me.random(),
                g1: Math.abs(record.g1 + 300 * me.random() - 140),
                g2: Math.abs(record.g2 + 300 * me.random() - 140),
                g3: Math.abs(record.g3 + 300 * me.random() - 140)
            };
            data.push(record);
        }
        return data;
    }

});