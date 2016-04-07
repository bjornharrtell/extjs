/**
 * This class is a custom toolbar intended for use as a BioTile footer.
 */
Ext.define('Admin.view.widgets.SocialBar', {
    extend: 'Ext.Toolbar',
    xtype: 'socialbar',
    border: false,

    /**
     * @event facebook
     */
    /**
     * @event twitter
     */
    /**
     * @event googleplus
     */
    /**
     * @event email
     */

    layout: {
        pack: 'center'
    },

    defaults: {
        border: false,
        margin: '2 3'
    },

    items: [{
        ui: 'facebook',
        iconCls: 'x-fa fa-facebook',

        handler: function () {
            var parent = this.getParent();
            parent.fireEvent('facebook', parent);
        }
    }, {
        ui: 'soft-cyan',
        iconCls: 'x-fa fa-twitter',

        handler: function () {
            var parent = this.getParent();
            parent.fireEvent('twitter', parent);
        }
    }, {
        ui: 'soft-red',
        iconCls: 'x-fa fa-google-plus',

        handler: function () {
            var parent = this.getParent();
            parent.fireEvent('googleplus', parent);
        }
    }, {
        ui: 'soft-purple',
        iconCls: 'x-fa fa-envelope',

        handler: function () {
            var parent = this.getParent();
            parent.fireEvent('email', parent);
        }
    }]
});
