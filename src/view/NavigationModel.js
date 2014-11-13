/**
 * @class Ext.view.NavigationModel
 * @private
 * This class listens for key events fired from a {@link Ext.view.View DataView}, and moves the currently focused item
 * by adding the class {@link #focusCls}.
 */
Ext.define('Ext.view.NavigationModel', {
    mixins: [
        'Ext.util.Observable',
        'Ext.mixin.Factoryable'
    ],

    alias: 'view.navigation.default',

    /**
     * @event navigate Fired when a key has been used to navigate around the view.
     * @param {Object} event
     * @param {Ext.event.Event} keyEvent The key event which caused the navigation.
     * @param {Number} event.previousRecordIndex The previously focused record index.
     * @param {Ext.data.Model} event.previousRecord The previously focused record.
     * @param {HtmlElement} event.previousItem The previously focused view item.
     * @param {Number} event.recordIndex The newly focused record index.
     * @param {Ext.data.Model} event.record the newly focused record.
     * @param {HtmlElement} event.item the newly focused view item.
     */
    
    focusCls: Ext.baseCSSPrefix + 'view-item-focused',

    constructor: function() {
        this.mixins.observable.constructor.call(this);
    },

    bindComponent: function(view) {
        this.view = view;
        this.bindView(view);
    },

    bindView: function(view) {
        var me = this,
            listeners;

        me.initKeyNav(view);
        listeners = me.getStoreListeners();
        listeners.destroyable = true;
        me.dataSourceListeners = view.dataSource.on(listeners);
        listeners = me.getViewListeners();
        listeners.destroyable = true;
        me.viewListeners = view.on(listeners);
    },

    getStoreListeners: function() {
        var me = this;

        return {
            clear: me.onStoreClear,
            remove: me.onStoreRemove,
            scope: me
        };
    },

    getViewListeners: function() {
        var me = this;

        return {
            containermousedown: me.onContainerMouseDown,
            itemmousedown: me.onItemMouseDown,

            // We focus on click if the mousedown handler did not focus because it was a translated "touchstart" event.
            itemclick: me.onItemClick,
            itemcontextmenu: me.onItemMouseDown,
            refresh: me.onViewRefresh,
            scope: me
        };
    },

    initKeyNav: function(view) {
        var me = this;

        // Drive the KeyNav off the View's itemkeydown event so that beforeitemkeydown listeners may veto.
        // By default KeyNav uses defaultEventAction: 'stopEvent', and this is required for movement keys
        // which by default affect scrolling.
        me.keyNav = new Ext.util.KeyNav({
            target: view,
            ignoreInputFields: true,
            eventName: 'itemkeydown',
            processEvent: function(view, record, node, index, event) {
                return event;
            },
            up: me.onKeyUp,
            down: me.onKeyDown,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            pageDown: me.onKeyPageDown,
            pageUp: me.onKeyPageUp,
            home: me.onKeyHome,
            end: me.onKeyEnd,
            tab: me.onKeyTab,
            space: me.onKeySpace,
            enter: me.onKeyEnter,
            A: {
                ctrl: true,
                // Need a separate function because we don't want the key
                // events passed on to selectAll (causes event suppression).
                handler: me.onSelectAllKeyPress
            },
            scope: me
        });
    },

    addKeyBindings: function(binding) {
        this.keyNav.addBindings(binding);
    },

    enable: function() {
        this.keyNav.enable();
        this.disabled = false;
    },

    disable: function() {
        this.keyNav.disable();
        this.disabled = true;
    },

    onContainerMouseDown: function(view, mousedownEvent) {
        mousedownEvent.preventDefault();
    },

    onItemMouseDown: function(view, record, item, index, mousedownEvent) {
        var parentEvent = mousedownEvent.parentEvent;

        // If the ExtJS mousedown event is a translated touchstart, leave it until the click to focus
        if (!parentEvent || parentEvent.type !== 'touchstart') {
            this.setPosition(index);
        }
    },

    onItemClick: function(view, record, item, index, clickEvent) {
        // If the mousedown that initiated the click has navigated us to the correct spot, just fire the event
        if (this.record === record) {
            this.fireNavigateEvent(clickEvent);
        } else {
            this.setPosition(index, clickEvent);
        }
    },

    // Store clearing removes focus
    onStoreClear: function() {
        this.setPosition();
    },

    // On record remove, it might have bumped the selection upwards
    onStoreRemove: function() {
        this.setPosition(this.getRecord());
    },

    // Attempt to restore focus
    onViewRefresh: function() {
        this.setPosition(this.getRecord());
    },

    setPosition: function(recordIndex, keyEvent, suppressEvent, fromSelectionModel) {
        var me = this,
            view = me.view,
            selModel = view.getSelectionModel(),
            dataSource = view.dataSource,
            newRecord,
            newRecordIndex;

        if (recordIndex == null) {
            me.record = me.recordIndex = null;
        } else {
            if (typeof recordIndex === 'number') {
                newRecordIndex = Math.max(Math.min(recordIndex, dataSource.getCount() - 1), 0);
                newRecord = dataSource.getAt(recordIndex);
            }
            // row is a Record
            else if (recordIndex.isEntity) {
                newRecord = recordIndex;
                newRecordIndex = dataSource.indexOf(recordIndex);
            }
            // row is a grid row
            else if (recordIndex.tagName) {
                newRecord = view.getRecord(recordIndex);
                newRecordIndex = dataSource.indexOf(newRecord);
            }
            else {
                newRecord = newRecordIndex = null;
            }
        }

        // No movement; return early. Do not push current position into previous position, do not fire events.
        if (newRecordIndex === me.recordIndex) {
            return;
        }

        if (me.item) {
            me.item.removeCls(me.focusCls);
        }

        // Track the last position.
        // Used by SelectionModels as the navigation "from" position.
        me.previousRecordIndex = me.recordIndex;
        me.previousRecord = me.record;
        me.previousItem = me.item;

        // Update our position
        me.recordIndex = newRecordIndex;
        me.record      = newRecord;

        // Maintain lastFocused, so that on non-specific focus of the View, we can focus the correct descendant.
        if (newRecord) {
            me.focusPosition(me.recordIndex);
        } else {
            me.item = null;
        }

        if (!suppressEvent) {
            selModel.fireEvent('focuschange', selModel, me.previousRecord, me.record);
        }

        // If we have moved, fire an event
        if (!fromSelectionModel && keyEvent && me.record !== me.previousRecord) {
            me.fireNavigateEvent(keyEvent);
        }
    },

    /**
     * @private
     * Focuses the currently active position.
     * This is used on view refresh and on replace.
     */
    focusPosition: function(recordIndex) {
        var me = this;

        if (recordIndex != null && recordIndex !== -1) {
            if (recordIndex.isEntity) {
                recordIndex = me.view.dataSource.indexOf(recordIndex);
            }
            me.item = me.view.all.item(recordIndex);
            if (me.item) {
                me.lastFocused = me.record;
                me.focusItem(me.item);
            } else {
                me.record = null;
            }
        } else {
            me.item = null;
        }
    },

    /**
     * @template
     * @protected
     * Called to focus an item in the client {@link Ext.view.View DataView}.
     * The default implementation adds the {@link #focusCls} to the passed item focuses it.
     * Subclasses may choose to keep focus in another target.
     *
     * For example {@link Ext.view.BoundListKeyNav} maintains focus in the input field.
     * @param {type} item
     * @returns {undefined}
     */
    focusItem: function(item) {
        item.addCls(this.focusCls);
        item.focus();
    },

    getPosition: function() {
        return this.record ? this.recordIndex : null;
    },

    getRecordIndex: function() {
        return this.recordIndex;
    },

    getItem: function() {
        return this.item;
    },

    getRecord: function() {
        return this.record;
    },

    getLastFocused: function() {
        // No longer there. The caller must fall back to a default.
        if (this.view.dataSource.indexOf(this.lastFocused) === -1) {
            return null;
        }
        return this.lastFocused;
    },

    onKeyUp: function(keyEvent) {
        var newPosition = this.recordIndex - 1;
        if (newPosition < 0) {
            newPosition = this.view.all.getCount() - 1;
        }
        this.setPosition(newPosition, keyEvent);
    },

    onKeyDown: function(keyEvent) {
        var newPosition = this.recordIndex + 1;
        if (newPosition > this.view.all.getCount() - 1) {
            newPosition = 0;
        }
        this.setPosition(newPosition, keyEvent);
    },
    
    onKeyRight: function(keyEvent) {
        var newPosition = this.recordIndex + 1;
        if (newPosition > this.view.all.getCount() - 1) {
            newPosition = 0;
        }
        this.setPosition(newPosition, keyEvent);
    },
    
    onKeyLeft: function(keyEvent) {
        var newPosition = this.recordIndex - 1;
        if (newPosition < 0) {
            newPosition = this.view.all.getCount() - 1;
        }
        this.setPosition(newPosition, keyEvent);
    },
    
    onKeyPageDown: Ext.emptyFn,
    
    onKeyPageUp: Ext.emptyFn,
    
    onKeyHome: function(keyEvent) {
        this.setPosition(0, keyEvent);
    },
    
    onKeyEnd: function(keyEvent) {
        this.setPosition(this.view.all.getCount() - 1, keyEvent);
    },

    // Return true so that the key event is not cancelled.
    // See creation of KeyNav
    onKeyTab: Ext.returnTrue,
    
    onKeySpace: function(keyEvent) {
        this.fireNavigateEvent(keyEvent);
    },

    // ENTER emulates an itemclick event at the View level
    onKeyEnter: function(keyEvent) {
        keyEvent.view.fireEvent('itemclick', keyEvent.view, keyEvent.record, keyEvent.item, keyEvent.recordIndex, keyEvent);
    },

    onSelectAllKeyPress: function(keyEvent) {
        this.fireNavigateEvent(keyEvent);
    },

    fireNavigateEvent: function(keyEvent) {
        var me = this;

        me.fireEvent('navigate', {
            navigationModel: me,
            keyEvent: keyEvent,
            previousRecordIndex: me.previousRecordIndex,
            previousRecord: me.previousRecord,
            previousItem: me.previousItem, 
            recordIndex: me.recordIndex,
            record: me.record,
            item: me.item
        });
    },

    destroy: function() {
        Ext.destroy(this.dataSourceListeners, this.viewListeners);
    }
});