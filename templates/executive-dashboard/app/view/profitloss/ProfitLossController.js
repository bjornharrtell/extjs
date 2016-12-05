Ext.define('ExecDashboard.view.profitloss.ProfitLossController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profitloss',

    onMetaDataLoad: function (metaProfitLoss) {
        var me = this,
            references = me.getReferences(),
            view = me.getView(),
            menus = {
                quarter: {
                    items: [],
                    listeners: {
                        beforecheckchange: me.validateCheckChange,
                        checkchange: me.onQuarterItemCheck,
                        scope: me
                    }
                },
                region: {
                    items: [],
                    listeners: {
                        beforecheckchange: me.validateCheckChange,
                        checkchange: me.onRegionItemCheck,
                        scope: me
                    }
                }
            },
            columns = [ view.regionColumn ];

        metaProfitLoss.each(function (metaRecord) {
            var type = metaRecord.data.type,
                value = metaRecord.data.value;

            menus[type].items.push(Ext.apply({
                text: metaRecord.data.display,
                value: value,
                type: type,
                listeners: menus[type].listeners
            }, view.menuItemDefaults));

            if (type === 'quarter') {
                columns.push(Ext.apply({
                    // value == 'q1_2010' ==> text: "Q1 2010"
                    text: value.substring(0, 2).toUpperCase() + ' ' + value.substring(3),
                    dataIndex: value
                }, view.quarterColumnDefaults));
            }
        });

        menus.region.items.sort(function (lhs, rhs) {
            return (lhs.text < rhs.text) ? -1 : ((rhs.text < lhs.text) ? 1 : 0);
        });

        // We want to tinker with the UI in batch so we don't trigger multiple layouts
        Ext.batchLayouts(function () {
            references.quartersButton.menu.add(menus.quarter.items);
            references.regionsButton.menu.add(menus.region.items);

            view.setColumns(columns);

            view.store.load(); // displays loadMask so include in layout batch
        });
    },

    /**
     * Validate unchecking quarter or region items. We must not be able to hide all.
     * @param {Ext.menu.CheckItem} item The menu CheckItem.
     * @param {Boolean} newCheckedState The proposed new state.
     * @returns {Boolean} `false` to veto the change.
     */
    validateCheckChange: function(item, newCheckedState) {
        if (!newCheckedState) {
            var checkedItems = item.parentMenu.query('[checked]');

            // Do not allow unchecking of last item
            if (checkedItems.length === 1 && checkedItems[0] === item) {
                return false;
            }
        }
    },

    onQuarterItemCheck: function (menuItem) {
        var column = this.getView().getColumnManager().getHeaderByDataIndex(menuItem.value);
        column.setVisible(menuItem.checked);
    },

    onRegionItemCheck: function () {
        var view = this.getView(),
            filter = {
                // The id ensures that this filter will be replaced by subsequent calls
                // to this method (while leaving others in place).
                id: 'regionFilter',
                property: 'region_filter',
                operator: 'in',
                value: []
            },
            regionMenu = this.lookupReference('regionsButton').menu;

        regionMenu.items.each(function (item) {
            if (item.checked) {
                filter.value.push(item.value);
            }
        });

        if (filter.value.length === regionMenu.items.length) {
            // No need for a filter that includes everything, so remove it (in case it
            // was there - harmless if it wasn't)
            view.store.getFilters().removeByKey(filter.id);
        } else {
            view.store.getFilters().add(filter);
        }
    }
});
