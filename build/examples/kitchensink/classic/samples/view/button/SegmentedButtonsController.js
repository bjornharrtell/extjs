Ext.define('KitchenSink.view.button.SegmentedButtonsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.segmented-buttons',

    toggleDisabled: function (checkbox, checked) {
        var view = this.getView(),
            stateFn = checked ? 'disable' : 'enable',
            buttons = view.query('segmentedbutton');

        Ext.each(buttons, function (btn) {
            btn[stateFn]();
        });
    }
});
