/**
 * This is used to display the source code for any given example. Each example has a 'Source' button
 * on its top toolbar that activates this
 */
Ext.define('KitchenSink.view.SourceOverlay', {
    extend: 'Ext.TabPanel',
    xtype: 'sourceoverlay',
    id: 'sourceoverlay',
    config: {
        modal: true,
        hideOnMaskTap: true,
        top: '10%',
        left: Ext.filterPlatform('ie10') ? 0 : '10%',
        right: Ext.filterPlatform('ie10') ? 0 : '10%',
        bottom: '10%',
        defaultType: 'sourceitem',
        zIndex: 100,
        items: [{
            xtype: 'titlebar',
            title: 'Source',
            docked: 'top',
            ui: 'neutral'
        }]
    }
});
