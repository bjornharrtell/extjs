/**
 * This example shows how to draw doodles of different sizes and colors.
 */
Ext.define('KitchenSink.view.draw.FreeDraw', {
    extend: 'Ext.panel.Panel',
    xtype: 'free-paint',

    requires: [
        'Ext.draw.Component',
        'KitchenSink.view.FreeDrawComponent'
    ],

    layout: 'anchor',
    width: 650,

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Component',
        path: 'classic/samples/view/draw/FreeDrawComponent.js'
    }],
    // </example>

    lastEvent: 0,

    tbar: ['->', {
        text: 'Clear',
        handler: function(event, toolEl, panelHeader) {
            // Remove all the sprites and redraw
            var draw = Ext.getCmp('free-paint');
            draw.getSurface().removeAll(true);
            draw.renderFrame();
        }
    }],

    items: [{
        xtype: 'free-paint-component',
        id: 'free-paint',
        anchor: '100%',
        height: 500
    }],

    onAdded: function(container, pos, instanced) { 
        this.callParent([container, pos, instanced]); 
        container.setScrollable(false);
    },

    onRemoved: function(destroying) {
        this.ownerCt.setScrollable(true);
        this.callParent([destroying]);
    }

});
