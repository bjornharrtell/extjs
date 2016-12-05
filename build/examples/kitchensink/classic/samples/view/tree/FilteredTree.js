/**
 * This example shows how the grid Filters plugin can be applied to a Tree. TreeStore
 * filters are added in the same way as other store filters.
 *
 * The filter function is called on child nodes first so that it can use child node state
 * when calculating a parent node's filter result.
 *
 * The TreeStore is configured with filterer: 'bottomup' so that folders with descendant nodes which
 * pass the filter test will be visible.
 *
 * Regular expressions may be used, eg `(tab|tree)panel`
 */
Ext.define('KitchenSink.view.tree.FilteredTree', {
    extend: 'Ext.tree.Panel',

    xtype: 'filtered-tree',

    //<example>
    exampleTitle: 'Filtered TreeGrid.',
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Posts.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/tree/Post.js'
    },{
        type: 'Data',
        path: 'classic/samples/data/Posts.js'
    }],
    //</example>
    store: 'Posts',
    rootVisible: false,
    animate: false,
    frame: true,
    title: 'Filtered Tree',
    width: 650,
    height: 400,
    plugins: 'gridfilters',
    emptyText: 'No Matching Records',
    reserveScrollbar: true,
    useArrows: true,
    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Forum',
        flex: 2.5,
        sortable: true,
        dataIndex: 'forumtitle'
    }, {
        text: 'User',
        flex: 1,
        dataIndex: 'username',
        sortable: true
    }, {
        text: 'Title',
        flex: 2,
        dataIndex: 'title',
        renderer: function (value, p, record) {
            return value ? Ext.String.format(
                '<a href="http://sencha.com/forum/showthread.php?t={1}" target="_blank">{0}</a>',
                value,
                record.data.threadid
            ) : '';
        },
        filter: {
            type: 'string',
            operator: '/=' // RegExp.test() operator
        }
    }],
    tbar: [{
        xtype: 'displayfield',
        itemId: 'matches',
        fieldLabel: 'Matches',

        // Use shrinkwrap width for the label
        labelWidth: null,
        listeners: {
            beforerender: function() {
                var me = this;

                me.up('treepanel').store.on({
                    filterchange: function(store) {
                        var leafCount = 0;
                        store.getRoot().visitPostOrder('', function(node) {
                            if (node.isLeaf() && node.get('visible')) {
                                leafCount++;
                            }
                        });
                        me.setValue(leafCount);
                    },
                    buffer: 250
                });
            },
            single: true
        }
    }]
});
