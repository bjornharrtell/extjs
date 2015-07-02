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
                    y: 200
                },
                {
                    type: 'rect',
                    fillStyle: 'orange',
                    x: 300,
                    y: 250,
                    width: 150,
                    height: 150
                },
                {
                    type: 'path',
                    strokeStyle: 'rgb(222,127,209)',
                    lineWidth: 8,
                    lineCap: 'round',
                    path: 'M350,200L500,50'
                },
                {
                    type: 'text',
                    text: 'CLICK ME',
                    fontSize: 40,
                    fillStyle: 'rgb(121,190,239)',
                    x: 200,
                    y: 80
                }
            ],

            listeners: {
                spriteclick: 'onSpriteClick'
            }
        }
    ]

});
