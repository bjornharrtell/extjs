Ext.define('KitchenSink.view.drag.DataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-data',

    init: function(view) {
        var el = view.element;

        // When the drag starts, the describe method is used to extract the
        // relevant data that the drag represents and is pushed into the info
        // object for consumption by the target.
        this.source = new Ext.drag.Source({
            element: el.down('.data-source'),
            handle: '.handle',
            constrain: el,
            describe: function(info) {
                info.setData('postage-duration', info.eventTarget.getAttribute('data-days'));
            },
            listeners: {
                dragstart: function(source, info) {
                    source.getProxy().setHtml(info.eventTarget.innerHTML);
                }
            },
            proxy: {
                type: 'placeholder',
                cls: 'data-proxy'
            }
        });

        this.target = new Ext.drag.Target({
            element: el.down('.data-target'),
            validCls: 'data-target-valid',
            listeners: {
                drop: this.onDrop
            }
        });
    },

    onDrop: function(target, info) {
        // Get the data from the info object and use it to display
        // the expectation to the user.
        info.getData('postage-duration').then(function(duration) {
            var s = Ext.String.format('Your parcel will arrive within {0} days', duration);
            Ext.Msg.alert('Delivery set', s);
        });
    },

    destroy: function() {
        this.target = this.source = Ext.destroy(this.source, this.target);
        this.callParent();
    }
});
