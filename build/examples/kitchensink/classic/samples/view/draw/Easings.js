/**
 * This example demos all the built-in easing
 * functions there are, and shows how one can
 * create their own easing functions for sprite
 * animations.
 */
Ext.define('KitchenSink.view.draw.Easings', {
    extend: 'Ext.panel.Panel',
    xtype: 'easing-functions',
    controller: 'easing-functions',

    requires: [
        'Ext.draw.Component'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/draw/EasingsController.js'
    }],
    // </example>

    layout: 'fit',
    width: 650,

    tbar: [
        '->',
        {
            xtype: 'combobox',
            editable: false,
            fieldLabel: 'Easing Function',
            displayField: 'name',
            reference: 'easings',
            listeners: {
                select: 'onSelect'
            }
        }
    ],

    items: [
        {
            xtype: 'draw',
            reference: 'draw',
            width: '100%',
            height: 500,

            sprites: [{
                type: 'circle',
                fillStyle: 'red',
                r: 20,
                cx: 325,
                cy: 100
            }, {
                type: 'line',
                fromX: 250,
                fromY: 100,
                toX: 400,
                toY: 100
            }, {
                type: 'line',
                fromX: 250,
                fromY: 400,
                toX: 400,
                toY: 400
            }]
        }
    ],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
