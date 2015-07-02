/**
 * Demonstrates a 'flip' card transition
 */
Ext.define('KitchenSink.view.Flip', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum2'],
    config: {
        cls: 'card card2',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Flip Animation'
        }, {
            xtype: 'loremipsum2'
        }]
    }
});
