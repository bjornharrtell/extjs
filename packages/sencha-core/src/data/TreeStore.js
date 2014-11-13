/**
 * The TreeStore is a store implementation that owns the {@link #cfg-root root node} of
 * a tree, and provides methods to load either local or remote data as child nodes of the root
 * and any descendant non-leaf node.
 *
 * The TreeStore must be used as the store of a {@link Ext.tree.Panel tree panel}.
 *
 * This class also relays many node events from the underlying node structure.
 *
 * # Using Models
 *
 * If no Model is specified, an implicit model will be created that extends {@link Ext.data.TreeModel}.
 * The standard Tree fields will also be copied onto the Model for maintaining their state. These fields are listed
 * in the {@link Ext.data.NodeInterface} documentation.
 *
 * # Reading Nested Data
 *
 * For the tree to read nested data, the {@link Ext.data.reader.Reader} must be configured with a root property,
 * so the reader can find nested data for each node (if a root is not specified, it will default to
 * 'children'). This will tell the tree to look for any nested tree nodes by the same keyword, i.e., 'children'.
 * If a root is specified in the config make sure that any nested nodes with children have the same name.
 * Note that setting {@link #defaultRootProperty} accomplishes the same thing.
 */
Ext.define('Ext.data.TreeStore', {
    extend: 'Ext.data.NodeStore',
    alias: 'store.tree',
    requires: [
        'Ext.util.Sorter',
        'Ext.data.TreeModel',
        'Ext.data.NodeInterface'
    ],

    /**
     * @property {Boolean} isTreeStore
     * `true` in this class to identify an object as an instantiated TreeStore, or subclass thereof.
     */
    isTreeStore: true,

    config: {
        /**
         * @cfg {Ext.data.TreeModel/Ext.data.NodeInterface/Object} root
         * The root node for this store. For example:
         *
         *     root: {
         *         expanded: true,
         *         text: "My Root",
         *         children: [
         *             { text: "Child 1", leaf: true },
         *             { text: "Child 2", expanded: true, children: [
         *                 { text: "GrandChild", leaf: true }
         *             ] }
         *         ]
         *     }
         *
         * Setting the `root` config option is the same as calling {@link #setRootNode}.
         */
        root: null,

        rootVisible: false,

        recursive: true,

        /**
         * @cfg {String} [defaultRootProperty="children"]
         */
        defaultRootProperty: 'children',

        /**
         * @cfg {String} [parentIdProperty]
         * This config allows node data to be returned from the server in linear format without having to structure it into `children`
         * arrays.
         *
         * This property specifies which property name in the raw node data yields the id of the parent node.
         *
         * For example the following data would be read into a geographic tree by configuring the TreeStore with `parentIdProperty: 'parentId'`.
         * The node data contains an upward link to a parent node.
         *
         *     data: [{
         *         name: 'North America',
         *         id: 'NA'
         *     }, {
         *         name: 'Unites States',
         *         id: 'USA',
         *         parentId: 'NA'
         *     }, {
         *         name: 'Redwood City',
         *         leaf: true,
         *         parentId: 'USA'
         *     }, {
         *         name: 'Frederick, MD',
         *         leaf: true,
         *         parentId: 'USA'
         *     }]
         *
         */
        parentIdProperty: null
    },

    /**
     * @cfg {Boolean} [clearOnLoad=true]
     * Remove previously existing child nodes before loading.
     */
    clearOnLoad : true,

    /**
     * @cfg {Boolean} [clearRemovedOnLoad=true]
     * If `true`, when a node is reloaded, any records in the {@link #removed} record collection that were previously descendants of the node being reloaded will be cleared from the {@link #removed} collection.
     * Only applicable if {@link #clearOnLoad} is `true`.
     */
    clearRemovedOnLoad: true,

    /**
     * @cfg {String} [nodeParam="node"]
     * The name of the parameter sent to the server which contains the identifier of the node.
     */
    nodeParam: 'node',

    /**
     * @cfg {String} [defaultRootId="root"]
     * The default root id.
     */
    defaultRootId: 'root',

    /**
     * @cfg {String} [defaultRootText="Root"]
     * The default root text (if not specified)/
     */
    defaultRootText: 'Root',

    fillCount: 0,

    /**
     * @cfg {Boolean} [folderSort=false]
     * Set to true to automatically prepend a leaf sorter.
     */
    folderSort: false,

    /**
     * @cfg {Object[]} [fields]
     * If you wish to create a Tree*Grid*, and configure your tree with a {@link Ext.panel.Table#cfg-columns} columns configuration,
     * it is possilble to define the set of fields you wish to use in the Store instead of configuting the store with a {@link #cfg-model}.
     *
     * By default, the Store uses an {@link Ext.data.TreeModel}. If you configure fields, it uses a subclass of {@link Ext.data.TreeModel}
     * defined with the set of fields that you specify (In addition to the fields which it uses for storing internal state).
     */

    constructor: function(config) {
        var me = this;

        me.byIdMap = {};
        me.byInternalIdMap = {};

        me.callParent([config]);

        // The following events are fired on this TreeStore by the bubbling from NodeInterface.fireEvent
        /**
         * @event nodeappend
         * @inheritdoc Ext.data.NodeInterface#append
         */
        /**
         * @event noderemove
         * @inheritdoc Ext.data.NodeInterface#remove
         */
        /**
         * @event nodemove
         * @inheritdoc Ext.data.NodeInterface#move
         */
        /**
         * @event nodeinsert
         * @inheritdoc Ext.data.NodeInterface#insert
         */
        /**
         * @event nodebeforeappend
         * @inheritdoc Ext.data.NodeInterface#beforeappend
         */
        /**
         * @event nodebeforeremove
         * @inheritdoc Ext.data.NodeInterface#beforeremove
         */
        /**
         * @event nodebeforemove
         * @inheritdoc Ext.data.NodeInterface#beforemove
         */
        /**
         * @event nodebeforeinsert
         * @inheritdoc Ext.data.NodeInterface#beforeinsert
         */
        /**
         * @event nodeexpand
         * @inheritdoc Ext.data.NodeInterface#expand
         */
        /**
         * @event nodecollapse
         * @inheritdoc Ext.data.NodeInterface#collapse
         */
        /**
         * @event nodebeforeexpand
         * @inheritdoc Ext.data.NodeInterface#beforeexpand
         */
        /**
         * @event nodebeforecollapse
         * @inheritdoc Ext.data.NodeInterface#beforecollapse
         */
        /**
         * @event nodesort
         * @inheritdoc Ext.data.NodeInterface#sort
         */

        //<deprecated since=0.99>
        if (Ext.isDefined(me.nodeParameter)) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.data.TreeStore: nodeParameter has been deprecated. Please use nodeParam instead.');
            }
            me.nodeParam = me.nodeParameter;
            delete me.nodeParameter;
        }
        //</deprecated>
    },

    applyFields: function(fields) {
        var me = this;

        if (fields) {
            if (me.defaultRootProperty !== me.self.prototype.config.defaultRootProperty) {
                // Use concat. Must not mutate incoming configs
                fields = fields.concat({
                    name: me.defaultRootProperty,
                    type: 'auto',
                    defaultValue: null,
                    persist: false
                });
            }

            // Our model will be a subclass of Ext.data.TreeModel augmented with the necessary fields.
            me.setModel(Ext.define(null, {
                extend: 'Ext.data.TreeModel',
                fields: fields,
                proxy: me.getProxy()
            }));
            me.implicitModel = true;
        }
    },

    // TreeStore has to do right things upon SorterCollection update
    onSorterEndUpdate: function() {
        var me = this,
            sorterCollection = me.getSorters(),
            sorters = sorterCollection.getRange(),
            rootNode = me.getRoot();

        // Only load or sort if there are sorters
        if (rootNode && sorters.length) {
            if (me.getRemoteSort()) {
                me.attemptLoad({
                    callback: function() {
                        me.fireEvent('sort', me, sorters);
                    }
                });
            } else {
                rootNode.sort(this.getSortFn(), true);

                // Don't fire the event if we have no sorters
                me.fireEvent('datachanged', me);
                me.fireEvent('refresh', me);
                me.fireEvent('sort', me, sorters);
            }
        }
        // Sort event must fire when sorters collection is updated to empty.
        else {
            me.fireEvent('sort', me, sorters);
        }
    },

    // Filtering is done at the Store level for TreeStores.
    // It has to be done on a hierarchical basis.
    // The onFilterEndUpdate signal has to be passed into the root node which filters its children
    // and cascades the filter instruction downwards.
    updateRemoteFilter: function () {
        var data = this.getData(),
            filters = this.getFilters(); // ensure applyFilters is called

        data.setFilters(null);
        filters.on('endupdate', this.onFilterEndUpdate, this);
    },

    // Filtering is done at the Store level for TreeStores.
    // It has to be done on a hierarchical basis.
    // The onSorterEndUpdate signal has to be passed root node which sorts its children
    // and cascades the sort instruction downwards.
    updateRemoteSort: function () {
        var data = this.getData(),
            sorters = this.getSorters(); // ensure applySorters is called

        data.setSorters(null);
        sorters.on('endupdate', this.onSorterEndUpdate, this);
    },

    getSortFn: function() {
        return this._sortFn || (this._sortFn = this.createSortFn());
    },

    createSortFn: function() {
        var sortersSortFn = this.sorters.getSortFn(),
            sortFn = sortersSortFn;

        if (this.getFolderSort()) {
            sortFn = function(node1, node2) {
                var node1FolderOrder = node1.get('leaf') ? 1 : 0,
                    node2FolderOrder = node2.get('leaf') ? 1 : 0;

                // Primary comparator puts Folders before leaves.
                // Only use sorter collection's sortFn to differentiate between 2 nodes of same leaf value
                return (node1FolderOrder - node2FolderOrder) || sortersSortFn(node1, node2);
            };
        }
        return sortFn;
    },

    updateRootVisible: function(rootVisible) {
        var rootNode = this.getRoot(),
            data;

        if (rootNode) {
            data = this.getData();
            if (rootVisible) {
                data.insert(0, rootNode);
            } else {
                data.remove(rootNode);
            }
        }
    },

    updateTrackRemoved: function(trackRemoved) {
        this.callParent(arguments);
        this.removedNodes = this.removed;
        this.removed = null;
    },

    getRemovedRecords: function() {
        return this.removedNodes;
    },

    onDestroyRecords: function(records, operation, success) {
        if (success) {
            this.removedNodes.length = 0;
        }
    },

    applyProxy: function(proxy) {
        var me = this,
            reader;

        me.changingProxy = true;
        proxy = me.callParent(arguments);

        // The proxy sets a parameter to carry the entity ID based upon the Operation's id
        // That partameter name defaults to "id".
        // TreeStore however uses a nodeParam configuration to specify the entity id
        if (proxy.setIdParam) {
            proxy.setIdParam(me.nodeParam);
        }

        // Readers in a TreeStore's proxy have to use a special rootProperty which defaults to "children"
        if (Ext.isEmpty(proxy.getReader().getRootProperty())) {
            reader = proxy.getReader();
            reader.setRootProperty(me.defaultRootProperty);
            // force rebuild
            reader.buildExtractors(true);
        }
        me.changingProxy = false;
        return proxy;
    },

    applyModel: function(model) {
        return this.callParent(arguments) || Ext.data.TreeModel;
    },

    updateModel: function(model) {
        var isNode = model.prototype.isNode;

        // Ensure that the model has the required interface to function as a tree node.
        Ext.data.NodeInterface.decorate(model);

        // If we just had to decorate a raw Model to upgrade it to be a NodeInterface
        // then we need to build new extactor functions on the reader.
        if (!isNode && !this.changingProxy) {
            this.getProxy().getReader().buildExtractors(true);
        }
    },

    onFilterEndUpdate: function(filters) {
        var me = this,
            i,
            length = filters.length,
            filterFn = filters.getFilterFn(),
            root = me.getRoot(),
            filteredNodes;

        if (length) {
            filteredNodes = [];

            root.cascadeBy({
                after: function(node) {
                    node.set('visible', filterFn(node));
                }
            });
            for (i = 0, length = root.childNodes.length; i < length; i++) {
                if (root.childNodes[i].get('visible')) {
                    filteredNodes.push(root.childNodes[i]);
                }
            }
        } else {
            filteredNodes = root.childNodes;
        }
        me.onNodeFilter(root, filteredNodes);
        root.fireEvent('filterchange', root, filteredNodes);
        me.fireEvent('filterchange', me, filters);
        me.callParent([filters]);
    },

    /**
     * @inheritdoc Ext.data.AbstractStore#clearFilter
     */
    clearFilter: function() {
        var me = this,
            root = me.getRoot();

        me.callParent();
        me.filterFn = null;
        root.cascadeBy(function(node) {
            node.set('visible', true);
        });
        me.onNodeFilter(root, root.childNodes);
        root.fireEvent('filterchange', root, root.childNodes);
        me.fireEvent('filterchange', me, []);
    },

    /**
     * @private
     *
     * Called from filter/clearFilter. Refreshes the view based upon
     * the new filter setting.
     */
    onNodeFilter: function(root, childNodes) {
        var me = this,
            data = me.getData(),
            toAdd = [];

        me.handleNodeExpand(root, childNodes, toAdd);

        // Do not relay the splicing's add&remove events.
        // We inform interested parties about filtering through a refresh event.
        me.suspendEvents();
        data.splice(0, data.getCount(), toAdd);
        me.resumeEvents();

        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
    },

    /**
     * Called from a node's expand method to ensure that child nodes are available.
     *
     * This ensures that the child nodes are available before calling the passed callback.
     * @private
     * @param {Ext.data.NodeInterface} node The node being expanded.
     * @param {Function} callback The function to run after the expand finishes
     * @param {Object} scope The scope in which to run the callback function
     * @param {Array} args The extra args to pass to the callback after the new child nodes
     */
    onBeforeNodeExpand: function(node, callback, scope, args) {
        var me = this,
            storeReader,
            nodeProxy,
            nodeReader,
            reader,
            children,
            callbackArgs,
            childType;

        // childNodes are loaded: go ahead with expand
        // This will also expand phantom nodes with childNodes.
        if (node.isLoaded()) {
            callbackArgs = [node.childNodes];
            if (args) {
                callbackArgs.push.apply(callbackArgs, args);
            }
            Ext.callback(callback, scope || node, callbackArgs);
        }
        // The node is loading
        else if (node.isLoading()) {
            me.on('load', function() {
                callbackArgs = [node.childNodes];
                if (args) {
                    callbackArgs.push.apply(callbackArgs, args);
                }
                Ext.callback(callback, scope || node, callbackArgs);
            }, me, {
                single: true,
                priority: 1001
            });
        }
        // There are unloaded child nodes in the raw data because of the lazy configuration, load them then call back.
        else {

            // With heterogeneous nodes, different levels may require differently configured readers to extract children.
            // For example a "Disk" node type may configure it's proxy reader with root: 'folders', while a "Folder" node type
            // might configure its proxy reader with root: 'files'. Or the root property could be a configured-in accessor.
            storeReader = me.getProxy().getReader();
            nodeProxy = node.getProxy();
            nodeReader = nodeProxy ? nodeProxy.getReader() : null;

            // If the node's reader was configured with a special root (property name which defines the children array) use that.
            reader = nodeReader && nodeReader.initialConfig.rootProperty ? nodeReader : storeReader;

            // 1. If the raw data read in for the node contains a root (children array), then read it.
            // 2. If a phantom w/o any children, it should still be processed if expanded so check for
            //    that here as well. See EXTJS-13509.
            children = reader.getRoot(node.raw || node.data);

            if (children || node.phantom) {
                childType = node.childType;
                // Extract records from the raw data. Allow the node being expanded to dictate its child type
                if (children) {
                    me.fillNode(node, reader.extractData(children, childType ? {
                        model: childType
                    } : undefined));
                }

                callbackArgs = [node.childNodes];

                if (args) {
                    callbackArgs.push.apply(callbackArgs, args);
                }

                Ext.callback(callback, scope || node, callbackArgs);
            }
            // Node needs loading
            else {
                me.read({
                    node: node,
                    // We use onChildNodesAvailable here because we want trigger to
                    // the loading event after we've loaded children
                    onChildNodesAvailable: function() {
                        // Clear the callback, since if we're introducing a custom one,
                        // it may be re-used on reload
                        delete me.lastOptions.onChildNodesAvailable;
                        callbackArgs = [node.childNodes];
                        if (args) {
                            callbackArgs.push.apply(callbackArgs, args);
                        }
                        Ext.callback(callback, scope || node, callbackArgs);
                    }
                });
            }
        }
    },

    // Called from a node's onChildNodesAvailable method to
    // insert the newly available child nodes below the parent.
    onNodeExpand: function(parent, records) {
        var me = this,
            insertIndex = me.indexOf(parent) + 1,
            toAdd = [];

        me.handleNodeExpand(parent, records, toAdd);

        // If a hidden root is being expanded for the first time, it's not an insert operation
        if (!me.refreshCounter && parent.isRoot() && !parent.get('visible')) {
            me.loadRecords(toAdd);
        }
        // The add event from this insertion is handled by TreeView.onAdd.
        // That implementation calls parent and then ensures the previous sibling's joining lines are correct.
        else {
            me.insert(insertIndex, toAdd);
        }
    },

    // Collects child nodes to remove into the passed toRemove array.
    // When available, all descendant nodes are pushed into that array using recursion.
    handleNodeExpand: function(parent, records, toAdd) {
        var me = this,
            ln = records ? records.length : 0,
            i, record;

        // If parent is not visible, nothing to do (unless parent is the root)
        if (parent !== this.getRoot() && !me.isVisible(parent)) {
            return;
        }

        if (ln) {
            // The view items corresponding to these are rendered.
            // Loop through and expand any of the non-leaf nodes which are expanded
            for (i = 0; i < ln; i++) {
                record = records[i];

                // If the TreePanel has not set its visible flag to false, add to new node array
                if (record.get('visible')) {
                    // Add to array being collected by recursion when child nodes are loaded.
                    // Must be done here in loop so that child nodes are inserted into the stream in place
                    // in recursive calls.
                    toAdd.push(record);

                    if (record.isExpanded()) {
                        if (record.isLoaded()) {
                            // Take a shortcut - appends to toAdd array
                            me.handleNodeExpand(record, record.childNodes, toAdd);
                        }
                        else {
                            // Might be asynchronous if child nodes are not immediately available
                            record.set('expanded', false);
                            record.expand();
                        }
                    }
                }
            }
        }
    },

    /**
     * @private
     * Called from a node's collapse method
     */
    onNodeCollapse: function(parent, records, callback, scope) {
        var me = this,
            collapseIndex = me.indexOf(parent) + 1,
            lastNodeIndexPlus;

        if (!me.recursive && parent !== me.getRoot()) {
            return;
        }

        // Only remove what is visible and therefore in the collection side of this store
        if (!me.remoteFilter && me.getFilters().getCount()) {
            records = Ext.Array.filter(records, me.filterVisible);
        }

        // Only attempt to remove the records if they are there.
        // Collapsing an ancestor node *immediately removes from the view, ALL its descendant nodes at all levels*.
        // But if the collapse was recursive, all descendant root nodes will still fire their
        // events. But we must ignore those events here - we have nothing to do.
        if (records.length && me.data.contains(records[0])) {

            // Calculate the index *one beyond* the last node we are going to remove.
            lastNodeIndexPlus = me.indexOfNextVisibleNode(parent);

            // Remove the whole collapsed node set.
            me.removeAt(collapseIndex, lastNodeIndexPlus - collapseIndex);
        }
        Ext.callback(callback, scope);
    },

    /**
     * @private
     * Gets the index of next visible node at either the same sibling level or a higher level.
     *
     * This is to facilitate bulk removal of visible descendant nodes. eg in the following case
     * TreeStore.indexOfNextVisibleNode(bletch) must return indexOf(belch) - the next sibling.
     *
     * But TreeStore.indexOfNextVisibleNode(blivit) and TreeStore.indexOfNextVisibleNode(screeble)
     * and TreeStore.indexOfNextVisibleNode(poot) must also return return indexOf(belch)
     *
     *      foo
     *      ├ bar
     *      ├ bletch
     *      │ ├ zarg
     *      │ └ blivit
     *      │   ├ ik
     *      │   └ screeble
     *      │     ├ raz
     *      │     └ poot
     *      ├ belch
     *      apresfoo
     *
     * This is so that removal of nodes at full depth can be optimized into one removeAt(start, length) call.
     */
    indexOfNextVisibleNode: function(node) {
        var result;

        while (node.parentNode) {
            // Find the next visible sibling (filtering may have knocked out intervening nodes)
            for (result = node.nextSibling; result && !result.get('visible'); result = result.nextSibling);

            // If found, we're done.
            if (result) {
                return this.indexOf(result);
            }
            
            // If there is no next sibling, we try to find the parent node's next visible sibling.
            node = node.parentNode;
        }

        // No subseqent visible siblings
        return this.getCount();
    },

    getNewRecords: function() {
        return Ext.Array.filter(Ext.Object.getValues(this.byIdMap), this.filterNew);
    },

    getUpdatedRecords: function() {
        return Ext.Array.filter(Ext.Object.getValues(this.byIdMap), this.filterUpdated);
    },

    // Called from a node's removeChild & removeAll methods *before* the node(s) is/are unhooked from siblings and parent.
    // We calculate the range of visible nodes affected by the removal.
    // For example in the tree below, if the "bletch" node was being removed, we would have to remove
    // bletch, zarg, blivit, ik, screeble, razz and poot.
    //
    //      foo
    //      ├ bar
    //      ├ bletch
    //      │ ├ zarg
    //      │ └ blivit
    //      │   ├ ik
    //      │   └ screeble
    //      │     ├ raz
    //      │     └ poot
    //      ├ belch
    //      apresfoo
    //
    // If there are expanded nodes, descendants will be in this store and need removing too.
    // These values are used in onNodeRemove below, after the node has been unhooked from its siblings and parent.
    beforeNodeRemove: function(parentNode, childNodes) {
        if (!Ext.isArray(childNodes)) {
            childNodes = [ childNodes ];
        }
        var me = this,
            len = childNodes.length,
            i,
            startNode;

        // Skip to the first visible node.
        for (i = 0; !startNode && i < len; i++) {
            if (childNodes[i].get('visible')) {
                startNode = childNodes[i];
            }
        }

        // Calculate the range of contiguous *VISIBLE* nodes that the childNodes array represents.
        if (startNode) {
            me.startRemoveIndex = me.indexOf(childNodes[0]);
            me.lastRemoveIndexPlusOne = me.indexOfNextVisibleNode(childNodes[childNodes.length - 1]);
        } else {
            me.startRemoveIndex = -1;
            me.lastRemoveIndexPlusOne = 0;
        }
    },

    // Called from a node's removeChild & removeAll methods *after* the node is unhooked from siblings and parent.
    // Remove the visible descendant nodes that we calculated in beforeRemoveNode above.
    onNodeRemove: function(parentNode, childNodes, isMove) {
        var me = this,
            removed = me.removedNodes,
            len = childNodes.length,
            startRemoveIndex = me.startRemoveIndex,
            lastRemoveIndexPlusOne = me.lastRemoveIndexPlusOne,
            i;

        // Remove all visible descendants from store.
        // Only visible nodes are present in the store.
        // Superclass's onCollectionRemove will handle unjoining.
        // That will not add to removed list. TreeStores keep a different list and we add to it below.
        // Set removeIsMove flag correctly for onCollectionRemove to do the right thing.
        if (startRemoveIndex !== -1) {
            me.removeIsMove = isMove;
            me.removeAt(startRemoveIndex, lastRemoveIndexPlusOne - startRemoveIndex);
            me.removeIsMove = false;
        }

        // Cascade down all descendant nodes adding non-phantoms to our removed list if we are tracking removes,
        // and ensuring that all descendant nodes are unregistered from the lookup hash maps.
        for (i = 0; i < len; i++) {
            
            // Store superclass will not handle tracking removal because node collapses
            // trigger removals, so we do that here.
            // Phantom nodes should never be included in the removed collection.
            // Also, if we're moving a node a remove will be fired, however we'll
            // be inserting it again, so don't push it into the removed collection
            childNodes[i].cascadeBy(function(node) {
                if (removed && !isMove && !node.phantom && !me.loading) {
                    // Store the index the record was removed from so that rejectChanges can re-insert at the correct place.
                    // The record's index property won't do, as that is the index in the overall dataset when Store is buffered.
                    node.removedFrom = me.indexOf(node);
                    removed.push(node);
                }
                me.unregisterNode(node);
            });
        }
    },

    /**
     * @private
     *
     * Called from a node's appendChild method.
     */
    onNodeAppend: function(parent, node, index) {
        this.onNodeInsert(parent, node, index);
    },

    /**
     * @private
     *
     * Called from a node's insertBefore method.
     */
    onNodeInsert: function(parent, node, index) {
        var me = this,
            refNode,
            sibling,
            storeReader,
            nodeProxy,
            nodeReader,
            reader,
            data = node.raw || node.data,
            dataRoot,
            isVisible,
            childType;

        if (me.filterFn) {
            isVisible = me.filterFn(node);
            node.set('visible', isVisible);

            // If a node which passes the filter is added to a parent node
            if (isVisible) {
                parent.set('visible', me.filterFn(parent));
            }
        }

        // Register node by its IDs
        me.registerNode(node, true);

        me.beginUpdate();

        // Only react to a node append if it is to a node which is expanded.
        if (me.isVisible(node)) {
            if (index === 0 || !node.previousSibling) {
                refNode = parent;
            } else {
                // Find the previous visible sibling (filtering may have knocked out intervening nodes)
                for (sibling = node.previousSibling; sibling && !sibling.get('visible'); sibling = sibling.previousSibling);
                while (sibling.isExpanded() && sibling.lastChild) {
                    sibling = sibling.lastChild;
                }
                refNode = sibling;
            }

            // The reaction to collection add joins the node to this Store
            me.insert(me.indexOf(refNode) + 1, node);
            if (!node.isLeaf() && node.isExpanded()) {
                if (node.isLoaded()) {
                    // Take a shortcut
                    me.onNodeExpand(node, node.childNodes);
                } else if (!me.fillCount) {
                    // If the node has been marked as expanded, it means the children
                    // should be provided as part of the raw data. If we're filling the nodes,
                    // the children may not have been loaded yet, so only do this if we're
                    // not in the middle of populating the nodes.
                    node.set('expanded', false);
                    node.expand();
                }
            }
        }

        // Set sync flag if the record needs syncing.
        else {
            me.needsSync = me.needsSync || node.phantom || node.dirty;
        }

        if (!node.isLeaf() && !node.isLoaded() && !me.lazyFill) {
            // With heterogeneous nodes, different levels may require differently configured readers to extract children.
            // For example a "Disk" node type may configure it's proxy reader with root: 'folders', while a "Folder" node type
            // might configure its proxy reader with root: 'files'. Or the root property could be a configured-in accessor.
            storeReader = me.getProxy().getReader();
            nodeProxy = node.getProxy();
            nodeReader = nodeProxy ? nodeProxy.getReader() : null;

            // If the node's reader was configured with a special root (property name which defines the children array) use that.
            reader = nodeReader && nodeReader.initialConfig.rootProperty ? nodeReader : storeReader;

            dataRoot = reader.getRoot(data);
            if (dataRoot) {
                childType = node.childType;
                me.fillNode(node, reader.extractData(dataRoot, childType ? {
                    model: childType
                } : undefined));
            }
        }
        me.endUpdate();
    },


    /**
     * Registers a node so that it can be looked up by ID.
     * @private
     * @param {Ext.data.NodeInterface} node The node to register
     * @param {Boolean} [includeChildren] True to unregister any child nodes
     */
    registerNode : function(node, includeChildren) {
        var me = this,
            children, length, i;

        // Key the node hash by the node's IDs
        me.byIdMap[node.id] = node;
        me.byInternalIdMap[node.internalId] = node;
        if (includeChildren === true) {
            children = node.childNodes;
            length = children.length;
            for (i = 0; i < length; i++) {
                me.registerNode(children[i], true);
            }
        }
    },

    /**
     * Unregisters a node.
     * @private
     * @param {Ext.data.NodeInterface} node The node to unregister
     * @param {Boolean} [includeChildren] True to unregister any child nodes
     */
    unregisterNode: function(node, includeChildren) {
        var me = this,
            children, length, i;

        delete me.byIdMap[node.id];
        delete me.byInternalIdMap[node.internalId];
        if (includeChildren === true) {
            children = node.childNodes;
            length = children.length;
            for (i = 0; i < length; i++) {
                me.unregisterNode(children[i], true);
            }
        }
    },

    onNodeSort: function(node, childNodes) {
        var me = this;

        // The onNodeCollapse and onNodeExpand should not sync.
        // Should be one coalesced sync if autoSync.
        me.suspendAutoSync();

        // Refresh the child node set when a node is sorted
        if ((me.indexOf(node) !== -1 || (node === me.getRoot() && !me.rootVisible) && node.isExpanded())) {
            Ext.suspendLayouts();
            me.onNodeCollapse(node, childNodes);
            me.onNodeExpand(node, childNodes);
            Ext.resumeLayouts(true);
        }

        // Lift suspension. This will execute a sync if the suspension count has gone to zero
        // and this store is configured to autoSync
        me.resumeAutoSync(me.autoSync);
    },

    applyRoot: function(newRoot) {
        var me = this,
            Model = me.getModel(),
            idProperty = Model.prototype.idProperty;

        // Convert to a node. Even if they are passing a normal Model, the Model will not yet
        // have been decorated with the constructor which initializes properties, so we always
        // have to construct a new node if the passed root is not a Node.
        if (newRoot && !newRoot.isNode) {
            // create a default rootNode and create internal data struct.
            newRoot = Ext.apply({
                text: me.defaultRootText,
                root: true,
                isFirst: true,
                isLast: true,
                depth: 0,
                index: 0,
                parentId: null,
                allowDrag: false
            }, newRoot);
            if (me.defaultRootId && newRoot[idProperty] === undefined) {
                newRoot[idProperty] = me.defaultRootId;
            }

            // Specify that the data object is raw, and converters will need to be caled
            newRoot = new Model(newRoot);
            
            // The root node is the only node bound to the TreeStore by a reference.
            // All descendant nodes acquire a reference to their TreeStore by interrogating the patrentNode axis.
            // The rootNode never joins this Store. It is bound and unbound in applyRoot and updateRoot
            newRoot.store = newRoot.treeStore = me;
        }
        return newRoot;
    },

    updateRoot: function(newRoot, oldRoot) {
        var me = this,
            oldOwner;

        // Drop all registered nodes
        me.byIdMap = {};
        me.byInternalIdMap = {};

        // Ensure that the removedNodes array is correct, and that the base class's removed array is null
        me.getTrackRemoved();

        // We do not want an add event to fire. This is a refresh operation.
        // A refresh will be fired after the new root is set.
        me.suspendEvents();

        me.getData().clear();

        // Nulling the root node is essentially clearing the store.
        // TreeStore.removeAll updates the root node to null.
        if (newRoot) {

            // Fire beforeappend, to allow veto of new root setting
            if (newRoot.fireEventArgs('beforeappend', [null, newRoot]) === false) {
                newRoot = null;
            }
            else {

                // The passed node was a childNode somewhere else; remove it from there.
                if (oldOwner = newRoot.parentNode) {

                    // The removeChild operation can be vetoed by beforeremove event handler,
                    // and returns false if so.
                    // Important: That last boolean test is informing the remove whether or not it's
                    // just a move operation within the same TreeStore
                    if (!oldOwner.removeChild(newRoot, false, false, oldOwner.getTreeStore() === me)) {
                        return;
                    }
                }

                // If the passed root was previously the rootNode of another TreeStore, it must be removed from that store
                else if ((oldOwner = newRoot.getTreeStore()) && oldOwner !== me && newRoot === oldOwner.getRoot()) {
                    oldOwner.setRoot(null);
                }

                newRoot.set('root', true);
                // root node should never be phantom or dirty, so commit it
                newRoot.updateInfo(true, {
                    isFirst: true,
                    isLast: true,
                    depth: 0,
                    index: 0,
                    parentId: null
                });
                // The new root fires the append and rootchange events
                newRoot.fireEvent('append', null, newRoot, false);
                newRoot.fireEvent('rootchange', newRoot);

                // Ensure the root node is filtered, registered and joined.
                me.onNodeAppend(null, newRoot, 0);
            }
        }

        me.fireEvent('rootchange', newRoot, oldRoot);

        // Ensure that the old root is unjoined.
        if (oldRoot && oldRoot.isModel) {
            oldRoot.set('root', false);
            me.remove(oldRoot);
            oldRoot.fireEvent('remove', null, oldRoot, false);
            oldRoot.fireEvent('rootchange', null);
            oldRoot.store = oldRoot.treeStore = null;
        }

        // Inform views that the entire structure has changed.
        me.resumeEvents();

        // If root configure to start expanded, or we are autoLoad, we want the root's nodes in the Store.
        if (newRoot && (me.autoLoad || newRoot.isExpanded())) {

            // If it was configured with inline children, it will be loaded, so skip ahead to the onNodeExpand callback.
            if (newRoot.isLoaded()) {
                me.onNodeExpand(newRoot, newRoot.childNodes);
                me.fireEvent('datachanged', me);
                me.fireEvent('refresh', me);
            }
            // Root is not loaded; go through the expand mechanism to force a load
            else {
                newRoot.data.expanded = false;
                newRoot.expand(false, function() {
                    me.fireEvent('datachanged', me);
                    me.fireEvent('refresh', me);
                });
            }
        }

        return newRoot;
    },

    /**
     * Returns the record node by id
     * @param {String} id The id of the node to get.
     * @return {Ext.data.NodeInterface}
     */
    getNodeById: function(id) {
        return this.byIdMap[id] || null;
    },

    /**
     * Loads the Store using its configured {@link #proxy}.
     * @param {Object} options (Optional) config object. This is passed into the {@link Ext.data.operation.Operation Operation}
     * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function.
     * The options can also contain a node, which indicates which node is to be loaded. If not specified, it will
     * default to the root node.
     */
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var me = this,
            node = options.node || me.getRoot(),
            proxy = me.getProxy(),
            callback = options.callback,
            scope = options.scope,
            operation;

        // If there is not a node it means the user hasn't defined a root node yet. In this case let's just
        // create one for them. The expanded: true will cause a load operation, so return.
        if (!node) {
            me.setRoot({
                expanded: true
            });
            return;
        }

        // If the node we are loading was expanded, we have to expand it after the load
        if (node.data.expanded) {
            node.data.loaded = false;

            // Must set expanded to false otherwise the onProxyLoad->fillNode->appendChild calls will update the view.
            // We ned to update the view in the callback below.
            if (me.clearOnLoad) {
                node.data.expanded = false;
            }
            options.callback = function() {

                // If newly loaded nodes are to be added to the existing child node set, then we have to collapse
                // first so that they get removed from the NodeStore, and the subsequent expand will reveal the
                // newly augmented child node set.
                if (!me.clearOnLoad) {
                    node.collapse();
                }
                node.expand();

                // Call the original callback (if any)
                Ext.callback(callback, scope, arguments);
            };
        }

        // Assign the ID of the Operation so that a ServerProxy can set its idParam parameter,
        // or a REST proxy can create the correct URL
        options.id = node.getId();

        options = Ext.apply({
            filters: me.getFilters().items,
            sorters: me.getSorters().items,
            node: options.node || node,
            internalScope: me,
            internalCallback: me.onProxyLoad
        }, options);

        me.lastOptions = Ext.apply({}, options);

        operation = proxy.createOperation('read', options);

        if (me.fireEvent('beforeload', me, operation) !== false) {

            // Set the loading flag early
            // Used by onNodeRemove to NOT add the removed nodes to the removed collection
            me.loading = true;
            if (me.clearOnLoad) {
                if (me.clearRemovedOnLoad) {
                    // clear from the removed array any nodes that were descendants of the node being reloaded so that they do not get saved on next sync.
                    me.clearRemoved(node);
                }
                // remove all the nodes
                node.removeAll(false);
            }
            operation.execute();
        }

        if (me.loading && node) {
            node.set('loading', true);
        }

        return me;
    },

    /**
     * Removes all records that used to be descendants of the passed node from the removed array
     * @private
     * @param {Ext.data.NodeInterface} node
     */
    clearRemoved: function(node) {
        var me = this,
            removed = me.removedNodes,
            id = node.getId(),
            removedLength = removed.length,
            i = removedLength,
            recordsToClear = {},
            newRemoved = [],
            removedHash = {},
            removedNode,
            targetNode,
            targetId;

        if (node === me.getRoot()) {
            // if the passed node is the root node, just reset the removed array
            me.removedNodes = [];
            return;
        }

        // add removed records to a hash so they can be easily retrieved by id later
        for(; i--;) {
            removedNode = removed[i];
            removedHash[removedNode.getId()] = removedNode;
        }

        for(i = removedLength; i--;) {
            removedNode = removed[i];
            targetNode = removedNode;
            while(targetNode && targetNode.getId() !== id) {
                // walk up the parent hierarchy until we find the passed node or until we get to the root node
                targetId = targetNode.get('parentId');
                targetNode = targetNode.parentNode || me.getNodeById(targetId) || removedHash[targetId];
            }
            if(targetNode) {
                // removed node was previously a descendant of the passed node - add it to the records to clear from "removed" later
                recordsToClear[removedNode.getId()] = removedNode;
            }
        }

        // create a new removed array containing only the records that are not in recordsToClear
        for(i = 0; i < removedLength; i++) {
            removedNode = removed[i];
            if(!recordsToClear[removedNode.getId()]) {
                newRemoved.push(removedNode);
            }
        }

        me.removedNodes = newRemoved;
    },

    /**
     * Fills a node with a series of child records.
     * @private
     * @param {Ext.data.NodeInterface} node The node to fill
     * @param {Ext.data.TreeModel[]} newNodes The records to add
     */
    fillNode: function(node, newNodes) {
        var me = this,
            newNodeCount = newNodes ? newNodes.length : 0,
            sorters = me.getSorters(),
            i,
            needsIndexSort = false,
            performLocalSort = me.sortOnLoad && newNodeCount > 1 && !me.remoteSort && sorters && sorters.items && sorters.items.length,
            node1, node2;

        if (newNodeCount) {

            // Apply any local filter to the nodes as we fill
            if (!me.remoteFilter && me.getFilters().getCount()) {
                newNodes[0].set('visible', me.filterFn(newNodes[0]));
            }

            // See if there are any differing index values in the new nodes. If not, then we do not have to sortByIndex
            for (i = 1; !needsIndexSort && i < newNodeCount; i++) {

                node1 = newNodes[i];
                node2 = newNodes[i - 1];

                // Apply any filter to the nodes as we fill
                if (me.filterFn) {
                    node1.set('visible', me.filterFn(node1));
                }
                needsIndexSort = node1.data.index !== node2.data.index;
            }

            // If there is a set of local sorters defined.
            if (performLocalSort) {
                // If sorting by index is needed, sort by index first
                if (needsIndexSort) {
                    me.indexSorter = sorters.insert(0, me.indexSorter);
                }
                Ext.Array.sort(newNodes, sorters.getSortFn());

                // Remove the index sorter
                if (needsIndexSort) {
                    sorters.remove(me.indexSorter);
                }
            } else if (needsIndexSort) {
                Ext.Array.sort(newNodes, me.sortByIndex);
            }
        }

        node.set('loaded', true);

        if (newNodes.length) {
            node.appendChild(newNodes, undefined, true);
        }

        return newNodes;
    },

    // Called by a node which is appending children to itself
    beginFill: function() {
        var me = this;
        if (!me.fillCount++) {
            me.beginUpdate();
            me.suspendEvent('add', 'update');
            me.suspendAutoSync();
            me.fillArray = [];
        }
    },

    // resume view updating and data syncing after a node fill
    endFill: function(parent, nodes) {
        var me = this,
            i, len,
            index;

        // Keep every block of records added during the fill
        me.fillArray.push(nodes);

        if (! --me.fillCount) {
            me.resumeAutoSync();
            me.resumeEvent('add', 'update');

            // Add all blocks of records from nested beginFill calls.
            // appendChild can load local child data and recursively call appendChild.
            // This coalesces all add operations into a layout suspension
            for (i = 0, len = me.fillArray.length; i < len; i++) {
                index = me.indexOf(me.fillArray[i][0]);

                // Only inform views if the blocks appended actually made it into the linear store (are visible)
                if (index !== -1) {
                    me.fireEvent('add', me, me.fillArray[i], index);
                }
            }
            me.fillArray = null;
            me.endUpdate();
        }
    },

    /**
     * Sorter function for sorting records in index order
     * @private
     * @param {Ext.data.NodeInterface} node1
     * @param {Ext.data.NodeInterface} node2
     * @return {Number}
     */
    sortByIndex: function(node1, node2) {
        return node1.data.index - node2.data.index;
    },

    onIdChanged: function(node, oldId, newId) {
        var childNodes = node.childNodes,
            len = childNodes && childNodes.length,
            i;

        this.callParent(arguments);
        delete this.byIdMap[oldId];
        this.byIdMap[newId] = node;

        // Ensure all child nodes know their parent's new ID
        for (i = 0; i < len; i++) {
            childNodes[i].set('parentId', newId);
        }
    },

    onProxyLoad: function(operation) {
        var me = this,
            options = operation.initialConfig,
            successful = operation.wasSuccessful(),
            records = operation.getRecords(),
            node = options.node,
            scope = operation.getScope() || me,
            args = [records, operation, successful];

        if (me.isDestroyed) {
            return;
        }

        me.loading = false;
        node.set('loading', false);
        if (successful) {
            if (!me.clearOnLoad) {
                records = me.cleanRecords(node, records);
            }

            // Nodes are in linear form, linked to the parent using a parentId property
            if (me.parentIdProperty) {
                records = me.treeify(node, records);
            }
            
            records = me.fillNode(node, records);
        }
        // The load event has an extra node parameter
        // (differing from the load event described in AbstractStore)
        /**
         * @event load
         * Fires whenever the store reads data from a remote data source.
         * @param {Ext.data.TreeStore} this
         * @param {Ext.data.TreeModel[]} records An array of records.
         * @param {Boolean} successful True if the operation was successful.
         * @param {Ext.data.Operation} operation The operation that triggered this load.
         * @param {Ext.data.NodeInterface} node The node that was loaded.
         */
        Ext.callback(options.onChildNodesAvailable, scope, args);
        me.fireEvent('load', me, records, successful, operation, node);
    },

    // @private
    // Converts a flat array of nodes into a tree structure.
    // Returns an array which is the childNodes array of the rootNode.
    treeify: function(parentNode, records) {
        var me = this,
            parentNodeId = parentNode.getId(),
            len = records.length,
            i,
            node,
            parentId,
            result = [],
            nodeMap = {};

        // Collect all nodes keyed by ID, so that regardless of order, they can all be linked to a parent.
        for (i = 0; i < len; i++) {
            node = records[i];
            nodeMap[node.getId()] = node;
        }

        // Link child nodes up to their parents
        for (i = 0; i < len; i++) {
            node = records[i];
            parentId = node.data[me.parentIdProperty];

            // If there is no parentId, or the parentId points to the node being loaded, append to the results
            if (!parentId || parentId === parentNodeId) {
                result.push(node);
            }

            // Append to the configured parentNode
            else {
                nodeMap[parentId].appendChild(node);
            }
        }
        
        return result;
    },
    
    cleanRecords: function(node, records){
        var nodeHash = {},
            childNodes = node.childNodes,
            i = 0,
            len  = childNodes.length,
            out = [],
            rec;

        // build a hash of all the childNodes under the current node for performance
        for (; i < len; ++i) {
            nodeHash[childNodes[i].getId()] = true;
        }

        for (i = 0, len = records.length; i < len; ++i) {
            rec = records[i];
            if (!nodeHash[rec.getId()]) {
                out.push(rec);
            }
        }

        return out;
    },

    removeAll: function() {
        this.suspendEvents();
        this.setRoot(null);
        this.resumeEvents();
        this.callParent();
    },

    doSort: function(sorterFn) {
        var me = this;
        if (me.remoteSort) {
            //the load function will pick up the new sorters and request the sorted data from the proxy
            me.load();
        } else {
            me.tree.sort(sorterFn, true);
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }
        me.fireEvent('sort', me, me.sorters.getRange());
    },

    filterVisible: function(node) {
        return node.get('visible');
    },

    isVisible: function(node) {
        var parentNode = node.parentNode,
            visible = node.data.visible,
            root = this.getRoot();

        while (visible && parentNode) {
            visible = parentNode.data.expanded && parentNode.data.visible;
            parentNode = parentNode.parentNode;
        }
        // The passed node is visible if we ended up at the root node, and it is visible.
        // UNLESS it's the root node, and we are configured with rootVisible:false
        return visible && !(node === root && !this.rootVisible);
    },

    /**
     * Returns the root node for this tree.
     * @return {Ext.data.NodeInterface}
     * @deprecated 5.0 Use {@link #getRoot} instead
     */
    getRootNode: function() {
        return this.getRoot();
    },

    /**
     * Sets the root node for this store.  See also the {@link #root} config option.
     * @param {Ext.data.TreeModel/Ext.data.NodeInterface/Object} root
     * @return {Ext.data.NodeInterface} The new root
     * @deprecated 5.0 Use {@link #setRoot} instead
     */
    setRootNode: function(root) {
        this.setRoot(root);
        return this.getRoot();
    },

    deprecated: {
        5: {
            properties: {
                tree: null
            }
        }
    }
}, function() {
    var proto = this.prototype;
    proto.indexSorter = new Ext.util.Sorter({
        sorterFn: proto.sortByIndex
    });
});
