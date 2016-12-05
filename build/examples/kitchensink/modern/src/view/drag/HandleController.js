Ext.define('KitchenSink.view.drag.HandleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-handle',

    init: function(view) {
        var el = view.element;

        // This source uses handles to represent a repeating element,
        // so when the item is dragged, contextual information can
        // be gained from the item.
        this.repeatSource = new Ext.drag.Source({
            groups: 'repeat',
            element: el.down('.handle-repeat'),
            handle: '.handle',
            constrain: el,
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
            element: el.down('.handle-handles'),
            handle: '.handle',
            constrain: el
        });
    },

    destroy: function() {
        this.repeatSource = Ext.destroy(this.repeatSource);
        this.repeatTarget = Ext.destroy(this.repeatTarget);
        this.handleSource = Ext.destroy(this.handleSource);
        this.callParent();
    }
});
