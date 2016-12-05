Ext.define('KitchenSink.reader.Salary', {
    extend: 'Ext.data.reader.Json',

    alias: 'reader.salary',

    getResponseData: function() {
        var data = this.callParent(arguments);

        return this.addTreeHierarchy(data);
    },

    addTreeHierarchy: function (data) {
        var data = this.addTreeLevel(data, 'industry_type', ['salary', 'state'], 'industry');
        return this.addTreeLevel(data, 'state', [], 'state');
    },

    addTreeLevel: function (data, fieldName, fieldsToCopy, notBlank) {
        var tree = [],
            currentValue,
            parentItem;

        Ext.Array.each(data, function (item) {
            if (item[fieldName] != currentValue) {
                currentValue = item[fieldName];
                parentItem = {};
                parentItem[fieldName] = currentValue;
                parentItem.text = currentValue;
                Ext.Array.each(fieldsToCopy, function (field) {
                    parentItem[field] = item[field];
                });
                parentItem.children = [];
                tree.push(Ext.apply(parentItem));
            }
            if (item[notBlank]) {
                if (Ext.isEmpty(item.children)) {
                    item.leaf = true;
                }
                if (Ext.isEmpty(item.text)) {
                    item.text = item[notBlank];
                }
                tree[tree.length - 1].children.push(item);
            }
        });

        return tree;
    }
});