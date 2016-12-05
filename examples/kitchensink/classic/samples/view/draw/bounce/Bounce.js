Ext.define('KitchenSink.view.draw.bounce.Bounce', {
    extend: 'Ext.panel.Panel',
    xtype: 'draw-bounce',
    controller: 'draw-bounce',
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/draw/bounce/BounceController.js'
    }],
    //</example>

    requires: ['Ext.draw.Component'],

    layout: 'fit',
    width: 650,

    items: {
        xtype: 'draw',
        reference: 'draw',
        width: '100%',
        height: 500,
        sprites: [{
            type: 'image',
            src: Ext.getResourcePath('images/bounce.png'),
            id: 'logo',
            x: 100,
            y: 100,
            width: 256,
            height: 107
        }]
    },

    listeners: {
        afterrender: 'onAfterRender'
    }

});
