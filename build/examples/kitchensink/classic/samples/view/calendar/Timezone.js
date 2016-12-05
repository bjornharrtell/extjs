Ext.define('KitchenSink.view.calendar.Timezone', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendar-timezone',

    requires: [
        'KitchenSink.data.calendar.Timezone',
        'Ext.calendar.panel.Days',
        'Ext.form.field.ComboBox'
    ],

    width: 1000,
    height: 700,

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
    bind: {
        title: '{value:date("M Y")}'
    },
    titleAlign: 'center',
    tbar: [{
        xtype: 'combobox',
        reference: 'tzSelector',
        forceSelection: true,
        editable: false,
        width: 200,
        valueField: 'offset',
        displayField: 'label',
        value: 0,
        store: {
            fields: ['label', 'offset'],
            data: [{
                label: 'New York (UTC-05:00)',
                offset: 300
            }, {
                label: 'London (UTC+00:00)',
                offset: 0
            }, {
                label: 'Paris (UTC+01:00)',
                offset: -60
            }, {
                label: 'Sydney (UTC+10:00)',
                offset: -600
            }]
        }
    }],
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
            timezoneOffset: '{tzSelector.selection.offset}'
        }
    }]

})