Ext.define('Ext.theme.triton.list.TreeItem', {
    override: 'Ext.list.TreeItem',
    
    compatibility: Ext.isIE8,
    
    updateFloated: function(floated, wasFloated) {
        this.callParent([floated, wasFloated]);
        this.toolElement.syncRepaint();
    }
});
