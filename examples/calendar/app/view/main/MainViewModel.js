Ext.define('Calendar.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.app-main',

    data: {
        user: null,         // { name, icon }
        calendars: null
    }
});
