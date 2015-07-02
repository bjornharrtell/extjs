/**
 * Demonstrates a 'reveal' card transition, which shows a new item by rendering the new item behind the current
 * visible item, then sliding the old item away to reveal the new one, in this case starting from the bottom
 */
Ext.define('KitchenSink.view.RevealUp', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum'],
    config: {
        cls: 'card card3',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Reveal Up Animation'
        }, {
            xtype: 'loremipsum'
        }]
    }
});