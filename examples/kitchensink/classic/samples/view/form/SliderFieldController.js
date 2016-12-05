Ext.define('KitchenSink.view.form.SliderFieldController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.slider-field',

    getForm: function () {
        return this.getView().getForm();
    },

    onMaxAllClick: function(){
        var view = this.getView();

        Ext.suspendLayouts();

        view.items.each(function (c) {
            c.setValue(100);
        });

        Ext.resumeLayouts(true);
    },

    onSaveClick: function () {
        var values = this.getForm().getValues(),
            msgTpl = this.getView().lookupTpl('msgTpl'),
            msg = msgTpl.apply(values);

        Ext.Msg.alert({
            title: 'Settings Saved',
            msg: msg,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    },

    onResetClick: function () {
        this.getForm().reset();
    },

    tipText: function (thumb) {
        return String(thumb.value) + '%';
    } 
});
