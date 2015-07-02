if (Ext.isIE8) {
    Ext.define('Ext.theme.triton.grid.column.Column', {
        override: 'Ext.grid.column.Column',
        
        onTitleMouseOver: function() {
            var triggerEl = this.triggerEl;
            
            this.callParent(arguments);
            
            if (triggerEl) {
                triggerEl.syncRepaint();
            }
        }
    });
}
