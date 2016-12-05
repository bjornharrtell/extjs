Ext.define('KitchenSink.view.form.ColorPickerController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.form-color-picker',

    onChange: function(picker) {
        if (window.console && window.console.log) {
            console.log(picker.getId() + '.color: ' + picker.getValue());
        }
    },

    onShowMoreLess: function (button) {
        this.getViewModel().set('full', button.value);
    }
});
