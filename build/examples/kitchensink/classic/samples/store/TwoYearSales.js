Ext.define('KitchenSink.store.TwoYearSales', {
    extend: 'Ext.data.Store',
    alias: 'store.two-year-sales',

    fields: ['quarter', '2013', '2014'],
    data: [
        { quarter: 'Q1', 2013: 42000, 2014: 68000},
        { quarter: 'Q2', 2013: 50000, 2014: 85000},
        { quarter: 'Q3', 2013: 53000, 2014: 72000},
        { quarter: 'Q4', 2013: 63000, 2014: 89000}
    ]

});