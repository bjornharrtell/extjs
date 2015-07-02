/**
 * @class Ext.scroll.DomScroller
 * @private
 */
Ext.define('Ext.scroll.DomScroller', {
    extend: 'Ext.scroll.Scroller',
    alias: 'scroller.dom',

    isDomScroller: true,

    _spacerCls: Ext.baseCSSPrefix +  'domscroller-spacer',

    getMaxPosition: function() {
        var element = this.getElement(),
            x = 0,
            y = 0,
            dom;

        if (element && !element.destroyed) {
            dom = element.dom;
            x = dom.scrollWidth - dom.clientWidth;
            y = dom.scrollHeight - dom.clientHeight;
        }

        return {
            x: x,
            y: y
        };
    },

    getMaxUserPosition: function() {
        var me = this,
            element = me.getElement(),
            x = 0,
            y = 0,
            dom;

        if (element && !element.destroyed) {
            dom = element.dom;
            if (me.getX()) {
                x = dom.scrollWidth - dom.clientWidth;
            }
            if (me.getY()) {
                y = dom.scrollHeight - dom.clientHeight;
            }
        }

        return {
            x: x,
            y: y
        };
    },

    getPosition: function() {
        var element = this.getElement(),
            x = 0,
            y = 0,
            position;

        if (element && !element.destroyed) {
            position = this.getElementScroll(element);
            x = position.left;
            y = position.top;
        }

        return {
            x: x,
            y: y
        };
    },

    getSize: function() {
        var element = this.getElement(),
            size, dom;

        if (element && !element.destroyed) {
            dom = element.dom;
            size = {
                x: dom.scrollWidth,
                y: dom.scrollHeight
            };
        } else {
            size = {
                x: 0,
                y: 0
            };
        }

        return size;
    },

    setSize: function(size) {
        var me = this,
            element = me.getElement(),
            spacer, x, y;

        if (element) {
            spacer = me.getSpacer();

            // Typically a dom scroller simply assumes the scroll size dictated by its content.
            // In some cases, however, it is necessary to be able to manipulate this scroll size
            // (infinite lists for example).  This method positions a 1x1 px spacer element
            // within the scroller element to set a specific scroll size.

            if (size == null) {
                spacer.hide();
            } else {
                if (typeof size === 'number') {
                    x = size;
                    y = size;
                } else {
                    x = size.x || 0;
                    y = size.y || 0;
                }

                // Subtract spacer size from coordinates (spacer is always 1x1 px in size)
                if (x > 0) {
                    x -= 1;
                }
                if (y > 0) {
                    y -= 1;
                }

                me.setSpacerXY(spacer, x, y);
                spacer.show();
            }
        }
    },

    updateElement: function(element, oldElement) {
        this.initXStyle();
        this.initYStyle();
        this.callParent([element, oldElement]);
    },

    updateX: function(x) {
        this.initXStyle();
    },

    updateY: function(y) {
        this.initYStyle();
    },

    privates: {
        doScrollTo: function(x, y, animate) {
            var me = this,
                element = me.getElement(),
                maxPosition, dom, to, xInf, yInf;

            if (element && !element.destroyed) {
                dom = this.getElement().dom;

                xInf = (x === Infinity);
                yInf = (y === Infinity);

                if (xInf || yInf) {
                    maxPosition = me.getMaxPosition();
                    if (xInf) {
                        x = maxPosition.x;
                    }
                    if (yInf) {
                        y = maxPosition.y;
                    }
                }

                x = me.convertX(x);

                if (animate) {
                    to = {};

                    if (y != null) {
                        to.scrollTop = y;
                    }

                    if (x != null) {
                        to.scrollLeft = x;
                    }

                    element.animate(Ext.mergeIf({
                        to: {
                            scrollTop: y,
                            scrollLeft: x
                        }
                    }, animate));
                } else {
                    if (y != null) {
                        dom.scrollTop = y;
                    }
                    if (x != null) {
                        dom.scrollLeft = x;
                    }
                }
            }
        },

        // rtl hook
        getElementScroll: function(element) {
            return element.getScroll();
        },

        getSpacer: function() {
            var me = this,
                spacer = me._spacer,
                element;

            // In some cases (e.g. infinite lists) we need to be able to tell the scroller
            // to have a specific size, regardless of its contents.  This creates a spacer
            // element which can then be absolutely positioned to affect the element's
            // scroll size.
            if (!spacer) {
                element = me.getElement();
                spacer = me._spacer = element.createChild({
                    cls: me._spacerCls
                });

                spacer.setVisibilityMode(2); // 'display' visibilityMode

                // make sure the element is positioned if it is not already.  This ensures
                // that the spacer's position will affect the element's scroll size
                element.position();
            }

            return spacer;
        },

        // rtl hook
        setSpacerXY: function(spacer, x, y) {
            spacer.setLocalXY(x, y);
        },

        stopAnimation: function() {
            var anim = this.getElement().getActiveAnimation();
            if (anim) {
                anim.end();
            }
        }
    }
});
