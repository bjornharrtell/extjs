Ext.define('KitchenSink.view.button.FieldToGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dd-field-to-grid',

    onCellDrop: function (fieldName) {
        var store = this.lookup('companyGrid').store,
            sorter = store.sorters.first();

        if (sorter && sorter.property == fieldName) {
            store.sort();
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
