Ext.define('KitchenSink.view.FreeDraw', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.FreeDrawComponent'],
    lastEvent: 0,
    config: {
        cls: 'card1',
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            top: 0,
            right: 0,
            zIndex: 50,
            style: {
                background: 'none',
                border: 'none'
            },
            items: [{
                xtype: 'spacer'
            }, {
                text: 'Clear',
                handler: function() {
                    var draw = Ext.getCmp('free-paint');
                    draw.getSurface().destroy();
                    draw.getSurface('overlay').destroy();
                    draw.renderFrame();
                }
            }]
        }, {
            xclass: 'KitchenSink.view.FreeDrawComponent',
            id: 'free-paint'
        }]
    }
});