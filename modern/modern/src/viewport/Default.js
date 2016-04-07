/**
 * @private
 * Base class for iOS and Android viewports.
 */
Ext.define('Ext.viewport.Default', {
    extend: 'Ext.Container',

    xtype: 'viewport',

    PORTRAIT: 'portrait',

    LANDSCAPE: 'landscape',

    requires: [
        'Ext.GlobalEvents',
        'Ext.LoadMask',
        'Ext.layout.Card',
        'Ext.util.InputBlocker'
    ],

    /**
     * @event ready
     * Fires when the Viewport is in the DOM and ready.
     * @param {Ext.Viewport} this
     */

    /**
     * @event maximize
     * Fires when the Viewport is maximized.
     * @param {Ext.Viewport} this
     */

    /**
     * @event orientationchange
     * Fires when the Viewport orientation has changed.
     * @param {Ext.Viewport} this
     * @param {String} newOrientation The new orientation.
     * @param {Number} width The width of the Viewport.
     * @param {Number} height The height of the Viewport.
     */

    config: {
        /**
         * @private
         */
        autoMaximize: false,

        /**
         * @private
         *
         * Auto blur the focused element when touching on a non-input. This is used to work around Android bugs
         * where the virtual keyboard is not hidden when tapping outside an input.
         */
        autoBlurInput: true,

        /**
         * @cfg {Boolean} preventPanning
         * Whether or not to always prevent default panning behavior of the
         * browser's viewport.
         * @accessor
         */
        preventPanning: true,

        /**
         * @cfg {Boolean} preventZooming
         * `true` to attempt to stop zooming when you double tap on the screen on mobile devices,
         * typically HTC devices with HTC Sense UI.
         * @accessor
         */
        preventZooming: false,

        /**
         * @cfg
         * @private
         */
        autoRender: true,

        /**
         * @cfg {Object/String} layout Configuration for this Container's layout. Example:
         *
         *     Ext.create('Ext.Container', {
         *         layout: {
         *             type: 'hbox',
         *             align: 'middle'
         *         },
         *         items: [
         *             {
         *                 xtype: 'panel',
         *                 flex: 1,
         *                 style: 'background-color: red;'
         *             },
         *             {
         *                 xtype: 'panel',
         *                 flex: 2,
         *                 style: 'background-color: green'
         *             }
         *         ]
         *     });
         *
         * See the [layouts guide](#!/guides/layouts) for more information.
         *
         * @accessor
         */
        layout: 'card',

        /**
         * @cfg
         * @private
         */
        width: '100%',

        /**
         * @cfg
         * @private
         */
        height: '100%',

        useBodyElement: true,

        /**
         * An object of all the menus on this viewport.
         * @private
         */
        menus: {}
    },

    /**
     * @property {Boolean} isReady
     * `true` if the DOM is ready.
     */
    isReady: false,

    isViewport: true,

    isMaximizing: false,

    id: 'ext-viewport',

    isInputRegex: /^(input|textarea|select|a)$/i,

    isInteractiveWebComponentRegEx: /^(audio|video)$/i,

    focusedElement: null,

    /**
     * @private
     */
    fullscreenItemCls: Ext.baseCSSPrefix + 'fullscreen',

    constructor: function(config) {
        var me = this,
            bind = Ext.Function.bind,
            Component = Ext.Component,
            DomScroller = Ext.scroll.DomScroller;

        // By default document.body is monitored by a special DomScroller singleton so that
        // the global scroll event fires when the document scrolls.
        // A Viewport's Scroller will take over from this one.
        if (DomScroller.document) {
            DomScroller.document = DomScroller.document.destroy();
        }

        me.doPreventPanning = bind(me.doPreventPanning, me);
        me.doPreventZooming = bind(me.doPreventZooming, me);
        me.doBlurInput = bind(me.doBlurInput, me);

        me.maximizeOnEvents = [
          'ready',
          'orientationchange'
        ];

      // set default devicePixelRatio if it is not explicitly defined
        window.devicePixelRatio = window.devicePixelRatio || 1;

        me.callParent([config]);

        me.orientation = me.determineOrientation();
        me.windowWidth = me.getWindowWidth();
        me.windowHeight = me.getWindowHeight();
        me.windowOuterHeight = me.getWindowOuterHeight();

        me.stretchHeights = me.stretchHeights || {};

        // Android is handled separately
        if (!Ext.os.is.Android || Ext.browser.is.ChromeMobile) {
            if (me.supportsOrientation()) {
                me.addWindowListener('orientationchange', bind(me.onOrientationChange, me));
            } else {
                me.addWindowListener('resize', bind(me.onResize, me));
            }
        }

        document.addEventListener('focus', bind(me.onElementFocus, me), true);
        document.addEventListener('blur', bind(me.onElementBlur, me), true);

        Ext.onDocumentReady(me.onDomReady, me);

        if (!Component.on) {
            Ext.util.Observable.observe(Component);
        }

        Component.on('fullscreen', 'onItemFullscreenChange', me);

        return me;
    },

    initialize: function() {
        var me = this;

        me.addMeta('apple-mobile-web-app-capable', 'yes');
        me.addMeta('apple-touch-fullscreen', 'yes');

        me.callParent();
    },

    initInheritedState: function (inheritedState, inheritedStateInner) {
        var me = this,
            root = Ext.rootInheritedState;

        if (inheritedState !== root) {
            // We need to go at this again but with the rootInheritedState object. Let
            // any derived class poke on the proper object!
            me.initInheritedState(me.inheritedState = root,
                me.inheritedStateInner = Ext.Object.chain(root));
        } else {
            me.callParent([inheritedState, inheritedStateInner]);
        }
    },

    onAppLaunch: function() {
        var me = this;
        if (!me.isReady) {
            me.onDomReady();
        }
    },

    onDomReady: function() {
        var me = this;

        if (me.isReady) {
            return;
        }

        me.isReady = true;
        me.updateSize();
        me.onReady();
        me.fireEvent('ready', me);
        Ext.GlobalEvents.fireEvent('viewportready', me);
    },

    onReady: function() {
        if (this.getAutoRender()) {
            this.render();
        }
        if (Ext.browser.name === 'ChromeiOS') {
            this.setHeight('-webkit-calc(100% - ' + ((window.outerHeight - window.innerHeight) / 2) + 'px)');
        }
    },

    onElementFocus: function(e) {
        this.focusedElement = e.target;
    },

    onElementBlur: function() {
        this.focusedElement = null;
    },

    render: function() {
        if (!this.rendered) {
            var body = Ext.getBody(),
                clsPrefix = Ext.baseCSSPrefix,
                classList = [],
                osEnv = Ext.os,
                osName = osEnv.name.toLowerCase(),
                browserName = Ext.browser.name.toLowerCase(),
                osMajorVersion = osEnv.version.getMajor(),
                orientation = this.getOrientation(),
                theme;

            this.renderTo(body);

            classList.push(clsPrefix + osEnv.deviceType.toLowerCase());

            if (osEnv.is.iPad) {
                classList.push(clsPrefix + 'ipad');
            }

            classList.push(clsPrefix + osName);
            classList.push(clsPrefix + browserName);

            if (osMajorVersion) {
                classList.push(clsPrefix + osName + '-' + osMajorVersion);
            }

            if (osEnv.is.BlackBerry) {
                classList.push(clsPrefix + 'bb');
                if (Ext.browser.userAgent.match(/Kbd/gi)) {
                    classList.push(clsPrefix + 'bb-keyboard');
                }
            }

            if (Ext.browser.is.WebKit) {
                classList.push(clsPrefix + 'webkit');
            }

            if (Ext.browser.is.Standalone) {
                classList.push(clsPrefix + 'standalone');
            }

            if (Ext.browser.is.AndroidStock) {
                classList.push(clsPrefix + 'android-stock');
            }

            if (Ext.browser.is.GoogleGlass) {
                classList.push(clsPrefix + 'google-glass');
            }

            classList.push(clsPrefix + orientation);

            body.addCls(classList);

            theme = Ext.theme;
            if (theme && theme.getDocCls) {
                // hook for theme overrides to add css classes to the <html> element
                Ext.fly(document.documentElement).addCls(theme.getDocCls());
            }
        }
    },

    updateAutoBlurInput: function(autoBlurInput) {
        var touchstart = Ext.feature.has.TouchEvents ? 'touchstart' : 'mousedown';
        this.toggleWindowListener(autoBlurInput, touchstart, this.doBlurInput, false);
    },

    applyAutoMaximize: function(autoMaximize) {
        return Ext.browser.is.WebView ? false : autoMaximize;
    },

    updateAutoMaximize: function(autoMaximize) {
        var me = this;

        if (autoMaximize) {
            me.on('ready', 'doAutoMaximizeOnReady', me, { single: true });
            me.on('orientationchange', 'doAutoMaximizeOnOrientationChange', me);
        } else {
            me.un('ready', 'doAutoMaximizeOnReady', me);
            me.un('orientationchange', 'doAutoMaximizeOnOrientationChange', me);
        }
    },

    updatePreventPanning: function(preventPanning) {
        this.toggleWindowListener(preventPanning, 'touchmove', this.doPreventPanning, false);
    },

    updatePreventZooming: function(preventZooming) {
        var touchstart = Ext.feature.has.TouchEvents ? 'touchstart' : 'mousedown';
        this.toggleWindowListener(preventZooming, touchstart, this.doPreventZooming, false);
    },

    doAutoMaximizeOnReady: function() {
        var me = this;

        me.isMaximizing = true;

        me.on('maximize', function() {
            me.isMaximizing = false;

            me.updateSize();

            me.fireEvent('ready', me);
        }, me, { single: true });

        me.maximize();
    },

    doAutoMaximizeOnOrientationChange: function() {
        var me = this;

        me.isMaximizing = true;

        me.on('maximize', function() {
            me.isMaximizing = false;

            me.updateSize();
        }, me, { single: true });

        me.maximize();
    },

    doBlurInput: function(e) {
        var target = e.target,
            focusedElement = this.focusedElement;
        //In IE9/10 browser window loses focus and becomes inactive if focused element is <body>. So we shouldn't call blur for <body>
        // In FF, the focusedElement can be the document which doesn't have a blur method
        if (focusedElement && focusedElement.blur && focusedElement.nodeName.toUpperCase() != 'BODY' && !this.isInputRegex.test(target.tagName)) {
            delete this.focusedElement;
            focusedElement.blur();
        }
    },

    doPreventPanning: function(e) {
        var target = e.target, 
            touch;

        // If we have an interaction on a WebComponent we need to check the actual shadow dom element selected
        // to determine if it is an input before preventing default behavior
        // Side effect to this is if the shadow input does not do anything with 'touchmove' the user could pan
        // the screen.
        if (this.isInteractiveWebComponentRegEx.test(target.tagName) && e.touches && e.touches.length > 0) {
            touch = e.touches[0];
            if (touch && touch.target && this.isInputRegex.test(touch.target.tagName)) {
                return;
            }
        }

        if (target && target.nodeType === 1 && !this.isInputRegex.test(target.tagName)) {
            e.preventDefault();
        }
    },

    doPreventZooming: function(e) {
        // Don't prevent right mouse event
        if ('button' in e && e.button !== 0) {
            return;
        }

        var target = e.target, 
            inputRe = this.isInputRegex,
            touch;

        if (this.isInteractiveWebComponentRegEx.test(target.tagName) && e.touches && e.touches.length > 0) {
            touch = e.touches[0];
            if (touch && touch.target && inputRe.test(touch.target.tagName)) {
                return;
            }
        }

        if (target && target.nodeType === 1 && !inputRe.test(target.tagName)) {
            e.preventDefault();
        }
    },

    addWindowListener: function(eventName, fn, capturing) {
        window.addEventListener(eventName, fn, Boolean(capturing));
    },

    removeWindowListener: function(eventName, fn, capturing) {
        window.removeEventListener(eventName, fn, Boolean(capturing));
    },

    supportsOrientation: function() {
        return Ext.feature.has.Orientation;
    },

    onResize: function() {
        var me = this,
            oldWidth = me.windowWidth,
            oldHeight = me.windowHeight,
            width = me.getWindowWidth(),
            height = me.getWindowHeight(),
            currentOrientation = me.getOrientation(),
            newOrientation = me.determineOrientation();

        // Determine orientation change via resize. BOTH width AND height much change, otherwise
        // this is a keyboard popping up.
        if ((oldWidth !== width && oldHeight !== height) && currentOrientation !== newOrientation) {
            me.fireOrientationChangeEvent(newOrientation, currentOrientation);
        }
    },

    onOrientationChange: function() {
        var currentOrientation = this.getOrientation(),
            newOrientation = this.determineOrientation();

        if (newOrientation !== currentOrientation) {
            this.fireOrientationChangeEvent(newOrientation, currentOrientation);
        }
    },

    fireOrientationChangeEvent: function(newOrientation, oldOrientation) {
        var me = this,
            clsPrefix = Ext.baseCSSPrefix;

        Ext.getBody().replaceCls(clsPrefix + oldOrientation, clsPrefix + newOrientation);

        me.orientation = newOrientation;

        me.updateSize();
        me.fireEvent('orientationchange', me, newOrientation, me.windowWidth, me.windowHeight);
    },

    updateSize: function(width, height) {
        var me = this;

        me.windowWidth = width !== undefined ? width : me.getWindowWidth();
        me.windowHeight = height !== undefined ? height : me.getWindowHeight();

        return me;
    },

    waitUntil: function(condition, onSatisfied, onTimeout, delay, timeoutDuration) {
        if (!delay) {
            delay = 50;
        }

        if (!timeoutDuration) {
            timeoutDuration = 2000;
        }

        var scope = this,
            elapse = 0;

        Ext.defer(function repeat() {
            elapse += delay;

            if (condition.call(scope) === true) {
                if (onSatisfied) {
                    onSatisfied.call(scope);
                }
            }
            else {
                if (elapse >= timeoutDuration) {
                    if (onTimeout) {
                        onTimeout.call(scope);
                    }
                }
                else {
                    Ext.defer(repeat, delay);
                }
            }
        }, delay);
    },

    maximize: function() {
        this.fireMaximizeEvent();
    },

    fireMaximizeEvent: function() {
        this.updateSize();
        this.fireEvent('maximize', this);
    },

    updateHeight: function(height, oldHeight) {
        Ext.getBody().setHeight(height);
        this.callParent([height, oldHeight]);
    },

    updateWidth: function(width, oldWidth) {
        Ext.getBody().setWidth(width);
        this.callParent([width, oldWidth]);
    },

    scrollToTop: function() {
        window.scrollTo(0, -1);
    },

    /**
     * Retrieves the document width.
     * @return {Number} width in pixels.
     */
    getWindowWidth: function() {
        return window.innerWidth;
    },

    /**
     * Retrieves the document height.
     * @return {Number} height in pixels.
     */
    getWindowHeight: function() {
        return window.innerHeight;
    },

    getWindowOuterHeight: function() {
        return window.outerHeight;
    },

    getWindowOrientation: function() {
        return window.orientation;
    },

    /**
     * Returns the current orientation.
     * @return {String} `portrait` or `landscape`
     */
    getOrientation: function() {
        return this.orientation;
    },

    getSize: function() {
        return {
            width: this.windowWidth,
            height: this.windowHeight
        };
    },

    determineOrientation: function() {
        var me = this,
            portrait = me.PORTRAIT,
            landscape = me.LANDSCAPE;

        if (!Ext.os.is.Android && me.supportsOrientation()) {
            if (me.getWindowOrientation() % 180 === 0) {
                return portrait;
            }

            return landscape;
        }
        else {
            if (me.getWindowHeight() >= me.getWindowWidth()) {
                return portrait;
            }

            return landscape;
        }
    },

    onItemFullscreenChange: function(item) {
        item.addCls(this.fullscreenItemCls);
        this.add(item);
    },

    /**
     * Sets a menu for a given side of the Viewport.
     *
     * Adds functionality to show the menu by swiping from the side of the screen from the given side.
     *
     * If a menu is already set for a given side, it will be removed.
     *
     * Available sides are: `left`, `right`, `top`, and `bottom`.
     *
     * @param {Ext.Menu/Object} menu The menu instance or config to assign to the viewport.
     * @param {Object} config The configuration for the menu.
     * @param {String} config.side The side to put the menu on.
     * @param {Boolean} config.cover True to cover the viewport content. Defaults to `true`.
     *
     * @return {Ext.Menu} The menu.
     */
    setMenu: function(menu, config) {
        config = config || {};

        var me = this,
            side = config.side,
            menus;

        // Temporary workaround for body shifting issue
        if (Ext.os.is.iOS && !me.hasiOSOrientationFix) {
            me.hasiOSOrientationFix = true;
            me.on('orientationchange', function() {
                window.scrollTo(0, 0);
            }, me);
        }

        //<debug>
        if (!menu) {
            Ext.Logger.error("You must specify a side to dock the menu.");
        }

        if (!side) {
            Ext.Logger.error("You must specify a side to dock the menu.");
        }

        if (['left', 'right', 'top', 'bottom'].indexOf(side) == -1) {
            Ext.Logger.error("You must specify a valid side (left, right, top or botom) to dock the menu.");
        }
        //</debug>

        menus = me.getMenus();

        if (!menus) {
            menus = {};
        }

        if (!me.addedSwipeListener) {
            me.attachSwipeListeners();
            me.addedSwipeListener = true;
        }

        // If we have a menu cfg and no type was passed, we need to
        // setup the type. This template method exists to defer
        // for subclasses
        if (!menu.isComponent) {
            if (!menu.xclass && !menu.xtype) {
                menu = me.getMenuCfg(menu, side);
            }
            menu = Ext.create(menu);
        }

        menus[side] = menu;
        menu.$reveal = Boolean(config.reveal);
        menu.$cover = config.cover !== false && !menu.$reveal;
        menu.$side = side;

        me.fixMenuSize(menu, side);

        if (side == 'left') {
            menu.setLeft(0);
            menu.setRight(null);
            menu.setTop(0);
            menu.setBottom(0);
        } else if (side == 'right') {
            menu.setLeft(null);
            menu.setRight(0);
            menu.setTop(0);
            menu.setBottom(0);
        } else if (side == 'top') {
            menu.setLeft(0);
            menu.setRight(0);
            menu.setTop(0);
            menu.setBottom(null);
        } else if (side == 'bottom') {
            menu.setLeft(0);
            menu.setRight(0);
            menu.setTop(null);
            menu.setBottom(0);
        }

        me.setMenus(menus);

        return menu;
    },

    attachSwipeListeners: function() {
        var me = this;

        me.element.on({
            tap: me.onTap,
            swipestart: me.onSwipeStart,
            edgeswipestart: me.onEdgeSwipeStart,
            edgeswipe: me.onEdgeSwipe,
            edgeswipeend: me.onEdgeSwipeEnd,
            scope: me
        });
    },

    getMenuCfg: function(menu, side) {
        return Ext.apply({
            xtype: 'menu'
        }, menu);
    },

    /**
     * Removes a menu from a specified side.
     * @param {String} side The side to remove the menu from
     */
    removeMenu: function(side) {
        var menus = this.getMenus() || {},
            menu = menus[side];

        if (menu) {
            this.hideMenu(side);
        }
        delete menus[side];
        this.setMenus(menus);
    },

    /**
     * @private
     * Changes the sizing of the specified menu so that it displays correctly when shown.
     */
    fixMenuSize: function(menu, side) {
        if (side == 'top' || side == 'bottom') {
            menu.setWidth('100%');
        } else if (side == 'left' || side == 'right') {
            menu.setHeight('100%');
        }
    },

    /**
     * Shows a menu specified by the menu's side.
     * @param {String} side The side which the menu is placed.
     */
    showMenu: function(side) {
        var me = this,
            menus = me.getMenus(),
            menu = menus[side],
            before, after,
            viewportBefore, viewportAfter, size;

        if (!menu || menu.isAnimating) {
            return;
        }

        me.hideOtherMenus(side);

        before = {
            translateX: 0,
            translateY: 0
        };

        after = {
            translateX: 0,
            translateY: 0
        };

        viewportBefore = {
            translateX: 0,
            translateY: 0
        };

        viewportAfter = {
            translateX: 0,
            translateY: 0
        };

        if (menu.$reveal) {
            Ext.getBody().insertFirst(menu.element);
        } else {
            Ext.Viewport.add(menu);
        }

        menu.show();
        menu.addCls('x-' + side);

        size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight();

        if (side == 'left') {
            before.translateX = -size;
            viewportAfter.translateX = size;
        } else if (side == 'right') {
            before.translateX = size;
            viewportAfter.translateX = -size;
        } else if (side == 'top') {
            before.translateY = -size;
            viewportAfter.translateY = size;
        } else if (side == 'bottom') {
            before.translateY = size;
            viewportAfter.translateY = -size;
        }

        if (menu.$reveal) {
            if (Ext.browser.getPreferredTranslationMethod() != 'scrollposition') {
                menu.translate(0, 0);
            }
        } else {
            menu.translate(before.translateX, before.translateY);
        }

        if (menu.$cover) {
            menu.getTranslatable().on('animationend', function() {
                menu.isAnimating = false;
            }, me, {
                single: true
            });

            menu.translate(after.translateX, after.translateY, {
                preserveEndState: true,
                duration: 200
            });

        } else {
            me.translate(viewportBefore.translateX, viewportBefore.translateY);


            me.getTranslatable().on('animationend', function() {
                menu.isAnimating = false;
            }, me, {
                single: true
            });

            me.translate(viewportAfter.translateX, viewportAfter.translateY, {
                preserveEndState: true,
                duration: 200
            });
        }

        // Make the menu as animating
        menu.isAnimating = true;
    },

    /**
     * Hides a menu specified by the menu's side.
     * @param {String} side The side which the menu is placed.
     */
    hideMenu: function(side, animate) {
        var me = this,
            menus = this.getMenus(),
            menu = menus[side],
            after, viewportAfter,
            size;

        animate = animate !== false;

        if (!menu || (menu.isHidden() || menu.isAnimating)) {
            return;
        }

        after = {
            translateX: 0,
            translateY: 0
        };

        viewportAfter = {
            translateX: 0,
            translateY: 0
        };

        size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight();

        if (side == 'left') {
            after.translateX = -size;
        } else if (side == 'right') {
            after.translateX = size;
        } else if (side == 'top') {
            after.translateY = -size;
        } else if (side == 'bottom') {
            after.translateY = size;
        }

        if (menu.$cover) {
            if (animate) {
                menu.getTranslatable().on('animationend', function() {
                    menu.isAnimating = false;
                    menu.hide();
                }, me, {
                    single: true
                });

                menu.translate(after.translateX, after.translateY, {
                    preserveEndState: true,
                    duration: 200
                });
            } else {
                menu.translate(after.translateX, after.translateY);
                menu.hide()
            }
        } else {
            if (animate) {
                me.getTranslatable().on('animationend', function() {
                    menu.isAnimating = false;
                    menu.hide();
                }, me, {
                    single: true
                });

                me.translate(viewportAfter.translateX, viewportAfter.translateY, {
                    preserveEndState: true,
                    duration: 200
                });
            } else {
                me.translate(viewportAfter.translateX, viewportAfter.translateY);
                menu.hide();
            }
        }
    },

    /**
     * Hides all visible menus.
     */
    hideAllMenus: function(animation) {
        var menus = this.getMenus(),
            side;

        for (side in menus) {
            this.hideMenu(side, animation);
        }
    },

    /**
     * Hides all menus except for the side specified
     * @param {String} side         Side(s) not to hide
     * @param {String} animation    Animation to hide with
     */
    hideOtherMenus: function(side, animation){
        var menus = this.getMenus(),
            menu;

        for (menu in menus) {
            if (side !== menu) {
                this.hideMenu(menu, animation);
            }
        }
    },

    /**
     * Toggles the menu specified by side
     * @param {String} side The side which the menu is placed.
     */
    toggleMenu: function(side) {
        var menus = this.getMenus(), 
            menu;

        if (menus[side]) {
            menu = menus[side];
            if (menu.isHidden()) {
                this.showMenu(side);
            } else {
                this.hideMenu(side);
            }
        }
    },

    /**
     * @private
     */
    sideForDirection: function(direction) {
        if (direction === 'left') {
            return 'right';
        } else if (direction === 'right') {
            return 'left';
        } else if (direction == 'up') {
            return 'bottom';
        } else if (direction == 'down') {
            return 'top';
        }
    },

    /**
     * @private
     */
    sideForSwipeDirection: function(direction) {
        if (direction == 'up') {
            return  'top';
        } else if (direction == 'down') {
            return 'bottom';
        }
        return direction;
    },

    /**
     * @private
     */
    onTap: function(e) {
        // this.hideAllMenus();
    },

    /**
     * @private
     */
    onSwipeStart: function(e) {
        var side = this.sideForSwipeDirection(e.direction);
        this.hideMenu(side);
    },

    /**
     * @private
     */
    onEdgeSwipeStart: function(e) {
        var me = this,
            side = me.sideForDirection(e.direction),
            menus = me.getMenus(),
            menu = menus[side],
            menuSide, checkMenu, size,
            after, viewportAfter,
            transformStyleName, setTransform;

        if (!menu || !menu.isHidden()) {
            return;
        }

        for (menuSide in menus) {
            checkMenu = menus[menuSide];
            if (checkMenu.isHidden() !== false) {
                return;
            }
        }

        me.$swiping = true;

        me.hideAllMenus(false);

        // show the menu first so we can calculate the size
        if (menu.$reveal) {
            Ext.getBody().insertFirst(menu.element);
        } else {
            Ext.Viewport.add(menu);
        }
        menu.show();

        size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight();

        after = {
            translateX: 0,
            translateY: 0
        };

        viewportAfter = {
            translateX: 0,
            translateY: 0
        };

        if (side == 'left') {
            after.translateX = -size;
        } else if (side == 'right') {
            after.translateX = size;
        } else if (side == 'top') {
            after.translateY = -size;
        } else if (side == 'bottom') {
            after.translateY = size;
        }

        transformStyleName = 'webkitTransform' in document.createElement('div').style ? 'webkitTransform' : 'transform';
        setTransform = menu.element.dom.style[transformStyleName];

        if (setTransform) {
            menu.element.dom.style[transformStyleName] = '';
        }

        if (menu.$reveal) {
            if (Ext.browser.getPreferredTranslationMethod() != 'scrollposition') {
                menu.translate(0, 0);
            }
        } else {
            menu.translate(after.translateX, after.translateY);
        }

        if (!menu.$cover) {
            if (setTransform) {
                me.innerElement.dom.style[transformStyleName] = '';
            }

            me.translate(viewportAfter.translateX, viewportAfter.translateY);
        }
    },

    /**
     * @private
     */
    onEdgeSwipe: function(e) {
        var me = this,
            side = me.sideForDirection(e.direction),
            menu = me.getMenus()[side],
            size, after, viewportAfter,
            movement, viewportMovement;

        if (!menu || !me.$swiping) {
            return;
        }

        size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight();
        movement = Math.min(e.distance - size, 0);
        viewportMovement = Math.min(e.distance, size);

        after = {
            translateX: 0,
            translateY: 0
        };

        viewportAfter = {
            translateX: 0,
            translateY: 0
        };

        if (side == 'left') {
            after.translateX = movement;
            viewportAfter.translateX = viewportMovement;
        } else if (side == 'right') {
            after.translateX = -movement;
            viewportAfter.translateX = -viewportMovement;
        } else if (side == 'top') {
            after.translateY = movement;
            viewportAfter.translateY = viewportMovement;
        } else if (side == 'bottom') {
            after.translateY = -movement;
            viewportAfter.translateY = -viewportMovement;
        }

        if (menu.$cover) {
            menu.translate(after.translateX, after.translateY);
        } else {
            me.translate(viewportAfter.translateX, viewportAfter.translateY);
        }
    },

    /**
     * @private
     */
    onEdgeSwipeEnd: function(e) {
        var me = this,
            side = me.sideForDirection(e.direction),
            menu = me.getMenus()[side],
            shouldRevert = false,
            size, velocity, movement, viewportMovement,
            after, viewportAfter;

        if (!menu) {
            return;
        }

        size = (side == 'left' || side == 'right') ? menu.element.getWidth() : menu.element.getHeight();
        velocity = (e.flick) ? e.flick.velocity : 0;

        // check if continuing in the right direction
        if (side == 'right') {
            if (velocity.x > 0) {
                shouldRevert = true;
            }
        } else if (side == 'left') {
            if (velocity.x < 0) {
                shouldRevert = true;
            }
        } else if (side == 'top') {
            if (velocity.y < 0) {
                shouldRevert = true;
            }
        } else if (side == 'bottom') {
            if (velocity.y > 0) {
                shouldRevert = true;
            }
        }

        movement = shouldRevert ? size : 0;
        viewportMovement = shouldRevert ? 0 : -size;

        after = {
            translateX: 0,
            translateY: 0
        };

        viewportAfter = {
            translateX: 0,
            translateY: 0
        };

        if (side == 'left') {
            after.translateX = -movement;
            viewportAfter.translateX = -viewportMovement;
        } else if (side == 'right') {
            after.translateX = movement;
            viewportAfter.translateX = viewportMovement;
        } else if (side == 'top') {
            after.translateY = -movement;
            viewportAfter.translateY = -viewportMovement;
        } else if (side == 'bottom') {
            after.translateY = movement;
            viewportAfter.translateY = viewportMovement;
        }

        // Move the viewport if cover is not enabled
        if (menu.$cover) {
            menu.getTranslatable().on('animationend', function() {
                if (shouldRevert) {
                    menu.hide();
                }
            }, me, {
                single: true
            });

            menu.translate(after.translateX, after.translateY, {
                preserveEndState: true,
                duration: 200
            });

        } else {
            me.getTranslatable().on('animationend', function() {
                if (shouldRevert) {
                    menu.hide();
                }
            }, me, {
                single: true
            });

            me.translate(viewportAfter.translateX, viewportAfter.translateY, {
                preserveEndState: true,
                duration: 200
            });
        }

        me.$swiping = false;
    },

    privates: {
        addMeta: function(name, content) {
            var meta = document.createElement('meta');

            meta.setAttribute('name', name);
            meta.setAttribute('content', content);
            Ext.getHead().append(meta);
        },

        doAddListener: function(eventName, fn, scope, options, order, caller, manager) {
            var me = this;
            if (eventName === 'ready' && me.isReady && !me.isMaximizing) {
                fn.call(scope);
                return me;
            }

            me.callParent([eventName, fn, scope, options, order, caller, manager]);
        },

        toggleWindowListener: function(on, eventName, fn, capturing) {
            if (on) {
                this.addWindowListener(eventName, fn, capturing);
            } else {
                this.removeWindowListener(eventName, fn, capturing);
            }
        }
    }
});
