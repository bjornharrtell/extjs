/**
 * This abstract base class is used by grid filters that have a three
 * {@link Ext.data.Store#cfg-filters store filter}.
 * @protected
 */
Ext.define('Ext.grid.filters.filter.TriFilter', {
    extend: 'Ext.grid.filters.filter.Base',

    /**
     * @property {String[]} menuItems
     * The items to be shown in this menu.  Items are added to the menu
     * according to their position within this array.
     * Defaults to:
     *      menuItems : ['lt', 'gt', '-', 'eq']
     * @private
     */
    menuItems: ['lt', 'gt', '-', 'eq'],

    constructor: function (config) {
        var me = this,
            stateful = false,
            filter = {},
            filterGt, filterLt, filterEq, value, operator;

        me.callParent([config]);

        value = me.value;

        filterLt = me.getStoreFilter('lt');
        filterGt = me.getStoreFilter('gt');
        filterEq = me.getStoreFilter('eq');

        if (filterLt || filterGt || filterEq) {
            // This filter was restored from stateful filters on the store so enforce it as active.
            stateful = me.active = true;
            if (filterLt) {
                me.onStateRestore(filterLt);
            }
            if (filterGt) {
                me.onStateRestore(filterGt);
            }
            if (filterEq) {
                me.onStateRestore(filterEq);
            }
        } else {
            // Once we've reached this block, we know that this grid filter doesn't have a stateful filter, so if our
            // flag to begin saving future filter mutations is set we know that any configured filter must be nulled
            // out or it will replace our stateful filter.
            if (me.grid.stateful && me.getGridStore().saveStatefulFilters) {
                value = undefined;
            }

            // TODO: What do we mean by value === null ?
            me.active = !!value;
        }

        // Note that stateful filters will have already been gotten above. If not, or if all filters aren't stateful, we
        // need to make sure that there is an actual filter instance created, with or without a value.
        //
        // Note use the alpha alias for the operators ('gt', 'lt', 'eq') so they map in Filters.onFilterRemove().
        filter.lt = filterLt || me.createFilter({
            operator: 'lt',
            value: (!stateful && value && value.lt) || null
        }, 'lt');

        filter.gt = filterGt || me.createFilter({
            operator: 'gt',
            value: (!stateful && value && value.gt) || null
        }, 'gt');

        filter.eq = filterEq || me.createFilter({
            operator: 'eq',
            value: (!stateful && value && value.eq) || null
        }, 'eq');

        me.filter = filter;

        if (me.active) {
            me.setColumnActive(true);
            if (!stateful) {
                for (operator in value) {
                    me.addStoreFilter(me.filter[operator]);
                }
            }
            // TODO: maybe call this.activate?
        }
    },

    /**
     * @private
     * This method will be called when a column's menu trigger is clicked as well as when a filter is
     * activated. Depending on the caller, the UI and the store will be synced.
     */
    activate: function (showingMenu) {
        var me = this,
            filters = this.filter,
            fields = me.fields,
            filter, field, operator, value;

        if (me.preventFilterRemoval) {
            return;
        }

        for (operator in filters) {
            filter = filters[operator];
            field = fields[operator];
            value = filter.getValue();

            if (value) {
                field.setValue(value);
                field.up('menuitem').setChecked(true, /*suppressEvents*/ true);

                // Note that we only want to add store filters when they've been removed, which means that when Filter.showMenu() is called
                // we DO NOT want to add a filter as they've already been added!
                if (!showingMenu) {
                    me.addStoreFilter(filter);
                }
            }
        }
    },

    /**
     * @private
     * This method will be called when a filter is deactivated. The UI and the store will be synced.
     */
    deactivate: function () {
        var me = this,
            filters = me.filter,
            f, filter;

        if (!me.hasActiveFilter() || me.preventFilterRemoval) {
            return;
        }

        me.preventFilterRemoval = true;

        for (f in filters) {
            filter = filters[f];

            if (filter.getValue()) {
                me.removeStoreFilter(filter);
            }
        }

        me.preventFilterRemoval = false;
    },

    hasActiveFilter: function () {
        var active = false,
            filters = this.filter,
            filterCollection = this.getGridStore().getFilters(),
            prefix = this.getBaseIdPrefix(),
            filter;

        if (filterCollection.length) {
            for (filter in filters) {
                if (filterCollection.get(prefix + '-' + filter)) {
                    active = true;
                    break;
                }
            }
        }

        return active;
    },

    onFilterRemove: function (operator) {
        var me = this,
            value;

        // Filters can be removed at any time, even before a column filter's menu has been created (i.e.,
        // store.clearFilter()). So, only call setValue() if the menu has been created since that method
        // assumes that menu fields exist.
        if (!me.menu && !me.hasActiveFilter()) {
            me.active = false;
        } else if (me.menu) {
            value = {};
            value[operator] = null;
            me.setValue(value);
        }
    },

    onStateRestore: Ext.emptyFn,

    setValue: function (value) {
        var me = this,
            fields = me.fields,
            filters = me.filter,
            add = [],
            remove = [],
            active = false,
            filterCollection = me.getGridStore().getFilters(),
            field, filter, v, i, len;

        if (me.preventFilterRemoval) {
            return;
        }

        me.preventFilterRemoval = true;

        if ('eq' in value) {
            v = filters.lt.getValue();
            if (v || v === 0) {
                remove.push(fields.lt);
            }

            v = filters.gt.getValue();
            if (v || v === 0) {
                remove.push(fields.gt);
            }

            v = value.eq;
            if (v || v === 0) {
                add.push(fields.eq);
                filters.eq.setValue(v);
            } else {
                remove.push(fields.eq);
            }
        } else {
            v = filters.eq.getValue();
            if (v || v === 0) {
                remove.push(fields.eq);
            }

            if ('lt' in value) {
                v = value.lt;
                if (v || v === 0) {
                    add.push(fields.lt);
                    filters.lt.setValue(v);
                } else {
                    remove.push(fields.lt);
                }
            }

            if ('gt' in value) {
                v = value.gt;
                if (v || v === 0) {
                    add.push(fields.gt);
                    filters.gt.setValue(v);
                } else {
                    remove.push(fields.gt);
                }
            }
        }

        if (remove.length || add.length) {
            filterCollection.beginUpdate();

            if (remove.length) {
                for (i = 0, len = remove.length; i < len; i++) {
                    field = remove[i];
                    filter = field.filter;

                    field.setValue(null);
                    filter.setValue(null);
                    me.removeStoreFilter(filter);
                }
            }

            if (add.length) {
                for (i = 0, len = add.length; i < len; i++) {
                    me.addStoreFilter(add[i].filter);
                }

                active = true;
            }

            filterCollection.endUpdate();
        }

        if (!active && filterCollection.length) {
            active = me.hasActiveFilter();
        }

        if (!active || !me.active) {
            me.setActive(active);
        }

        me.preventFilterRemoval = false;
    }
});
