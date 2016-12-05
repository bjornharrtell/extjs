Ext.define('KitchenSink.view.drag.ProxyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-proxy',

    init: function(view) {
        var el = view.element;

        // No proxy, just track the mouse cursor
        this.noneSource = new Ext.drag.Source({
            element: el.down('.proxy-none'),
            constrain: el,
            proxy: 'none',
            listeners: {
                dragmove: function(source, info) {
                    var pos = info.proxy.current,
                        html = Ext.String.format('X: {0}, Y: {1}', Math.round(pos.x), Math.round(pos.y));

                    source.getElement().setHtml(html);
                },
                dragend: function(source) {
                    source.getElement().setHtml('No proxy');
                }
            }
        });

        // Use the drag element as the proxy. Animate it back into
        // position on drop.
        this.originalSource = new Ext.drag.Source({
            element: el.down('.proxy-original'),
            revert: true,
            constrain: el,
            proxy: 'original'
        });

        // Leave the drag element in place and create a custom
        // placeholder.
        this.customSource = new Ext.drag.Source({
            element: el.down('.proxy-placeholder'),
            constrain: el,
            proxy: {
                type: 'placeholder',
                cls: 'proxy-drag-custom',
                html: 'Custom'
            }
        });
    },

    destroy: function() {
        this.noneSource = Ext.destroy(this.noneSource);
        this.originalSource = Ext.destroy(this.originalSource);
        this.customSource = Ext.destroy(this.customSource);
        this.callParent();
    }
});
