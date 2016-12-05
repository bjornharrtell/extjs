Ext.define('Calendar.store.Google', {
    extend: 'Ext.calendar.store.Calendars',
    alias: 'store.calendar-google',

    requires: [
        'Ext.google.data.CalendarsProxy'
    ],

    autoSync: true,

    proxy: {
        type: 'google-calendars'
    }
});
