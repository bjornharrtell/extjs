/**
 * This selection model is created by default for {@link Ext.tree.Panel}.
 *
 * It implements a row selection model.
 */
Ext.define('Ext.selection.TreeModel', {
    extend: 'Ext.selection.RowModel',
    alias: 'selection.treemodel',

    /**
     * @cfg {Boolean} pruneRemoved @hide
     */

    constructor: function(config) {
        var me = this;

        me.callParent([config]);

        // If pruneRemoved is required, we must listen to the the Store's bubbled noderemove event to know when nodes
        // are added and removed from parentNodes.
        // The Store's remove event will be fired during collapses.
        if (me.pruneRemoved) {
            me.pruneRemoved = false;
            me.pruneRemovedNodes = true;
        }
    },

    // binds the store to the selModel.
    bindStore: function(store, initial) {
        var me = this;

        me.callParent([store, initial]);

        // pruneRemovedNodes means that we deselect on node remove.
        if (me.store && me.pruneRemovedNodes) {
            me.view.mon(me.store, {
                noderemove: me.onNodeRemove,
                scope: me
            });
        }
    },

    onNodeRemove: function(parent, node, isMove) {
        // deselection of deleted records done in base Model class
        if (!isMove) {
            this.deselectDeletedRecords([node]);
        }
    }
});
