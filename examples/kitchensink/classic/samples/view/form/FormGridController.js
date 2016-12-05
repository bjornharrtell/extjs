Ext.define('KitchenSink.view.form.FormGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.form-grid',
    
    onSelectionChange: function (selModel, records) {
        var rec = records[0];
        if (rec) {
            this.getView().getForm().loadRecord(rec);
        }
    },

    renderChange: function (value) {
        return this.renderSign(value, '0.00');
    },

    renderPercent: function (value) {
        return this.renderSign(value, '0.00%');
    },

    renderSign: function (value, format) {
        var text = Ext.util.Format.number(value, format),
            tpl = this.signTpl,
            data = this.data;

        if (Math.abs(value) > 0.1) {
            if (!tpl) {
                this.signTpl = tpl = this.getView().lookupTpl('signTpl');
                this.data = data = {};
            }

            data.value = value;
            data.text = text;

            text = tpl.apply(data);
        }

        return text;
    }
});
