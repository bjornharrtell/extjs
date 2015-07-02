/**
 * Life expectancy at birth for 2013, total years.
 * Source: http://data.worldbank.org/
 */
Ext.define('KitchenSink.store.LifeExpectancy', {
    extend: 'Ext.data.Store',
    alias: 'store.life-expectancy',

    fields: ['country', 'expectancy', 'spending'],

    constructor: function (config) {
        config = config || {};

        // Create data in construct time instead of defining it
        // on the prototype, so that each example that's using
        // this store works on its own set of data.
        config.data = [
            { country: 'Norway', expectancy: 81, spending: 9715 },
            { country: 'United States', expectancy: 79, spending: 9146 },
            { country: 'Luxembourg', expectancy: 82, spending: 7980 },
            { country: 'Netherlands', expectancy: 81, spending: 6145 },
            { country: 'Australia', expectancy: 82, spending: 5827 },
            { country: 'Canada', expectancy: 81, spending: 5718 },
            { country: 'Germany', expectancy: 81, spending: 5006 },
            { country: 'France', expectancy: 82, spending: 4864 },
            { country: 'Japan', expectancy: 83, spending: 3966 },
            { country: 'United Kingdom', expectancy: 81, spending: 3598 },
            { country: 'Singapore', expectancy: 82, spending: 2507 },
            { country: 'Greece', expectancy: 81, spending: 2146 },
            { country: 'Qatar', expectancy: 79, spending: 2043 },
            { country: 'Korea', expectancy: 70, spending: 1880 },
            { country: 'United Arab Emirates', expectancy: 77, spending: 1569 },
            { country: 'Czech Republic', expectancy: 78, spending: 1367 },
            { country: 'Brazil', expectancy: 74, spending: 1083 },
            { country: 'Argentina', expectancy: 76, spending: 1074 },
            { country: 'Russia', expectancy: 71, spending: 957 },
            { country: 'Poland', expectancy: 77, spending: 895 },
            { country: 'Maldives', expectancy: 78, spending: 720 },
            { country: 'Mexico', expectancy: 77, spending: 664 },
            { country: 'Turkey', expectancy: 75, spending: 608 },
            { country: 'South Africa', expectancy: 57, spending: 593 },
            { country: 'Romania', expectancy: 74, spending: 504 },
            { country: 'Belarus', expectancy: 72, spending: 463 },
            { country: 'Namibia', expectancy: 64, spending: 423 },
            { country: 'Botswana', expectancy: 47, spending: 397 },
            { country: 'Hong Kong', expectancy: 84, spending: 1715 },
            { country: 'China', expectancy: 75, spending: 367 },
            { country: 'Ukraine', expectancy: 71, spending: 313 },
            { country: 'Iraq', expectancy: 69, spending: 305 },
            { country: 'Thailand', expectancy: 74, spending: 264 },
            { country: 'Swaziland', expectancy: 49, spending: 256 },
            { country: 'Fiji', expectancy: 70, spending: 189 },
            { country: 'Philippines', expectancy: 69, spending: 122 },
            { country: 'Indonesia', expectancy: 71, spending: 107 },
            { country: 'Haiti', expectancy: 63, spending: 77 },
            { country: 'Cambodia', expectancy: 72, spending: 76 },
            { country: 'India', expectancy: 66, spending: 61 },
            { country: 'Uganda', expectancy: 59, spending: 59 },
            { country: 'Tanzania', expectancy: 61, spending: 49 },
            { country: 'Nepal', expectancy: 68, spending: 39 },
            { country: 'Ethiopia', expectancy: 64, spending: 25 },
            { country: 'Madagascar', expectancy: 65, spending: 20 }
        ];

        this.callParent([config]);
    }

});