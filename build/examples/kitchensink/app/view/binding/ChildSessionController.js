/**
 * This controller manages the ChildSession view.
 */
Ext.define('KitchenSink.view.binding.ChildSessionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding.childsession',

    requires: [
        'Ext.window.Window',
        'KitchenSink.view.binding.ChildSessionForm'
    ],

    onSessionChangeClick: function () {
        var changes = this.getView().getSession().getChanges();
        if (changes !== null) {
            new Ext.window.Window({
                autoShow: true,
                title: 'Session Changes',
                modal: true,
                width: 600,
                height: 400,
                layout: 'fit',
                items: {
                    xtype: 'textarea',
                    value: JSON.stringify(changes, null, 4)
                }
            });
        } else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    },

    createDialog: function(record) {
        var view = this.getView();

        this.isEdit = !!record;
        this.dialog = view.add({
            xtype: 'binding-child-session-form',
            viewModel: {
                data: {
                    title: record ? 'Edit: ' + record.get('name') : 'Add Customer'
                },
                // If we are passed a record, a copy of it will be created in the newly spawned session.
                // Otherwise, create a new phantom customer in the child.
                links: {
                    theCustomer: record || {
                        type: 'Customer',
                        create: true
                    }
                }
            },

            // Creates a child session that will spawn from the current session
            // of this view.
            session: true
        });

        this.dialog.show();
    },

    onAddCustomerClick: function() {
        this.createDialog(null);
    },

    onEditCustomerClick: function (button) {
        this.createDialog(button.getWidgetRecord());
    },

    onRemoveCustomerClick: function(button) {
        var customerGrid = this.lookupReference('customerGrid'),
            selection = customerGrid.getSelectionModel().getSelection()[0];

        selection.drop();
    },

    onAddOrderClick: function() {
        var orders = this.lookupReference('orders').getStore();
        orders.insert(0, {
            date: new Date(),
            shipped: false
        })
    },

    onRemoveOrderClick: function (button) {
        var orders = this.lookupReference('orders').getStore();
        orders.remove(button.getWidgetRecord());
    },

    onSaveClick: function () {
        // Save the changes pending in the dialog's child session back to the
        // parent session.
        var dialog = this.dialog,
            form = this.lookupReference('form'),
            isEdit = this.isEdit,
            id;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = dialog.getViewModel().get('theCustomer').id;
            }
            dialog.getSession().save();
            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session, 
                // we can then use it to insert the record into our store
                this.getStore('customers').add(this.getSession().getRecord('Customer', id));
            }
            this.onCancelClick();
        }
    },

    onCancelClick: function () {
        this.dialog = Ext.destroy(this.dialog);
    },

    renderOrderId: function(v) {
        if (String(v).indexOf('O') > -1) {
            v = v.replace('Order-', 'O');
        }
        return v;
    }
});
