/**
 * This example shows how to create and use composite sprites.
 * Please see the 'Sprite' tab for details.
 */
Ext.define('KitchenSink.view.draw.Composite', {
    extend: 'Ext.panel.Panel',
    xtype: 'draw-composite',
    controller: 'draw-composite',
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/draw/CompositeController.js'
    }, {
        type: 'Sprite',
        path: 'classic/samples/view/draw/Protractor.js'
    }],
    //</example>

    requires: [
        'Ext.draw.Component',
        'KitchenSink.view.draw.Protractor'
    ],

    layout: 'fit',
    width: 650,

    tbar: ['->', {
        xtype: 'segmentedbutton',
        width: 200,
        items: [{
            text: 'Interaction',
            pressed: true
        }, {
            text: 'Animation'
        }],
        listeners: {
            toggle: 'onToggle'
        }
    }],

    items: {
        xtype: 'draw',
        reference: 'draw',
        width: '100%',
        height: 500,
        sprites: [{
            type: 'protractor',
            id: 'protractor',
            fromX: 325,
            fromY: 250,
            toX: 400,
            toY: 150,
            strokeStyle: 'red'
        }],
        listeners: {
            element: 'el',
            mousedown: 'onMouseDown',
            mousemove: 'onMouseMove'
        }
    }

});
