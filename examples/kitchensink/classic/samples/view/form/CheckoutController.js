Ext.define('KitchenSink.view.form.CheckoutController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.form-checkout',

    getForm: function () {
        return this.getView().getForm();
    },

    getOtherField: function (field) {
        var name = field.name;

        if (/^mailing/.test(name)) {
            name = name.replace('mailing', 'billing');
        } else {
            name = name.replace('billing', 'mailing');
        }

        return this.lookup(name);
    },

    isBillingSameAsMailing: function () {
        return this.lookup('billingSameAsMailing').getValue();
    },

    onResetClick: function () {
        this.getForm().reset();
    },

    onCompleteClick: function () {
        var form = this.getForm(),
            pretty, values;

        if (form.isValid()) {
            values = form.getValues(true);

            pretty = Ext.Array.map(values.split('&'), function (val) {
                val = decodeURIComponent(val);
                var i = val.indexOf('=');
                return '<b>' + val.substr(0, i) + ': </b>' +
                        Ext.htmlEncode(val.substr(i + 1));
            });

            pretty = pretty.join('<br>') +
                    '<br><br><b>Raw values:</b>' +
                    '<pre style="overflow:auto; margin-top:0;padding:8px;">' +
                        Ext.htmlEncode(values) +
                    '</pre>';

            Ext.MessageBox.alert('Submitted Values', pretty);
        }
    },

    onMailingAddrFieldChange: function (mailingField) {
        if (this.isBillingSameAsMailing()) {
            var billingField = this.getOtherField(mailingField);

            billingField.setValue(mailingField.getValue());
        }
    },

    /**
     * Enables or disables the billing address fields according to whether the checkbox is checked.
     * In addition to disabling the fields, they are animated to a low opacity so they don't take
     * up visual attention.
     */
    onSameAddressChange: function (checkbox, isBillingSameAsMailing) {
        var me = this,
            fieldset = checkbox.ownerCt,
            mailAddrForm = me.lookup('mailingAddressForm');

        Ext.each(mailAddrForm.query('textfield'), function (mailingField) {
            var billingField = me.getOtherField(mailingField);

            if (isBillingSameAsMailing) {
                billingField.setValue(mailingField.getValue());
            } else {
                billingField.clearInvalid();
            }
        });

        Ext.each(fieldset.query('textfield'), function(field) {
            field.setDisabled(isBillingSameAsMailing);
            field.el.animate({
                opacity: isBillingSameAsMailing ? 0.5 : 1
            });
        });
    }
});
