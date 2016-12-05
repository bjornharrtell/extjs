/**
 * This example shows options for using a proxy while dragging.
 */
Ext.define('KitchenSink.view.drag.ProxyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-proxy',

    afterRender: function (view) {
        // No proxy, just track the mouse cursor
        this.noneSource = new Ext.drag.Source({
            element: view.el.down('.proxy-none'),
            constrain: view.body,

            proxy: 'none',

            listeners: {
                dragmove: function(source, info) {
                    var pos = info.proxy.current,
                        html = Ext.String.format('X: {0}, Y: {1}', pos.x, pos.y);

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
            element: view.el.down('.proxy-original'),
            revert: true,
            constrain: view.body,

            proxy: 'original'
        });

        // Leave the drag element in place and create a custom
        // placeholder.
        this.customSource = new Ext.drag.Source({
            element: view.el.down('.proxy-placeholder'),
            constrain: view.body,

            proxy: {
                type: 'placeholder',
                cls: 'proxy-drag-custom',
                html: 'Custom'
            }
        });
    },

    destroy: function () {
        this.noneSource = Ext.destroy(this.noneSource);
        this.originalSource = Ext.destroy(this.originalSource);
        this.customSource = Ext.destroy(this.customSource);

        this.callParent();
    }
});
