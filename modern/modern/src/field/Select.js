/**
 * Simple Select field wrapper. Example usage:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 title: 'Select',
 *                 items: [
 *                     {
 *                         xtype: 'selectfield',
 *                         label: 'Choose one',
 *                         options: [
 *                             {text: 'First Option',  value: 'first'},
 *                             {text: 'Second Option', value: 'second'},
 *                             {text: 'Third Option',  value: 'third'}
 *                         ]
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 */
Ext.define('Ext.field.Select', {
    extend: 'Ext.field.Picker',
    xtype: 'selectfield',
    alternateClassName: 'Ext.form.Select',
    requires: [
        'Ext.Panel',
        'Ext.picker.Picker',
        'Ext.data.Store',
        'Ext.data.StoreManager',
        'Ext.dataview.List'
    ],

    /**
     * @event change
     * Fires when an option selection has changed
     * @param {Ext.field.Select} this
     * @param {Mixed} newValue The new value
     * @param {Mixed} oldValue The old value
     */

    /**
     * @event focus
     * Fires when this field receives input focus. This happens both when you tap on the field and when you focus on the field by using
     * 'next' or 'tab' on a keyboard.
     *
     * Please note that this event is not very reliable on Android. For example, if your Select field is second in your form panel,
     * you cannot use the Next button to get to this select field. This functionality works as expected on iOS.
     * @param {Ext.field.Select} this This field
     * @param {Ext.event.Event} e
     */

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        ui: 'select',

        /**
         * @cfg {Boolean} useClearIcon
         */

        /**
         * @cfg {String/Number} valueField The underlying {@link Ext.data.Field#name data value name} (or numeric Array index) to bind to this
         * Select control.
         * @accessor
         */
        valueField: 'value',

        /**
         * @cfg {String/Number} displayField The underlying {@link Ext.data.Field#name data value name} (or numeric Array index) to bind to this
         * Select control. This resolved value is the visibly rendered value of the available selection options.
         * @accessor
         */
        displayField: 'text',

        /**
         * @cfg {Ext.data.Store/Object/String} store The store to provide selection options data.
         * Either a Store instance, configuration object or store ID.
         * @accessor
         */
        store: null,

        /**
         * @cfg {Array} options An array of select options.
         *
         *     [
         *         {text: 'First Option',  value: 'first'},
         *         {text: 'Second Option', value: 'second'},
         *         {text: 'Third Option',  value: 'third'}
         *     ]
         *
         * __Note:__ Option object member names should correspond with defined {@link #valueField valueField} and {@link #displayField displayField} values.
         * This config will be ignored if a {@link #store store} instance is provided.
         * @accessor
         */
        options: null,

        /**
         * @cfg {String} hiddenName Specify a `hiddenName` if you're using the {@link Ext.form.Panel#standardSubmit standardSubmit} option.
         * This name will be used to post the underlying value of the select to the server.
         * @accessor
         */
        hiddenName: null,

        /**
         * @cfg {Boolean} autoSelect
         * `true` to auto select the first value in the {@link #store} or {@link #options} when they are changed. Only happens when
         * the {@link #value} is set to `null`.
         */
        autoSelect: true,

        /**
         * @cfg
         * @inheritdoc
         */
        name: 'picker',

        /**
         * @cfg {Ext.data.Model} selection
         * The selected model. `null` if no value exists.
         */
        selection: null
    },

    twoWayBindable: {
        selection: 1
    },

    publishes: {
        selection: 1
    },

    /**
     * @private
     */
    applyValue: function(value) {
        var me = this,
            record = value,
            index, store;

        //we call this so that the options configruation gets intiailized, so that a store exists, and we can
        //find the correct value
        me.getOptions();

        store = me.getStore();

        if ((value || value === 0) && !value.isModel && store) {
            index = store.find(me.getValueField(), value, null, null, null, true);

            if (index === -1) {
                index = store.find(me.getDisplayField(), value, null, null, null, true);
            }

            record = store.getAt(index);
        }

        return record;
    },

    updateValue: function(value, oldValue) {
        var me = this,
            component = me.getComponent(),
            displayValue = '';

        if (value === null || (value && value.isModel)) {
            me.settingSelection = true;
            me.setSelection(value);
            me.settingSelection = false;
            if (value) {
                displayValue = value.get(me.getDisplayField());
            }
        }

        if (component) {
            component.setValue(displayValue);
        }

        if (me.initialized) {
            me.fireEvent('change', me, value, oldValue);
        }
    },

    getValue: function() {
        var selection = this.getSelection();
        return selection ? selection.get(this.getValueField()) : null;
    },

    applySelection: function(selection) {
        return selection || null;
    },

    updateSelection: function(selection) {
        if (!this.settingSelection) {
            this.setValue(selection ? selection.get(this.getValueField()) : null);
        }
    },

    /**
     * @private
     */
    getPhonePicker: function() {
        var me = this,
            phonePicker = me.phonePicker,
            config;

        if (!phonePicker) {
            config = me.getDefaultPhonePickerConfig();
            me.phonePicker = phonePicker = Ext.create('Ext.picker.Picker', Ext.apply({
                slots: [{
                    align: me.getPickerSlotAlign(),
                    name: me.getName(),
                    valueField: me.getValueField(),
                    displayField: me.getDisplayField(),
                    value: me.getValue(),
                    store: me.getStore()
                }],
                listeners: {
                    change: me.onPickerChange,
                    scope: me
                }
            }, config));
        }

        return phonePicker;
    },

    /**
     * @private
     */
    getTabletPicker: function() {
        var me = this,
            tabletPicker = me.tabletPicker,
            config;

        if (!tabletPicker) {
            config = me.getDefaultTabletPickerConfig();
            me.tabletPicker = tabletPicker = Ext.create('Ext.Panel', Ext.apply({
                left: 0,
                top: 0,
                modal: true,
                cls: Ext.baseCSSPrefix + 'select-overlay',
                layout: 'fit',
                hideOnMaskTap: true,
                width: Ext.os.is.Phone ? '14em' : '18em',
                height: (Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) ? '12em' : (Ext.os.is.Phone ? '12.5em' : '22em'),
                items: {
                    xtype: 'list',
                    store: me.getStore(),
                    itemTpl: '<span class="x-list-label">{' + me.getDisplayField() + ':htmlEncode}</span>',
                    listeners: {
                        select: me.onListSelect,
                        itemtap: me.onListTap,
                        scope: me
                    }
                }
            }, config));
        }

        return tabletPicker;
    },

    /**
     * Shows the picker for the select field, whether that is a {@link Ext.picker.Picker} or a simple
     * {@link Ext.List list}.
     */
    showPicker: function() {
        var me = this,
            store = me.getStore(),
            value = me.getValue(),
            picker, name, pickerValue, list, index, record;

        //check if the store is empty, if it is, return
        if (!store || store.getCount() === 0) {
            return;
        }

        if (me.getReadOnly()) {
            return;
        }

        me.isFocused = true;

        if (me.getUsePicker()) {
            picker = me.getPhonePicker();
            name = me.getName();
            pickerValue = {};

            pickerValue[name] = value;
            picker.setValue(pickerValue);

            if (!picker.getParent()) {
                Ext.Viewport.add(picker);
            }

            picker.show();
        } else {
            picker = me.getTabletPicker();
            list = picker.down('list');

            if (!picker.getParent()) {
                Ext.Viewport.add(picker);
            }

            picker.showBy(me.getComponent(), null);

            if (value || me.getAutoSelect()) {
                store = list.getStore();
                index = store.find(me.getValueField(), value, null, null, null, true);
                record = store.getAt(index);

                if (record) {
                    list.select(record, null, true);
                }
            }
        }
    },

    /**
     * @private
     */
    onListSelect: function(item, record) {
        var me = this;
        if (record) {
            me.setValue(record);
        }
    },

    onListTap: function() {
        this.tabletPicker.hide({
            type: 'fade',
            out: true,
            scope: this
        });
    },

    /**
     * @private
     */
    onPickerChange: function(picker, value) {
        var me = this,
            newValue = value[me.getName()],
            store = me.getStore(),
            index = store.find(me.getValueField(), newValue, null, null, null, true),
            record = store.getAt(index);

        me.setValue(record);
    },

    /**
     * Updates the underlying `<options>` list with new values.
     *
     * @param {Array} newOptions An array of options configurations to insert or append.
     *
     *     selectBox.setOptions([
     *         {text: 'First Option',  value: 'first'},
     *         {text: 'Second Option', value: 'second'},
     *         {text: 'Third Option',  value: 'third'}
     *     ]).setValue('third');
     *
     * __Note:__ option object member names should correspond with defined {@link #valueField valueField} and
     * {@link #displayField displayField} values.
     *
     * @return {Ext.field.Select} this
     */
    updateOptions: function(newOptions) {
        var store = this.getStore();

        if (!store) {
            this.setStore(true);
            store = this._store;
        }

        if (!newOptions) {
            store.clearData();
        } else {
            store.setData(newOptions);
            this.onStoreDataChanged(store);
        }
        return this;
    },

    applyStore: function(store) {
        if (store === true) {
            store = Ext.create('Ext.data.Store', {
                fields: [this.getValueField(), this.getDisplayField()],
                autoDestroy: true
            });
        }

        if (store) {
            store = Ext.data.StoreManager.lookup(store);
        }

        return store;
    },

    updateStore: function(store, oldStore) {
        var me = this,
            tabletPicker = me.tabletPicker,
            phonePicker = me.phonePicker;

        if (oldStore && oldStore.getAutoDestroy()) {
            oldStore.destroy();
        }

        if (store) {
            store.on({
                scope: this,
                add: 'onStoreDataChanged',
                remove: 'onStoreDataChanged',
                update: 'onStoreDataChanged',
                refresh: 'onStoreDataChanged'
            });
            me.onStoreDataChanged(store);
        }

        if (me.getUsePicker() && phonePicker) {
            phonePicker.down('pickerslot').setStore(store);
        } else if (tabletPicker) {
            tabletPicker.down('dataview').setStore(store);
        }
    },

    /**
     * Called when the internal {@link #store}'s data has changed.
     */
    onStoreDataChanged: function(store) {
        var initialConfig = this.getInitialConfig(),
            value = this.getValue();

        if (value || value === 0) {
            this.setValue(value);
        }

        if (this.getValue() === null) {
            if (initialConfig.hasOwnProperty('value')) {
                this.setValue(initialConfig.value);
            }

            if (this.getValue() === null && this.getAutoSelect()) {
                if (store.getCount() > 0) {
                    this.setValue(store.getAt(0));
                }
            }
        }
    },

    /**
     * Resets the Select field to the value of the first record in the store.
     * @return {Ext.field.Select} this
     * @chainable
     */
    reset: function() {
        var me = this,
            record, store, usePicker, picker;

        if (me.getAutoSelect()) {
            store = me.getStore();

            record = me.originalValue ? me.originalValue : store.getAt(0);
        } else {
            usePicker = me.getUsePicker();
            picker = usePicker ? me.phonePicker : me.tabletPicker;

            if (picker) {
                picker = picker.child(usePicker ? 'pickerslot' : 'dataview');
                picker.deselectAll();
            }
            record = null;
        }

        me.setValue(record);

        return me;
    },

    destroy: function() {
        var store = this.getStore();

        if (store && store.getAutoDestroy()) {
            store.destroy();
        }
        this.callParent();
    }
});
