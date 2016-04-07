/**
 * Nominal GDP sector composition, 2011 (in millions of dollars).
 * Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition
 */
Ext.define('KitchenSink.store.EconomySectors', {
    extend: 'Ext.data.Store',
    alias: 'store.economy-sectors',

    fields: ['country', 'agr', 'ind', 'ser'],
    data: [
        { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
        { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
        { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
        { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
        { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
    ]

});