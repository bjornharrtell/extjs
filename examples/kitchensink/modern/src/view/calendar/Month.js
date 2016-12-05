Ext.define('KitchenSink.view.calendar.Month', {
    extend: 'Ext.Panel',
    xtype: 'calendar-month-view',

    requires: [
        'KitchenSink.data.calendar.Month',
        'Ext.calendar.panel.Month',
        'Ext.calendar.List'
    ],

    // <example>
    otherContent: [{
        type: 'Store',
        path: 'samples/data/calendar/Month.js'
    }],
    // </example>

    viewModel: {
        data: {
            value: Ext.Date.getFirstDateOfMonth(new Date())
        },
        stores: {
            calStore: {
                type: 'calendar-calendars',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: '/KitchenSink/CalendarMonth'
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
        xtype: 'calendar-month',
        flex: 1,
        visibleWeeks: null,
        timezoneOffset: 0,
        gestureNavigation: false,
        bind: {
            value: '{value}',
            store: '{calStore}'
        }
    }]

});
