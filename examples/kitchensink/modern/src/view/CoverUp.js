/**
 * Demonstrates a 'cover' card transition, which shows a new item by sliding it over the top of the
 * current item, in this case starting from the bottom
 */
Ext.define('KitchenSink.view.CoverUp', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum2'],
    config: {
        cls: 'card card3',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Cover Up Animation'
        }, {
            xtype: 'loremipsum2'
        }]
    }
});