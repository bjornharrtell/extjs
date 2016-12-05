Ext.define('KitchenSink.view.phone.Main', {
    extend: 'Ext.dataview.NestedList',
    requires: ['Ext.TitleBar'],

    id: 'cardPanel',

    fullscreen: true,
    title: 'Kitchen Sink',
    scrollable: true,
    classCls: 'main-nav',
    layout: {
        type: 'card',
        animation: {
            duration: 250,
            easing: 'ease-in-out'
        }
    },

    store: 'Navigation',
    toolbar: {
        id: 'mainNavigationBar',
        xtype: 'titlebar',
        docked: 'top',
        title: 'Kitchen Sink',

        items: [
            {
                align: 'right',
                action: 'material-theme-settings',
                iconCls: 'palette',
                hidden: true // !Ext.theme.is.Material
            },
            {
                xtype: 'button',
                align: 'right',
                action: 'burger',
                iconCls: 'menu'
            }
        ]
    }
});
