Ext.define('KitchenSink.view.drag.FileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-file',

    requires: ['Ext.drag.Target'],

    defaultText: 'Drag your files here',

    init: function(view) {
        view.addBodyCls('drag-file-ct');
        this.target = new Ext.drag.Target({
            element: view.innerElement,
            listeners: {
                scope: this,
                dragenter: this.onDragEnter,
                dragleave: this.onDragLeave,
                drop: this.onDrop
            }
        });
    },

    onDragEnter: function() {
        var body = this.getView().innerElement;
        body.down('.drag-file-icon').removeCls('drag-file-fadeout');
        body.addCls('active');
    },

    onDragLeave: function() {
        this.getView().innerElement.removeCls('active');
    },

    onDrop: function(target, info) {
        var view = this.getView(),
            body = view.innerElement,
            icon = body.down('.drag-file-icon');

        body.removeCls('active').addCls('dropped');
        icon.addCls('fa-spin');

        var me = this,
            files = info.files,
            len = files.length,
            s;

        if (len > 1) {
            s = 'Dropped ' + len + ' files.';
        } else {
            s = 'Dropped ' + files[0].name;
        }

        body.down('.drag-file-label').setHtml(s);

        me.timer = setTimeout(function() {
            if (!view.destroyed) {
                icon.removeCls('fa-spin');
                icon.addCls('drag-file-fadeout');
                body.down('.drag-file-label').setHtml(me.defaultText);
            }
            me.timer = null;
        }, 2000);
    },

    destroy: function() {
        clearInterval(this.timer);
        this.target = Ext.destroy(this.target);
        this.callParent();
    }
});
