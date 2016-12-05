Ext.define('KitchenSink.view.touchevent.Pad', {
    extend: 'Ext.Container',
    xtype: 'toucheventpad',
    id: 'touchpad',
    
    flex: 1,
    margin: 10,

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },

    items: [
        {
            html: 'Touch here!'
        }
    ]
});
