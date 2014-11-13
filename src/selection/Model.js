/**
 * Tracks what records are currently selected in a databound component.
 *
 * This is an abstract class and is not meant to be directly used. Databound UI widgets such as
 * {@link Ext.grid.Panel Grid} and {@link Ext.tree.Panel Tree} should subclass Ext.selection.Model
 * and provide a way to binding to the component.
 *
 * The abstract method `onSelectChange` should be implemented in these
 * subclasses to update the UI widget.
 */
Ext.define('Ext.selection.Model', {
    extend: 'Ext.util.Observable',
    alternateClassName: 'Ext.AbstractSelectionModel',
    requires: ['Ext.data.StoreManager'],
    mixins: [
        'Ext.util.StoreHolder'
    ],
    // lastSelected

    /**
     * @cfg {"SINGLE"/"SIMPLE"/"MULTI"} mode
     * Mode of selection.  Valid values are:
     *
     * - **"SINGLE"** - Only allows selecting one item at a time.  Use {@link #allowDeselect} to allow
     *   deselecting that item.  Also see {@link #toggleOnClick}. This is the default.
     * - **"SIMPLE"** - Allows simple selection of multiple items one-by-one. Each click in grid will either
     *   select or deselect an item.
     * - **"MULTI"** - Allows complex selection of multiple items using Ctrl and Shift keys.
     */

    /**
     * @cfg {Boolean} allowDeselect
     * Allow users to deselect a record in a DataView, List or Grid.
     * Only applicable when the {@link #mode} is 'SINGLE'.
     */
    allowDeselect: undefined,
    
    /**
     * @cfg {Boolean} toggleOnClick
     * `true` to toggle the selection state of an item when clicked.
     * Only applicable when the {@link #mode} is 'SINGLE'.
     * Only applicable when the {@link #allowDeselect} is 'true'.
     */
    toggleOnClick: true,

    /**
     * @property {Ext.util.MixedCollection} [selected=undefined]
     * A MixedCollection that maintains all of the currently selected records.
     * @readonly
     */
    selected: null,

    /**
     * @cfg {Boolean} [pruneRemoved=true]
     * Remove records from the selection when they are removed from the store.
     *
     * **Important:** When using {@link Ext.toolbar.Paging paging} or a {@link Ext.data.BufferedStore},
     * records which are cached in the Store's {@link Ext.data.Store#property-data data collection} may be removed from the Store when pages change,
     * or when rows are scrolled out of view. For this reason `pruneRemoved` should be set to `false` when using a buffered Store.
     *
     * Also, when previously pruned pages are returned to the cache, the records objects in the page will be
     * *new instances*, and will not match the instances in the selection model's collection. For this reason,
     * you MUST ensure that the Model definition's {@link Ext.data.Model#idProperty idProperty} references a unique
     * key because in this situation, records in the Store have their **IDs** compared to records in the SelectionModel
     * in order to re-select a record which is scrolled back into view.
     */
    pruneRemoved: true,
    
    suspendChange: 0,

    /**
     * @cfg {Boolean} [ignoreRightMouseSelection=false]
     * True to ignore selections that are made when using the right mouse button if there are
     * records that are already selected. If no records are selected, selection will continue
     * as normal
     */
    ignoreRightMouseSelection: false,

    /**
     * @event selectionchange
     * Fired after a selection change has occurred
     * @param {Ext.selection.Model} this
     * @param {Ext.data.Model[]} selected The selected records
     */

    /**
     * @event focuschange
     * Fired when a row is focused
     * @param {Ext.selection.Model} this
     * @param {Ext.data.Model} oldFocused The previously focused record
     * @param {Ext.data.Model} newFocused The newly focused record
     */

    constructor: function(cfg) {
        var me = this;

        cfg = cfg || {};
        Ext.apply(me, cfg);

        me.modes = {
            SINGLE: true,
            SIMPLE: true,
            MULTI: true
        };

        // sets this.selectionMode
        me.setSelectionMode(cfg.mode || me.mode);

        // maintains the currently selected records.
        me.selected = new Ext.util.MixedCollection();

        me.callParent(arguments);
    },

    // binds the store to the selModel.
    bindStore: function(store, initial){
        var me = this;
        me.mixins.storeholder.bindStore.apply(me, arguments);
        if (me.store && !initial) {
            me.refresh();
        }
    },

    getStoreListeners: function() {
        var me = this;
        return {
            add: me.onStoreAdd,
            clear: me.onStoreClear,
            remove: me.onStoreRemove,
            update: me.onStoreUpdate,
            idchanged: me.onIdChanged,
            load: me.onStoreLoad,
            refresh: me.onStoreRefresh
        };
    },
    
    suspendChanges: function(){
        ++this.suspendChange;
    },
    
    resumeChanges: function(){
        if (this.suspendChange) {
            --this.suspendChange;
        }
    },

    /**
     * Selects all records in the view.
     * @param {Boolean} suppressEvent True to suppress any select events
     */
    selectAll: function(suppressEvent) {
        var me = this,
            selections = me.store.getRange(),
            i = 0,
            len = selections.length,
            start = me.getSelection().length;

        me.suspendChanges();
        for (; i < len; i++) {
            me.doSelect(selections[i], true, suppressEvent);
        }
        me.resumeChanges();
        // fire selection change only if the number of selections differs
        if (!suppressEvent) {
            me.maybeFireSelectionChange(me.getSelection().length !== start);
        }
    },

    /**
     * Deselects all records in the view.
     * @param {Boolean} [suppressEvent] True to suppress any deselect events
     */
    deselectAll: function(suppressEvent) {
        var me = this,
            selections = me.getSelection(),
            selIndexes = {},
            store = me.store,
            start = selections.length,
            i, l, rec;

        // Cache selection records' indexes first to avoid
        // looking them up on every sort comparison below.
        // We can't rely on store.indexOf being fast because
        // for whatever reason the Store in question may force
        // sequential index lookup, which will result in O(n^2)
        // sort performance below.
        for (i = 0, l = selections.length; i < l; i++) {
            rec = selections[i];
            
            selIndexes[rec.id] = store.indexOf(rec);
        }
        
        // Sort the selections so that the events fire in
        // a predictable order like selectAll
        selections = Ext.Array.sort(selections, function(r1, r2){
            var idx1 = selIndexes[r1.id],
                idx2 = selIndexes[r2.id];
            
            // Don't check for equality since indexes will be unique
            return idx1 < idx2 ? -1 : 1;
        });
        
        me.suspendChanges();
        me.doDeselect(selections, suppressEvent);
        me.resumeChanges();
        // fire selection change only if the number of selections differs
        if (!suppressEvent) {
            me.maybeFireSelectionChange(me.getSelection().length !== start);
        }
    },

    getSelectionStart: function () {
        var me = this,
                view = me.view,
                nm;

        if (!me.selectionStart && view && view.rendered) {
            nm = view.getNavigationModel();
            if (nm) {
                me.setSelectionStart(nm.getRecord());
            }
        }

        return me.selectionStart;
    },

    setSelectionStart: function (selection) {
        this.selectionStart = selection;
    },

    // Provides differentiation of logic between MULTI, SIMPLE and SINGLE
    // selection modes. Requires that an event be passed so that we can know
    // if user held ctrl or shift.
    selectWithEvent: function(record, e) {
        var me = this,
            isSelected = me.isSelected(record),
            shift = e.shiftKey,
            ctrl = e.ctrlKey,
            start = shift ? (me.getSelectionStart()) : null,
            selected = me.getSelection(),
            len = selected.length,
            allowDeselect = me.allowDeselect,
            toDeselect, i, item;

        switch (me.selectionMode) {
            case 'MULTI':
                if (shift && start) {
                    me.selectRange(start, record, ctrl);
                } else if (ctrl && isSelected) {
                    me.doDeselect(record, false);
                } else if (ctrl) {
                    me.doSelect(record, true, false);
                } else if (isSelected && !shift && !ctrl && len > 1) {
                    toDeselect = [];
                    
                    for (i = 0; i < len; ++i) {
                        item = selected[i];
                        if (item !== record) {
                            toDeselect.push(item);    
                        }
                    }
                    
                    me.doDeselect(toDeselect);
                } else if (!isSelected) {
                    me.doSelect(record, false);
                }
                break;
            case 'SIMPLE':
                if (isSelected) {
                    me.doDeselect(record);
                } else {
                    me.doSelect(record, true);
                }
                break;
            case 'SINGLE':
                if (allowDeselect && !ctrl) {
                    allowDeselect = me.toggleOnClick;
                }
                if (allowDeselect && isSelected) {
                    me.doDeselect(record);
                } else {
                    me.doSelect(record, false);
                }
                break;
        }

        // selectionStart is a start point for shift/mousedown to create a range from.
        // If the mousedowned record was not already selected, then it becomes the
        // start of any range created from now on.
        // If we drop to no records selected, then there is no range start any more.
        if (!shift) {
            if (me.isSelected(record)) {
                me.selectionStart = record;
            } else {
                me.selectionStart = null;
            }
        }
    },

    /**
     * Checks whether a selection should proceed based on the ignoreRightMouseSelection
     * option.
     * @private
     * @param {Ext.event.Event} e The event
     * @return {Boolean} `true` if the selection should not proceed.
     */
    vetoSelection: function(e) {
        if (e.type !== 'keydown' && e.button !== 0) {
            if (this.ignoreRightMouseSelection || this.isSelected(e.record)) {
                return true;
            }
        } else {
            return e.type === 'mousedown';
        }
    },

    // Private
    // Called in response to a FocusModel's navigate event when a new record has been navigated to.
    // Event is passed so that shift and ctrl can be handled.
    onNavigate: function(e) {
        var me = this,
            keyEvent = e.keyEvent,
            ctrlKey = keyEvent.ctrlKey,
            recIdx = e.recordIndex,
            record = e.record,
            lastFocused = e.previousRecord,
            isSelected = me.isSelected(record),
            from = (me.selectionStart && me.isSelected(e.previousRecord)) ? me.selectionStart : (me.selectionStart = e.previousRecord),
            fromIdx = e.previousRecordIndex,
            key = keyEvent.getCharCode(),
            isSpace = key === keyEvent.SPACE,
            direction = key === keyEvent.UP || key === keyEvent.PAGE_UP ? 'up' : (key === keyEvent.DOWN || key === keyEvent.DOWN ? 'down' : null);

        // Enforce the ignoreRightMouseSelection setting.
        // Enforce presence of a record.
        // Enforce selection upon click, not mousedown.
        if (!record || me.vetoSelection(keyEvent)) {
            return;
        }

        switch (me.selectionMode) {
            case 'MULTI':

                if (key === keyEvent.A && ctrlKey) {
                    me.selectRange(0, me.store.getCount() - 1);
                }
                else if (isSpace) {
                    // SHIFT+SPACE, select range
                    if (keyEvent.shiftKey) {
                        me.selectRange(from, record, ctrlKey);
                    } else {
                        // SPACE pessed on a selected item: deselect but leave it focused.
                        // keyEvent.ctrlKey means "keep existing"
                        if (isSelected) {
                            me.doDeselect(record, ctrlKey);
                        }
                        // SPACE on an unselected item: select it
                        else {
                            me.doSelect(record, ctrlKey);
                        }
                    }
                }

                // SHIFT-navigate selects intervening rows from the last selected (or last focused) item and target item
                else if (keyEvent.shiftKey && from) {

                    // If we are heading back TOWARDS the start rec - deselect skipped range...
                    if (direction === 'up' && fromIdx <= recIdx) {
                        me.deselectRange(lastFocused, recIdx + 1);
                    }
                    else if (direction === 'down' && fromIdx >= recIdx) {
                        me.deselectRange(lastFocused, recIdx - 1);
                    }

                    // If we are heading AWAY from start point, or no CTRL key, so just select the range and let the CTRL control "keepExisting"...
                    else if (from !== record) {
                        me.selectRange(from, record, ctrlKey);
                    }
                    me.lastSelected = record;
                }

                else if (key) {
                    if (!ctrlKey) {
                        me.doSelect(record, false);
                    }
                } else {
                    me.selectWithEvent(record, keyEvent);
                }
                break;
            case 'SIMPLE':
                if (isSelected) {
                    me.doDeselect(record);
                } else {
                    me.doSelect(record, true);
                }
                break;
            case 'SINGLE':
                // Space hit
                if (isSpace) {
                    if (isSelected) {
                        if (me.allowDeselect) {
                            me.doDeselect(record);
                        }
                    } else {
                        me.doSelect(record);
                    }
                }

                // CTRL-navigation does not select
                else if (ctrlKey) {
                    break;
                }

                // if allowDeselect is on and this record isSelected and we just SPACED on it, deselect it
                else if (isSpace && me.allowDeselect && isSelected) {
                    me.doDeselect(record);
                }

                // select the record and do NOT maintain existing selections
                else {
                    me.doSelect(record, false);
                }
                break;
        }

        // selectionStart is a start point for shift/mousedown to create a range from.
        // If the mousedowned record was not already selected, then it becomes the
        // start of any range created from now on.
        // If we drop to no records selected, then there is no range start any more.
        if (!keyEvent.shiftKey) {
            if (me.isSelected(record)) {
                me.selectionStart = record;
            }
        }
    },

    /**
     * Selects a range of rows if the selection model {@link #isLocked is not locked}.
     * All rows in between startRow and endRow are also selected.
     * @param {Ext.data.Model/Number} startRow The record or index of the first row in the range
     * @param {Ext.data.Model/Number} endRow The record or index of the last row in the range
     * @param {Boolean} keepExisting (optional) True to retain existing selections
     */
    selectRange: function(startRow, endRow, keepExisting) {
        var me = this,
            store = me.store,
            selected = me.selected.items,
            result, i, len, toSelect, toDeselect, idx, rec;

        if (me.isLocked()){
            return;
        }

        result = me.normalizeRowRange(startRow, endRow);
        startRow = result[0];
        endRow = result[1];

        toSelect = [];
        for (i = startRow; i <= endRow; i++){
            if (!me.isSelected(store.getAt(i))) {
                toSelect.push(store.getAt(i));
            }
        }
        
        if (!keepExisting) {
            // prevent selectionchange from firing
            toDeselect = [];
            me.suspendChanges();
            
            for (i = 0, len = selected.length; i < len; ++i) {
                rec = selected[i];
                idx = store.indexOf(rec);
                if (idx < startRow || idx > endRow) {
                    toDeselect.push(rec);
                }
            }
            
            for (i = 0, len = toDeselect.length; i < len; ++i) {
                me.doDeselect(toDeselect[i]);
            }
            me.resumeChanges();
        }
        
        if (toSelect.length) {
            me.doMultiSelect(toSelect, true);
        } else {
            me.maybeFireSelectionChange(toDeselect.length > 0);
        }
    },

    /**
     * Deselects a range of rows if the selection model {@link #isLocked is not locked}.
     * @param {Ext.data.Model/Number} startRow The record or index of the first row in the range
     * @param {Ext.data.Model/Number} endRow The record or index of the last row in the range
     */
    deselectRange : function(startRow, endRow) {
        var me = this,
            store = me.store,
            result, i, toDeselect, record;

        if (me.isLocked()){
            return;
        }

        result = me.normalizeRowRange(startRow, endRow);
        startRow = result[0];
        endRow = result[1];

        toDeselect = [];
        for (i = startRow; i <= endRow; i++) {
            record = store.getAt(i);
            if (me.isSelected(record)) {
                toDeselect.push(record);
            }
        }
        if (toDeselect.length) {
            me.doDeselect(toDeselect);
        }
    },
    
    normalizeRowRange: function(startRow, endRow) {
        var store = this.store,
            tmp;
        
        if (!Ext.isNumber(startRow)) {
            startRow = store.indexOf(startRow);
        }
        startRow = Math.max(0, startRow);
        
        if (!Ext.isNumber(endRow)) {
            endRow = store.indexOf(endRow);
        }
        endRow = Math.min(endRow, store.getCount() - 1);
        
        // swap values
        if (startRow > endRow){
            tmp = endRow;
            endRow = startRow;
            startRow = tmp;
        }    
        
        return [startRow, endRow];
    },

    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} [keepExisting=false] True to retain existing selections
     * @param {Boolean} [suppressEvent=false] True to not fire a select event
     */
    select: function(records, keepExisting, suppressEvent) {
        // Automatically selecting eg store.first() or store.last() will pass undefined, so that must just return;
        if (Ext.isDefined(records) && !(Ext.isArray(records) && !records.length)) {
            this.doSelect(records, keepExisting, suppressEvent);
        }
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} [suppressEvent=false] True to not fire a deselect event
     */
    deselect: function(records, suppressEvent) {
        this.doDeselect(records, suppressEvent);
    },

    doSelect: function(records, keepExisting, suppressEvent) {
        var me = this,
            record;

        if (me.locked || !me.store) {
            return;
        }
        if (typeof records === "number") {
            record = me.store.getAt(records);
            // No matching record, jump out
            if (!record) {
                return;
            }
            records = [record];
        }
        if (me.selectionMode === "SINGLE" && records) {
            record = records.length ? records[0] : records;
            me.doSingleSelect(record, suppressEvent);
        } else {
            me.doMultiSelect(records, keepExisting, suppressEvent);
        }
    },

    doMultiSelect: function(records, keepExisting, suppressEvent) {
        var me = this,
            selected = me.selected,
            change = false,
            result, i, len, record, commit,
            view = me.view,
            nm;

        if (me.locked) {
            return;
        }

        records = !Ext.isArray(records) ? [records] : records;
        len = records.length;
        if (!keepExisting && selected.getCount() > 0) {
            result = me.deselectDuringSelect(records, selected.getRange(), suppressEvent);
            if (result[0]) {
                // We had a failure during seletion, so jump out
                // Fire selection change if we did deselect anything
                me.maybeFireSelectionChange(result[1] > 0 && !suppressEvent);
                return;
            } else {
                // Means something has been deselected, so we've had a change
                change = result[1] > 0;
            }
        }

        commit = function() {
            selected.add(record);
            change = true;
        };

        for (i = 0; i < len; i++) {
            record = records[i];
            if (me.isSelected(record)) {
                continue;
            }

            me.onSelectChange(record, true, suppressEvent, commit);
        }
        me.lastSelected = record;
        
        if (view && view.rendered && !suppressEvent && !me.preventFocus) {
            nm = view.getNavigationModel();
            if (nm) {
                nm.setPosition(record, null, null, suppressEvent, true);
            }
        }
        // fire selchange if there was a change and there is no suppressEvent flag
        me.maybeFireSelectionChange(change && !suppressEvent);
    },
    
    deselectDuringSelect: function(toSelect, selected, suppressEvent) {
        var me = this,
            len = selected.length,
            changed = 0,
            failed = false,
            item, i;
            
        // Prevent selection change events from firing, will happen during select
        me.suspendChanges();
        for (i = 0; i < len; ++i) {
            item = selected[i];
            if (!Ext.Array.contains(toSelect, item)) {
                if (me.doDeselect(item, suppressEvent)) {
                    ++changed;
                } else {
                    failed = true;
                }
            }
        }
        me.resumeChanges();
        
        return [failed, changed];
    },

    // records can be an index, a record or an array of records
    doDeselect: function(records, suppressEvent) {
        var me = this,
            selected = me.selected,
            i = 0,
            len, record,
            attempted = 0,
            accepted = 0,
            commit;

        if (me.locked || !me.store) {
            return false;
        }

        if (typeof records === "number") {
            // No matching record, jump out
            record = me.store.getAt(records);
            if (!record) {
                return false;
            }
            records = [record];
        } else if (!Ext.isArray(records)) {
            records = [records];
        }

        commit = function() {
            ++accepted;
            selected.remove(record);
        };

        len = records.length;

        me.suspendChanges();
        for (; i < len; i++) {
            record = records[i];
            if (me.isSelected(record)) {
                if (me.lastSelected === record) {
                    me.lastSelected = selected.last();
                }
                ++attempted;
                me.onSelectChange(record, false, suppressEvent, commit);
            }
        }
        me.resumeChanges();

        // fire selchange if there was a change and there is no suppressEvent flag
        me.maybeFireSelectionChange(accepted > 0 && !suppressEvent);
        return accepted === attempted;
    },

    doSingleSelect: function(record, suppressEvent) {
        var me = this,
            view = me.view,
            nm,
            changed = false,
            selected = me.selected,
            commit;

        if (me.locked) {
            return;
        }
        // already selected.
        // should we also check beforeselect?
        if (me.isSelected(record)) {
            return;
        }

        commit = function() {
            // Deselect previous selection.
            if (selected.getCount()) {
                me.suspendChanges();
                if (!me.doDeselect(me.lastSelected, suppressEvent)) {
                    me.resumeChanges();
                    return false;
                }
                me.resumeChanges();
            }

            selected.add(record);
            me.lastSelected = record;
            changed = true;
        };

        me.onSelectChange(record, true, suppressEvent, commit);

        if (changed) {
            if (view && view.rendered && !suppressEvent && !me.preventFocus) {
                nm = view.getNavigationModel();
                if (nm) {
                    nm.setPosition(record, null, null, suppressEvent, true);
                }
            }
            me.maybeFireSelectionChange(!suppressEvent);
        }
    },

    // fire selection change as long as true is not passed
    // into maybeFireSelectionChange
    maybeFireSelectionChange: function(fireEvent) {
        var me = this;
        if (fireEvent && !me.suspendChange) {
            me.fireEvent('selectionchange', me, me.getSelection());
        }
    },

    /**
     * @return {Ext.data.Model} Returns the last selected record.
     */
    getLastSelected: function() {
        return this.lastSelected;
    },

    /**
     * Returns an array of the currently selected records.
     * @return {Ext.data.Model[]} The selected records
     */
    getSelection: function() {
        return this.selected.getRange();
    },

    /**
     * Returns the current selectionMode.
     * @return {String} The selectionMode: 'SINGLE', 'MULTI' or 'SIMPLE'.
     */
    getSelectionMode: function() {
        return this.selectionMode;
    },

    /**
     * Sets the current selectionMode.
     * @param {String} selMode 'SINGLE', 'MULTI' or 'SIMPLE'.
     */
    setSelectionMode: function(selMode) {
        selMode = selMode ? selMode.toUpperCase() : 'SINGLE';
        // set to mode specified unless it doesnt exist, in that case
        // use single.
        this.selectionMode = this.modes[selMode] ? selMode : 'SINGLE';
    },

    /**
     * Returns true if the selections are locked.
     * @return {Boolean}
     */
    isLocked: function() {
        return this.locked;
    },

    /**
     * Locks the current selection and disables any changes from happening to the selection.
     * @param {Boolean} locked  True to lock, false to unlock.
     */
    setLocked: function(locked) {
        this.locked = !!locked;
    },

    /**
     * Returns true if the specified row is selected.
     * @param {Ext.data.Model/Number} from The start of the range to check.
     * @param {Ext.data.Model/Number} to The end of the range to check.
     * @return {Boolean}
     */
    isRangeSelected: function(startRow, endRow) {
        var me = this,
            store = me.store,
            i, result;

        result = me.normalizeRowRange(startRow, endRow);
        startRow = result[0];
        endRow = result[1];

        // Loop through. If any of the range is not selected, the answer is false.
        for (i = startRow; i <= endRow; i++) {
            if (!me.isSelected(store.getAt(i))) {
                return false;
            }
        }
        return true;
    },

    /**
     * Returns true if the specified row is selected.
     * @param {Ext.data.Model/Number} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected: function (record) {
        record = Ext.isNumber(record) ? this.store.getAt(record) : record;
        return this.selected.contains(record);
    },

    /**
     * Returns true if there are any a selected records.
     * @return {Boolean}
     */
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    pruneIf: function() {
        var me = this,
            selected = me.selected,
            store = me.store,
            toRemove = [],
            len = selected.length,
            i, item;

        if (me.pruneRemoved) {
            for (i = 0; i < len; i++) {
                item = selected.getAt(i);
                if (store.indexOfId(item.id) === -1) {
                    toRemove.push(item);
                }
            }
            if (toRemove.length) {
                for (i = 0, len = toRemove.length; i < len; i++) {
                    item = toRemove[i];
                    selected.remove(item);
                    me.onPrune(item);
                }
                me.maybeFireSelectionChange(true);
            }
        }
    },

    onPrune: Ext.emptyFn,

    refresh: function() {
        var me = this,
            store = me.store,
            rec,
            toBeSelected = [],
            toBeReAdded = [],
            oldSelections = me.getSelection(),
            len = oldSelections.length,
            selection,
            change,
            i = 0;

        // Not been bound yet.
        if (!store) {
            return;
        }

        // Add currently records to the toBeSelected list if present in the Store
        // If they are not present, and pruneRemoved is false, we must still retain the record
        for (; i < len; i++) {
            selection = oldSelections[i];
            if (store.indexOf(selection) !== -1) {
                toBeSelected.push(selection);
            }

            // Selected records no longer represented in Store must be retained
            else if (!me.pruneRemoved) {
                // See if a record by the same ID exists. If so, select it
                rec = store.getById(selection.getId());
                if (rec) {
                    toBeSelected.push(rec);
                }
                // If it does not exist, we have to re-add it to the selection
                else {
                    toBeReAdded.push(selection);
                }
            }

            // In single select mode, only one record may be selected
            if (me.mode === 'SINGLE' && toBeReAdded.length) {
                break;
            }
        }

        // there was a change from the old selected and
        // the new selection
        if (me.selected.getCount() !== (toBeSelected.length + toBeReAdded.length)) {
            change = true;
        }

        me.clearSelections();

        if (toBeSelected.length) {
            // perform the selection again
            me.doSelect(toBeSelected, false, true);
        }

        // If some of the selections were not present in the Store, but pruneRemoved is false, we must add them back
        if (toBeReAdded.length) {
            me.selected.addAll(toBeReAdded);

            // No records reselected.
            if (!me.lastSelected) {
                me.lastSelected = toBeReAdded[toBeReAdded.length - 1];
            }
        }

        me.maybeFireSelectionChange(change);
    },

    /**
     * A fast reset of the selections without firing events, updating the ui, etc.
     * For private usage only.
     * @private
     */
    clearSelections: function() {
        // reset the entire selection to nothing
        this.selected.clear();
        this.lastSelected = null;
    },

    // when a record is added to a store
    onStoreAdd: Ext.emptyFn,

    // when a store is cleared remove all selections
    // (if there were any)
    onStoreClear: function() {
        if (this.selected.getCount() > 0) {
            this.clearSelections();
            this.maybeFireSelectionChange(true);
        }
    },

    // prune records from the SelectionModel if
    // they were selected at the time they were
    // removed.
    onStoreRemove: function(store, records, index, isMove) {
        var me = this;

        // If the selection start point is among records being removed, we no longer have a selection start point.
        if (me.selectionStart && Ext.Array.contains(records, me.selectionStart)) {
            me.selectionStart = null;
        }

        if (isMove || me.locked || !me.pruneRemoved) {
            return;
        }
        me.deselect(records);
    },

    // @private
    // Called by subclasses to deselect records upon detection of deletion from the store
    deselectDeletedRecords: function(records) {
        var me = this,
            selected = me.selected,
            i, length = records.length,
            removed = 0,
            record;

        // Deselect records which were removed
        for (i = 0; i < length; i++) {
            record = records[i];
            if (selected.remove(record)) {
                if (me.lastSelected === record) {
                    me.lastSelected = null;
                }
                ++removed;
            }
        }
        if (removed) {
            me.maybeFireSelectionChange(true);
        }
    },

    /**
     * Returns the count of selected records.
     * @return {Number} The number of selected records
     */
    getCount: function() {
        return this.selected.getCount();
    },

    // Called when the contents of the node are updated, perform any processing here.
    onUpdate: Ext.emptyFn,

    // cleanup.
    destroy: function() {
        this.clearListeners();    
        this.clearSelections();
        this.bindStore(null);
    },

    // if records are updated
    onStoreUpdate: Ext.emptyFn,

    onIdChanged: function(store, rec, oldId, newId) {
        this.selected.updateKey(oldId, newId);
    },

    onStoreRefresh: function(){
        var me = this,
            store = me.getStore(),
            selected = me.selected,
            lastSelected = me.lastSelected,
            items, length, i, selectedRec, rec;
            
        if (me.store.isBufferedStore) {
            return;
        }

        items = selected.items;
        length = items.length;
         
        if (lastSelected) {
            me.lastSelected = store.getById(lastSelected.id);
        }
        
        for (i = 0; i < length; ++i) {
            selectedRec = items[i];

            // Is the selected record ID still present in the store?
            rec = store.getById(selectedRec.id);
            
            // Yes, ensure the instance is crrect
            if (rec) {
                me.selected.replace(rec);
            }
            // No, remove it from the selection
            else {
                me.selected.remove(selectedRec);
            }
        }   
    },

    /**
     * @abstract
     * @private
     */
    onStoreLoad: Ext.emptyFn,

    // @abstract
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me = this,
            eventName = isSelected ? 'select' : 'deselect';

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record)) !== false &&
           commitFn() !== false) {

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record);
            }
        }   
    },

    // @abstract
    onEditorKey: Ext.emptyFn,

    // @abstract
    beforeViewRender: function(view) {
        this.views = this.views || [];
        this.views.push(view);
    },
    
    resolveListenerScope: function(defaultScope) {
        var view = this.view,
            scope;
            
        if (view) {
            scope = view.resolveListenerScope(defaultScope);
        }  
        return scope || this.callParent([defaultScope]);
    },

    onVetoUIEvent: Ext.emptyFn,

    // @abstract
    bindComponent: Ext.emptyFn
});
