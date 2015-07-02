// Car production (largest manufacturers).
// Source: http://www.oica.net/
Ext.define('KitchenSink.store.Cars', {
    extend: 'Ext.data.Store',
    alias: 'store.cars',

    fields: ['year', 'to', 'gm', 'vw', 'fo', 'hy'],

    constructor: function (config) {
        config = config || {};

        config.data = [
            { year: '2006', to: 6800228, gm: 5779719, vw: 5429896, fo: 3956708, hy: 2003608 },
            { year: '2007', to: 7211474, gm: 6259520, vw: 5964004, fo: 3565626, hy: 2292075 },
            { year: '2008', to: 7768633, gm: 6015257, vw: 6110115, fo: 3346561, hy: 2435471 },
            { year: '2009', to: 6148794, gm: 4997824, vw: 5902583, fo: 2952026, hy: 4222532 },
            { year: '2010', to: 7267535, gm: 6266959, vw: 7120532, fo: 2958507, hy: 5247339 },
            { year: '2011', to: 6793714, gm: 6494385, vw: 8157058, fo: 3093893, hy: 6118221 },
            { year: '2012', to: 8381968, gm: 6608567, vw: 8576964, fo: 3123340, hy: 6761074 },
            { year: '2013', to: 8565176, gm: 6733192, vw: 9259506, fo: 3317048, hy: 6909194 }
        ];

        this.callParent([config]);
    }

});