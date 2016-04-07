/**
 * Demonstrates the 'pop' card transition
 */

Ext.define('KitchenSink.view.Pop', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum'],
    config: {
        cls: 'card card3',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Pop Animation'
        }, {
            xtype: 'loremipsum'
        }]
    }
});
