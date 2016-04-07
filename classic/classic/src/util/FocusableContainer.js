/**
 * A mixin for groups of Focusable things (Components, Widgets, etc) that
 * should respond to arrow keys to navigate among the peers, but keep only
 * one of the peers tabbable by default (tabIndex=0)
 *
 * Some examples: Toolbars, Radio groups, Tab bars, Panel headers, Menus
 */

Ext.define('Ext.util.FocusableContainer', {
    extend: 'Ext.Mixin',
    
    requires: [
        'Ext.util.KeyNav'
    ],
    
    mixinConfig: {
        id: 'focusablecontainer',
        
        before: {
            onAdd: 'onFocusableChildAdd',
            onRemove: 'onFocusableChildRemove',
            destroy: 'destroyFocusableContainer',
            onFocusEnter: 'onFocusEnter'
        },
        
        after: {
            afterRender: 'initFocusableContainer',
            onFocusLeave: 'onFocusLeave',
            afterShow: 'activateFocusableContainerEl'
        }
    },
    
    isFocusableContainer: true,
    
    /**
     * @cfg {Boolean} [enableFocusableContainer=true] Enable or disable
     * navigation with arrow keys for this FocusableContainer. This option may
     * be useful with nested FocusableContainers such as Grid column headers,
     * when only the root container should handle keyboard events.
     */
    enableFocusableContainer: true,
    
    /**
     * @cfg {Number} [activeChildTabIndex=0] DOM tabIndex attribute to set on the
     * active Focusable child of this container when using the "Roaming tabindex"
     * technique. Set this value to > 0 to precisely control the tabbing order
     * of the components/containers on the page.
     */
    activeChildTabIndex: 0,
    
    /**
     * @cfg {Number} [inactiveChildTabIndex=-1] DOM tabIndex attribute to set on
     * inactive Focusable children of this container when using the "Roaming tabindex"
     * technique. This value rarely needs to be changed from its default.
     */
    inactiveChildTabIndex: -1,
    
    privates: {
        initFocusableContainer: function(clearChildren) {
            var items, i, len;
            
            // Allow nested containers to optionally disable
            // children containers' behavior
            if (this.enableFocusableContainer) {
                clearChildren = clearChildren != null ? clearChildren : true;
                this.doInitFocusableContainer(clearChildren);
            }
            
            // A FocusableContainer instance such as a toolbar could have decided
            // to opt out of FC behavior for some reason; it could have happened
            // after all or almost all child items have been initialized with
            // focusableContainer reference. We need to clean this up if we're not
            // going to behave like a FocusableContainer after all.
            else {
                items = this.getFocusables();
                
                for (i = 0, len = items.length; i < len; i++) {
                    items[i].focusableContainer = null;
                }
            }
        },
        
        doInitFocusableContainer: function(clearChildren) {
            var me = this,
                el, child;
            
            el = me.getFocusableContainerEl();
            
            // This flag allows post factum initialization of the focusable container,
            // i.e. when container was empty initially and then some tabbable children
            // were added and we need to clear their tabIndices after priming our own
            // element's tabIndex.
            // This is useful for Panel and Window headers that might have tools
            // added dynamically.
            if (clearChildren) {
                me.clearFocusables();
            }
            
            // If we have no potentially focusable children, or all potentially focusable
            // children are presently disabled, don't init the container el tabIndex.
            // There is no point in tabbing into container when it can't shift focus
            // to a child.
            child = me.findNextFocusableChild({ step: 1, beforeRender: true });
            
            if (child) {
                // We set tabIndex on the focusable container el so that the user
                // could tab into it; we catch its focus event and focus a child instead
                me.activateFocusableContainerEl(el);
            }
            
            // Unsightly long names help to avoid possible clashing with class
            // or instance properties. We have to be extra careful in a mixin!
            me.focusableContainerMouseListener = me.mon(
                el, 'mousedown', me.onFocusableContainerMousedown, me
            );
            
            // Having keyNav doesn't hurt when container el is not focusable
            me.focusableKeyNav = me.createFocusableContainerKeyNav(el);
        },
        
        createFocusableContainerKeyNav: function(el) {
            var me = this;
            
            return new Ext.util.KeyNav(el, {
                eventName: 'keydown',
                ignoreInputFields: true,
                scope: me,

                tab: me.onFocusableContainerTabKey,
                enter: me.onFocusableContainerEnterKey,
                space: me.onFocusableContainerSpaceKey,
                up: me.onFocusableContainerUpKey,
                down: me.onFocusableContainerDownKey,
                left: me.onFocusableContainerLeftKey,
                right: me.onFocusableContainerRightKey
            });
        },
        
        destroyFocusableContainer: function() {
            if (this.enableFocusableContainer) {
                this.doDestroyFocusableContainer();
            }
        },
    
        doDestroyFocusableContainer: function() {
            var me = this;
        
            if (me.keyNav) {
                me.keyNav.destroy();
            }
            
            if (me.focusableContainerMouseListener) {
                me.focusableContainerMouseListener.destroy();
            }
            
            me.focusableKeyNav = me.focusableContainerMouseListener = null;
        },
        
        // Default FocusableContainer implies a flat list of focusable children
        getFocusables: function() {
            return this.items.items;
        },

        initDefaultFocusable: function(beforeRender) {
            var me = this,
                activeIndex = me.activeChildTabIndex,
                haveFocusable = false,
                items, item, i, len, tabIdx;

            items = me.getFocusables();
            len   = items.length;

            if (!len) {
                return;
            }

            // Check if any child Focusable is already active.
            // Note that we're not determining *which* focusable child
            // to focus here, only that we have some focusables.
            for (i = 0; i < len; i++) {
                item = items[i];

                if (item.focusable && !item.disabled) {
                    haveFocusable = true;
                    tabIdx = item.getTabIndex();

                    if (tabIdx != null && tabIdx >= activeIndex) {
                        return item;
                    }
                }
            }

            // No interactive children found, no point in going further
            if (!haveFocusable) {
                return;
            }

            // No child is focusable by default, so the first *interactive*
            // one gets initial childTabIndex. We are not looking for a focusable
            // child here because it may not be focusable yet if this happens
            // before rendering; we assume that an interactive child will become
            // focusable later and now activateFocusable() will just assign it
            // the respective tabIndex.
            item = me.findNextFocusableChild({
                beforeRender: beforeRender,
                items: items,
                step: true
            });

            if (item) {
                me.activateFocusable(item);
            }

            return item;
        },

        clearFocusables: function() {
            var me = this,
                items = me.getFocusables(),
                len = items.length,
                item, i;

            for (i = 0; i < len; i++) {
                item = items[i];

                if (item.focusable && !item.disabled) {
                    me.deactivateFocusable(item);
                }
            }
        },

        activateFocusable: function(child, /* optional */ newTabIndex) {
            var activeIndex = newTabIndex != null ? newTabIndex : this.activeChildTabIndex;

            child.setTabIndex(activeIndex);
        },

        deactivateFocusable: function(child, /* optional */ newTabIndex) {
            var inactiveIndex = newTabIndex != null ? newTabIndex : this.inactiveChildTabIndex;

            child.setTabIndex(inactiveIndex);
        },

        onFocusableContainerTabKey: function() {
            return true;
        },

        onFocusableContainerEnterKey: function() {
            return true;
        },

        onFocusableContainerSpaceKey: function() {
            return true;
        },

        onFocusableContainerUpKey: function(e) {
            // Default action is to scroll the nearest vertically scrollable container
            e.preventDefault();
            
            return this.moveChildFocus(e, false);
        },
        
        onFocusableContainerDownKey: function(e) {
            // Ditto
            e.preventDefault();
            
            return this.moveChildFocus(e, true);
        },
        
        onFocusableContainerLeftKey: function(e) {
            // Default action is to scroll the nearest horizontally scrollable container
            e.preventDefault();
            
            return this.moveChildFocus(e, false);
        },
        
        onFocusableContainerRightKey: function(e) {
            // Ditto
            e.preventDefault();
            
            return this.moveChildFocus(e, true);
        },
        
        getFocusableFromEvent: function(e) {
            var child = Ext.Component.fromElement(e.getTarget());
        
            //<debug>
            if (!child) {
                Ext.raise("No focusable child found for keyboard event!");
            }
            //</debug>
            
            return child;
        },
        
        moveChildFocus: function(e, forward) {
            var child = this.getFocusableFromEvent(e);
            
            return this.focusChild(child, forward, e);
        },
    
        focusChild: function(child, forward) {
            var nextChild = this.findNextFocusableChild({
                child: child,
                step: forward
            });
        
            if (nextChild) {
                nextChild.focus();
            }
        
            return nextChild;
        },
        
        findNextFocusableChild: function(options) {
            // This method is private, so options should always be provided
            var beforeRender = options.beforeRender,
                items, item, child, step, idx, i, len;
        
            items = options.items || this.getFocusables();
            step  = options.step != null ? options.step : 1;
            child = options.child;
            
            // If the child is null or undefined, idx will be -1.
            // The loop below will account for that, trying to find
            // the first focusable child from either end (depending on step)
            idx = Ext.Array.indexOf(items, child);
            
            // It's often easier to pass a boolean for 1/-1
            step = step === true ? 1 : step === false ? -1 : step;
        
            len = items.length;
            i   = step > 0 ? (idx < len ? idx + step : 0) : (idx > 0 ? idx + step : len - 1);
        
            for (;; i += step) {
                // We're looking for the first or last focusable child
                // and we've reached the end of the items, so punt
                if (idx < 0 && (i >= len || i < 0)) {
                    return null;
                }
                
                // Loop over forward
                else if (i >= len) {
                    i = -1; // Iterator will increase it once more
                    continue;
                }
                
                // Loop over backward
                else if (i < 0) {
                    i = len;
                    continue;
                }
                
                // Looped to the same item, give up
                else if (i === idx) {
                    return null;
                }
                
                item = items[i];
                
                if (!item || !item.focusable || item.disabled) {
                    continue;
                }
                
                // This loop can be run either at FocusableContainer init time,
                // or later when we need to navigate upon pressing an arrow key.
                // When we're navigating, we have to know exactly if the child is
                // focusable or not, hence only rendered children will make the cut.
                // At the init time item.isFocusable() may return false incorrectly
                // just because the item has not been rendered yet and its focusEl
                // is not defined, so we don't bother to call isFocusable and return
                // the first potentially focusable child.
                if (beforeRender || (item.isFocusable && item.isFocusable())) {
                    return item;
                }
            }
        
            return null;
        },
    
        getFocusableContainerEl: function() {
            return this.el;
        },
        
        onFocusableChildAdd: function(child) {
            if (this.enableFocusableContainer) {
                return this.doFocusableChildAdd(child);
            }
        },
        
        activateFocusableContainerEl: function(el) {
            el = el || this.getFocusableContainerEl();
            
            // Might not yet be rendered
            if (el) {
                el.set({ tabIndex: this.activeChildTabIndex });
            }
        },
        
        deactivateFocusableContainerEl: function(el) {
            el = el || this.getFocusableContainerEl();
            
            if (el) {
                el.set({ tabIndex: undefined });
            }
        },
        
        isFocusableContainerActive: function() {
            var me = this,
                isActive = false,
                el, child, focusEl;
            
            el = me.getFocusableContainerEl();
            
            if (el && el.isTabbable && el.isTabbable()) {
                isActive = true;
            }
            else {
                child = me.lastFocusedChild;
                focusEl = child && child.getFocusEl && child.getFocusEl();
                
                if (focusEl && focusEl.isTabbable && focusEl.isTabbable()) {
                    isActive = true;
                }
            }
            
            return isActive;
        },
        
        doFocusableChildAdd: function(child) {
            if (child.focusable) {
                child.focusableContainer = this;
            }
        },
        
        onFocusableChildRemove: function(child) {
            if (this.enableFocusableContainer) {
                return this.doFocusableChildRemove(child);
            }
            
            child.focusableContainer = null;
        },
    
        doFocusableChildRemove: function(child) {
            // If the focused child is being removed, we deactivate the FocusableContainer
            // So that it returns to the tabbing order.
            // For example, locking a grid column must return the owning HeaderContainer
            // to tabbability
            if (child === this.lastFocusedChild) {
                this.lastFocusedChild = null;
                this.activateFocusableContainerEl();
            }
        },
        
        onFocusableContainerMousedown: function(e, target) {
            var targetCmp = Ext.Component.fromElement(target);
            
            // Capture the timestamp for the mousedown. If we're navigating
            // into the container itself via the mouse we don't want to
            // default focus the first child like we would when using the keyboard.
            // By the time we get to the focusenter handling, we don't know what has caused
            // the focus to be triggered, so if the timestamp falls within some small epsilon,
            // the focus enter has been caused via the mouse and we can react accordingly.
            this.mousedownTimestamp = targetCmp === this ? Ext.Date.now() : 0;
            
            // Prevent focusing the container itself. DO NOT remove this clause, it is
            // untestable by our unit tests: injecting mousedown events will not cause
            // default action in the browser, the element never gets focus and tests
            // never fail. See http://www.w3.org/TR/DOM-Level-3-Events/#trusted-events
            if (targetCmp === this) {
                e.preventDefault();
            }
        },

        onFocusEnter: function(e) {
            var me = this,
                target = e.toComponent,
                mousedownTimestamp = me.mousedownTimestamp,
                epsilon = 50,
                child;
            
            if (!me.enableFocusableContainer) {
                return null;
            }
            
            me.mousedownTimestamp = 0;
            
            if (target === me) {
                if (!mousedownTimestamp || Ext.Date.now() - mousedownTimestamp > epsilon) {
                    child = me.initDefaultFocusable();

                    if (child) {
                        me.deactivateFocusableContainerEl();
                        child.focus();
                    }
                }
            }
            else {
                me.deactivateFocusableContainerEl();
            }
            
            return target;
        },

        onFocusLeave: function(e) {
            var me = this,
                lastFocused = me.lastFocusedChild;
            
            if (!me.enableFocusableContainer) {
                return;
            }

            if (!me.destroyed && !me.destroying) {
                me.clearFocusables();

                if (lastFocused && !lastFocused.disabled) {
                    me.activateFocusable(lastFocused);
                }
                else {
                    me.activateFocusableContainerEl();
                }
            }
        },
        
        beforeFocusableChildBlur: Ext.privateFn,
        afterFocusableChildBlur: Ext.privateFn,
    
        beforeFocusableChildFocus: function(child) {
            var me = this;
            
            if (!me.enableFocusableContainer) {
                return;
            }
            
            me.clearFocusables();
            me.activateFocusable(child);
            
            if (child.needArrowKeys) {
                me.guardFocusableChild(child);
            }
        },
        
        guardFocusableChild: function(child) {
            var me = this,
                index = me.activeChildTabIndex,
                guard;
            
            guard = me.findNextFocusableChild({ child: child, step: -1 });
            
            if (guard) {
                guard.setTabIndex(index);
            }
            
            guard = me.findNextFocusableChild({ child: child, step: 1 });
            
            if (guard) {
                guard.setTabIndex(index);
            }
        },
    
        afterFocusableChildFocus: function(child) {
            if (!this.enableFocusableContainer) {
                return;
            }
            
            this.lastFocusedChild = child;
        },
        
        beforeFocusableChildEnable: Ext.privateFn,
        
        onFocusableChildEnable: function(child) {
            var me = this;
            
            if (!me.enableFocusableContainer) {
                return;
            }
            
            // Some Components like Buttons do not render tabIndex attribute
            // when they start their lifecycle disabled, or remove tabIndex
            // if they get disabled later. Subsequently, such Components will
            // reset their tabIndex to default configured value upon enabling.
            // We don't want these children to be tabbable so we reset their
            // tabIndex yet again, unless this child is the last focused one.
            if (child !== me.lastFocusedChild) {
                me.deactivateFocusable(child);
                
                if (!me.isFocusableContainerActive()) {
                    me.activateFocusableContainerEl();
                }
            }
        },
        
        beforeFocusableChildDisable: function(child) {
            var me = this,
                nextTarget;
            
            if (!me.enableFocusableContainer || me.destroying || me.destroyed) {
                return;
            }
            
            // When currently focused child is about to be disabled,
            // it may lose the focus as well. For example, Buttons
            // will remove tabIndex attribute upon disabling, which
            // in turn will throw focus to the document body and cause
            // onFocusLeave to fire on the FocusableContainer.
            // We're focusing the next sibling to prevent that.
            if (child.hasFocus) {
                nextTarget = me.findNextFocusableChild({ child: child }) ||
                             child.findFocusTarget();
                
                // Note that it is entirely possible not to find the nextTarget,
                // e.g. when we're disabling the last button in a toolbar rendered
                // directly into document body. We don't have a good way to handle
                // such cases at present.
                if (nextTarget) {
                    nextTarget.focus();
                }
            }
        },
        
        onFocusableChildDisable: function(child) {
            var me = this,
                lastFocused = me.lastFocusedChild,
                firstFocusableChild;
            
            if (!me.enableFocusableContainer || me.destroying || me.destroyed) {
                return;
            }
            
            // If the disabled child was the last focused item of this
            // FocusableContainer, we have to reset the tabbability of
            // our container element.
            if (child === lastFocused) {
                me.activateFocusableContainerEl();
            }
            
            // It is also possible that the disabled child was the last
            // focusable child of this container, in which case we need
            // to make the container untabbable.
            firstFocusableChild = me.findNextFocusableChild({ step: 1 });
            
            if (!firstFocusableChild) {
                me.deactivateFocusableContainerEl();
            }
        },
        
        // TODO
        onFocusableChildShow: Ext.privateFn,
        onFocusableChildHide: Ext.privateFn,
        onFocusableChildMasked: Ext.privateFn,
        onFocusableChildDestroy: Ext.privateFn,
        onFocusableChildUpdate: Ext.privateFn
    }
});
