/**
 * Demonstrates a 'fade' card transition, which shows a new item by rendering it behind the current item
 * then fading the current item out
 */

Ext.define('KitchenSink.view.Fade', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum2'],
    config: {
        cls: 'card card5',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Fade Animation'
        }, {
            xtype: 'loremipsum2'
        }]
    }
});
