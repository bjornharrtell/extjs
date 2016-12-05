Ext.define('KitchenSink.view.calendar.Days', {
    extend: 'Ext.Panel',
    xtype: 'calendar-days-view',

    requires: [
        'KitchenSink.data.calendar.Days',
        'Ext.calendar.panel.Days',
        'Ext.calendar.List'
    ],

    // <example>
    otherContent: [{
        type: 'Store',
        path: 'samples/data/calendar/MultiDay.js'
    }],
    // </example>

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

    shadow: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bind: {
        title: '{value:date("M Y")}'
    },
    header: {
        titleAlign: 'center'
    },
    items: [{
        xtype: 'panel',
        title: 'Calendars',
        ui: 'light',
        width: 150,
        bodyPadding: 5,
        hidden: Ext.os.is.Phone,
        items: {
            xtype: 'calendar-list',
            bind: '{calStore}'
        }
    }, {
        xtype: 'calendar-days',
        flex: 1,
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
