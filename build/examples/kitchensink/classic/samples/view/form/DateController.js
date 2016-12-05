Ext.define('KitchenSink.view.form.DateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-date',

    onDatePicked: function(picker, date) {
        KitchenSink.toast('You picked ' + Ext.Date.format(date, 'd-M-Y'));
    }
});
