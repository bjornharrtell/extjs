/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
*/
/**
 * Private record store class which takes the place of the view's data store to provide a grouped
 * view of the data when the Grouping feature is used.
 * 
 * Relays granular mutation events from the underlying store as refresh events to the view.
 * 
 * On mutation events from the underlying store, updates the summary rows by firing update events on the corresponding
 * summary records.
 * @private
 */
Ext.define('Ext.grid.feature.GroupStore', {
    extend: 'Ext.util.Observable',

    isStore: true,

    constructor: function(groupingFeature, store) {
        var me = this;

        me.superclass.constructor.apply(me, arguments);
        me.groupingFeature = groupingFeature;
        me.bindStore(store);
        me.processStore(store);
        me.view.dataSource = me;
    },

    bindStore: function(store) {
        var me = this;

        if (me.store) {
            Ext.destroy(me.storeListeners);
            me.store = null;
        }
        if (store) {
            me.storeListeners = store.on({
                bulkremove: me.onBulkRemove,
                add: me.onAdd,
                update: me.onUpdate,
                refresh: me.onRefresh,
                clear: me.onClear,
                scope: me,
                destroyable: true
            });
            me.store = store;
        }
    },

    processStore: function(store) {
        var me = this,
            Model = store.model,
            groups = store.getGroups(),
            groupCount = groups.length,
            i,
            group,
            groupPlaceholder,
            data = me.data,
            oldGroupCache = this.groupingFeature.groupCache,
            groupCache = this.groupingFeature.groupCache = {},
            collapseAll = me.groupingFeature.startCollapsed;

        if (data) {
            data.clear();
        } else {
            data = me.data = new Ext.util.MixedCollection(false, Ext.data.Store.recordIdFn);
        }

        for (i = 0; i < groupCount; i++) {

            // group contains eg
            // { children: [childRec0, childRec1...], name: <group field value for group> }
            group = groups[i];

            // Cache group information by group name
            groupCache[group.name] = group;
            group.isCollapsed = collapseAll || (oldGroupCache[group.name] && oldGroupCache[group.name].isCollapsed);

            // If group is collapsed, then represent it by one dummy row which is never visible, but which acts
            // as a start and end group trigger.
            if (group.isCollapsed) {
                group.placeholder = groupPlaceholder = new Model(null, 'group-' + group.name + '-placeholder');
                groupPlaceholder.set(me.getGroupField(), group.name);
                groupPlaceholder.rows = groupPlaceholder.children = group.children;
                data.add(groupPlaceholder);
            }

            // Expanded group - add the group's child records.
            else {
                data.insert(me.data.length, group.children);
            }
        }
    },
    
    isCollapsed: function(name) {
        return this.groupingFeature.groupCache[name].isCollapsed; 
    },

    isInCollapsedGroup: function(record) {
        var groupData;

        if (this.store.isGrouped() && (groupData = this.groupingFeature.groupCache[record.get(this.getGroupField())])) {
            return groupData.isCollapsed || false;
        }
        return false;
    },

    getCount: function() {
        return this.data.getCount();
    },

    getTotalCount: function() {
        return this.data.getCount();
    },

    // This class is only created for fully loaded, non-buffered stores
    rangeCached: function() {
        return true;
    },

    getRange: function(start, end, options) {
        var result = this.data.getRange(start, end);

        if (options && options.callback) {
            options.callback.call(options.scope || this, result, start, end, options);
        }
        return result;
    },

    getAt: function(index) {
        return this.getRange(index, index)[0];
    },

    getById: function(id) {
        return this.store.getById(id);
    },

    // Find index of record in group store.
    // If it's in a collapsed group, then it's -1, not present
    // Otherwise, loop through groups keeping tally of intervening records.
    indexOf: function(record, viewOnly) {
        var me = this,
            groupField,
            groups,
            groupCount,
            i,
            group,
            groupIndex,
            result = 0;

        if (record && !me.isInCollapsedGroup(record)) {
            groupField = me.store.groupField;
            groups = me.store.getGroups();
            groupCount = groups.length;
            for (i = 0; i < groupCount; i++) {

                // group contains eg
                // { children: [childRec0, childRec1...], name: <group field value for group> }
                group = groups[i];
                if (group.name === record.get(groupField)) {
                    groupIndex = Ext.Array.indexOf(group.children, record);
                    return result + groupIndex;
                }

                result += (viewOnly && this.isCollapsed(group.name)) ? 1 : group.children.length;
            }
        }
        return -1;
    },

    onRefresh: function(store) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onBulkRemove: function(store, records, indices) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onClear: function(store, records, startIndex) {
        this.processStore(this.store);
        this.fireEvent('clear', this);
    },

    onAdd: function(store, records, startIndex) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onUpdate: function(store, record, operation, modifiedFieldNames) {
        var me = this,
            groupInfo = me.groupingFeature.getRecordGroup(record),
            firstRec, lastRec;

        // The grouping field value has been modified.
        // This could either move a record from one group to another, or introduce a new group.
        // Either way, we have to refresh the grid
        if (store.isGrouped()) {
            if (modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, me.groupingFeature.getGroupField())) {
                return me.onRefresh(me.store);
            }

            // Fire an update event on the collapsed group placeholder record
            if (groupInfo.isCollapsed) {
                me.fireEvent('update', me, groupInfo.placeholder);
            }

            // Not in a collapsed group, fire update event on the modified record
            // and, if in a grouped store, on the first and last records in the group.
            else {
                Ext.suspendLayouts();

                // Propagate the record's update event
                me.fireEvent('update', me, record, operation, modifiedFieldNames);

                // Fire update event on first and last record in group (only once if a single row group)
                // So that custom header TPL is applied, and the summary row is updated
                firstRec = groupInfo.children[0];
                lastRec = groupInfo.children[groupInfo.children.length - 1];

                // Do not pass modifiedFieldNames so that the TableView's shouldUpdateCell call always returns true.
                if (firstRec !== record) {
                    me.fireEvent('update', me, firstRec, 'edit');
                }
                if (lastRec !== record && lastRec !== firstRec) {
                    me.fireEvent('update', me, lastRec, 'edit');
                }
                Ext.resumeLayouts(true);
            }
        }
    }
});