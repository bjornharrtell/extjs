Ext.define('Ext.draw.SurfaceBase', {
    extend: 'Ext.Component',

    getOwnerBody: function() {
        return this.getRefOwner().bodyElement;
    }

});
