/**
 * Ext.scroll.Scroller allows any element to have scrollable content, both on desktop and
 * touch-screen devices, and defines a set of useful methods for manipulating the scroll
 * position and controlling the scrolling behavior.  Ext.scroll.Scroller should not be
 * directly instantiated.  Always use the static `{@link #create}` method to create a
 * Scroller instance:
 *
 *     Ext.scroll.Scroller.create({
 *         element: 'myElementId'
 *     });
 *
 * The `{@link #create}` method instantiates an appropriate Scroller subclass, depending on
 * platform.  For standard desktop devices, it returns a
 * `{@link Ext.scroll.DomScroller DomScroller}`, while on touch-enabled devices it returns
 * a `{@link Ext.scroll.TouchScroller TouchScroller}.
 */
Ext.define('Ext.scroll.Scroller', {
    extend: 'Ext.Evented',
    alias: 'scroller.scroller',

    mixins: [ 'Ext.mixin.Factoryable' ],

    uses: [
        'Ext.scroll.TouchScroller',
        'Ext.scroll.DomScroller'
    ],

    factoryConfig: {
        defaultType: 'dom'
    },

    isScroller: true,

    _spacerCls: Ext.baseCSSPrefix + 'domscroller-spacer',

    /**
     * @event refresh
     * Fires whenever the Scroller is refreshed.
     * @param {Ext.scroll.Scroller} this
     */

    /**
     * @event scrollstart
     * Fires whenever the scrolling is started.
     * @param {Ext.scroll.Scroller} this
     * @param {Number} x The current x position.
     * @param {Number} y The current y position.
     */

    /**
     * @event scrollend
     * Fires whenever the scrolling is ended.
     * @param {Ext.scroll.Scroller} this
     * @param {Number} x The current x position.
     * @param {Number} y The current y position.
     */

    /**
     * @event scroll
     * Fires whenever the Scroller is scrolled.
     * @param {Ext.scroll.Scroller} this
     * @param {Number} x The new x position.
     * @param {Number} y The new y position.
     */

    config: {
        /**
         * @cfg {'auto'/'vertical'/'horizontal'/'both'} [direction='auto']
         * @deprecated 5.1.0 use {@link #x} and {@link #y} instead
         */
        direction: undefined, // undefined because we need the updater to always run

        /**
         * @cfg {Boolean} directionLock
         * `true` to lock the direction of the scroller when the user starts scrolling.
         * Only applicable when interacting with the Scroller via touch-screen.
         * @accessor
         */
        directionLock: false,

        /**
         * @cfg {Boolean} disabled
         * `true` to disable this scroller.
         * Only applicable when using a {@link Ext.scroll.TouchScroller TouchScroller}
         */
        disabled: null,

        /**
         * @cfg {String/HTMLElement/Ext.dom.Element}
         * The element to make scrollable.
         */
        element: undefined,

        /**
         * @cfg {Boolean/Object} [indicators=true]
         * `false` to hide scroll indicators while scrolling, `true` to show scroll indicators,
         * or a config object for {@link Ext.scroll.Indicator} to configure the scroll indicators.
         *
         * May also be an object with 'x' and 'y' properties for configuring the vertical
         * and horizontal indicators separately. For example, to show only the vertical
         * indicator, but not the horizontal indicator:
         *
         *     {
         *         x: false,
         *         y: true
         *     }
         *
         * Only applicable when using a {@link Ext.scroll.TouchScroller TouchScroller}
         */
        indicators: null,

        /**
         * @cfg {Object}
         * The max scroll position
         * @private
         */
        maxPosition: {
            x: 0,
            y: 0
        },

        /**
         * @cfg {Object}
         * The max scroll position that can be achieved via user interaction.
         * @private
         */
        maxUserPosition: {
            x: 0,
            y: 0
        },

        /**
         * @cfg {Object}
         * The min scroll position.
         * @private
         */
        minPosition: {
            x: 0,
            y: 0
        },

        /**
         * @cfg {Object}
         * The min scroll position that can be achieved via user interaction.
         * @private
         */
        minUserPosition: {
            x: 0,
            y: 0
        },

        /**
         * @cfg {Object} momentumEasing
         * A {@link Ext.fx.easing.BoundMomentum} config object for configuring the momentum
         * of the Scroller.  Only applicable when interacting with the Scroller via
         * touch-screen.
         */
        momentumEasing: null,

        /**
         * @cfg {Object}
         * The size of the scrollable content expressed as an object with x and y properties
         * @private
         * @readonly
         */
        size: null,

        /**
         * @cfg {Number/Object} slotSnapSize
         * The size of each slot to snap to in 'px', can be either an object with `x` and `y` values, i.e:
         *
         *      {
         *          x: 50,
         *          y: 100
         *      }
         *
         * or a number value to be used for both directions. For example, a value of `50` will be treated as:
         *
         *      {
         *          x: 50,
         *          y: 50
         *      }
         *
         * *Note*: Only applicable when using {@link Ext.scroll.TouchScroller}.
         *
         * @accessor
         */
        slotSnapSize: {
            x: 0,
            y: 0
        },

        /**
         * @cfg {Boolean/String}
         * - `true` or `'auto'` to enable horizontal auto-scrolling. In auto-scrolling mode
         * scrolling is only enabled when the {@link #element} has overflowing content.
         * - `false` to disable horizontal scrolling
         * - `'scroll'` to always enable horizontal scrolling regardless of content size.
         */
        x: true,

        /**
         * @cfg {Boolean/String}
         * - `true` or `'auto'` to enable vertical auto-scrolling. In auto-scrolling mode
         * scrolling is only enabled when the {@link #element} has overflowing content.
         * - `false` to disable vertical scrolling
         * - `'scroll'` to always enable vertical scrolling regardless of content size.
         */
        y: true,

        spacerXY: null
    },

    statics: {
        /**
         * Creates and returns an appropriate Scroller instance for the current device.
         * @param {Object} config Configuration options for the Scroller
         * @return {Ext.scroll.Scroller}
         */
        create: function(config) {
            return Ext.Factory.scroller(config, Ext.supports.Touch ? 'touch' : 'dom');
        }
    },

    constructor: function(config) {
        var me = this;

        me.position = { x: 0, y: 0 };

        me.callParent([config]);

        me.onDomScrollEnd = Ext.Function.createBuffered(me.onDomScrollEnd, 100, me);
    },
    
    destroy: function() {
        var me = this;

        // Clear any overflow styles
        me.setX(Ext.emptyString);
        me.setY(Ext.emptyString);

        // Remove element listeners
        me.setElement(null);
        me.onDomScrollEnd = me._partners = me.component = null;
        
        me.callParent();
    },

    /**
     * Adds a "partner" scroller.  Partner scrollers reflect each other's scroll position
     * at all times - if either scroller is scrolled, the scroll position of its partner
     * will be be automatically synchronized.
     *
     * A scroller may have multiple partners.
     *
     * @param {Ext.scroll.Scroller} partner
     * @param {String} [axis='both'] The axis to synchronize (`'x'`, '`y`', or '`both`')
     */
    addPartner: function(partner, axis) {
        var me = this,
            partners = me._partners || (me._partners = {}),
            otherPartners = partner._partners || (partner._partners = {});

        partners[partner.getId()] = {
            scroller: partner,
            axis: axis
        };

        otherPartners[me.getId()] = {
            scroller: me,
            axis: axis
        };
    },

    applyElement: function(element, oldElement) {
        var me = this,
            el,
            eventSource;

        // When element is set to null in destroy, we must remove listeners.
        if (oldElement) {
            me.scrollListener.destroy();
        }

        if (element) {
            if (element.isElement) {
                el = element;
            } else {
                el = Ext.get(element);

                //<debug>
                if (!el && (typeof element === 'string')) {
                    Ext.raise("Cannot create Ext.scroll.Scroller instance. " +
                        "Element with id '" + element + "' not found.");
                }
                //</debug>
            }

            // For document body scrolling, the element which actually scrolls (which has its scrollTop/scrollLeft modified) varies between platforms.
            // Ensure we get it right so we are able to programatically scroll.
            if (el.dom === document.body) {
                el = Ext.get(document.scrollingElement || (Ext.isWebKit ? document.body : document.documentElement));

                // For document body scrolling the element which fires the event varies between platforms.
                // Ensure we get it right so that we know when scroll happens.
                eventSource = Ext.get(Ext.isIE9m ? window : document);
            } else {
                eventSource = el;
            }
            me.scrollListener = eventSource.on({
                scroll: me.onDomScroll,
                scope: me,
                destroyable: true
            });
            return el;
        }
    },

    /**
     * Gets the `clientWidth` and `clientHeight` of the {@link #element} for this scroller.
     * @return {Object} An object with `x` and `y` properties.
     */
    getClientSize: function() {
        var dom = this.getElement().dom;
        return {
            x: dom.clientWidth,
            y: dom.clientHeight
        };
    },

    /**
     * Returns the the amount of space this scroller's scrollbar on a given axis currently
     * occupies in the DOM.
     * @param {String} axis The axis of the scroller.
     * @return {Number} With axis `y`, the width of the vertical scrollbar. With axis `x`,
     * the height of the horizontal scrollbar. `0` if the scrollbar does not consume space.
     */

    /**
     * Returns the amount of space consumed by scrollbars in the DOM
     * @return {Object} size An object containing the scrollbar sizes.
     * @return {Number} size.width The width of the vertical scrollbar.
     * @return {Number} size.height The height of the horizontal scrollbar.
     */
    getScrollbarSize: function() {
        var me = this,
            width = 0,
            height = 0,
            element, dom, x, y, hasXScroll, hasYScroll, scrollbarSize;

        if (me.isDomScroller || Ext.supports.touchScroll === 1) {
            element = me.getElement();

            if (element && !element.destroyed) {
                x = me.getX();
                y = me.getY();
                dom = element.dom;

                if (x || y) {
                    scrollbarSize = Ext.getScrollbarSize();
                }

                if (x === 'scroll') {
                    hasXScroll = true;
                } else if (x) {
                    hasXScroll = dom.scrollWidth > dom.clientWidth;
                }

                if (y === 'scroll') {
                    hasYScroll = true;
                } else if (y) {
                    hasYScroll = dom.scrollHeight > dom.clientHeight;
                }

                if (hasXScroll) {
                    height = scrollbarSize.height;
                }

                if (hasYScroll) {
                    width = scrollbarSize.width;
                }
            }
        }

        return {
            width: width,
            height: height
        };
    },

    getPosition: function() {
        // DomScroller subclass updates on every scroll event - will override this.
        // TouchScroller subclass is in control and sets this when it scrolls.
        return this.position;
    },

    // Empty updaters - workaround for https://sencha.jira.com/browse/EXTJS-14574
    updateDirectionLock: Ext.emptyFn,
    updateDisabled: Ext.emptyFn,
    updateIndicators: Ext.emptyFn,
    updateMaxPosition: Ext.emptyFn,
    updateMaxUserPosition: Ext.emptyFn,
    updateMinPosition: Ext.emptyFn,
    updateMinUserPosition: Ext.emptyFn,
    updateMomenumEasing: Ext.emptyFn,
    updateX: Ext.emptyFn,
    updateY: Ext.emptyFn,
    onPartnerScrollStart: Ext.emptyFn,
    onPartnerScrollEnd: Ext.emptyFn,

    /**
     * @method getPosition
     * Returns the current scroll position
     * @return {Object} An object with `x` and `y` properties.
     */

    /**
     * @method getSize
     * Returns the size of the scrollable content
     * @return {Object} size
     * @return {Number} size.x The width of the scrollable content
     * @return {Number} size.y The height of the scrollable content
     */

    /**
     * @method getMaxPosition
     * Returns the maximum scroll position for this scroller
     * @return {Object} position
     * @return {Number} position.x The maximum scroll position on the x axis
     * @return {Number} position.y The maximum scroll position on the y axis
     */

    /**
     * @method getMaxUserPosition
     * Returns the maximum scroll position for this scroller for scrolling that is initiated
     * by the user via mouse or touch.  This differs from getMaxPosition in that getMaxPosition
     * returns the true maximum scroll position regardless of which axes are enabled for
     * user scrolling.
     * @return {Object} position
     * @return {Number} position.x The maximum scroll position on the x axis
     * @return {Number} position.y The maximum scroll position on the y axis
     */

    /**
     * Refreshes the scroller size and maxPosition.
     * @param {Boolean} immediate `true` to refresh immediately. By default refreshes
     * are deferred until the next {@link Ext.GlobalEvents#event-idle idle} event to
     * ensure any pending writes have been flushed to the dom and any reflows have
     * taken place.
     * @return {Ext.scroll.Scroller} this
     * @chainable
     */
    refresh: function() {
        this.fireEvent('refresh', this);
        return this;
    },

    /**
     * Removes a partnership that was created via {@link #addPartner}
     * @param {Ext.scroll.Scroller} partner
     * @private
     */
    removePartner: function(partner) {
        var partners = this._partners,
            otherPartners = partner._partners;

        if (partners) {
            delete partners[partner.getId()];
        }

        if (otherPartners) {
            delete(otherPartners[this.getId()]);
        }
    },

    /**
     * Scrolls by the passed delta values, optionally animating.
     *
     * All of the following are equivalent:
     *
     *      scroller.scrollBy(10, 10, true);
     *      scroller.scrollBy([10, 10], true);
     *      scroller.scrollBy({ x: 10, y: 10 }, true);
     *
     * A null value for either `x` or `y` will result in no scrolling on the given axis,
     * for example:
     *
     *     scroller.scrollBy(null, 10);
     *
     * will scroll by 10 on the y axis and leave the x axis at its current scroll position
     *
     * @param {Number/Number[]/Object} deltaX Either the x delta, an Array specifying x
     * and y deltas or an object with "x" and "y" properties.
     * @param {Number/Boolean/Object} deltaY Either the y delta, or an animate flag or
     * config object.
     * @param {Boolean/Object} animate Animate flag/config object if the delta values were
     * passed separately.
     */
    scrollBy: function(deltaX, deltaY, animate) {
        var position = this.getPosition();

        if (deltaX) {
            if (deltaX.length) { // array
                animate = deltaY;
                deltaY = deltaX[1];
                deltaX = deltaX[0];
            } else if (typeof deltaX !== 'number') { // object
                animate = deltaY;
                deltaY = deltaX.y;
                deltaX = deltaX.x;
            }
        }

        deltaX = (typeof deltaX === 'number') ? deltaX + position.x : null;
        deltaY = (typeof deltaY === 'number') ? deltaY + position.y : null;

        return this.doScrollTo(deltaX, deltaY, animate);
    },

    /**
     * Scrolls a descendant element of the scroller into view.
     * @param {String/HTMLElement/Ext.dom.Element} el the descendant to scroll into view
     * @param {Boolean} [hscroll=true] False to disable horizontal scroll.
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element
     * animation config object
     * @param {Boolean/String} [highlight=false] true to
     * {@link Ext.dom.Element#highlight} the element when it is in view. Can also be a
     * hex color to use for highlighting (defaults to yellow = '#ffff9c')
     * @private
     */
    scrollIntoView: function(el, hscroll, animate, highlight) {
        var me = this,
            position = me.getPosition(),
            newPosition, newX, newY,
            myEl = me.getElement();

        // Might get called before Component#onBoxReady which is when the Scroller is set up with elements.
        if (el) {
            newPosition = Ext.fly(el).getScrollIntoViewXY(myEl, position.x, position.y);
            newX = (hscroll === false) ? position.x : newPosition.x;
            newY = newPosition.y;

            if (highlight) {
                me.on({
                    scrollend: 'doHighlight',
                    scope: me,
                    single: true,
                    args: [el, highlight]
                });
            }

            me.doScrollTo(newX, newY, animate);
        }
    },

    /**
     * Determines if the passed element is within the visible x and y scroll viewport.
     * @param {String/HTMLElement/Ext.dom.Element} el The dom node, Ext.dom.Element, or 
     * id (string) of the dom element that is to be verified to be in view
     * @return {Object} Which ranges the element is in.
     * @return {Boolean} return.x `true` if the passed element is within the x visible range.
     * @return {Boolean} return.y `true` if the passed element is within the y visible range.
     */
    isInView: function(el) {
        var me = this,
            result = {
                x: false,
                y: false
            },
            elRegion,
            myEl = me.getElement(),
            myElRegion;

        if (el && myEl.contains(el)) {
            myElRegion = myEl.getRegion();
            elRegion = Ext.fly(el).getRegion();

            result.x = elRegion.right > myElRegion.left && elRegion.left < myElRegion.right;
            result.y = elRegion.bottom > myElRegion.top && elRegion.top < myElRegion.bottom;
        }
        return result;
    },

    /**
     * Scrolls to the given position.
     *
     * All of the following are equivalent:
     *
     *      scroller.scrollTo(10, 10, true);
     *      scroller.scrollTo([10, 10], true);
     *      scroller.scrollTo({ x: 10, y: 10 }, true);
     *
     * A null value for either `x` or `y` will result in no scrolling on the given axis,
     * for example:
     *
     *     scroller.scrollTo(null, 10);
     *
     * will scroll to 10 on the y axis and leave the x axis at its current scroll position
     *
     * A negative value for either `x` or `y` represents an offset from the maximum scroll
     * position on the given axis:
     *
     *     // scrolls to 10px from the maximum x scroll position and 20px from maximum y
     *     scroller.scrollTo(-10, -20);
     *
     * A value of Infinity on either axis will scroll to the maximum scroll position on
     * that axis:
     *
     *     // scrolls to the maximum position on both axes
     *     scroller.scrollTo(Infinity, Infinity);
     *
     * @param {Number} x The scroll position on the x axis.
     * @param {Number} y The scroll position on the y axis.
     * @param {Boolean/Object} animation (optional) Whether or not to animate the scrolling to the new position.
     *
     * @return {Ext.scroll.Scroller} this
     * @chainable
     */
    scrollTo: function(x, y, animate) {
        var maxPosition;

        if (x) {
            if (x.length) { // array
                animate = y;
                y = x[1];
                x = x[0];
            } else if (typeof x !== 'number') { // object
                animate = y;
                y = x.y;
                x = x.x;
            }
        }

        if (x < 0 || y < 0) {
            maxPosition = this.getMaxPosition();

            if (x < 0) {
                x += maxPosition.x;
            }
            if (y < 0) {
                y += maxPosition.y;
            }
        }

        this.doScrollTo(x, y, animate);
    },

    updateDirection: function(direction) {
        var me = this,
            x, y;

        if (!direction) {
            // if no direction was configured we set its value based on the values of
            // x and y.  This ensures getDirection() always returns something useful
            // for backward compatibility.
            x = me.getX();
            y = me.getY();
            if (x && y) {
                direction = (y === 'scroll' && x === 'scroll') ? 'both' : 'auto';
            } else if (y) {
                direction = 'vertical';
            } else if (x) {
                direction = 'horizontal';
            }
            // set the _direction property directly to avoid the updater being called
            // and triggering setX/setY calls
            me._direction = direction;
        } else {
            if (direction === 'auto') {
                x = true;
                y = true;
            } else if (direction === 'vertical') {
                x = false;
                y = true;
            } else if (direction === 'horizontal') {
                x = true;
                y = false;
            } else if (direction === 'both') {
                x = 'scroll';
                y = 'scroll';
            }

            me.setX(x);
            me.setY(y);
        }
    },

    updateSize: function(size) {
        // Needs an implementation in the base class because TouchScroller working in mode 1 (DOM scrolling)
        // needs to stretch the scroll range.
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

                me.setSpacerXY({
                    x: x,
                    y: y
                });
                spacer.show();
            }
        }
    },

    deprecated: {
        '5': {
            methods: {
                /**
                 * Returns this scroller.
                 *
                 * In Sencha Touch 2, access to a Component's Scroller was provided via
                 * a Ext.scroll.View class that was returned from the Component's getScrollable()
                 * method:
                 *
                 *     component.getScrollable().getScroller();
                 *
                 * in 5.0 all the functionality of Ext.scroll.View has been rolled into
                 * Ext.scroll.Scroller, and Ext.scroll.View has been removed.  Component's
                 * getScrollable() method now returns a Ext.scroll.Scroller.  This method is
                 * provided for compatibility.
                 * @deprecated 5.0
                 */
                getScroller: function() {
                    return this;
                }
            }
        },
        '5.1.0': {
            methods: {
                /**
                 * Scrolls to 0 on both axes
                 * @param {Boolean/Object} animate
                 * @private
                 * @return {Ext.scroll.Scroller} this
                 * @chainable
                 * @deprecated 5.1.0 Use scrollTo instead
                 */
                scrollToTop: function(animate) {
                    return this.scrollTo(0, 0, animate);
                },

                /**
                 * Scrolls to the maximum position on both axes
                 * @param {Boolean/Object} animate
                 * @private
                 * @return {Ext.scroll.Scroller} this
                 * @chainable
                 * @deprecated 5.1.0 Use scrollTo instead
                 */
                scrollToEnd: function(animate) {
                    return this.scrollTo(Infinity, Infinity, animate);
                }
            }
        }
    },

    privates: {
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
                    cls: me._spacerCls,
                    role: 'presentation'
                });

                spacer.setVisibilityMode(2); // 'display' visibilityMode

                // make sure the element is positioned if it is not already.  This ensures
                // that the spacer's position will affect the element's scroll size
                element.position();
            }

            return spacer;
        },

        applySpacerXY: function(pos, oldPos) {
            // Opt out if we have the same value
            if (oldPos && pos.x === oldPos.x && pos.y === oldPos.y) {
                pos = undefined;
            }
            return pos;
        },

        // rtl hook
        updateSpacerXY: function(pos) {
            this.getSpacer().setLocalXY(pos.x, pos.y);
        },

        // hook for rtl mode to convert an x coordinate to RTL space.
        convertX: function(x) {
            return x;
        },

        // highlights an element after it has been scrolled into view
        doHighlight: function(el, highlight) {
            if (highlight !== true) { // handle hex color
                Ext.fly(el).highlight(highlight);
            } else {
                Ext.fly(el).highlight();
            }
        },

        fireScrollStart: function(x, y) {
            var me = this,
                component = me.component;

            me.invokePartners('onPartnerScrollStart', x, y);

            if (me.hasListeners.scrollstart) {
                me.fireEvent('scrollstart', me, x, y);
            }

            if (component && component.onScrollStart) {
                component.onScrollStart(x, y);
            }

            Ext.GlobalEvents.fireEvent('scrollstart', me, x, y);
        },

        fireScroll: function(x, y) {
            var me = this,
                component = me.component;

            me.invokePartners('onPartnerScroll', x, y);

            if (me.hasListeners.scroll) {
                me.fireEvent('scroll', me, x, y);
            }

            if (component && component.onScrollMove) {
                component.onScrollMove(x, y);
            }

            Ext.GlobalEvents.fireEvent('scroll', me, x, y);
        },

        fireScrollEnd: function(x, y) {
            var me = this,
                component = me.component;

            me.invokePartners('onPartnerScrollEnd', x, y);

            if (me.hasListeners.scrollend) {
                me.fireEvent('scrollend', me, x, y);
            }

            if (component && component.onScrollEnd) {
                component.onScrollEnd(x, y);
            }

            Ext.GlobalEvents.fireEvent('scrollend', me, x, y);
        },

        initXStyle: function() {
            var element = this.getElement(),
                x = this.getX();

            // Check that element exists and is not destroyed
            if (element && element.dom) {
                if (!x) {
                    x = 'hidden';
                } else if (x === true) {
                    x = 'auto';
                }

                element.setStyle('overflow-x', x);
            }
        },

        initYStyle: function() {
            var element = this.getElement(),
                y = this.getY();

            // Check that element exists and is not destroyed
            if (element && element.dom) {
                if (!y) {
                    y = 'hidden';
                } else if (y === true) {
                    y = 'auto';
                }

                element.setStyle('overflow-y', y);
            }
        },

        invokePartners: function(method, x, y) {
            var me = this,
                partners = me._partners,
                partner,
                id,
                isEnd = method ==='onPartnerScrollEnd';

            // Do not invoke partners if we ar ealready reflecting a partner's scroll
            if (!me.suspendSync & !me.isReflecting) {
                for (id in partners) {
                    partner = partners[id].scroller;
                    partner.isReflecting = true;
                    partner[method](me, x, y);

                    // End a partner's reflecting status only when we are ending our scroll.
                    if (isEnd) {
                        partner.isReflecting = false;
                    }
                }
            }
        },

        clearReflecting: function() {
            this.isReflecting = false;
        },

        suspendPartnerSync: function() {
            this.suspendSync = (this.suspendSync || 0) + 1;
        },

        resumePartnerSync: function() {
            if (this.suspendSync) {
                this.suspendSync--;
            }
        },

        updateDomScrollPosition: function() {
            var me = this,
                element = me.getElement(),
                elScroll,
                position = me.position;

            if (element && !element.destroyed) {
                elScroll = me.getElementScroll(element);
                position.x = elScroll.left;
                position.y = elScroll.top;
            }

            me.positionDirty = false;
            return position;
        },

        // rtl hook
        getElementScroll: function(element) {
            return element.getScroll();
        },

        // Listener for dom scroll events.  This is needed for both TouchScroller and
        // DomScroller, because TouchScroller may be used to control the scroll position
        // of a naturally overflowing element.  In such a case the element may be scrolled
        // independently of the TouchScroller (via user mousewheel or clicking scrollbar).
        // When this happens we need to sync up the scroll position of the TouchScroller
        // and fire scroll events.
        // Additionally dom scroll events may be received in full touchScroll mode (2)
        // due to the browser attempting to scroll a focused element into view.  We must
        // handle dom scrolling in this mode as well to prevent this action.
        onDomScroll: function() {
            var me = this,
                position, x, y, el;

            // If, in CSS translation scrolling mode (mode 2), we ever encounter a DOM scroll
            // event, it must be a browser's autoscroll in response to focusing. We MUST
            // undo this action because in mode 2 scrolling, the DOM must never scroll.
            // https://sencha.jira.com/browse/EXTJS-18959
            if (me.isTouchScroller && Ext.supports.touchScroll === 2) {
                el = me.getElement().dom;
                el.scrollTop = el.scrollLeft = 0;
                return;
            }

            position = me.updateDomScrollPosition();
            x = position.x;
            y = position.y;

            if (!me.isScrolling) {
                me.isScrolling = Ext.isScrolling = true;
                me.fireScrollStart(x, y);
            }

            me.fireScroll(x, y);

            // call the buffered onScrollEnd.  this invocation will be canceled if another
            // scroll occurs before the buffer time.
            me.onDomScrollEnd();
        },

        onDomScrollEnd: function() {
            var me = this,
                position = me.getPosition(),
                x = position.x,
                y = position.y;

            me.isScrolling = Ext.isScrolling = false;

            me.trackingScrollLeft = x;
            me.trackingScrollTop = y;

            me.fireScrollEnd(x, y);
        },

        onPartnerScroll: function(partner, x, y) {
            var axis = partner._partners[this.getId()].axis;

            if (axis) {
                if (axis === 'x') {
                    y = null;
                } else if (axis === 'y') {
                    x = null;
                }
            }

            this.doScrollTo(x, y, false, true);
        },

        restoreState: function () {
            var me = this,
                el = me.getElement(),
                dom;

            if (el) {
                dom = el.dom;

                // Only restore state if has been previously captured! For example,
                // floaters probably have not been hidden before initially shown.
                if (me.trackingScrollTop !== undefined) {
                    dom.scrollTop = me.trackingScrollTop;
                    dom.scrollLeft = me.trackingScrollLeft;
                }
            }
        }
    }
});
