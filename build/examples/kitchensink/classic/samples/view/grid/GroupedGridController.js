Ext.define('KitchenSink.view.grid.GroupedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grouped-grid',

    init: function (view) {
        this.groupingFeature = view.view.findFeature('grouping');
    },

    onClearGroupingClick: function () {
        this.groupingFeature.disable();
    },

    onCollapseAll: function () {
        this.groupingFeature.collapseAll();
    },

    onExpandAll: function () {
        this.groupingFeature.expandAll();
    },

    onGroupChange: function (store, grouper) {
        var me = this,
            groupingFeature = me.groupingFeature,
            groupBy = grouper ? grouper.getProperty() : '',
            groupsBtn = me.lookup('groupsBtn'),
            vm = me.getViewModel(),
            groups, items, menu,
            len, i;

        me.groupBy = groupBy;

        if (vm) {
            vm.set({
                groupBy: groupBy
            });
        }

        if (groupBy) {
            menu = groupsBtn.menu;

            if (groupsBtn.groupBy !== groupBy) {
                groupsBtn.groupBy = groupBy;
                groups = store.getGroups();
                items = [];

                groups.each(function (group) {
                    items.push({
                        xtype: 'menucheckitem',
                        text: group.getGroupKey(),
                        handler: 'onToggleGroup'
                    });
                });

                menu.removeAll(true);
                if (items.length) {
                    menu.add(items);
                }
            }

            items = menu.items.items;
            for (i = 0, len = items.length; i < len; ++i) {
                items[i].setChecked(groupingFeature.isExpanded(items[i].text));
            }
        }
    },

    onToggleGroup: function (item) {
        this.groupingFeature[item.checked ? 'expand' : 'collapse'](item.text, {
            highlight: true
        });
    },

    onGroupCollapse: function (v, n, groupName) {
        this.syncGroup(groupName, false);
    },

    onGroupExpand: function (v, n, groupName) {
        this.syncGroup(groupName, true);
    },

    syncGroup: function (groupName, state) {
        var groupsBtn = this.lookup('groupsBtn'),
            items = groupsBtn.menu.items.items,
            i;

        for (i = items.length; i-- > 0; ) {
            if (items[i].text === groupName) {
                items[i].setChecked(state, true);
                break;
            }
        }
    }
});
