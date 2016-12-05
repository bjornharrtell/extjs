/**
 * This example shows how to specify handles. Only the child boxes inside
 * the main element can trigger a drag.
 */
Ext.define('KitchenSink.view.drag.HandleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-handle',

    afterRender: function (view) {
        // This source uses handles to represent a repeating element,
        // so when the item is dragged, contextual information can
        // be gained from the item.
        this.repeatSource = new Ext.drag.Source({
            groups: 'repeat',
            element: view.el.down('.handle-repeat'),
            handle: '.handle',
            constrain: view.body,
            listeners: {
                dragstart: function(source, info) {
                    source.getProxy().setHtml(info.eventTarget.innerHTML);
                }
            },
            proxy: {
                type: 'placeholder',
                cls: 'handle-proxy'
            }
        });

        // This source is only draggable by the handle.
        this.handleSource = new Ext.drag.Source({
            element: view.el.down('.handle-handles'),
            handle: '.handle',
            constrain: view.body
        });
    },

    destroy: function() {
        this.repeatSource = Ext.destroy(this.repeatSource);
        this.handleSource = Ext.destroy(this.handleSource);

        this.callParent();
    }
});
