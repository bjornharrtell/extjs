Ext.define('ChartsKitchenSink.view.DescriptionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'descriptionPanel',
    id: 'description-panel',
    autoHeight: true,
    scrollable: true,
    rtl: false,
    bodyStyle: 'padding: 12px',

    initComponent: function() {
        this.ui = (Ext.themeName === 'neptune') ? 'light' : 'default';
        this.callParent();
    }
});