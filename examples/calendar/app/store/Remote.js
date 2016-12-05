Ext.define('Calendar.store.Remote', {
    extend: 'Ext.calendar.store.Calendars',
    alias: 'store.calendar-remote',

    proxy: {
        type: 'ajax',
        url: '/Calendars'
    }
});
