/**
 * Base class for email controllers for phone and tablet.
 */
Ext.define('Admin.view.email.EmailController', {
    extend: 'Ext.app.ViewController',

    //doCompose: function (to) {
    //    //
    //},
    actionsVisible: false,

    onChangeFilter: function (sender) {
        console.log('Show ' + sender.getItemId());
    },

    onComposeMessage: function () {
        this.doCompose();
    },

    onComposeTo: function (sender) {
        var rec = sender.getRecord();
        this.doCompose(rec.get('name'));
    },

    onSelectMessage: function (sender, record) {
        //
    },

    hideActions: function () {
        var actions = this.actions;

        if (actions) {
            actions.hide();
        }
        this.actionsVisible = false;
    },

    showActions: function () {
        var me = this,
            actions = me.actions;

        if (!actions) {
            me.actions = actions = Ext.create({
                xtype: 'emailactions',
                defaults: {
                    scope: me
                },
                enter: 'right',
                exit: 'right',
                top: 0,
                hidden: true,
                left: null,
                height: '100%',
                hideOnMaskTap: true,
                width: 250
            });

            Ext.Viewport.add(actions);
        }

        actions.show();
        me.actionsVisible = true;
    }
});
