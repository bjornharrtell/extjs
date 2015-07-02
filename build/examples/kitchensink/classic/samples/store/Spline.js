Ext.define('KitchenSink.store.Spline', {
    extend: 'Ext.data.Store',
    alias: 'store.spline',

    fields: ['theta', 'sin', 'cos', 'tan' ],

    constructor: function (config) {
        config = config || {};

        // Create data in construct time instead of defining it
        // on the prototype, so that each example that's using
        // this store works on its own set of data.
        config.data = [
            { theta: 0, sin: 0.00, cos: 1.00, tan: 0.00 },
            { theta: 10, sin: 0.17, cos: 0.98, tan: 0.18 },
            { theta: 20, sin: 0.34, cos: 0.94, tan: 0.36 },
            { theta: 30, sin: 0.50, cos: 0.87, tan: 0.58 },
            { theta: 40, sin: 0.64, cos: 0.77, tan: 0.84 },
            { theta: 50, sin: 0.77, cos: 0.64, tan: 1.19 },
            { theta: 60, sin: 0.87, cos: 0.50, tan: 1.73 },
            { theta: 70, sin: 0.94, cos: 0.34, tan: 2.75 },
            { theta: 80, sin: 0.98, cos: 0.17, tan: 5.67 },
            { theta: 90, sin: 1.00, cos: 0.00, tan: false },
            { theta: 100, sin: 0.98, cos: -0.17, tan: -5.67 },
            { theta: 110, sin: 0.94, cos: -0.34, tan: -2.75 },
            { theta: 120, sin: 0.87, cos: -0.50, tan: -1.73 },
            { theta: 130, sin: 0.77, cos: -0.64, tan: -1.19 },
            { theta: 140, sin: 0.64, cos: -0.77, tan: -0.84 },
            { theta: 150, sin: 0.50, cos: -0.87, tan: -0.58 },
            { theta: 160, sin: 0.34, cos: -0.94, tan: -0.36 },
            { theta: 170, sin: 0.17, cos: -0.98, tan: -0.18 },
            { theta: 180, sin: 0.00, cos: -1.00, tan: 0.00 },
            { theta: 190, sin: -0.17, cos: -0.98, tan: 0.18 },
            { theta: 200, sin: -0.34, cos: -0.94, tan: 0.36 },
            { theta: 210, sin: -0.50, cos: -0.87, tan: 0.58 },
            { theta: 220, sin: -0.64, cos: -0.77, tan: 0.84 },
            { theta: 230, sin: -0.77, cos: -0.64, tan: 1.19 },
            { theta: 240, sin: -0.87, cos: -0.50, tan: 1.73 },
            { theta: 250, sin: -0.94, cos: -0.34, tan: 2.75 },
            { theta: 260, sin: -0.98, cos: -0.17, tan: 5.67 },
            { theta: 270, sin: -1.00, cos: 0.00, tan: false },
            { theta: 280, sin: -0.98, cos: 0.17, tan: -5.67 },
            { theta: 290, sin: -0.94, cos: 0.34, tan: -2.75 },
            { theta: 300, sin: -0.87, cos: 0.50, tan: -1.73 },
            { theta: 310, sin: -0.77, cos: 0.64, tan: -1.19 },
            { theta: 320, sin: -0.64, cos: 0.77, tan: -0.84 },
            { theta: 330, sin: -0.50, cos: 0.87, tan: -0.58 },
            { theta: 340, sin: -0.34, cos: 0.94, tan: -0.36 },
            { theta: 350, sin: -0.17, cos: 0.98, tan: -0.18 },
            { theta: 360, sin: 0.00, cos: 1.00, tan: 0.00 }
        ];

        this.callParent([config]);
    }

});