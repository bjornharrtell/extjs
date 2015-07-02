Ext.define('KitchenSink.store.Dashboard', {
    extend: 'Ext.data.Store',
    alias: 'store.dashboard',

    fields: [
        { name: 'name' },
        { name: 'price',   type: 'float' },
        { name: 'revenue', type: 'float' },
        { name: 'growth',  type: 'float' },
        { name: 'product', type: 'float' },
        { name: 'market',  type: 'float' }
    ],

    data: (function () {
        var data = [
            ['3M Co'],
            ['AT&T Inc'],
            ['Boeing Co.'],
            ['Citigroup, Inc.'],
            ['Coca-Cola'],
            ['General Motors'],
            ['IBM'],
            ['Intel'],
            ['McDonald\'s'],
            ['Microsoft'],
            ['Verizon'],
            ['Wal-Mart']
        ];

        for (var i = 0, l = data.length, rand = Math.random; i < l; i++) {
            var item = data[i];
            item[1] = Ext.util.Format.number(((rand() * 10000) >> 0) / 100, '0');
            item[2] = ((rand() * 10000) >> 0) / 100;
            item[3] = ((rand() * 10000) >> 0) / 100;
            item[4] = ((rand() * 10000) >> 0) / 100;
            item[5] = ((rand() * 10000) >> 0) / 100;
        }

        return data;
    })()

});