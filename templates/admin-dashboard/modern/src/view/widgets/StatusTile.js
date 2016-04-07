/**
 * This class is a custom toolbar intended for use as a BioTile footer.
 */
Ext.define('Admin.view.widgets.StatusTile', {
    extend: 'Ext.Component',
    xtype: 'statustile',

    config: {
        format: '0,000',

        color: null,

        description: null,

        iconCls: null,

        iconFirst: false,

        quantity: null,

        scale: null
    },

    element: {
        reference: 'element',
        cls: 'status-tile',

        children: [{
            cls: 'status-tile-wrap',

            children: [{
                reference: 'quantityElement',
                cls: 'status-tile-quantity'
            }, {
                reference: 'descriptionElement',
                cls: 'status-tile-description'
            }, {
                cls: 'status-tile-icon-wrap',
                reference: 'iconWrapElement',

                children: [{
                    reference: 'iconElement',
                    cls: 'status-tile-icon'
                }]
            }]
        }]
    },

    updateColor: function (value) {
        this.element.setStyle('borderTopColor', value);

        this.syncIconBackground();
    },

    updateDescription: function (value) {
        this.setText('descriptionElement', value);
    },

    updateIconCls: function (value, oldValue) {
        this.iconElement.replaceCls(oldValue, value);
    },

    updateIconFirst: function (value) {
        var iconEl = this.iconElement.dom.parentNode,
            quantityEl = this.quantityElement.dom;

        quantityEl.parentNode.insertBefore(iconEl, value ? quantityEl : null);

        this.element.toggleCls('status-tile-icon-first', value);

        this.syncIconBackground();
    },

    updateQuantity: function (value) {
        var format = this.getFormat(),
            str = Ext.util.Format.number(value, format);

        this.setText('quantityElement', str);
    },

    updateScale: function (value, oldValue) {
        var me = this,
            was = me.getScaleCls(oldValue),
            is = me.getScaleCls(value);

        me.element.replaceCls(was, is);
    },

    privates: {
        getScaleCls: function (scale) {
            return scale ? 'status-tile-' + scale : '';
        },

        setText: function (el, text) {
            this[el].dom.textContent = text;
        },

        syncIconBackground: function () {
            var background = '';

            if (this.getIconFirst()) {
                background = this.getColor();
            }

            this.iconWrapElement.setStyle('backgroundColor', background);
        }
    }
});
