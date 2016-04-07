/**
 * This class is a custom toolbar intended for use as a BioTile footer.
 */
Ext.define('Admin.view.widgets.FollowMessage', {
    extend: 'Ext.Toolbar',
    xtype: 'followmessage',
    border: false,

    /**
     * @event follow
     */
    /**
     * @event message
     */

    layout: {
        pack: 'center'
    },

    defaults: {
        margin: '2 6'
    },

    items: [{
        text: 'Follow',
        ui: 'soft-green',

        handler: function () {
            var parent = this.getParent();
            parent.fireEvent('follow', parent);
        }
    }, {
        text: 'Message',
        ui: 'soft-blue',

        handler: function () {
            var parent = this.getParent();
            parent.fireEvent('message', parent);
        }
    }]
});
