Ext.define('Ext.rtl.form.field.File', {
    override: 'Ext.form.field.File',
    
    //<locale>
    buttonText: 'עיון ...',
    //</locale>

    getButtonMarginProp: function() {
        return this.getInherited().rtl ? 'margin-right:' : 'margin-left:';
    }
});
