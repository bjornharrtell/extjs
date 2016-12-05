Ext.define('KitchenSink.view.calendar.Timezone', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendar-timezone',

    requires: [
        'KitchenSink.data.calendar.Timezone',
        'Ext.calendar.panel.Days',
        'Ext.field.Select'
    ],

    // <example>
    otherContent: [{
        type: 'Store',
        path: 'samples/data/calendar/Timezone.js'
    }],
    // </example>

    referenceHolder: true,
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
                    url: '/KitchenSink/CalendarTimezone'
                }
            }
        }
    },

    layout: 'fit',
    shadow: true,

    bind: {
        title: '{value:date("M Y")}'
    },
    header: {
        layout: 'hbox',
        items: [{
            xtype: 'component',
            flex: 1
        }, {
            xtype: 'selectfield',
            reference: 'tzSelector',
            width: Ext.os.is.Phone ? 150 : 200,
            value: 0,
            options: [{
                text: Ext.os.is.Phone ? 'New York -5' : 'New York (UTC-05:00)',
                value: 300
            }, {
                text: Ext.os.is.Phone ? 'London +0' :'London (UTC+00:00)',
                value: 0
            }, {
                text: Ext.os.is.Phone ? 'Paris +1' :'Paris (UTC+01:00)',
                value: -60
            }, {
                text: Ext.os.is.Phone ? 'Sydney +10' : 'Sydney (UTC+10:00)',
                value: -600
            }]
        }]
    },
    items: [{
        xtype: 'calendar-days',
        startTime: 6,
        endTime: 22,
        visibleDays: 2,
        timezoneOffset: 0,
        gestureNavigation: false,
        showNowMarker: false,
        bind: {
            value: '{value}',
            store: '{calStore}',
            timezoneOffset: '{tzSelector.selection.value}'
        }
    }]

})
