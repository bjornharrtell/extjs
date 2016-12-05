/*
 * Demonstrates all the animations
 */
Ext.define('KitchenSink.view.animations.Animations', {
    extend: 'Ext.Container',
    requires: [
        'KitchenSink.view.animations.AnimationsController'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/animations/AnimationsController.js'
    }],
    // </example>
    
    xtype: 'animationCards',
    reference: 'animationCards',

    layout: 'card',
    shadow: true,

    scrollable: true,
    controller: 'animations',
    buttons: [
        'Slide Left',
        'Slide Right',
        'Slide Up',
        'Slide Down',
        'Cover Left',
        'Cover Right',
        'Cover Up',
        'Cover Down',
        'Reveal Left',
        'Reveal Right',
        'Reveal Up',
        'Reveal Down',
        'Fade',
        'Pop',
        'Flip'
    ],
    initConfig: function() {
        var me = this,
            buttons = me.buttons,
            items = [],
            i;

        for (i=0; i<buttons.length; i++) {
            items.push({
                xtype: 'button',
                text: buttons[i],
                action: buttons[i]
            });
        }

        me.callParent(arguments);
        me.add( [
            {
                xtype: 'container',
                cls: 'demo-solid-background',
                layout: 'vbox',
                itemId: 'card1',
                items: items
            },
            {
                xtype: 'container',
                cls: 'demo-solid-background',
                layout: 'vbox',
                itemId: 'card2',
                items: items
            }
        ]);
    }
});
