/**
 * @class Ext.scroll.DomScroller
 * @private
 */
Ext.define('Ext.scroll.DomScroller', {
    extend: 'Ext.scroll.Scroller',
    alias: 'scroller.dom',

    isDomScroller: true,

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
        var me = this;
        if (me.positionDirty) {
            me.updateDomScrollPosition();
        }
        return me.position;
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

    updateElement: function(element, oldElement) {
        this.initXStyle();
        this.initYStyle();
    },

    updateX: function(x) {
        this.initXStyle();
    },

    updateY: function(y) {
        this.initYStyle();
    },

    privates: {
        doScrollTo: function(x, y, animate) {
            // There is an IE8 override of this method; when making changes here
            // don't forget to update the override as well
            var me = this,
                element = me.getElement(),
                maxPosition, dom, to, xInf, yInf,
                i;

            if (element && !element.destroyed) {
                dom = element.dom;

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
                        // IE8 does not update immediately without this hack.
                        //<feature legacyBrowser>
                        if (Ext.isIE8) {
                            i = dom.scrollLeft;
                            dom.scrollLeft = x;
                        }
                        //</feature legacyBrowser>
                    }
                }

                // Our position object will need refreshing before returning.
                me.positionDirty = true;
            }
        },

        // rtl hook
        getElementScroll: function(element) {
            return element.getScroll();
        },

        stopAnimation: function() {
            var anim = this.getElement().getActiveAnimation();
            if (anim) {
                anim.end();
            }
        }
    }
}, function(DomScroller) {
    // Ensure the global Ext scroll event fires when the document scrolls.
    // This is for when a non-viewport based app is used.
    // DOM scroll events are used for document scrolls.
    // The Viewport plugin destroys this Scroller at startup.
    Ext.onDocumentReady(function() {
        DomScroller.document = new DomScroller({
            x: true,
            y: true,
            element: document.body
        });
    });
});
