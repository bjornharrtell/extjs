Ext.define('KitchenSink.view.drag.FileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-file',

    requires: ['Ext.drag.Target'],

    afterRender: function(view) {
        var body = view.body;

        if (window.File && window.FileList && window.FileReader) {
            this.target = new Ext.drag.Target({
                element: body,
                listeners: {
                    scope: this,
                    dragenter: this.onDragEnter,
                    dragleave: this.onDragLeave,
                    drop: this.onDrop
                }
            });
        } else {
            body.down('.drag-file-label').setHtml(
                'File dragging is not supported by your browser'
            );
            body.el.addCls('nosupport');
        }
    },

    onDragEnter: function() {
        this.getView().body.addCls('active');
    },

    onDragLeave: function() {
        this.getView().body.removeCls('active');
    },

    onDrop: function(target, info) {
        var view = this.getView(),
            body = view.body,
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

        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });

        me.timer = setTimeout(function() {
            if (!view.destroyed) {
                icon.removeCls('fa-spin');
                icon.fadeOut({
                    callback: function() {
                        body.removeCls('dropped');
                        icon.setOpacity(1);
                        icon.show();
                    }
                });
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