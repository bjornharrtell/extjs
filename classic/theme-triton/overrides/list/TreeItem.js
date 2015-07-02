if (Ext.isIE8) {
    Ext.define('Ext.theme.triton.list.TreeItem', {
        override: 'Ext.list.TreeItem',
        
        updateFloated: function(floated, wasFloated) {
            this.callParent([floated, wasFloated]);
            this.toolElement.syncRepaint();
        }
    });
}
