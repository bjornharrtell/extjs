/**
 * Demonstrates a 'slide' card transition, which shows a new item by sliding the new item in and
 * the old item out simultaneously, in this case with the new item coming in from the left
 */
Ext.define('KitchenSink.view.SlideRight', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.LoremIpsum2'],
    config: {
        cls: 'card card2',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Slide Right Animation'
        }, {
            xtype: 'loremipsum2'
        }]
    }
});
