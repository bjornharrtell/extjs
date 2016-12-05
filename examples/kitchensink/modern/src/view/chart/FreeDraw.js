Ext.define('KitchenSink.view.chart.FreeDraw', {
    extend: 'Ext.Panel',
    requires: ['KitchenSink.view.chart.FreeDrawComponent'],
    lastEvent: 0,
    layout: 'vbox',
    // <example>
    otherContent: [{
        type: 'Component',
        path: 'modern/src/view/chart/FreeDrawComponent.js'
    }],
    // </example>

    padding: 0,
    items: [{
        xtype: 'toolbar',
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
        xclass: 'KitchenSink.view.chart.FreeDrawComponent',
        id: 'free-paint',
        flex: 1
    }]
});
