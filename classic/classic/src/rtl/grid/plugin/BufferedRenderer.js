Ext.define('Ext.rtl.grid.plugin.BufferedRenderer', {
    override: 'Ext.grid.plugin.BufferedRenderer',

    translateBody: function(body, bodyTop) {
        if (this.isRTL && Ext.supports.xOriginBug && this.view.scrollFlags.y) {
            body.translate(Ext.getScrollbarSize().width, this.bodyTop = bodyTop);
        } else {
            this.callParent([body, bodyTop]);
        }
    }
})