/**
 * @private
 * @class Ext.draw.SurfaceBase
 */
Ext.define('Ext.draw.SurfaceBase', {
    extend: 'Ext.Widget',

    getOwnerBody: function() {
        return this.ownerCt.body;
    },

    destroy: function () {
        var me = this;

        if (me.hasListeners.destroy) {
            me.fireEvent('destroy', me);
        }
        me.callParent();
    }

});
