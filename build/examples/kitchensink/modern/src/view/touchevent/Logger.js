Ext.define('KitchenSink.view.touchevent.Logger', {
    extend: 'Ext.Container',
    xtype: 'toucheventlogger',
    
    layout: 'fit',
    items: [
        {
            xtype : 'toolbar',
            docked: 'top',
            ui    : 'light',
            title : 'Event Log'
        },
        {
            id: 'logger',
            padding: 5,
            html: '<span>Try using gestures on the area to the right to see how events are fired.</span>',
            scrollable: true,
            styleHtmlContent: true
        }
    ],
    
    /**
     * Adds a log message to the scrollable logging area, scrolls down to ensure the message is visible
     * @param {String} log The log message
     */
    addLog: function(log) {
        var logger   = Ext.getCmp('logger'),
            scroller = logger.getScrollable();

        logger.innerHtmlElement.createChild({
            html: log
        });

        setTimeout(function() {
            scroller.scrollTo(0, scroller.getSize().y - scroller.getClientSize().y);
        }, 50);
    }
});
