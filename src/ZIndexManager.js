/**
 * A class that manages a group of {@link Ext.Component#floating} Components and provides z-order management,
 * and Component activation behavior, including masking below the active (topmost) Component.
 *
 * {@link Ext.Component#floating Floating} Components which are rendered directly into the document (such as
 * {@link Ext.window.Window Window}s) which are {@link Ext.Component#method-show show}n are managed by a
 * {@link Ext.WindowManager global instance}.
 *
 * {@link Ext.Component#floating Floating} Components which are descendants of {@link Ext.Component#floating floating}
 * *Containers* (for example a {@link Ext.view.BoundList BoundList} within an {@link Ext.window.Window Window},
 * or a {@link Ext.menu.Menu Menu}), are managed by a ZIndexManager owned by that floating Container. Therefore
 * ComboBox dropdowns within Windows will have managed z-indices guaranteed to be correct, relative to the Window.
 */
Ext.define('Ext.ZIndexManager', {
    alternateClassName: 'Ext.WindowGroup',

    requires: [
        'Ext.util.SorterCollection',
        'Ext.util.FilterCollection'
    ],

    statics: {
        zBase : 9000,
        activeCounter: 0
    },

    constructor: function(container) {
        var me = this;

        me.id = Ext.id(null, 'zindex-mgr-');

        // The stack is a collection sorted on the incrementing activeCounter ascending, so recently active components
        // sort to the top.
        // The component's alwaysOnTop flag takes priority in the sort order and
        // cause the component to gravitate to the correct end of the stack.
        me.zIndexStack = new Ext.util.Collection({
            sorters: {
                sorterFn: function(comp1, comp2) {
                    var ret = (comp1.alwaysOnTop || 0) - (comp2.alwaysOnTop || 0);
                    if (!ret) {
                       ret = comp1.getActiveCounter() - comp2.getActiveCounter();
                    }
                    return ret;
                }
            },
            filters: {
                filterFn: function(comp) {
                    return comp.isVisible();
                }
            }
        });

        // zIndexStack will call into this class on key lifecycle events if methods exist here.
        // Specifically, we implement onCollectionSort which is called by Component's updaters for activeCounter and alwaysOnTop.
        me.zIndexStack.addObserver(me);
        me.front = null;

        // Listen for global component hiding and showing.
        // onComponentShowHide only reacts if we are managing the component.
        me.globalListeners = Ext.globalEvents.on({
            hide: me.onComponentShowHide,
            show: me.onComponentShowHide,
            scope: me,
            destroyable: true
        });

        if (container) {

            // This is the ZIndexManager for an Ext.container.Container, base its zseed on the zIndex of the Container's element
            if (container.isContainer) {
                container.on('resize', me._onContainerResize, me);
                me.zseed = Ext.Number.from(me.rendered ? container.getEl().getStyle('zIndex') : undefined, me.getNextZSeed());
                // The containing element we will be dealing with (eg masking) is the content target
                me.targetEl = container.getTargetEl();
                me.container = container;
            }
            // This is the ZIndexManager for a DOM element
            else {
                Ext.on('resize', me._onContainerResize, me);
                me.zseed = me.getNextZSeed();
                me.targetEl = Ext.get(container);
            }
        }
        // No container passed means we are the global WindowManager. Our target is the doc body.
        // DOM must be ready to collect that ref.
        else {
            me.zseed = me.getNextZSeed();
            Ext.onReady(function() {
                Ext.on('resize', me._onContainerResize, me);
                me.targetEl = Ext.getBody();
            });
        }
    },

    // Required to be an Observer of a Collection
    getId: function() {
        return this.id;
    },

    getNextZSeed: function() {
        return (Ext.ZIndexManager.zBase += 10000);
    },

    setBase: function(baseZIndex) {
        this.zseed = baseZIndex;
        return this.onCollectionSort();
    },

    // @private
    // Called whenever the zIndexStack is sorted.
    // That happens in reaction to the activeCounter time being set, or the alwaysOnTop config being set.
    onCollectionSort: function() {
        var me = this,
            oldFront = me.front,
            a = me.zIndexStack.getRange(),
            len = a.length,
            i,
            zIndex = me.zseed,
            comp,
            topModal,
            doFocus;

        for (i = 0; i < len; i++) {
            comp = a[i];

            // Setting the zIndex of a Component returns the topmost zIndex consumed by
            // that Component.
            // If it's just a plain floating Component such as a BoundList, then the
            // return value is the passed value plus 10, ready for the next item.
            // If a floating *Container* has its zIndex set, it re-orders its managed
            // floating children, starting from that new base, and returns a value 10000 above
            // the highest zIndex which it allocates.
            zIndex = comp.setZIndex(zIndex);
            if (comp.modal) {
                topModal = comp;
            }
        }

        // Sort resulted in a different component at the top of the stack
        if (comp && comp !== oldFront) {

            // Clear active flag on old front component.
            // Do not inform it, if the reason for its deactivation is that it's being destroyed.
            if (oldFront && !oldFront.destroying) {
                    oldFront.setActive(false, comp);
                }

            // Modals always get focused.
            // Focus the new front unless it is configured not to do so on toFront
            doFocus = comp.modal || (comp.focusOnToFront && !comp.preventFocusOnActivate);

            comp.setActive(true, null, doFocus);
        }

        // Cache the top of the stack
        me.front = comp;

        // If we encountered a modal in our reassigment, ensure our modal mask is just below it.
        if (topModal) {
            me._showModalMask(topModal);
        }
        // Otherwise, ensure the modal mask is hidden
        else {
            me._hideModalMask();
        }
        return zIndex;
    },

    /**
     * @private
     * Called from {@link Ext.util.Floating} updater methods when a config which affects the stack order is
     * updated in a Component.
     *
     * eg {@link Ext.Component#alwaysOnTop alwaysOnTop} or {@link Ext.Component#activeCounter activeCounter}
     */
    onComponentUpdate: function(comp) {
        if (this.zIndexStack.contains(comp)) {
            this.zIndexStack.sort();
        }
    },

    /**
     * @private
     * Called when the global hide and show events are fired. If it is one of our components, we must re-sort.
     */
    onComponentShowHide: function(comp) {
        var zIndexStack = this.zIndexStack;

        // If component has hidden, it will be filtered out, so we have to look in Collection's source if it's there.
        if (comp.isFloating() && !this.hidingAll && (zIndexStack.getSource() || zIndexStack).contains(comp)) {
            zIndexStack.itemChanged(comp, 'hidden');
            zIndexStack.sort();
            if (!comp.isVisible()) {
                comp.setActive(false);
            }
        }
    },

    _showModalMask: function(comp) {
        var me = this,
            zIndex = comp.el.getStyle('zIndex') - 4,
            maskTarget = comp.floatParent ? comp.floatParent.getTargetEl() : comp.container,
            mask = me.mask,
            shim = me.maskShim,
            viewSize, tabbableAttr;

        if (!mask) {
            // Create the mask at zero size so that it does not affect upcoming target measurements.
            mask = me.mask = Ext.getBody().createChild({
                //<debug>
                // tell the spec runner to ignore this element when checking if the dom is clean 
                'data-sticky': true,
                //</debug>
                role: 'presentation',
                cls: Ext.baseCSSPrefix + 'mask',
                style: 'height:0;width:0'
            });
            mask.setVisibilityMode(Ext.Element.DISPLAY);
            mask.on('click', me._onMaskClick, me);
        }

        mask.maskTarget = maskTarget;
        viewSize = me._getMaskBox();

        if (shim) {
            shim.setStyle('zIndex', zIndex);
            shim.show();
            shim.setBox(viewSize);
        }
        mask.setStyle('zIndex', zIndex);
        
        tabbableAttr = 'data-savedtabindex-' + maskTarget.getId();
        maskTarget.saveTabbableState(tabbableAttr);
        maskTarget.saveChildrenTabbableState(tabbableAttr);

        mask.show();
        mask.setBox(viewSize);
    },

    _hideModalMask: function() {
        var mask = this.mask,
            maskShim = this.maskShim,
            maskTarget, tabbableAttr;

        if (mask && mask.isVisible()) {
            maskTarget = mask.maskTarget;
            tabbableAttr = 'data-savedtabindex-' + maskTarget.getId();
            maskTarget.restoreChildrenTabbableState(tabbableAttr);
            maskTarget.restoreTabbableState(tabbableAttr);
            
            mask.maskTarget = undefined;
            mask.hide();
            if (maskShim) {
                maskShim.hide();
            }
        }
    },

    _onMaskClick: function() {
        if (this.front) {
            this.front.focus();
        }
    },

    _getMaskBox: function(){
        var maskTarget = this.mask.maskTarget;
        if (maskTarget.dom === document.body) {
            return {
                height: Math.max(document.body.scrollHeight, Ext.dom.Element.getDocumentHeight()),
                width: Math.max(document.body.scrollWidth, document.documentElement.clientWidth),
                x: 0,
                y: 0
            };
        } else {
            return maskTarget.getBox();
        } 
    },

    _onContainerResize: function() {
        var me = this,
            mask = me.mask,
            maskShim = me.maskShim,
            viewSize;

        if (mask && mask.isVisible()) {

            // At the new container size, the mask might be *causing* the scrollbar, so to find the valid
            // client size to mask, we must temporarily unmask the parent node.
            mask.hide();
            if (maskShim) {
                maskShim.hide();
            }

            viewSize = me._getMaskBox();
            if (maskShim) {
                maskShim.setSize(viewSize);
                maskShim.show();
            }
            mask.setSize(viewSize);
            mask.show();
        }
    },

    /**
     * Registers a floating {@link Ext.Component} with this ZIndexManager. This should not
     * need to be called under normal circumstances. Floating Components (such as Windows,
     * BoundLists and Menus) are automatically registered with a
     * {@link Ext.Component#zIndexManager zIndexManager} at render time.
     *
     * Where this may be useful is moving Windows between two ZIndexManagers. For example,
     * to bring the Ext.MessageBox dialog under the same manager as the Desktop's
     * ZIndexManager in the desktop sample app:
     *
     *     MyDesktop.getDesktop().getManager().register(Ext.MessageBox);
     *
     * @param {Ext.Component} comp The Component to register.
     */
    register : function(comp) {
        var me = this;

        if (comp.zIndexManager) {
            comp.zIndexManager.unregister(comp);
        }
        comp.zIndexManager = me;
        me.zIndexStack.add(comp);
    },

    /**
     * Unregisters a {@link Ext.Component} from this ZIndexManager. This should not
     * need to be called. Components are automatically unregistered upon destruction.
     * See {@link #register}.
     * @param {Ext.Component} comp The Component to unregister.
     */
    unregister : function(comp) {
        delete comp.zIndexManager;
        this.zIndexStack.remove(comp);
        this.onCollectionSort();
    },

    /**
     * Gets a registered Component by id.
     * @param {String/Object} id The id of the Component or a {@link Ext.Component} instance
     * @return {Ext.Component}
     */
    get : function(id) {
        return id.isComponent ? id : this.zIndexStack.get(id);
    },

   /**
     * Brings the specified Component to the front of any other active Components in this ZIndexManager.
     * @param {String/Object} comp The id of the Component or a {@link Ext.Component} instance.
     * @param {Boolean} preventFocus Pass `true` to prevent the component being focused when moved to front.
     * @return {Boolean} True if the component was brought to the front, else false
     * if it was already in front, or another component remains at the front due to configuration (eg
     * {@link Ext.util.Floating#alwaysOnTop}.
     */
    bringToFront : function(comp, preventFocus) {
        var me = this,
            zIndexStack = me.zIndexStack,
            oldFront = zIndexStack.last(),
            newFront,
            preventFocusSetting = comp.preventFocusOnActivate;

        // Refuse to perform this operation if there is an visible alwaysOnTop component
        if (zIndexStack.find('alwaysOnTop', true)) {
            return false;
        }

        comp = me.get(comp);

        // The onCollectionSorted reaction to the setting of activeCounter will focus by default.
        // Prevent it if requested.
        comp.preventFocusOnActivate = preventFocus;
        comp.setActiveCounter(++Ext.ZIndexManager.activeCounter);
        comp.preventFocusOnActivate = preventFocusSetting;
        newFront = zIndexStack.last();

        // Return true if the passed component was moved to the front and was not already at the front
        return (newFront === comp && newFront !== oldFront);
    },

    /**
     * Sends the specified Component to the back of other active Components in this ZIndexManager.
     * @param {String/Object} comp The id of the Component or a {@link Ext.Component} instance
     * @return {Ext.Component} The Component
     */
    sendToBack : function(comp) {
        comp = this.get(comp);
        comp.setActiveCounter(0);
        return comp;
    },

    /**
     * Hides all Components managed by this ZIndexManager.
     */
    hideAll : function() {
        var all = this.zIndexStack.getRange(),
            len = all.length,
            i;

        this.hidingAll = true;
        for (i = 0; i < len; i++) {
            all[i].hide();
        }
        this.hidingAll = true;
    },

    /**
     * @private
     * Temporarily hides all currently visible managed Components. This is for when
     * dragging a Window which may manage a set of floating descendants in its ZIndexManager;
     * they should all be hidden just for the duration of the drag.
     */
    hide: function() {
        var me = this,
            all = me.tempHidden = me.zIndexStack.getRange(),
            len = all.length,
            i,
            comp;

        for (i = 0; i < len; i++) {
            comp = all[i];
            comp.el.hide();
            comp.hidden = true;
        }
    },

    /**
     * @private
     * Restores temporarily hidden managed Components to visibility.
     */
    show: function() {
        var i,
            tempHidden = this.tempHidden,
            len = tempHidden ? tempHidden.length : 0,
            comp;

        for (i = 0; i < len; i++) {
            comp = tempHidden[i];
            comp.el.show();
            comp.hidden = false;
            comp.setPosition(comp.x, comp.y);
        }
        this.tempHidden = null;
    },

    /**
     * Gets the currently-active Component in this ZIndexManager.
     * @return {Ext.Component} The active Component
     */
    getActive : function() {
        return this.zIndexStack.last();
    },

    /**
     * Returns zero or more Components in this ZIndexManager using the custom search function passed to this method.
     * The function should accept a single {@link Ext.Component} reference as its only argument and should
     * return true if the Component matches the search criteria, otherwise it should return false.
     * @param {Function} fn The search function
     * @param {Object} [scope] The scope (`this` reference) in which the function is executed.
     * Defaults to the Component being tested. That gets passed to the function if not specified.
     * @return {Array} An array of zero or more matching floating components.
     */
    getBy : function(fn, scope) {
        return this.zIndexStack.filterBy(fn, scope).getRange();
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * @param {Function} fn The function to execute for each item
     * @param {Object} [scope] The scope (this reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    each : function(fn, scope) {
        this.zIndexStack.each(fn, scope);
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * The components are passed to the function starting at the bottom and proceeding to the top.
     * @param {Function} fn The function to execute for each item
     * @param {Object} scope (optional) The scope (this reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    eachBottomUp: function (fn, scope) {
        var stack = this.zIndexStack.getRange(),
            i,
            len = stack.length,
            comp;

        for (i = 0; i < len; i++) {
            comp = stack[i];
            if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                return;
            }
        }
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * The components are passed to the function starting at the top and proceeding to the bottom.
     * @param {Function} fn The function to execute for each item
     * @param {Object} [scope] The scope (this reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    eachTopDown: function (fn, scope) {
        var stack = this.zIndexStack.getRange(),
            i,
            comp;

        for (i = stack.length; i-- > 0; ) {
            comp = stack[i];
            if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                return;
            }
        }
    },

    destroy: function() {
        var me   = this,
            stack = me.zIndexStack.getRange(),
            len = stack.length,
            i;

        for (i = 0; i < len; i++) {
            Ext.destroy(stack[i]);
        }

        Ext.destroy(me.mask, me.maskShim, me.zIndexStack, me.globalListeners);
        me.zIndexStack = me.container = me.targetEl = me.globalListeners = null;
    }
}, function() {
    /**
     * @class Ext.WindowManager
     * @extends Ext.ZIndexManager
     *
     * The default global floating Component group that is available automatically.
     *
     * This manages instances of floating Components which were rendered programatically without
     * being added to a {@link Ext.container.Container Container}, and for floating Components
     * which were added into non-floating Containers.
     * 
     * *Floating* Containers create their own instance of ZIndexManager, and floating Components
     * added at any depth below there are managed by that ZIndexManager.
     *
     * @singleton
     */
    Ext.WindowManager = Ext.WindowMgr = new this();
});
