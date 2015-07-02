/**
 * Presents a large touch zone and reports all of the touch events fired when the user interacts with it
 */
Ext.define('KitchenSink.view.TouchEvents', {
    extend: 'Ext.Container',
    xtype: 'touchevents',

    requires: [
        'KitchenSink.view.touchevent.Info',
        'KitchenSink.view.touchevent.Logger',
        'KitchenSink.view.touchevent.Pad'
    ],

    initialize: function() {
        this.callParent(arguments);

        var padElement = Ext.get('touchpad'),
            fn = 'onTouchPadEvent';

        padElement.on({
            scope: this,
            touchstart: fn,
            touchend: fn,
            touchmove: fn,
            swipe: fn,
            dragstart: fn,
            drag: fn,
            dragend: fn,
            tap: fn,
            singletap: fn,
            doubletap: fn,
            longpress: fn,
            pinch: fn,
            rotate: fn
        });
    },

    onTouchPadEvent: function(e, target, options) {
        this.down('toucheventlogger').addLog(e.type);
    }
});
