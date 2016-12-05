Ext.define('KitchenSink.view.animations.AnimationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.animations',

    refs: {
        animationCards: 'animationCards'
    },
    control: {
        'animationCards button': {
            tap: 'onButtonTap'
        }
    },

    getAnimation: function(type) {
        var parts;
        if (type === 'Fade') {
            return {
                type: 'fade',
                duration: 500
            };
        }
        else if (type === 'Pop') {
            return {
                type: 'pop',
                duration: 500
            };
        }
        else if (type === 'Flip') {
            return {
                type: 'flip',
                duration: 500
            };
        }
        parts = type.split(/\s+/);
        return {
            type: parts[0].toLowerCase(),
            direction: parts[1].toLowerCase(),
            duration: 500
        };
    },

    onButtonTap: function(button) {
        var me = this,
            animationCards = Ext.ComponentQuery.query('animationCards')[0],
            activeItem = animationCards.getActiveItem(),
            layout = animationCards.getLayout(),
            animation = me.getAnimation(button.action),
            cards = animationCards.items.items;
        
        layout.setAnimation(animation);
        animationCards.setActiveItem(activeItem === cards[0] ? cards[1] : cards[0]);
    }
});
