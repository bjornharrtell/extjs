Ext.define('KitchenSink.view.DescriptionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'descriptionPanel',
    id: 'description-panel',
    title: 'Description',
    autoScroll: true,

    initComponent: function() {
        this.ui = (Ext.themeName === 'neptune') ? 'light' : 'default';
        this.callParent();
    }
});