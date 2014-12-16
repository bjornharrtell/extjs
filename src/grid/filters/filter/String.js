/**
 * Filter by a configurable Ext.form.field.Text
 *
 * Example Usage:
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *         ...
 *         columns: [{
 *             text: 'Name',
 *             dataIndex: 'name',
 *
 *             filter: {
 *                 // required configs
 *                 type: 'string',
 *
 *                 // optional configs
 *                 value: 'foo',
 *                 active: true, // default is false
 *                 itemDefaults: {
 *                     // any Ext.form.field.Text configs accepted
 *                 }
 *             }
 *         }],
 *         ...
 *     });
 */
Ext.define('Ext.grid.filters.filter.String', {
    extend: 'Ext.grid.filters.filter.SingleFilter',
    alias: 'grid.filter.string',

    type: 'string',

    operator: 'like',

    /**
     * @cfg {String} emptyText
     * The empty text to show for each field.
     */
    emptyText: 'Enter Filter Text...',

    itemDefaults: {
        xtype: 'textfield',
        enableKeyEvents: true,
        hideEmptyLabel: false,
        iconCls: Ext.baseCSSPrefix + 'grid-filters-find',
        labelSeparator: '',
        labelWidth: 29,
        margin: 0,
        selectOnFocus: true
    },

    menuDefaults: {
        // A menu with only form fields needs some body padding. Normally this padding
        // is managed by the items, but we have no normal menu items.
        bodyPadding: 3,
        showSeparator: false
    },

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    createMenu: function () {
        var me = this,
            config;

        me.callParent();

        config = Ext.apply({}, me.getItemDefaults());
        if (config.iconCls && !('labelClsExtra' in config)) {
            config.labelClsExtra = Ext.baseCSSPrefix + 'grid-filters-icon ' + config.iconCls;
        }
        delete config.iconCls;

        config.emptyText = config.emptyText || me.emptyText;
        me.inputItem = me.menu.add(config);

        me.inputItem.on({
            scope: me,
            keyup: me.onValueChange,
            el: {
                click: function(e) {
                    e.stopPropagation();
                }
            }
        });
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter.
     */
    setValue: function (value) {
        var me = this;

        if (me.inputItem) {
            me.inputItem.setValue(value);
        }

        me.filter.setValue(value);

        if (value && me.active) {
            me.value = value;
            me.updateStoreFilter();
        } else {
            me.setActive(!!value);
        }
    },

    activateMenu: function () {
        this.inputItem.setValue(this.filter.getValue());
    }
});
