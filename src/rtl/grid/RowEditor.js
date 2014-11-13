Ext.define('Ext.rtl.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',

    getFieldScrollerScrollX: function() {
        return this.fieldScroller[this.getInherited().rtl ? 'rtlGetScrollLeft' : 'getScrollLeft']();
    },

    syncFieldsHorizontalScroll: function() {
        this.fieldScroller[this.getInherited().rtl ? 'rtlSetScrollLeft' : 'setScrollLeft'](this.lastScrollLeft);
    }
});
