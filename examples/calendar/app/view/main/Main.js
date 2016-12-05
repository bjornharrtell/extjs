Ext.define('Calendar.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',

    controller: 'app-main',
    viewModel: 'app-main',

    layout: 'fit',

    items: [{
        xtype: 'app-calendar',
        reference: 'calendar',
        views: {
            day: {
                startTime: 0,
                endTime: 24
            },
            week: {
                startTime: 0,
                endTime: 24
            }
        },
        bind: {
            store: '{calendars}'
        },
        sideBarHeader: {
            xtype: 'app-profile-side'
        }
    }]
});
