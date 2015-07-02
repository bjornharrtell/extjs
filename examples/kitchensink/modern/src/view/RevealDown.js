/**
 * Demonstrates a 'reveal' card transition, which shows a new item by rendering the new item behind the current
 * visible item, then sliding the old item away to reveal the new one, in this case starting from the top
 */
Ext.define('KitchenSink.view.RevealDown', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum2'],
    config: {
        cls: 'card card4',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Reveal Down Animation'
        }, {
            xtype: 'loremipsum2'
        }]
    }
});