/**
 * Demonstrates how to use an Ext.Carousel in vertical and horizontal configurations
 */
Ext.define('KitchenSink.view.Carousel', {
    extend: 'Ext.Container',

    requires: [
        'Ext.carousel.Carousel'
    ],

    config: {
        cls: 'cards',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            flex: 1
        },
        items: [{
            xtype: 'carousel',
            items: [{
                html: '<p>Swipe left to show the next card&hellip;</p>',
                cls: 'card'
            },
            {
                html: '<p>You can also tap on either side of the indicators.</p>',
                cls: 'card'
            },
            {
                html: 'Card #3',
                cls: 'card'
            }]
        }, {
            xtype: 'carousel',
            ui: 'light',
            direction: 'vertical',
            items: [{
                html: '<p>Carousels can also be vertical <em>(swipe up)&hellip;</p>',
                cls: 'card dark'
            },
            {
                html: 'And can also use <code>ui:light</code>.',
                cls: 'card dark'
            },
            {
                html: 'Card #3',
                cls: 'card dark'
            }]
        }]
    }
});
