Ext.define('KitchenSink.store.Plot', {
    extend: 'Ext.data.Store',
    alias: 'store.plot',

    fields: ['x', 'y1', 'y2', 'y3', 'y4', 'y5'],

    xStep: 0.02,

    fnIndex: 0,

    fn: [
        function (x) { return x * x * 2 - 1; },
        function (x) { return Math.sin(5 * x); },
        function (x) { return Math.sqrt((1 + x) / 2) * 2 - 1; },
        function (x) { return x * x * x; },
        // TODO: The sign function is not rendered correctly:
        // TODO: the jump at x = 1 is connected with a line.
        // TODO: A maximum ratio of delta y to delta x should be calculated.
        // TODO: If exceeded, we should consider that the plotted function is a non-continuous one
        // TODO: (even if there are no gaps in the data) and has a jump at that increment.
        // TODO: The problem with this is that it's hard to pick a value that works well for all functions.
        // TODO: function (x) { return this.sign(x - 1)},
        function (x) { return Math.cos(10 * x); },
        function (x) { return 2 * x; },
        function (x) { return Math.pow(x, -2); },
        function (x) { return Math.pow(x, -3); },
        function (x) { return Math.tan(5 * x); }
    ],

    sign: function (x) {
        if(isNaN(x)) {
            return NaN;
        } else if(x === 0) {
            return x;
        } else {
            return (x > 0 ? 1 : -1);
        }
    },

    traverseFunctions: function () {
        var delta = arguments[0],
            l = arguments.length,
            data = [],
            i, j, y,
            rec;
        for (i = -2; i <= 2; i += delta) {
            rec = {
                x: i
            };
            for (j = 1; j < l; ++j) {
                y = arguments[j].call(this, i);
                rec['y' + j] = y;
            }
            data.push(rec);
        }
        return data;
    },

    generateData: function () {
        var me = this;
        return me.traverseFunctions(me.xStep, me.fn[me.fnIndex++ % me.fn.length]);
    },

    refreshData: function () {
        this.setData(this.generateData());
    },

    constructor: function (config) {
        config = Ext.apply({
            data: this.generateData()
        }, config);
        this.callParent([config]);
    }

});