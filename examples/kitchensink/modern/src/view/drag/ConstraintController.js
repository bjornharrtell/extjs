Ext.define('KitchenSink.view.drag.ConstraintController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-constraint',

    init: function(view) {
        var el = view.element;

        // Constrain to the direct parent element
        this.toParentSource = new Ext.drag.Source({
            element: el.down('.constrain-parent'),
            constrain: {
                // True means constrain to the parent element
                element: true
            }
        });

        // Allow only vertical dragging. Constrain to the owner panel.
        this.verticalSource = new Ext.drag.Source({
            element: el.down('.constrain-vertical'),
            constrain: {
                element: el,
                vertical: true
            }
        });

        // Allow only horizontal dragging. Constrain to the owner panel.
        this.horizontalSource = new Ext.drag.Source({
            element: el.down('.constrain-horizontal'),
            constrain: {
                // Constrain dragging vertically only. Also to the parent container.
                element: el,
                horizontal: true
            }
        });

        // Snap drag to a [30, 50] grid. Constrain to the owner panel.
        this.snapSource = new Ext.drag.Source({
            element: el.down('.constrain-snap'),
            constrain: {
                element: el,
                snap: {
                    x: 60,
                    y: 50
                }
            }
        });
    },

    destroy: function() {
        this.toParentSource = Ext.destroy(this.toParentSource);
        this.verticalSource = Ext.destroy(this.verticalSource);
        this.horizontalSource = Ext.destroy(this.horizontalSource);
        this.snapSource = Ext.destroy(this.snapSource);
        this.callParent();
    }
});
