Ext.define('Admin.view.email.FriendsListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emailfriendslist',

    init: function() {
        var me = this,
            friendsStore = me.getViewModel().getStore('friends');

        //Trigger local sorting once new data is available
        friendsStore.on('load', function (store) {
            store.sort();
        });

        //Sort locally and then update menu
        friendsStore.on('sort', function (store) {
            me.mutateData(store, store.getRange());
        });

        me.callParent(arguments);
    },

    mutateData: function (store, records) {
        var view = this.getView(),
            arr = [],
            len = records.length,
            i;

        for (i = 0; i < len; i++) {
            arr.push({
                xtype: 'menuitem',
                text : records[i].get('name'),
                cls: 'font-icon ' + (records[i].get('online') ? 'online-user' : 'offline-user')
            });
        }

        Ext.suspendLayouts();
        view.removeAll(true);
        view.add(arr);
        Ext.resumeLayouts(true);
    }
});
