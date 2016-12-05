Ext.define('KitchenSink.view.calendar.Month', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendar-month-view',

    requires: [
        'KitchenSink.data.calendar.Month',
        'Ext.calendar.panel.Month',
        'Ext.calendar.List'
    ],

    width: 1000,
    height: 600,

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
        xtype: 'calendar-month',
        visibleWeeks: null,
        timezoneOffset: 0,
        gestureNavigation: false,
        bind: {
            value: '{value}',
            store: '{calStore}'
        }
    }]

})