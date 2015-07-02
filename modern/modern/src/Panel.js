/**
 * Panels are most useful as Overlays - containers that float over your application. They contain extra styling such
 * that when you {@link #showBy} another component, the container will appear in a rounded black box with a 'tip'
 * pointing to a reference component.
 *
 * If you don't need this extra functionality, you should use {@link Ext.Container} instead. See the
 * [Overlays example](#!/example/overlays) for more use cases.
 *
 *      @example miniphone preview
 *
 *      var button = Ext.create('Ext.Button', {
 *           text: 'Button',
 *           id: 'rightButton'
 *      });
 *
 *      Ext.create('Ext.Container', {
 *          fullscreen: true,
 *          items: [
 *              {
 *                   docked: 'top',
 *                   xtype: 'titlebar',
 *                   items: [
 *                       button
 *                   ]
 *               }
 *          ]
 *      });
 *
 *      Ext.create('Ext.Panel', {
 *          html: 'Floating Panel',
 *          left: 0,
 *          padding: 10
 *      }).showBy(button);
 *
 */
Ext.define('Ext.Panel', {
    extend: 'Ext.Container',
    requires: ['Ext.util.LineSegment'],

    alternateClassName: 'Ext.lib.Panel',

    xtype: 'panel',

    isPanel: true,

    config: {
        baseCls: Ext.baseCSSPrefix + 'panel',

        border: false,

        /**
         * @cfg {Number/Boolean/String} bodyPadding
         * A shortcut for setting a padding style on the body element. The value can either be
         * a number to be applied to all sides, or a normal CSS string describing padding.
         */
        bodyPadding: null,

        /**
         * @cfg {Boolean} bodyBorder
         * - `true` to enable the border around the panel body (as defined by the theme)
         * Note that even when enabled, the bodyBorder is only visible when there are docked
         * items around the edges of the panel.  Where the bodyBorder touches the panel's outer
         * border it is automatically collapsed into a single border.
         *
         * - `false` to disable the body border
         *
         * - `null` - use the value of {@link #border} as the value for bodyBorder
         */
        bodyBorder: null
    },

    manageBorders: true,

    getElementConfig: function() {
        return {
            reference: 'element',
            classList: ['x-container', 'x-unsized'],
            children: [
                {
                    reference: 'innerElement',
                    className: 'x-inner'
                },
                {
                    reference: 'tipElement',
                    className: 'x-anchor',
                    hidden: true
                }
            ]
        };
    },

    /**
     * Adds a CSS class to the body element. If not rendered, the class will
     * be added when the panel is rendered.
     * @param {String} cls The class to add
     * @return {Ext.panel.Panel} this
     */
    addBodyCls: function(cls) {
        this.innerElement.addCls(cls);
        return this;
    },

    /**
     * Removes a CSS class from the body element.
     * @param {String} cls The class to remove
     * @return {Ext.panel.Panel} this
     */
    removeBodyCls: function(cls) {
        this.innerElement.removeCls(cls);
        return this;
    },

    applyBodyPadding: function(bodyPadding) {
        if (bodyPadding === true) {
            bodyPadding = 5;
        }

        if (bodyPadding) {
            bodyPadding = Ext.dom.Element.unitizeBox(bodyPadding);
        }

        return bodyPadding;
    },

    updateBorder: function(border, oldBorder) {
        this.callParent([border, oldBorder]);
        if (this.getBodyBorder() === null) {
            this.setBodyBorderEnabled(border !== false);
        }
    },

    updateBodyPadding: function(newBodyPadding) {
        this.innerElement.setStyle('padding', newBodyPadding);
    },

    updateBodyBorder: function(bodyBorder) {
        var border = (bodyBorder === null) ? this.getBorder() : bodyBorder;

        this.setBodyBorderEnabled(bodyBorder !== false);
    },

    updateUi: function(ui, oldUi) {
        var suffix = 'x-panel-inner-',
            innerElement = this.innerElement;

        if (oldUi) {
            innerElement.removeCls(suffix + oldUi);
        }

        if (ui) {
            innerElement.addCls(suffix + ui);
        }

        this.callParent([ui, oldUi]);
    },

    alignTo: function(component, alignment) {
        var alignmentInfo = this.getAlignmentInfo(component, alignment);
        if(alignmentInfo.isAligned) return;
        var tipElement = this.tipElement;

        tipElement.hide();

        if (this.currentTipPosition) {
            tipElement.removeCls('x-anchor-' + this.currentTipPosition);
        }

        this.callParent(arguments);

        var LineSegment = Ext.util.LineSegment,
            alignToElement = component.isComponent ? component.renderElement : component,
            element = this.renderElement,
            alignToBox = alignToElement.getBox(),
            box = element.getBox(),
            left = box.left,
            top = box.top,
            right = box.right,
            bottom = box.bottom,
            centerX = left + (box.width / 2),
            centerY = top + (box.height / 2),
            leftTopPoint = { x: left, y: top },
            rightTopPoint = { x: right, y: top },
            leftBottomPoint = { x: left, y: bottom },
            rightBottomPoint = { x: right, y: bottom },
            boxCenterPoint = { x: centerX, y: centerY },
            alignToCenterX = alignToBox.left + (alignToBox.width / 2),
            alignToCenterY = alignToBox.top + (alignToBox.height / 2),
            alignToBoxCenterPoint = { x: alignToCenterX, y: alignToCenterY },
            centerLineSegment = new LineSegment(boxCenterPoint, alignToBoxCenterPoint),
            offsetLeft = 0,
            offsetTop = 0,
            tipSize, tipWidth, tipHeight, tipPosition, tipX, tipY;

        tipElement.setVisibility(false);
        tipElement.show();
        tipSize = tipElement.getSize();
        tipWidth = tipSize.width;
        tipHeight = tipSize.height;

        if (centerLineSegment.intersects(new LineSegment(leftTopPoint, rightTopPoint))) {
            tipX = Math.min(Math.max(alignToCenterX, left + tipWidth), right - (tipWidth));
            tipY = top;
            offsetTop = tipHeight + 10;
            tipPosition = 'top';
        }
        else if (centerLineSegment.intersects(new LineSegment(leftTopPoint, leftBottomPoint))) {
            tipX = left;
            tipY = Math.min(Math.max(alignToCenterY + (tipWidth / 2), tipWidth * 1.6), bottom - (tipWidth / 2.2));
            offsetLeft = tipHeight + 10;
            tipPosition = 'left';
        }
        else if (centerLineSegment.intersects(new LineSegment(leftBottomPoint, rightBottomPoint))) {
            tipX = Math.min(Math.max(alignToCenterX, left + tipWidth), right - tipWidth);
            tipY = bottom;
            offsetTop = -tipHeight - 10;
            tipPosition = 'bottom';
        }
        else if (centerLineSegment.intersects(new LineSegment(rightTopPoint, rightBottomPoint))) {
            tipX = right;
            tipY = Math.max(Math.min(alignToCenterY - tipHeight, bottom - tipWidth * 1.3), tipWidth / 2);
            offsetLeft = -tipHeight - 10;
            tipPosition = 'right';
        }

        if (tipX || tipY) {
            this.currentTipPosition = tipPosition;
            tipElement.addCls('x-anchor-' + tipPosition);
            tipElement.setLeft(tipX - left);
            tipElement.setTop(tipY - top);
            tipElement.setVisibility(true);

            this.setLeft(this.getLeft() + offsetLeft);
            this.setTop(this.getTop() + offsetTop);
        }
    },

    privates: {
        setBodyBorderEnabled: function(enabled) {
            this.innerElement.setStyle('border-width', enabled ? '' : '0');
        }
    }
});
