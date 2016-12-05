Ext.define('KitchenSink.view.calendar.Days', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendar-days-view',

    requires: [
        'KitchenSink.data.calendar.Days',
        'Ext.calendar.panel.Days',
        'Ext.calendar.List'
    ],

    width: 1000,
    height: 700,

    viewModel: {
        data: {
            value: new Date()
        },
        stores: {
            calStore: {
                type: 'calendar-calendars',
                autoLoad: true,
                eventStoreDefaults: {
                    prefetchMode: 'day'
                },
                proxy: {
                    type: 'ajax',
                    url: '/KitchenSink/CalendarDays'
                }
            }
        }
    },

    layout: 'border',
    bind: {
        title: '{value:date("M Y")}'
    },
    titleAlign: 'center',
    items: [{
        region: 'west',
        title: 'Calendars',
        ui: 'light',
        width: 150,
        bodyPadding: 5,
        collapsible: true,
        items: {
            xtype: 'calendar-list',
            bind: '{calStore}'
        }
    }, {
        region: 'center',
        xtype: 'calendar-days',
        startTime: 8,
        endTime: 20,
        visibleDays: 2,
        timezoneOffset: 0,
        gestureNavigation: false,
        bind: {
            value: '{value}',
            store: '{calStore}'
        }
    }]

})