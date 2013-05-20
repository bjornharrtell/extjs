Ext.define('KitchenSink.view.CodePreview', {
    extend: 'Ext.panel.Panel',
    xtype: 'codePreview',
    title: 'Code Preview',
    autoScroll: true,
    cls: 'preview-container',
    
    tools: [{
        type: 'maximize',
        tooltip: 'Maximize example code content'    
    }],

    initComponent: function() {
        this.ui = (Ext.themeName === 'neptune') ? 'light' : 'default';
        this.callParent();
    }
});