/**
 * This example shows how to use the 'spriteevents' plugin.
 * Clicking on a sprite will change its color.
 */
Ext.define('KitchenSink.view.draw.SpriteEvents', {
    extend: 'Ext.panel.Panel',
    xtype: 'sprite-events',

    requires: [
        'Ext.draw.Component',
        'Ext.draw.plugin.SpriteEvents'
    ],

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
                    fillStyle: '#79BB3F',
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
                    strokeStyle: 'black',
                    lineWidth: 8,
                    lineCap: 'round',
                    path: 'M350,200L500,50'
                }
            ],

            listeners: {
                spriteclick: function (item, event) {
                    var sprite = item && item.sprite,
                        color = Ext.draw.Color.create(
                            Math.random() * 255,
                            Math.random() * 255,
                            Math.random() * 255
                        );

                    if (sprite) {
                        sprite.setAttributes({
                            fillStyle: color,
                            strokeStyle: color
                        });
                        sprite.getSurface().renderFrame();
                    }
                }
            }
        }
    ]

});
