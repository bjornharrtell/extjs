/**
 * Demonstrates a 'slide' card transition, which shows a new item by sliding the new item in and
 * the old item out simultaneously, in this case with the new item coming in from the top
 */
Ext.define('KitchenSink.view.SlideDown', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum2'],
    config: {
        cls: 'card card4',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Slide Down Animation'
        }, {
            xtype: 'loremipsum2'
        }]
    }
});
