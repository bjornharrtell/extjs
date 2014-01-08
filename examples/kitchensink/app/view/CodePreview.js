Ext.define('KitchenSink.view.CodePreview', {
    extend: 'Ext.panel.Panel',
    xtype: 'codePreview',
    title: 'Code Preview',
    autoScroll: true,
    cls: 'preview-container',

    // The code must be read in LTR
    rtl: false,

    tools: [{
        type: 'maximize',
        tooltip: 'Maximize example code content'    
    }],

    initComponent: function() {
        this.ui = (Ext.themeName === 'neptune') ? 'light' : 'default';
        this.callParent();
    }
});