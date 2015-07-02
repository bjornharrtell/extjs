if (Ext.isIE8) {
    Ext.define('Ext.theme.triton.form.field.Checkbox', {
        override: 'Ext.form.field.Checkbox',
        
        onFocus: function(e) {
            var focusClsEl;
            
            this.callParent([e]);
            
            focusClsEl = this.getFocusClsEl();
            
            if (focusClsEl) {
                focusClsEl.syncRepaint();
            }
        },
        
        onBlur: function(e) {
            var focusClsEl;
            
            this.callParent([e]);
            
            focusClsEl = this.getFocusClsEl();
            
            if (focusClsEl) {
                focusClsEl.syncRepaint();
            }
        }
    });
}
