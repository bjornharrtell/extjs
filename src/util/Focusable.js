/**
 * A mixin for individually focusable things (Components, Widgets, etc)
 */

Ext.define('Ext.util.Focusable', {
    mixinId: 'focusable',
    
    /**
     * @property {Boolean} focusable
     * `true` for interactive Components, `false` for static Components
     */
    // Plain Components are static, so not focusable
    focusable: false,
    
    /**
     * @cfg {Number} [tabIndex] DOM tabIndex attribute for this Focusable
     */
    
    /**
     * @cfg {String} [focusCls='x-focus'] CSS class that will be added to focused
     * Component, and removed when Component blurs.
     */
    focusCls: 'focus',
    
    /**
     * @event focus
     * Fires when this Component receives focus.
     * @param {Ext.Component} this
     * @param {Ext.event.Event} event The focus event.
     */

    /**
     * @event blur
     * Fires when this Component loses focus.
     * @param {Ext.Component} this
     * @param {Ext.event.Event} event The blur event.
     */
    
    /**
     * Template method to do any Focusable related initialization that
     * does not involve event listeners creation.
     * @protected
     */
    initFocusable: Ext.emptyFn,
    
    /**
     * Template method to do any event listener initialization for a Focusable.
     * This generally happens after the focusEl is available.
     * @protected
     */
    initFocusableEvents: function() {
        // This will add focus/blur listeners to the getFocusEl() element if that is naturally
        // focusable. If *not* naturally focusable, then we look for the tabIndex property
        // to be defined which indicates that the element should be made focusable.
        this.addFocusListener();
    },
    
    destroyFocusable: function() {
        Ext.destroy(this.focusListeners);
        delete this.focusTask;
    },

    enableFocusable: Ext.emptyFn,
    
    disableFocusable: function() {
        var me = this,
            focusCls = me.focusCls,
            focusEl = me.getFocusEl();
        
        if (focusCls && focusEl) {
            focusEl.removeCls(me.removeClsWithUI(focusCls, true));
        }
    },
    
    isFocusable: function() {
        var me = this,
            focusEl;
        
        if (!me.focusable) {
            return false;
        }
        
        focusEl = me.getFocusEl();
        
        if (focusEl && me.canFocus()) {

            // getFocusEl might return a Component if a Container wishes to
            // delegate focus to a descendant. Window can do this via its
            // defaultFocus configuration which can reference a Button.
            // Both Component and Element implement isFocusable, so always
            // ask that.
            return focusEl.isFocusable(true);
        }
    },
    
    canFocus: function() {
        var me = this;
        
        return me.focusable && me.rendered && !me.destroying &&
              !me.isDestroyed && !me.disabled && me.isVisible(true);
    },
    
    /**
     * Sets up the focus listener on this Component's {@link #getFocusEl focusEl} if it has one.
     *
     * Form Components which must implicitly participate in tabbing order usually have a naturally
     * focusable element as their {@link #getFocusEl focusEl}, and it is the DOM event of that
     * receiving focus which drives the Component's `onFocus` handling, and the DOM event of it
     * being blurred which drives the `onBlur` handling.
     * @private
     */
    addFocusListener: function() {
        var me = this,
            tabIndex = me.tabIndex,
            focusEl = me.getFocusEl(),
            needsTabIndex;

        if (focusEl) {
            // getFocusEl might return a Component if a Container wishes to delegate focus to a
            // descendant. Window can do this via its defaultFocus configuration which can
            // reference a Button.
            if (focusEl.isComponent) {
                return focusEl.addFocusListener();
            }

            // If the focusEl is naturally focusable, then we always need a focus listener to
            // drive the Component's onFocus handling.
            // If *not* naturally focusable, then we only need the focus listener if the
            // tabIndex property is defined for a Component
            needsTabIndex = focusEl.needsTabIndex() && !focusEl.dom.hasAttribute('tabindex');
            
            if (!me.focusListenerAdded && (!needsTabIndex || tabIndex != null)) {
                if (needsTabIndex && !focusEl.dom.getAttribute('tabIndex')) {
                    focusEl.dom.setAttribute('tabIndex', tabIndex);
                }
                
                me.focusListeners = focusEl.on({
                    focus: me.onFocus,
                    blur: me.onBlur,
                    scope: me,
                    destroyable: true
                });

                // This attribute is a shortcut to look up a Component by its Elements
                // It only makes sense on focusable elements, so we set it here
                focusEl.dom.setAttribute(Ext.Component.componentIdAttribute, me.id);

                me.focusListenerAdded = true;
            }
        }
    },
    
    /**
     * Try to focus this component.
     * @param {Mixed} [selectText] If applicable, `true` to also select all the text in this component, or an array consisting of start and end (defaults to start) position of selection.
     * @param {Boolean/Number} [delay] Delay the focus this number of milliseconds (true for 10 milliseconds).
     * @param {Function} [callback] Only needed if the `delay` parameter is used. A function to call upon focus.
     * @param {Function} [scope] Only needed if the `delay` parameter is used. The scope (`this` reference) in which to execute the callback.
     * @return {Ext.Component} The focused Component. Usually <code>this</code> Component. Some Containers may
     * delegate focus to a descendant Component ({@link Ext.window.Window Window}s can do this through their
     * {@link Ext.window.Window#defaultFocus defaultFocus} config option.
     */
    focus: function(selectText, delay, callback, scope) {
        var me = this,
            focusEl,
            focusElDom,
            containerScrollTop;

        if (!me.focusable || me.isDestroyed || me.destroying) {
            return;
        }

        // If delay is wanted, queue a call to this function.
        if (delay) {
            me.getFocusTask().delay(Ext.isNumber(delay) ? delay : 10, me.focus, me, [selectText, false, callback, scope]);
            return me;
        }

        // An immediate focus call must cancel any outstanding delayed focus calls.
        me.cancelFocus();
        
        // Assignment in conditional here to avoid calling getFocusEl()
        // if me.canFocus() returns false
        if (me.canFocus() && (focusEl = me.getFocusEl())) {

            // getFocusEl might return a Component if a Container wishes to delegate focus to a
            // descendant.
            // Window can do this via its defaultFocus configuration which can reference a Button.
            if (focusEl.isComponent) {
                return focusEl.focus(selectText, delay, callback, scope);
            }
            
            focusElDom = focusEl.dom;

            // If it was an Element with a dom property
            if (focusElDom) {

                // Not a natural focus holding element, add a tab index to make it programatically
                // focusable (unless it has tabindex already)
                if (focusEl.needsTabIndex() && !focusElDom.hasAttribute('tabindex')) {
                    focusElDom.tabIndex = -1;
                }

                if (me.floating) {
                    containerScrollTop = me.container.dom.scrollTop;
                }

                // Focus the element.
                // The focusEl has a DOM focus listener on it which invokes the Component's onFocus
                // method to perform Component-specific focus processing
                focusEl.focus();
                
                if (selectText) {
                    if (Ext.isArray(selectText)) {
                        if (me.selectText) {
                            me.selectText.apply(me, selectText);
                        }
                    }
                    else {
                        focusElDom.select();
                    }
                }

                // Call the callback when focus is done
                Ext.callback(callback, scope);
            }

            // Focusing a floating Component brings it to the front of its stack.
            // this is performed by its zIndexManager. Pass preventFocus true to avoid recursion.
            if (me.floating) {
                // Every component that doesn't have preventFocus set gets a delayed call to focus().
                // Only bring to front if the current component isn't the manager's topmost component.
                if (me !== me.zIndexManager.getActive()) {
                    me.toFront(true);
                }

                if (containerScrollTop !== undefined) {
                    me.container.dom.scrollTop = containerScrollTop;
                }
            }
        }
        
        return me;
    },

    /**
     * Cancel any deferred focus on this component
     * @protected
     */
    cancelFocus: function() {
        var task = this.getFocusTask();
        
        if (task) {
            task.cancel();
        }
    },

    /**
     * Template method to do any pre-blur processing.
     * @protected
     * @param {Ext.event.Event} e The event object
     */
    beforeBlur: Ext.emptyFn,
    
    // private
    onBlur: function(e) {
        var me = this,
            container = me.focusableContainer,
            focusCls = me.focusCls,
            focusClsEl;
        
        if (!me.focusable || me.destroying) {
            return;
        }

        me.beforeBlur(e);
        
        if (container) {
            container.beforeFocusableChildBlur(me, e);
        }
        
        focusClsEl = me.getFocusClsEl();
        
        if (focusCls && focusClsEl) {
            focusClsEl.removeCls(me.removeClsWithUI(focusCls, true));
        }
        
        if (me.validateOnBlur) {
            me.validate();
        }
        
        me.hasFocus = false;
        me.fireEvent('blur', me, e);
        me.postBlur(e);
        
        if (container) {
            container.afterFocusableChildBlur(me, e);
        }
    },

    /**
     * Template method to do any post-blur processing.
     * @protected
     * @param {Ext.event.Event} e The event object
     */
    postBlur: Ext.emptyFn,

    /**
     * Template method to do any pre-focus processing.
     * @protected
     * @param {Ext.event.Event} e The event object
     */
    beforeFocus: Ext.emptyFn,
    
    // private
    onFocus: function(e) {
        var me = this,
            container = me.focusableContainer,
            focusCls = me.focusCls,
            focusClsEl;
        
        if (!me.focusable) {
            return;
        }

        if (me.canFocus()) {
            me.beforeFocus(e);
            
            if (container) {
                container.beforeFocusableChildFocus(me, e);
            }
            
            focusClsEl = me.getFocusClsEl();
            
            if (focusCls && focusClsEl) {
                focusClsEl.addCls(me.addClsWithUI(focusCls, true));
            }
            
            if (!me.hasFocus) {
                me.hasFocus = true;
                me.fireEvent('focus', me, e);
            }
            
            me.postFocus(e);
            
            if (container) {
                container.afterFocusableChildFocus(me, e);
            }
        }
    },
    
    /**
     * Template method to do any post-focus processing.
     * @protected
     * @param {Ext.event.Event} e The event object
     */
    postFocus: Ext.emptyFn,
    
    /**
     * Return the actual tabIndex for this Focusable.
     *
     * @return {Number} tabIndex attribute value
     */
    getTabIndex: function() {
        var me = this,
            el, index;
        
        if (!me.focusable) {
            return;
        }
        
        el = me.getFocusEl();
        
        if (el) {
            // getFocusEl may return a child Component
            index = el.isComponent ? el.getTabIndex() : el.getAttribute('tabindex');
            
            me.tabIndex = index;
        }
        else {
            index = me.tabIndex;
        }
        
        return index;
    },
    
    /**
     * Set the tabIndex property for this Focusable. If the focusEl
     * is avalable, set tabIndex attribute on it, too.
     *
     * @param {Number} newTabIndex new tabIndex to set
     */
    setTabIndex: function(newTabIndex) {
        var me = this,
            el;
        
        if (!me.focusable) {
            return;
        }
        
        me.tabIndex = newTabIndex;
        el = me.getFocusEl();
        
        if (el) {
            // getFocusEl may return a child Component
            if (el.isComponent) {
                el.setTabIndex(newTabIndex);
            }
            else {
                el.set({ tabindex: newTabIndex });
            }
        }
    },
    
    privates: {
        privacy: 'framework',
        
        /**
         * Returns the focus holder element associated with this Focusable.
         * At the Focusable base mixin level, this function returns `undefined`.
         *
         * Subclasses which use embedded focusable elements (such as Window,
         * Field and Button) should override this for use by the
         * {@link Ext.util.Focusable#method-focus focus} method.
         *
         * @return {Ext.Element} `undefined` because raw Focusables cannot by
         * default hold focus.
         * @method
         * @private
         */
        getFocusEl: Ext.privateFn,
        
        /**
         * Returns the focus styling holder element associated with this Focusable.
         * By default it is the same element as {@link #getFocusEl getFocusEl}.
         *
         * @return {Ext.Element} The focus styling element.
         * @private
         */
        getFocusClsEl: function() {
            return this.getFocusEl();
        },

        // private
        getFocusTask: function() {
            if (!this.focusTask) {
                this.focusTask = Ext.focusTask;
            }
            
            return this.focusTask;
        },

        // private
        blur: function() {
            var me = this,
                focusEl;
            
            if (!me.focusable || !me.rendered) {
                return;
            }
            
            focusEl = me.getFocusEl();

            if (focusEl) {
                me.blurring = true;
                focusEl.blur();
                delete me.blurring;
            }
            
            return me;
        },
        
        disableTabbing: function() {
            var me = this,
                el = me.el,
                focusEl;
            
            if (!me.focusable) {
                return;
            }
            
            focusEl = me.getFocusEl();
            
            if (el) {
                el.saveChildrenTabbableState();
            }
            
            if (focusEl) {
                focusEl.saveTabbableState();
            }
        },
        
        enableTabbing: function() {
            var me = this,
                el = me.el,
                focusEl;
            
            if (!me.focusable) {
                return;
            }
            
            focusEl = me.getFocusEl();
            
            if (focusEl) {
                focusEl.restoreTabbableState();
            }
            
            if (el) {
                el.restoreChildrenTabbableState();
            }
        }
    }
},

function() {
    // One global DelayedTask to assign focus
    // So that the last focus call wins.
    if (!Ext.focusTask) {
        Ext.focusTask = new Ext.util.DelayedTask();
    }
});
