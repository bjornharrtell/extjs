/**
 * @private
 *
 * CSS Transform implementation
 */
Ext.define('Ext.util.translatable.CssTransform', {
    extend: 'Ext.util.translatable.Dom',

    doTranslate: function(x, y) {
        var element = this.getElement();
        if (!this.destroyed && !element.destroyed) {
            element.translate(x, y);
        }
    },

    destroy: function() {
        var element = this.getElement();

        if (element && !element.destroyed) {
            element.dom.style.webkitTransform = null;
        }

        this.callParent();
    }
});
