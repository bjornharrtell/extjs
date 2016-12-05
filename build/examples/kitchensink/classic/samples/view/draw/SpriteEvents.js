/**
 * This example shows how to use the 'spriteevents' plugin.
 * Clicking on a sprite will change its color.
 */
Ext.define('KitchenSink.view.draw.SpriteEvents', {
    extend: 'Ext.panel.Panel',
    xtype: 'sprite-events',
    controller: 'sprite-events',

    requires: [
        'Ext.draw.Component',
        'Ext.draw.plugin.SpriteEvents'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/draw/SpriteEventsController.js'
    }],
    //</example>
    layout: 'fit',
    width: 650,

    items: [
        {
            xtype: 'draw',
            width: '100%',
            height: 500,

            plugins: ['spriteevents'],

            sprites: [
                {
                    type: 'circle',
                    fillStyle: '#7BB20C',
                    r: 75,
                    x: 200,
                    y: 200,
                    fx: {
                        duration: 300
                    }
                },
                {
                    type: 'rect',
                    fillStyle: 'orange',
                    x: 400,
                    y: 250,
                    width: 150,
                    height: 150,
                    fx: {
                        duration: 300
                    }
                },
                {
                    type: 'path',
                    strokeStyle: 'rgb(222,127,209)',
                    lineWidth: 12,
                    lineCap: 'round',
                    path: 'M350,200L500,50',
                    fx: {
                        duration: 300
                    }
                },
                {
                    type: 'text',
                    text: 'CLICK ME',
                    fontSize: 40,
                    fillStyle: 'rgb(121,190,239)',
                    x: 200,
                    y: 80,
                    fx: {
                        duration: 300,
                        customDurations: {
                            text: 0
                        }
                    }
                },
                {
                    type: 'image',
                    src: Ext.getResourcePath('images/bounce.png'),
                    id: 'logo',
                    x: 100,
                    y: 320,
                    width: 256,
                    height: 107,
                    fx: {
                        duration: 500,
                        easing: 'bounceOut'
                    }
                }
            ],

            listeners: {
                spriteclick: 'onSpriteClick'
            }
        }
    ]

});
