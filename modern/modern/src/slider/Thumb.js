/**
 * @private
 * Utility class used by Ext.slider.Slider - should never need to be used directly.
 */
Ext.define('Ext.slider.Thumb', {
    extend: 'Ext.Component',
    xtype : 'thumb',

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        baseCls: Ext.baseCSSPrefix + 'thumb',

        /**
         * @cfg {String} pressedCls
         * The CSS class to add to the Slider when it is pressed.
         * @accessor
         */
        pressedCls: Ext.baseCSSPrefix + 'thumb-pressing',

        /**
         * @cfg
         * @inheritdoc
         */
        draggable: {
            direction: 'horizontal'
        }
    },

    // Strange issue where the thumbs translation value is not being set when it is not visible. Happens when the thumb 
    // is contained within a modal panel.
    platformConfig: {
        ie10: {
            draggable: {
                translatable: {
                    translationMethod: 'csstransform'
                }
            }
        }
    },

    elementWidth: 0,

    initialize: function() {
        var me = this;
        
        me.callParent();

        me.getDraggable().onBefore({
            beforedragstart: 'onBeforeDragStart',
            dragstart: 'onDragStart',
            drag: 'onDrag',
            dragend: 'onDragEnd',
            scope: this
        });

        me.getDraggable().on({
            touchstart: 'onPress',
            touchend: 'onRelease',
            scope: me
        });

        me.element.on('resize', 'onElementResize', me);
    },


    /**
     * @private
     */
    updatePressedCls: function(pressedCls, oldPressedCls) {
        var element = this.element;

        if (element.hasCls(oldPressedCls)) {
            element.replaceCls(oldPressedCls, pressedCls);
        }
    },

    /**
     * @private
     */
    onPress: function() {
        var me = this,
            element = me.element,
            pressedCls = me.getPressedCls();

        if (!me.getDisabled()) {
            element.addCls(pressedCls);
        }
    },

    /**
     * @private
     */
    onRelease: function(e) {
        this.fireAction('release', [this, e], 'doRelease');
    },

    /**
     * @private
     */
    doRelease: function(me, e) {
        if (!me.getDisabled()) {
            me.element.removeCls(me.getPressedCls());
        }
    },

    onBeforeDragStart: function(draggable, e, x, y) {
        if (this.isDisabled()) {
            return false;
        }

        return this.fireEvent('beforedragstart', this, e, x, y);
    },

    onDragStart: function(draggable, e, x, y) {
        this.fireEvent('dragstart', this, e, x, y);
    },

    onDrag: function(draggable, e, x, y) {
        if (this.isDisabled()) {
            return false;
        }

        this.fireEvent('drag', this, e, x, y);
    },

    onDragEnd: function(draggable, e, x, y) {
        if (this.isDisabled()) {
            return false;
        }

        this.fireEvent('dragend', this, e, x, y);
    },

    onElementResize: function(element, info) {
        this.elementWidth = info.width;
    },

    getElementWidth: function() {
        return this.elementWidth;
    }
});
