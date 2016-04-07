Ext.define('Admin.view.dashboard.Widgets', {
    extend: 'Ext.Panel',
    xtype: 'dashboardwidgetspanel',

    cls: 'dashboard-widget-block shadow',
    bodyPadding: 15,
    
    title: 'Widgets',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [
        {
            xtype: 'slider',
            width: 400,
            fieldLabel: 'Single Slider',
            value: 40
        },
        {
            xtype: 'tbspacer',
            flex: 0.3
        },
        {
            xtype: 'multislider',
            width: 400,
            fieldLabel: 'Range Slider',
            values: [
                10,
                40
            ]
        },
        {
            xtype: 'tbspacer',
            flex: 0.3
        },
        {
            xtype: 'pagingtoolbar',
            width: 360,
            displayInfo: false
        },
        {
            xtype: 'tbspacer',
            flex: 0.3
        },
        {
            xtype: 'progressbar',
            cls: 'widget-progressbar',
            value: 0.4
        },
        {
            xtype: 'tbspacer'
        }
    ]
});
