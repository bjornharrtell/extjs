Ext.define('Ext.field.Picker', {
    extend: 'Ext.field.Text',

    config: {

        /**
         * @cfg {Object} component
         * @accessor
         * @hide
         */
        component: {
            useMask: true
        },

        /**
         * @cfg {Boolean} clearIcon
         * @hide
         * @accessor
         */
        clearIcon: false,

        /**
         * @cfg {String/Boolean} usePicker
         * `true` if you want this component to always use a {@link Ext.picker.Picker}.
         * `false` if you want it to use a popup overlay {@link Ext.List}.
         * `auto` if you want to show a {@link Ext.picker.Picker} only on phones.
         */
        usePicker: 'auto',

        /**
         * @cfg {Object} defaultPhonePickerConfig
         * The default configuration for the picker component when you are on a phone.
         */
        defaultPhonePickerConfig: null,

        /**
         * @cfg {Object} defaultTabletPickerConfig
         * The default configuration for the picker component when you are on a tablet.
         */
        defaultTabletPickerConfig: null,

        /**
         * @cfg {String} pickerSlotAlign
         * The alignment of text in the picker created by this Select
         * @private
         */
        pickerSlotAlign: 'center'
    },

    /**
     * @private
     */
    initialize: function() {
        var me = this,
            component = me.getComponent();

        me.callParent();

        component.on({
            scope: me,
            masktap: 'onMaskTap'
        });

        component.doMaskTap = Ext.emptyFn;
    },

    /**
     * @private
     */
    updateDefaultPhonePickerConfig: function(newConfig) {
        var phonePicker = this.phonePicker;
        if (phonePicker) {
            phonePicker.setConfig(newConfig);
        }
    },

    /**
     * @private
     */
    updateDefaultTabletPickerConfig: function(newConfig) {
        var tabletPicker = this.tabletPicker;
        if (tabletPicker) {
            tabletPicker.setConfig(newConfig);
        }
    },

    /**
     * @private
     * Checks if the value is `auto`. If it is, it only uses the picker if the current device type
     * is a phone.
     */
    applyUsePicker: function(usePicker) {
        if (usePicker === 'auto') {
            usePicker = Ext.os.deviceType === 'Phone';
        }

        return Boolean(usePicker);
    },

    syncEmptyCls: Ext.emptyFn,

    /**
     * @private
     */
    onMaskTap: function() {
        if (!this.getDisabled()) {
            this.onFocus();
        }

        return false;
    },

    /**
     * @private
     */
    updateDisabled: function(disabled) {
        var component = this.getComponent();
        if (component) {
            component.setDisabled(disabled);
        }
        Ext.Component.prototype.updateDisabled.apply(this, arguments);
    },

    /**
     * @private
     */
    setDisabled: function() {
        Ext.Component.prototype.setDisabled.apply(this, arguments);
    },

    onFocus: function(e) {
        if (this.getDisabled()) {
            return false;
        }

        var component = this.getComponent();
        this.fireEvent('focus', this, e);

        if (Ext.os.is.Android4) {
            component.input.dom.focus();
        }
        component.input.dom.blur();

        this.isFocused = true;

        this.showPicker();
    },

    destroy: function() {
        var me = this;

        me.callParent();

        me.tabletPicker = me.phonePicker = Ext.destroy(me.tabletPicker, me.phonePicker);
    }
});
