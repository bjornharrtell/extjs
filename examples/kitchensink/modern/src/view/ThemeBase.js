Ext.define('KitchenSink.view.ThemeBase', {
    extend: 'Ext.Component',
    constructor: function() {
        this.callParent();

        window.location = this.themeName ? (location.pathname + '?profile=' + this.themeName) : '';
    }
});