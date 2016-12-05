Ext.define('KitchenSink.view.dd.GridToFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dd-grid-to-form',

    beforeRender: function () {
        var store = this.lookup('grid').store,
            data = (this.myData = []),
            obj;

        // Keep a copy of the original data for reset:
        store.each(function (rec) {
            data.push(obj = Ext.apply({}, rec.data));
            delete obj.id;
        });
    },

    boxReady: function () {
        var form = this.lookup('form'),
            body = form.body;

        this.formPanelDropTarget = new Ext.dd.DropTarget(body, {
            ddGroup: 'grid-to-form',

            notifyEnter: function (ddSource, e, data) {
                //Add some flare to invite drop.
                body.stopAnimation();
                body.highlight();
            },

            notifyDrop: function (ddSource, e, data) {
                // Reference the record (single selection) for readability
                var selectedRecord = ddSource.dragData.records[0];

                // Load the record into the form
                form.getForm().loadRecord(selectedRecord);

                // Delete record from the source store.  not really required.
                ddSource.view.store.remove(selectedRecord);
                return true;
            }
        });
    },

    destroy: function () {
        var target = this.formPanelDropTarget;

        if (target) {
            target.unreg();
            this.formPanelDropTarget = null;
        }

        this.callParent();
    },

    onResetClick: function () {
        this.lookup('grid').getStore().loadData(this.myData);
        this.lookup('form').getForm().reset();
    }
});
