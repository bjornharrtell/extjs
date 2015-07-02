describe("Ext.tree.Panel", function(){
    
    var TreeItem = Ext.define(null, {
        extend: 'Ext.data.TreeModel',
        fields: ['id', 'text', 'secondaryId'],
        proxy: {
            type: 'memory'
        }
    }),
    tree, view, makeTree, testNodes, store, rootNode;
    
    function spyOnEvent(object, eventName, fn) {
        var obj = {
            fn: fn || Ext.emptyFn
        },
        spy = spyOn(obj, "fn");
        object.addListener(eventName, obj.fn);
        return spy;
    }

    beforeEach(function() {
        MockAjaxManager.addMethods();
        testNodes = [{
            id: 'A',
            text: 'A',
            secondaryId: 'AA',
            children: [{
                id: 'B',
                text: 'B',
                secondaryId: 'BB',
                children: [{
                    id: 'C',
                    text: 'C',
                    secondaryId: 'C',
                    leaf: true
                }, {
                    id: 'D',
                    text: 'D',
                    secondaryId: 'D',
                    leaf: true
                }]
            }, {
                id: 'E',
                text: 'E',
                secondaryId: 'EE',
                leaf: true
            }, {
                id: 'F',
                text: 'F',
                secondaryId: 'FF',
                children: [{
                    id: 'G',
                    text: 'G',
                    secondaryId: 'GG',
                    children: [{
                        id: 'H',
                        text: 'H',
                        secondaryId: 'HH',
                        leaf: true
                    }]
                }]
            }]
        }, {
            id: 'I',
            text: 'I',
            secondaryId: 'II',
            children: [{
                id: 'J',
                text: 'J',
                secondaryId: 'JJ',
                children: [{
                    id: 'K',
                    text: 'K',
                    secondaryId: 'KK',
                    leaf: true
                }]
            }, {
                id: 'L',
                text: 'L',
                secondaryId: 'LL',
                leaf: true
            }]
        }, {
            id: 'M',
            text: 'M',
            secondaryId: 'MM',
            children: [{
                id: 'N',
                text: 'N',
                secondaryId: 'NN',
                leaf: true
            }]
        }];
        
        makeTree = function(nodes, cfg, storeCfg, rootCfg) {
            cfg = cfg || {};
            Ext.applyIf(cfg, {
                animate: false,
                renderTo: Ext.getBody(),
                viewConfig: {
                    loadMask: false
                },
                store: store = new Ext.data.TreeStore(Ext.apply({
                    model: TreeItem,
                    root: Ext.apply({
                        secondaryId: 'root',
                        id: 'root',
                        text: 'Root',
                        children: nodes
                    }, rootCfg)
                }, storeCfg))
            });
            tree = new Ext.tree.Panel(cfg);
            view = tree.view;
            rootNode = tree.getRootNode();
        };
    });
    
    afterEach(function(){
        Ext.destroy(tree);
        tree = makeTree = null;
        MockAjaxManager.removeMethods();
    });

    // https://sencha.jira.com/browse/EXTJS-16367
    describe("record with a cls field", function() {
        it("should set the cls on the TD element", function() {
            makeTree(testNodes);
            var createRowSpy = spyOn(view, 'createRowElement').andCallThrough();

            rootNode.childNodes[0].set('cls', 'foobar');
            rootNode.expand();
            expect(view.all.item(1).down('td').hasCls('foobar')).toBe(true);

            // The cls is applied to the TD, so the row will have to be created. Cannot use in-cell updating
            rootNode.childNodes[0].set('cls', 'bletch');
            expect(createRowSpy).toHaveBeenCalled();
            expect(view.all.item(1).down('td').hasCls('foobar')).toBe(false);
            expect(view.all.item(1).down('td').hasCls('bletch')).toBe(true);
        });
    });

    describe("construction", function() {
        it("should render while the root node is loading", function() {
            expect(function() {
                makeTree(null, null, {
                    proxy: {
                        type: 'ajax',
                        url: 'fake'
                    }
                }, {
                    expanded: true
                });
            }).not.toThrow();
        });
    });

    describe("setting the root node", function() {
        it("should set the nodes correctly when setting root on the store", function() {
            makeTree();
            store.setRootNode({
                expanded: true,
                children: testNodes
            });
            expect(store.getCount()).toBe(4);
            expect(store.getAt(0).id).toBe('root');
            expect(store.getAt(1).id).toBe('A');
            expect(store.getAt(2).id).toBe('I');
            expect(store.getAt(3).id).toBe('M');
        });

        it("should set the nodes correctly when setting root on the tree", function() {
            makeTree();
            tree.setRootNode({
                expanded: true,
                children: testNodes
            });
            expect(store.getCount()).toBe(4);
            expect(store.getAt(0).id).toBe('root');
            expect(store.getAt(1).id).toBe('A');
            expect(store.getAt(2).id).toBe('I');
            expect(store.getAt(3).id).toBe('M');
        });
    });

    describe('Binding to a TreeStore', function() {
        it('should bind to a TreeStore in the ViewModel', function() {
            tree = new Ext.panel.Panel({
                renderTo: document.body,
                height: 400,
                width: 600,
                layout: 'fit',
                viewModel: {
                    stores: {
                        nodes: {
                            type: 'tree',
                            model: TreeItem,
                            root: {
                                secondaryId: 'root',
                                id: 'root',
                                text: 'Root',
                                children: testNodes,
                                expanded: true
                            }
                        }
                    }
                },
                items: {
                    xtype: 'treepanel',
                    bind: {
                        store: '{nodes}'
                    }
                }
            });
            var treepanel = tree.down('treepanel');

            // The provided default root node has no children
            expect(treepanel.getRootNode().childNodes.length).toBe(0);

            // Wait until the "nodes" store has been bound
            waitsFor(function() {
                return treepanel.getRootNode().childNodes.length === 3 && treepanel.getView().all.getCount() === 4;
            }, 'new store to be bound to');
        });
    });

    describe("auto height with expand/collapse", function() {
        function makeAutoTree(animate, data) {
            makeTree(data, {
                animate: animate
            }, null, {
                expanded: true
            });
        }

        describe("with animate: true", function() {
            it("should update the height after an expand animation", function() {
                makeAutoTree(true, [{
                    id: 'a',
                    expanded: false,
                    children: [{
                        id: 'b'
                    }]
                }]);
                var spy = jasmine.createSpy(),
                    height = tree.getHeight();

                tree.on('afteritemexpand', spy);
                tree.getRootNode().firstChild.expand();
                waitsFor(function() {
                    return spy.callCount > 0;
                });
                runs(function() {
                    expect(tree.getHeight()).toBeGreaterThan(height);
                });
            });

            it("should update the height after a collapse animation", function() {
                makeAutoTree(true, [{
                    id: 'a',
                    expanded: true,
                    children: [{
                        id: 'b'
                    }]
                }]);
                var spy = jasmine.createSpy(),
                    height = tree.getHeight();

                tree.on('afteritemcollapse', spy);
                tree.getRootNode().firstChild.collapse();
                waitsFor(function() {
                    return spy.callCount > 0;
                });
                runs(function() {
                    expect(tree.getHeight()).toBeLessThan(height);
                });
            });
        });

        describe("with animate: false", function() {
            it("should update the height after an expand animation", function() {
                makeAutoTree(false, [{
                    id: 'a',
                    expanded: false,
                    children: [{
                        id: 'b'
                    }]
                }]);

                var height = tree.getHeight();
                tree.getRootNode().firstChild.expand();
                expect(tree.getHeight()).toBeGreaterThan(height);
            });

            it("should update the height after a collapse animation", function() {
                makeAutoTree(false, [{
                    id: 'a',
                    expanded: true,
                    children: [{
                        id: 'b'
                    }]
                }]);

                var height = tree.getHeight();
                tree.getRootNode().firstChild.collapse();
                expect(tree.getHeight()).toBeLessThan(height);
            });
        });
    });

    describe('collapsing when collapse zone overflows the rendered zone', function() {
        beforeEach(function() {
            for (var i = 0; i < 100; i++) {
                testNodes[0].children.push({
                    text: 'Extra node ' + i,
                    id: 'extra-node-' + i
                });
            }
            testNodes[0].expanded = true;

            makeTree(testNodes, {
                renderTo: document.body,
                height: 200,
                width: 400
            }, null, {
                expanded: true
            });
        });

        it("should collapse correctly, leaving the collapsee's siblings visible", function() {
            // Collapse node "A".
            tree.getRootNode().childNodes[0].collapse();
            
            // We now should have "Root", and nodes "A", "I" and "M"
            // https://sencha.jira.com/browse/EXTJS-13908
            expect(tree.getView().all.getCount()).toBe(4);
        });
    });

    describe("sortchange", function() {
        it("should only fire a single sortchange event", function() {
            var spy = jasmine.createSpy();
            makeTree(testNodes, {
                columns: [{
                    xtype: 'treecolumn',
                    dataIndex: 'text'
                }]
            });
            tree.on('sortchange', spy);
            // Pass the position so we don't click right on the edge (trigger a resize)
            jasmine.fireMouseEvent(tree.down('treecolumn').titleEl.dom, 'click', 20, 10);
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toBe(1);
        });
    });

    describe('reconfigure', function() {
        beforeEach(function() {
            makeTree(testNodes, {
                rootVisible: false,
                singleExpand: true,
                height: 200
            }, null, {
                expanded: true
            });
        });
        it('should preserve singleExpand:true', function() {
            // Expand childNodes[0]
            rootNode.childNodes[0].expand();
            expect(rootNode.childNodes[0].isExpanded()).toBe(true);

            // This must collapse childNodes[0] while expanding childNodes[1] because of singleExpand
            rootNode.childNodes[1].expand();
            expect(rootNode.childNodes[0].isExpanded()).toBe(false);
            expect(rootNode.childNodes[1].isExpanded()).toBe(true);

            // Three root's childNodes plus the two child nodes of childNode[1]
            expect(store.getCount()).toBe(5);

            // Identical Store to reconfigure with
            var newStore = new Ext.data.TreeStore({
                model: TreeItem,
                root: {
                    secondaryId: 'root',
                    id: 'root',
                    text: 'Root',
                    children: testNodes,
                    expanded: true
                }
            });

            tree.reconfigure(newStore);
            rootNode = newStore.getRootNode();

            // Back down to just the three root childNodes.
            expect(newStore.getCount()).toBe(3);

            // Expand childNodes[0]
            rootNode.childNodes[0].expand();
            expect(rootNode.childNodes[0].isExpanded()).toBe(true);

            // This must collapse childNodes[0] while expanding childNodes[1] because of singleExpand
            rootNode.childNodes[1].expand();
            expect(rootNode.childNodes[0].isExpanded()).toBe(false);
            expect(rootNode.childNodes[1].isExpanded()).toBe(true);

            // Three root's childNodes plus the two child nodes of childNode[1]
            expect(newStore.getCount()).toBe(5);
        });
    });

    describe('autoexpand collapsed ancestors', function() {
        beforeEach(function() {
            makeTree(testNodes, {
                height: 250
            });
        });
        it("should expand the whole path down to 'G' as well as 'G'", function() {
            // Start off with only the root visible.
            expect(store.getCount()).toBe(1);

            tree.getStore().getNodeById('G').expand();

            // "A" should be expanded all the way down to "H", then "I", then "M"
            expect(store.getCount()).toBe(9);
        });
    });

    describe("removeAll", function() {
        beforeEach(function(){
            makeTree(testNodes, {
                height: 100
            });
        });
        it("should only refresh once when removeAll called", function() {
            var nodeA = tree.getStore().getNodeById('A');

            expect(tree.view.refreshCounter).toBe(1);
            tree.expandAll();

            // With all the nodes fully preloaded, a recursive expand
            // should do one refresh.
            expect(tree.view.refreshCounter).toBe(2);

            // The bulkremove event fired by NodeInterface.removeAll should trigger the NodeStore call onNodeCollapse.
            // In response, the NodeStore removes all child nodes, and fired bulkremove. The BufferedRendererTreeView
            // override processes the removal without calling view's refresh.
            nodeA.removeAll();
            expect(tree.view.refreshCounter).toBe(view.bufferedRenderer ? 3 : 2);
        });
    });

    describe("Getting owner tree", function() {
        beforeEach(function(){
            makeTree(testNodes);
        });
        it("should find the owner tree", function() {
            var store = tree.getStore(),
                h = store.getNodeById('H');

            expect(h.getOwnerTree()).toBe(tree);
        });
    });

    describe("updating row attributes", function() {
        beforeEach(function(){
            makeTree(testNodes);
        });

        it("should set the data-qtip attribute", function() {
            var rootRow = tree.view.getRow(rootNode),
                rootCls = rootRow.className;

            rootNode.set('qtip', 'Foo');
            
            // Class should not change
            expect(rootRow.className).toBe(rootCls);

            // data-qtip must be set
            expect(rootRow.getAttribute('data-qtip')).toBe('Foo');
        });

        it("should add the expanded class on expand", function() {
            var view = tree.getView(),
                cls = view.expandedCls;

            expect(view.getRow(rootNode)).not.toHaveCls(cls);
            rootNode.expand();
            expect(view.getRow(rootNode)).toHaveCls(cls);
        });

        it("should remove the expanded class on collapse", function() {
            var view = tree.getView(),
                cls = view.expandedCls;
                
            rootNode.expand();
            expect(view.getRow(rootNode)).toHaveCls(cls);
            rootNode.collapse();
            expect(view.getRow(rootNode)).not.toHaveCls(cls);
        })
    });
    
    describe("expandPath/selectPath", function(){
        describe("expandPath", function(){
            var expectedSuccess, expectedNode;
            beforeEach(function() {
                expectedSuccess = false;
                makeTree(testNodes);
            });

            describe("callbacks", function(){
               
                describe("empty path", function() {
                    it("should fire the callback with success false & a null node", function() {
                        tree.expandPath('', null, null, function(success, node){
                            expectedSuccess = success;
                            expectedNode = node;
                        });
                        expect(expectedSuccess).toBe(false);
                        expect(expectedNode).toBeNull();
                    });
                    
                    it("should default the scope to the tree", function(){
                        var scope;
                        tree.expandPath('', null, null, function(){
                            scope = this;
                        });
                        expect(scope).toBe(tree);
                    });
                    
                    it("should use any specified scope", function(){
                        var o = {}, scope;
                        tree.expandPath('', null, null, function(){
                            scope = this;
                        }, o);
                        expect(scope).toBe(o);
                    });
                });
                
                describe("invalid root", function() {
                    it("should fire the callback with success false & the root", function() {
                        tree.expandPath('/NOTROOT', null, null, function(success, node){
                            expectedSuccess = success;
                            expectedNode = node;
                        });
                        expect(expectedSuccess).toBe(false);
                        expect(expectedNode).toBe(tree.getRootNode());
                    });
                    
                    it("should default the scope to the tree", function(){
                        var scope;
                        tree.expandPath('/NOTROOT', null, null, function(){
                            scope = this;
                        });
                        expect(scope).toBe(tree);
                    });
                    
                    it("should use any specified scope", function(){
                        var o = {}, scope;
                        tree.expandPath('/NOTROOT', null, null, function(){
                            scope = this;
                        }, o);
                        expect(scope).toBe(o);
                    });
                });

                describe("fully successful expand", function(){
                    describe('Old API', function() {
                        it("should fire the callback with success true and the last node", function(){
                            tree.expandPath('/root/A/B', null, null, function(success, lastExpanded){
                                expectedSuccess = success;
                                expectedNode = lastExpanded;
                            });
                            expect(expectedSuccess).toBe(true);
                            expect(expectedNode).toBe(tree.getStore().getNodeById('B'));
                            expect(view.all.getCount()).toBe(9);
                        });

                        it("should default the scope to the tree", function() {
                            var scope;
                            tree.expandPath('/root/A/B', null, null, function(success, lastExpanded) {
                                scope = this;
                            });
                            expect(scope).toBe(tree);
                        });

                        it("should use any specified scope", function(){
                            var o = {}, scope;
                            tree.expandPath('/root/A/B', null, null, function(success, lastExpanded) {
                                scope = this;
                            }, o);
                            expect(scope).toBe(o);
                        });

                        it('should be able to start from any existing node', function() {
                            tree.expandPath('G', null, null, function(success, lastExpanded) {
                                expectedSuccess = success;
                                expectedNode = lastExpanded;
                            });
                            expect(expectedSuccess).toBe(true);
                            expect(expectedNode).toBe(store.getNodeById('G'));
                            expect(view.all.getCount()).toBe(9);
                        });
                    });
                    describe('New API', function() {
                        var lastHtmlNode;

                        it("should fire the callback with success true and the last node", function(){
                            tree.expandPath('/root/A/B', {
                                callback: function(success, lastExpanded, lastNode) {
                                    expectedSuccess = success;
                                    expectedNode = lastExpanded;
                                    lastHtmlNode = lastNode;
                                },
                                select: true
                            });
                            waitsFor(function() {
                                return expectedSuccess;
                            });
                            runs(function() {
                                expect(expectedNode).toBe(tree.getStore().getNodeById('B'));
                                expect(view.all.getCount()).toBe(9);
                                expect(tree.getSelectionModel().getSelection()[0]).toBe(expectedNode);
                                expect(lastHtmlNode).toBe(view.getNode(tree.getStore().getNodeById('B')));
                            });
                        });

                        it("should default the scope to the tree", function() {
                            var scope;
                            tree.expandPath('/root/A/B', {
                                callback: function(success, lastExpanded) {
                                    scope = this;
                                }
                            });
                            waitsFor(function() {
                                return scope === tree;
                            });
                        });

                        it("should use any specified scope", function(){
                            var o = {}, scope;
                            tree.expandPath('/root/A/B', {
                                callback: 
                                    function(success, lastExpanded) {
                                    scope = this;
                                },
                                scope: o
                            });
                            waitsFor(function() {
                                return scope === o;
                            });
                        });

                        it('should be able to start from any existing node', function() {
                            tree.expandPath('G', {
                                callback: function(success , lastExpanded) {
                                    expectedSuccess = success;
                                    expectedNode = lastExpanded;
                                }
                            });
                            waitsFor(function() {
                                return expectedSuccess;
                            });
                            runs(function() {
                                expect(expectedNode).toBe(store.getNodeById('G'));
                                expect(view.all.getCount()).toBe(9);
                            });
                        });
                    });
                });
                
                describe("partial expand", function(){
                    it("should fire the callback with success false and the last successful node", function(){
                        tree.expandPath('/root/A/FAKE', null, null, function(success, node){
                            expectedSuccess = success;
                            expectedNode = node;
                        });
                        expect(expectedSuccess).toBe(false);
                        expect(expectedNode).toBe(tree.getStore().getById('A'));
                    });
                    
                    it("should default the scope to the tree", function(){
                        var scope;
                        tree.expandPath('/root/A/FAKE', null, null, function(){
                            scope = this;
                        });
                        expect(scope).toBe(tree);
                    });
                    
                    it("should use any specified scope", function(){
                        var o = {}, scope;
                        tree.expandPath('/root/A/FAKE', null, null, function(){
                            scope = this;
                        }, o);
                        expect(scope).toBe(o);
                    });
                });
            });
            
            describe("custom field", function(){
                it("should default the field to the idProperty", function(){
                    tree.expandPath('/root/M');
                    expect(tree.getStore().getById('M').isExpanded()).toBe(true);    
                });
                
                it("should accept a custom field from the model", function(){ 
                    tree.expandPath('/root/AA/FF/GG', 'secondaryId');
                    expect(tree.getStore().getById('G').isExpanded()).toBe(true);
                });
            });
            
            describe("custom separator", function(){
                it("should default the separator to /", function(){
                    tree.expandPath('/root/A');    
                    expect(tree.getStore().getById('A').isExpanded()).toBe(true);
                });  
                
                it("should accept a custom separator", function(){
                    tree.expandPath('|root|A|B', null, '|');    
                    expect(tree.getStore().getById('B').isExpanded()).toBe(true);
                });
            });
            
            describe("various path tests", function(){
                it("should expand the root node", function(){
                    tree.expandPath('/root');
                    expect(tree.getRootNode().isExpanded()).toBe(true);    
                });
                
                it("should fire success if the ending node is a leaf", function(){
                    tree.expandPath('/root/I/L', null, null, function(success, node){
                        expectedSuccess = success;
                        expectedNode = node;
                    });
                    expect(expectedSuccess).toBe(true);
                    expect(expectedNode).toBe(tree.getStore().getById('L'));
                });
            });
            
        });
        
        describe("selectPath", function(){
            var isSelected = function(id){
                var node = tree.getStore().getById(id);
                return tree.getSelectionModel().isSelected(node);
            }; 

            var expectedSuccess, expectedNode;
            beforeEach(function() {
                expectedSuccess = false;
                makeTree(testNodes);
            });
            
            describe("callbacks", function(){
               
                describe("empty path", function() {
                    it("should fire the callback with success false & a null node", function() {
                        var expectedSuccess, expectedNode;
                        tree.selectPath('', null, null, function(success, node){
                            expectedSuccess = success;
                            expectedNode = node;
                        });
                        expect(expectedSuccess).toBe(false);
                        expect(expectedNode).toBeNull();
                    });
                    
                    it("should default the scope to the tree", function(){
                        var scope;
                        tree.selectPath('', null, null, function(){
                            scope = this;
                        });
                        expect(scope).toBe(tree);
                    });
                    
                    it("should use any specified scope", function(){
                        var o = {}, scope;
                        tree.selectPath('', null, null, function(){
                            scope = this;
                        }, o);
                        expect(scope).toBe(o);
                    });
                });
                
                describe("root", function() {
                    it("should fire the callback with success true & the root", function() {
                        var expectedSuccess, expectedNode;
                        tree.selectPath('/root', null, null, function(success, node){
                            expectedSuccess = success;
                            expectedNode = node;
                        });
                        expect(expectedSuccess).toBe(true);
                        expect(expectedNode).toBe(tree.getRootNode());
                    });
                    
                    it("should default the scope to the tree", function(){
                        var scope;
                        tree.selectPath('/root', null, null, function(){
                            scope = this;
                        });
                        expect(scope).toBe(tree);
                    });
                    
                    it("should use any specified scope", function(){
                        var o = {}, scope;
                        tree.selectPath('/root', null, null, function(){
                            scope = this;
                        }, o);
                        expect(scope).toBe(o);
                    });
                });
                
                describe("fully successful expand", function(){                    
                    it("should fire the callback with success true and the last node", function(){
                        var expectedSuccess, expectedNode;
                        tree.selectPath('/root/A/B', null, null, function(success, node){
                            expectedSuccess = success;
                            expectedNode = node;
                        });
                        expect(expectedSuccess).toBe(true);
                        expect(expectedNode).toBe(tree.getStore().getById('B'));
                    });
                    
                    it("should default the scope to the tree", function(){
                        var scope;
                        tree.selectPath('/root/A/B', null, null, function(){
                            scope = this;
                        });
                        expect(scope).toBe(tree);
                    });
                    
                    it("should use any specified scope", function(){
                        var o = {}, scope;
                        tree.selectPath('/root/A/B', null, null, function(){
                            scope = this;
                        }, o);
                        expect(scope).toBe(o);
                    });
                });
                
                describe("partial expand", function(){
                    it("should fire the callback with success false and the last successful node", function(){
                        var expectedSuccess, expectedNode;
                        tree.selectPath('/root/A/FAKE', null, null, function(success, node){
                            expectedSuccess = success;
                            expectedNode = node;
                        });
                        expect(expectedSuccess).toBe(false);
                        expect(expectedNode).toBe(tree.getStore().getById('A'));
                    });
                    
                    it("should default the scope to the tree", function(){
                        var scope;
                        tree.selectPath('/root/A/FAKE', null, null, function(){
                            scope = this;
                        });
                        expect(scope).toBe(tree);
                    });
                    
                    it("should use any specified scope", function(){
                        var o = {}, scope;
                        tree.selectPath('/root/A/FAKE', null, null, function(){
                            scope = this;
                        }, o);
                        expect(scope).toBe(o);
                    });
                });
            });
            
            describe("custom field", function(){
                it("should default the field to the idProperty", function(){
                    tree.selectPath('/root/M');
                    expect(isSelected('M')).toBe(true);    
                });
                
                it("should accept a custom field from the model", function(){ 
                    tree.selectPath('/root/AA/FF/GG', 'secondaryId');
                    expect(isSelected('G')).toBe(true);   
                });
            });
            
            describe("custom separator", function(){
                it("should default the separator to /", function(){
                    tree.selectPath('/root/A');    
                    expect(isSelected('A')).toBe(true);   
                });  
                
                it("should accept a custom separator", function(){
                    tree.selectPath('|root|A|B', null, '|');    
                    expect(isSelected('B')).toBe(true);   
                });
            });
            
            describe("various paths", function(){
                it("should be able to select the root", function(){
                    tree.selectPath('/root');
                    expect(isSelected('root')).toBe(true);    
                });  
                
                it("should select a leaf node", function(){
                    tree.selectPath('/root/I/L');
                    expect(isSelected('L')).toBe(true);
                });
                
                it("should not select a node if the full path isn't resolved", function(){
                    tree.selectPath('/root/I/FAKE');
                    expect(tree.getSelectionModel().getSelection().length).toBe(0);
                });
            });
        });

        describe("special cases", function() {
            it("should be able to select a path where the values are numeric", function() {
                var NumericModel = Ext.define(null, {
                    extend: 'Ext.data.TreeModel',
                    fields: [{name: 'id', type: 'int'}]
                });

                makeTree([{
                    id: 1,
                    text: 'A'
                }, {
                    id: 2,
                    text: 'B',
                    children: [{
                        id: 3,
                        text: 'B1',
                        children: [{
                            id: 4,
                            text: 'B1_1'
                        }]
                    }, {
                        id: 5,
                        text: 'B2',
                        children: [{
                            id: 6,
                            text: 'B2_1'
                        }]
                    }]
                }], null, null, {
                    id: -1
                });

                tree.selectPath('2/3/4');
                expect(tree.getSelectionModel().isSelected(store.getNodeById(4)));
            });

            it("should be able to select a path when subclassing Ext.tree.Panel", function() {
                var Cls = Ext.define(null, {
                    extend: 'Ext.tree.Panel',
                    animate: false,
                    viewConfig: {
                        loadMask: false
                    }
                });

                tree = new Cls({
                    renderTo: Ext.getBody(),
                    store: store = new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            secondaryId: 'root',
                            id: 'root',
                            text: 'Root',
                            children: testNodes
                        }
                    })
                });
                tree.selectPath('/root/A/B/C');
                expect(tree.getSelectionModel().isSelected(store.getNodeById('C')));

            });
        });
        
    });
    
    describe("expand/collapse", function(){
        var startingLayoutCounter;

        beforeEach(function(){
            makeTree(testNodes);
            startingLayoutCounter = tree.layoutCounter;
        });
        
        describe("expandAll", function(){
            
            describe("callbacks", function(){
                it("should pass the direct child nodes of the root", function(){
                    var expectedNodes,
                        callCount = 0,
                        store = tree.getStore();
                        
                    tree.expandAll(function(nodes) {
                        expectedNodes = nodes;
                        callCount++;
                    });
                    
                    expect(callCount).toEqual(1);
                    expect(expectedNodes[0]).toBe(store.getById('A'));
                    expect(expectedNodes[1]).toBe(store.getById('I'));
                    expect(expectedNodes[2]).toBe(store.getById('M'));

                    // Only one layout should have taken place
                    expect(tree.layoutCounter).toBe(startingLayoutCounter + 1);
                });
                
                it("should default the scope to the tree", function() {
                    var expectedScope;
                    tree.expandAll(function(){
                        expectedScope = this;
                    });    
                    expect(expectedScope).toBe(tree);
                });
                
                it("should use a passed scope", function() {
                    var o = {}, expectedScope;
                    tree.expandAll(function(){
                        expectedScope = this;
                    }, o);    
                    expect(expectedScope).toBe(o);
                });
            });
            
            it("should expand all nodes", function(){
                tree.expandAll();
                Ext.Array.forEach(tree.store.getRange(), function(node){
                    if (!node.isLeaf()) {
                        expect(node.isExpanded()).toBe(true);
                    }
                });
            });
            
            it("should continue down the tree even if some nodes are expanded", function(){
                var store = tree.getStore();
                store.getNodeById('A').expand();
                store.getNodeById('I').expand();
                tree.expandAll();
                Ext.Array.forEach(tree.store.getRange(), function(node){
                    if (!node.isLeaf()) {
                        expect(node.isExpanded()).toBe(true);
                    }
                });
            });
            
        });
        
        describe("collapseAll", function(){
            describe("callbacks", function(){
                
                it("should pass the direct child nodes of the root", function(){
                    var expectedNodes,
                        store = tree.getStore();
                        
                    tree.collapseAll(function(nodes) {
                        expectedNodes = nodes;
                    });
                    
                    expect(expectedNodes[0]).toBe(store.getNodeById('A'));
                    expect(expectedNodes[1]).toBe(store.getNodeById('I'));
                    expect(expectedNodes[2]).toBe(store.getNodeById('M'));
                });
                
                it("should default the scope to the tree", function() {
                    var expectedScope;
                    tree.collapseAll(function(){
                        expectedScope = this;
                    });    
                    expect(expectedScope).toBe(tree);
                });
                
                it("should use a passed scope", function() {
                    var o = {}, expectedScope;
                    tree.expandAll(function(){
                        expectedScope = this;
                    }, o);    
                    expect(expectedScope).toBe(o);
                });
            });
            
            it("should collapse all nodes", function(){
                tree.expandAll();
                tree.collapseAll();
                Ext.Array.forEach(tree.store.getRange(), function(node){
                    if (!node.isLeaf()) {
                        expect(node.isExpanded()).toBe(false);
                    }
                });
            });
            
            it("should collapse all nodes all the way down the tree", function(){
                tree.expandPath('/root/A/B/C');
                tree.getRootNode().collapse();
                tree.collapseAll();
                Ext.Array.forEach(tree.store.getRange(), function(node){
                    if (!node.isLeaf()) {
                        expect(node.isExpanded()).toBe(false);
                    }
                });
            });
        });
        
        describe("expand", function(){
            describe("callbacks", function(){
               it("should pass the nodes directly under the expanded node", function(){
                   var expectedNodes,
                        store = tree.getStore();
                        
                   tree.expandNode(tree.getRootNode(), false, function(nodes){
                       expectedNodes = nodes;
                   });
                   
                   expect(expectedNodes[0]).toBe(store.getNodeById('A'));
                   expect(expectedNodes[1]).toBe(store.getNodeById('I'));
                   expect(expectedNodes[2]).toBe(store.getNodeById('M'));
               });
               
               it("should default the scope to the tree", function(){
                   var expectedScope;
                   tree.expandNode(tree.getRootNode(), false, function(){
                       expectedScope = this;
                   });
                   expect(expectedScope).toBe(tree);
               });
               
               it("should use a passed scope", function(){
                   var o = {}, expectedScope;
                   tree.expandNode(tree.getRootNode(), false, function(){
                       expectedScope = this;
                   }, o);
                   expect(expectedScope).toBe(o);
               });
            });
            
            describe("deep", function(){
                it("should only expand a single level if deep is not specified", function(){
                    var store = tree.getStore();
                    tree.expandNode(tree.getRootNode());
                    expect(store.getNodeById('A').isExpanded()).toBe(false);
                    expect(store.getNodeById('I').isExpanded()).toBe(false);  
                    expect(store.getNodeById('M').isExpanded()).toBe(false);      
                });  
                
                it("should expand all nodes underneath the expanded node if deep is set", function(){
                    var store = tree.getStore();
                    tree.expandPath('/root/A');
                    tree.expandNode(store.getNodeById('A'), true);
                    expect(store.getNodeById('B').isExpanded()).toBe(true);
                    expect(store.getNodeById('F').isExpanded()).toBe(true);  
                    expect(store.getNodeById('G').isExpanded()).toBe(true);      
                });  
            });
        });
        
        describe("collapse", function(){
            describe("callbacks", function(){
               it("should pass the nodes directly under the expanded node", function(){
                   var expectedNodes,
                       store = tree.getStore();
                        
                   tree.collapseNode(tree.getRootNode(), false, function(nodes){
                       expectedNodes = nodes;
                   });              
                   expect(expectedNodes[0]).toBe(store.getNodeById('A'));
                   expect(expectedNodes[1]).toBe(store.getNodeById('I'));
                   expect(expectedNodes[2]).toBe(store.getNodeById('M'));
               });
               
               it("should default the scope to the tree", function(){
                   var expectedScope;
                   tree.collapseNode(tree.getRootNode(), false, function(){
                       expectedScope = this;
                   });
                   expect(expectedScope).toBe(tree);
               });
               
               it("should use a passed scope", function(){
                   var o = {}, expectedScope;
                   tree.collapseNode(tree.getRootNode(), false, function(){
                       expectedScope = this;
                   }, o);
                   expect(expectedScope).toBe(o);
               });
            });
            
            describe("deep", function(){
                it("should only collapse a single level if deep is not specified", function(){
                    var store = tree.getStore();
                    tree.expandAll();
                    tree.collapseNode(tree.getRootNode());
                    expect(store.getNodeById('A').isExpanded()).toBe(true);
                    expect(store.getNodeById('I').isExpanded()).toBe(true);  
                    expect(store.getNodeById('M').isExpanded()).toBe(true);      
                });  
                
                it("should expand all nodes underneath the expanded node if deep is set", function(){
                    var store = tree.getStore();
                    tree.expandPath('/root/A');
                    tree.expandNode(store.getNodeById('A'), true);
                    tree.collapseNode(store.getNodeById('A'), true);
                    expect(store.getNodeById('B').isExpanded()).toBe(false);
                    expect(store.getNodeById('F').isExpanded()).toBe(false);  
                    expect(store.getNodeById('G').isExpanded()).toBe(false);      
                });  
            });
        });
    });
    
    describe("animations", function() {
        var enableFx = Ext.enableFx;
        
        beforeEach(function() {
            makeTree = function(nodes, cfg) {
                cfg = cfg || {};
                Ext.applyIf(cfg, {
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            secondaryId: 'root',
                            id: 'root',
                            text: 'Root',
                            children: nodes
                        }
                    })
                });
                tree = new Ext.tree.Panel(cfg);
            };
        });
        
        afterEach(function() {
            Ext.enableFx = enableFx;
        });
        
        it("should enable animations when Ext.enableFx is true", function() {
            Ext.enableFx = true;
            
            makeTree();
            
            expect(tree.enableAnimations).toBeTruthy();
        });
        
        it("should disable animations when Ext.enableFx is false", function() {
            Ext.enableFx = false;
            
            makeTree();
            
            expect(tree.enableAnimations).toBeFalsy();
        });
    });
    
    describe('event order', function() {
        it("should fire 'beforeitemexpand' before 'beforeload'", function() {
            var order = 0,
                beforeitemexpandOrder,
                beforeloadOrder,
                loadOrder,
                layoutCounter;

            makeTree(null, {
                store: new Ext.data.TreeStore({
                    proxy: {
                        type: 'ajax',
                        url: 'fakeUrl'
                    },
                    root: {
                        text: 'Ext JS',
                        id: 'src'
                    },
                    folderSort: true,
                    sorters: [{
                        property: 'text',
                        direction: 'ASC'
                    }]
                }),
                listeners: {
                    beforeitemexpand: function() {
                        beforeitemexpandOrder = order;
                        order++;
                    },
                    beforeload : function() {
                        beforeloadOrder = order;
                        order++;
                    },  
                    load : function() {
                        loadOrder = order;
                    }
                }
            });
            layoutCounter = tree.layoutCounter;
            tree.getStore().getRoot().expand();

            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.encode(testNodes)
            });
            
            // The order of events expected: beforeitemexpand, beforeload, load.
            expect(beforeitemexpandOrder).toBe(0);
            expect(beforeloadOrder).toBe(1);
            expect(loadOrder).toBe(2);

            // The loading plus expand of the root should only have triggered one layout
            expect(tree.layoutCounter).toBe(layoutCounter + 1);
        });
    });

    describe("selected/focused/hover css classes", function() {
        var proto = Ext.view.Table.prototype,
            selectedItemCls = proto.selectedItemCls,
            focusedItemCls = proto.focusedItemCls,
            view, store, rec;

        beforeEach(function() {
            makeTree(testNodes, {
                rowLines: true,
                selModel: {
                    selType: 'rowmodel',
                    mode: 'MULTI'
                }
            });
            tree.getRootNode().expand();
            view = tree.view;
            store = tree.store;
        });

        function blurActiveEl() {
            Ext.getBody().focus();
        }

        it("should preserve the selected classes when nodes are expanded", function() {
            tree.selModel.select([store.getNodeById('A'), store.getNodeById('M')]);
            store.getNodeById('A').expand();
            store.getNodeById('I').expand();

            expect(view.getNodeByRecord(store.getNodeById('A'))).toHaveCls(selectedItemCls);
            expect(view.getNodeByRecord(store.getNodeById('M'))).toHaveCls(selectedItemCls);
        });

        it("should preserve the focused classes when nodes are expanded", function() {
            rec = store.getNodeById('I');
            tree.getView().getNavigationModel().setPosition(rec);
            store.getNodeById('A').expand();
            expect(view.getCell(rec, view.getVisibleColumnManager().getColumns()[0])).toHaveCls(focusedItemCls);
        });

        it("should update the selected classes when rows are collapsed", function() {
            store.getNodeById('A').expand();
            store.getNodeById('M').expand();
            tree.selModel.select([store.getNodeById('B'), store.getNodeById('M')]);
            blurActiveEl(); // EXTJSIV-11281: make sure we're not relying on dom focus for removal of focus border
            store.getNodeById('A').collapse();
            store.getNodeById('M').collapse();

            expect(view.getNodeByRecord(store.getNodeById('M'))).toHaveCls(selectedItemCls);
        });
    });
    
    describe("renderer", function() {
        var CustomTreeColumnNoScope = Ext.define(null, {
                extend: 'Ext.tree.Column',

                renderColText: function(v) {
                    return v + 'NoScope';
                },
                renderer: 'renderColText'
            }),
            CustomTreeColumnScopeThis = Ext.define(null, {
                extend: 'Ext.tree.Column',

                renderColText: function(v) {
                    return v + 'ScopeThis';
                },
                renderer: 'renderColText',
                scope: 'this'
            }),
            CustomTreeColumnScopeController = Ext.define(null, {
                extend: 'Ext.tree.Column',
                scope: 'controller'
            }),
            TreeRendererTestController = Ext.define(null, {
                extend: 'Ext.app.ViewController',
                renderColText: function(v) {
                    return v + 'ViewController';
                }
            });

        describe('String renderer in a column subclass', function() {
            it("should be able to use a named renderer in the column with no scope", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [new CustomTreeColumnNoScope({
                        flex: 1,
                        dataIndex: 'text'
                    })]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootNoScope');
            });
            it("should be able to use a named renderer in the column with scope: 'this'", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [new CustomTreeColumnScopeThis({
                        flex: 1,
                        dataIndex: 'text'
                    })]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootScopeThis');
            });
            // Note: xit because thrown errors inside the TableView rendering path leaves an invalid state
            // which breaks ALL subsequent tests.
            xit("should not be able to use a named renderer in the column with scope: 'controller'", function() {
                expect(function() {
                    tree = new Ext.tree.Panel({
                        animate: false,
                        store: new Ext.data.TreeStore({
                            model: TreeItem,
                            root: {
                                id: 'root',
                                text: 'Root'
                            }
                        }),
                        columns: [new CustomTreeColumnScopeController({
                            flex: 1,
                            dataIndex: 'text',
                            renderer: 'renderColText',
                            scope: 'controller'
                        })]
                    });
                    tree.render(document.body);
                }).toThrow();
            });
            it("should be able to use a named renderer in a ViewController", function() {
                tree = new Ext.tree.Panel({
                    controller: new TreeRendererTestController(),
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [new CustomTreeColumnNoScope({
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'renderColText'
                    })]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootViewController');
                tree.destroy();

                tree = new Ext.tree.Panel({
                    controller: new TreeRendererTestController(),
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [new CustomTreeColumnScopeController({
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'renderColText'
                    })]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootViewController');
                tree.destroy();

                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [new CustomTreeColumnNoScope({
                        controller: new TreeRendererTestController(),
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'renderColText',
                        scope: 'self.controller'
                    })]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootViewController');
            });
            it("should be able to use a named renderer in the Column with no scope when Column uses defaultListenerScope: true", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [new CustomTreeColumnNoScope({
                        defaultListenerScope: true,
                        flex: 1,
                        dataIndex: 'text',
                        renderColText: function(v) {
                            return v + 'ColDefaultScope';
                        },
                        renderer: 'renderColText'
                    })]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootColDefaultScope');
            });
            it("should be able to use a named renderer in the Panel with no scope when Panel uses defaultListenerScope: true", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    defaultListenerScope: true,
                    panelRenderColText: function(v) {
                        return v + 'PanelDefaultScope';
                    },
                    columns: [new CustomTreeColumnNoScope({
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'panelRenderColText'
                    })]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootPanelDefaultScope');
            });
        });

        describe('String renderer in a column definition', function() {
            it("should be able to use a named renderer in the column with no scope", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [{
                        xtype: 'treecolumn',
                        flex: 1,
                        dataIndex: 'text',
                        renderColText: function(v) {
                            return v + 'NoScope';
                        },
                        renderer: 'renderColText'
                    }]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootNoScope');
            });
            it("should be able to use a named renderer in the column with scope: 'this'", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [{
                        xtype: 'treecolumn',
                        flex: 1,
                        dataIndex: 'text',
                        renderColText: function(v) {
                            return v + 'ScopeThis';
                        },
                        renderer: 'renderColText',
                        scope: 'this'
                    }]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootScopeThis');
            });
            // Note: xit because thrown errors inside the TableView rendering path leaves an invalid state
            // which breaks ALL subsequent tests.
            xit("should not be able to use a named renderer in the column with scope: 'controller'", function() {
                expect(function() {
                    tree = new Ext.tree.Panel({
                        animate: false,
                        store: new Ext.data.TreeStore({
                            model: TreeItem,
                            root: {
                                id: 'root',
                                text: 'Root'
                            }
                        }),
                        columns: [{
                            xtype: 'treecolumn',
                            flex: 1,
                            dataIndex: 'text',
                            renderColText: function(v) {
                                return v + 'Foo';
                            },
                            renderer: 'renderColText',
                            scope: 'controller'
                        }]
                    });
                    tree.render(document.body);
                }).toThrow();
            });
            it("should be able to use a named renderer in a ViewController", function() {
                tree = new Ext.tree.Panel({
                    controller: new TreeRendererTestController(),
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [{
                        xtype: 'treecolumn',
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'renderColText'
                    }]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootViewController');
                tree.destroy();

                tree = new Ext.tree.Panel({
                    controller: new TreeRendererTestController(),
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [{
                        xtype: 'treecolumn',
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'renderColText',
                        scope: 'controller'
                    }]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootViewController');
                tree.destroy();

                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [{
                        controller: new TreeRendererTestController(),
                        xtype: 'treecolumn',
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'renderColText',
                        scope: 'self.controller'
                    }]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootViewController');
            });
            it("should be able to use a named renderer in the Column with no scope when Column uses defaultListenerScope: true", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    columns: [{
                        xtype: 'treecolumn',
                        defaultListenerScope: true,
                        flex: 1,
                        dataIndex: 'text',
                        renderColText: function(v) {
                            return v + 'ColDefaultScope';
                        },
                        renderer: 'renderColText'
                    }]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootColDefaultScope');
            });
            it("should be able to use a named renderer in the Panel with no scope when Panel uses defaultListenerScope: true", function() {
                tree = new Ext.tree.Panel({
                    animate: false,
                    renderTo: Ext.getBody(),
                    store: new Ext.data.TreeStore({
                        model: TreeItem,
                        root: {
                            id: 'root',
                            text: 'Root'
                        }
                    }),
                    defaultListenerScope: true,
                    panelRenderColText: function(v) {
                        return v + 'PanelDefaultScope';
                    },
                    columns: [{
                        xtype: 'treecolumn',
                        flex: 1,
                        dataIndex: 'text',
                        renderer: 'panelRenderColText'
                    }]
                });
                expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootPanelDefaultScope');
            });
        });
        
        it("should be able to use a renderer to render the value", function() {
            tree = new Ext.tree.Panel({
                animate: false,
                renderTo: Ext.getBody(),
                store: new Ext.data.TreeStore({
                    model: TreeItem,
                    root: {
                        id: 'root',
                        text: 'Root'
                    }
                }),
                columns: [{
                    xtype: 'treecolumn',
                    flex: 1,
                    dataIndex: 'text',
                    renderer: function(v) {
                        return v + 'Foo';
                    }
                }]
            });
            expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('RootFoo');
        });
        
        it("should be able to use a string renderer that maps to Ext.util.Format", function () {
            tree = new Ext.tree.Panel({
                animate: false,
                renderTo: Ext.getBody(),
                store: new Ext.data.TreeStore({
                    model: TreeItem,
                    root: {
                        id: 'root',
                        text: 'Root'
                    }
                }),
                columns: [{
                    xtype: 'treecolumn',
                    flex: 1,
                    formatter: 'uppercase',
                    dataIndex: 'text'
                }]
            });
            expect(tree.el.down('.x-tree-node-text').dom.innerHTML).toEqual('ROOT');
        });
    });
    

    // https://sencha.jira.com/browse/EXTJSIV-9533
    describe('programmatic load', function() {
        beforeEach(function() {
            Ext.define('spec.Foo', {
                extend : 'Ext.data.Model',
                fields : ['Name', 'Id'],
                idProperty : 'Id'
            });
        });

        afterEach(function () {
            Ext.undefine('spec.Foo');
            Ext.data.Model.schema.clear(true);
        });

        function getData() {
            return [{
                "BaselineEndDate" : "2010-02-01",
                "Id" : 1,
                "Name" : "Planning",
                "PercentDone" : 50,
                "StartDate" : "2010-01-18",
                "BaselineStartDate" : "2010-01-13",
                "Duration" : 11,
                "expanded" : true,
                "TaskType" : "Important",
                "children" : [{
                    "BaselineEndDate" : "2010-01-28",
                    "Id" : 11,
                    "leaf" : true,
                    "Name" : "Investigate",
                    "PercentDone" : 50,
                    "TaskType" : "LowPrio",
                    "StartDate" : "2010-01-18",
                    "BaselineStartDate" : "2010-01-20",
                    "Duration" : 10
                }, { 
                    "BaselineEndDate" : "2010-02-01",
                    "Id" : 12,
                    "leaf" : true,
                    "Name" : "Assign resources",
                    "PercentDone" : 50,
                    "StartDate" : "2010-01-18",
                    "BaselineStartDate" : "2010-01-25",
                    "Duration" : 10
                }, {
                    "BaselineEndDate" : "2010-02-01",
                    "Id" : 13,
                    "leaf" : true,
                    "Name" : "Gather documents (not resizable)",
                    "Resizable" : false,
                    "PercentDone" : 50,
                    "StartDate" : "2010-01-18",
                    "BaselineStartDate" : "2010-01-25",
                    "Duration" : 10
                }, {
                    "BaselineEndDate" : "2010-02-04",
                    "Id" : 17,
                    "leaf" : true,
                    "Name" : "Report to management",
                    "TaskType" : "Important",
                    "PercentDone" : 0,
                    "StartDate" : "2010-02-02",
                    "BaselineStartDate" : "2010-02-04",
                    "Duration" : 0
                }]
            }];
        }

        it('should reload the root node', function() {
            var store = new Ext.data.TreeStore({
                model       : 'spec.Foo',
                proxy       : {
                    type   : 'ajax',
                    url    : '/data/AjaxProxy/treeLoadData'
                },
                root        : {
                    Name : 'ROOOOOOOOT',
                    expanded : true
                }
            }), refreshSpy;

            tree = new Ext.tree.Panel({
                renderTo : Ext.getBody(),
                width    : 600,
                height   : 400,
                store    : store,
                viewConfig: {
                    loadMask: false
                },
                columns  : [{
                    xtype     : 'treecolumn',
                    header    : 'Tasks',
                    dataIndex : 'Name',
                    locked    : true,
                    width     : 200
                }, {
                    width     : 200,
                    dataIndex : 'Id'
                }]
            });

            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.encode(getData())
            });

            var lockedView = tree.lockedGrid.view,
                normalView = tree.normalGrid.view;

            refreshSpy = spyOnEvent(store, 'refresh');
            store.load();

            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.encode(getData())
            });

            expect(refreshSpy.callCount).toBe(1);
            expect(lockedView.getNodes().length).toBe(6);
            expect(normalView.getNodes().length).toBe(6);
        });
    });

    describe('filtering', function() {
        var treeData = [{
            text: 'Top 1',
            children: [{
                text: 'foo',
                leaf: true
            }, {
                text: 'bar',
                leaf: true
            }, {
                text: 'Second level 1',
                children: [{
                    text: 'foo',
                    leaf: true
                }, {
                    text: 'bar',
                    leaf: true
                }]
            }]
        }, {
            text: 'Top 2',
            children: [{
                text: 'foo',
                leaf: true
            }, {
                text: 'wonk',
                leaf: true
            }, {
                text: 'Second level 2',
                children: [{
                    text: 'foo',
                    leaf: true
                }, {
                    text: 'wonk',
                    leaf: true
                }]
            }]
        }, {
            text: 'Top 3',
            children: [{
                text: 'zarg',
                leaf: true
            }, {
                text: 'bar',
                leaf: true
            }, {
                text: 'Second level 3',
                children: [{
                    text: 'zarg',
                    leaf: true
                }, {
                    text: 'bar',
                    leaf: true
                }]
            }]
        }];

        beforeEach(function() {
            makeTree(treeData, {
                rootVisible: false
            });
        });

        function testRowText(rowIdx, value) {
            return view.store.getAt(rowIdx).get('text') === value;
        }

        it('should only show nodes which pass a filter', function() {
            // When filtering the updating of the 'visible' field must not percolate a store update event out to views.
            var handleUpdateCallCount,
                handleUpdateSpy = spyOn(view, 'handleUpdate').andCallThrough();

            // Check correct initial state
            expect(view.all.getCount()).toBe(3);
            expect(view.store.getCount()).toBe(3);
            expect(testRowText(0, 'Top 1')).toBe(true);
            expect(testRowText(1, 'Top 2')).toBe(true);
            expect(testRowText(2, 'Top 3')).toBe(true);

            // Filter so that only "foo" nodes and their ancestors are visible
            store.filter({
                filterFn: function(node) {
                    var children = node.childNodes,
                        len = children && children.length,

                        // Visibility of leaf nodes is whether they pass the test.
                        // Visibility of branch nodes depends on them having visible children.
                        visible = node.isLeaf() ? node.get('text') === 'foo' : false,
                        i;

                    // We're visible if one of our child nodes is visible.
                    // No loop body here. We are looping only while the visible flag remains false.
                    // Child nodes are filtered before parents, so we can check them here.
                    // As soon as we find a visible child, this branch node must be visible.
                    for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                    return visible;
                },
                id: 'testFilter'
            });

            // The setting of the visible field in the filtered out record should NOT have resulted
            // in any update events firing to the view.
            expect(handleUpdateSpy.callCount).toBe(0);

            rootNode.childNodes[0].expand();

            // The "Second level 1" branch node is visible because it has a child with text "foo"
            expect(view.all.getCount()).toBe(4);
            expect(view.store.getCount()).toBe(4);
            expect(testRowText(0, 'Top 1')).toBe(true);
            expect(testRowText(1, 'foo')).toBe(true);
            expect(testRowText(2, 'Second level 1')).toBe(true);
            expect(testRowText(3, 'Top 2')).toBe(true);

            // Expand "Second level 1". It contains 1 "foo" child.
            rootNode.childNodes[0].childNodes[2].expand();

            expect(view.all.getCount()).toBe(5);
            expect(view.store.getCount()).toBe(5);
            expect(testRowText(0, 'Top 1')).toBe(true);
            expect(testRowText(1, 'foo')).toBe(true);
            expect(testRowText(2, 'Second level 1')).toBe(true);
            expect(testRowText(3, 'foo')).toBe(true);
            expect(testRowText(4, 'Top 2')).toBe(true);

            // The spy will have been called now because of node expansion setting the expanded field,
            // resulting in the updating of the folder icon in the view.
            // We are going to check that the filter operation below does NOT increment it.
            handleUpdateCallCount = handleUpdateSpy.callCount;

            // Now, with "Top 1" amd "Second level 1" already expanded, let's see only "bar" nodes and their ancestors.
            // View should refresh.
            store.filter({
                filterFn: function(node) {
                    var children = node.childNodes,
                        len = children && children.length,

                        // Visibility of leaf nodes is whether they pass the test.
                        // Visibility of branch nodes depends on them having visible children.
                        visible = node.isLeaf() ? node.get('text') === 'bar' : false,
                        i;

                    // We're visible if one of our child nodes is visible.
                    // No loop body here. We are looping only while the visible flag remains false.
                    // Child nodes are filtered before parents, so we can check them here.
                    // As soon as we find a visible child, this branch node must be visible.
                    for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                    return visible;
                },
                id: 'testFilter'
            });

            // The setting of the visible field in the filtered out record should NOT have resulted
            // in any update events firing to the view.
            expect(handleUpdateSpy.callCount).toBe(handleUpdateCallCount);

            expect(view.all.getCount()).toBe(5);
            expect(view.store.getCount()).toBe(5);
            expect(testRowText(0, 'Top 1')).toBe(true);
            expect(testRowText(1, 'bar')).toBe(true);
            expect(testRowText(2, 'Second level 1')).toBe(true);
            expect(testRowText(3, 'bar')).toBe(true);
            expect(testRowText(4, 'Top 3')).toBe(true);

            // Expand "Top 3". It contains a "bar" and "Second level3", which should be visible because it contains a "bar"
            rootNode.childNodes[2].expand();

            expect(view.all.getCount()).toBe(7);
            expect(view.store.getCount()).toBe(7);
            expect(testRowText(0, 'Top 1')).toBe(true);
            expect(testRowText(1, 'bar')).toBe(true);
            expect(testRowText(2, 'Second level 1')).toBe(true);
            expect(testRowText(3, 'bar')).toBe(true);
            expect(testRowText(4, 'Top 3')).toBe(true);
            expect(testRowText(5, 'bar')).toBe(true);
            expect(testRowText(6, 'Second level 3')).toBe(true);

            // Collapse "Top 3". The "bar" and "Second level3" which contains a "bar" should disappear
            rootNode.childNodes[2].collapse();

            expect(view.all.getCount()).toBe(5);
            expect(view.store.getCount()).toBe(5);
            expect(testRowText(0, 'Top 1')).toBe(true);
            expect(testRowText(1, 'bar')).toBe(true);
            expect(testRowText(2, 'Second level 1')).toBe(true);
            expect(testRowText(3, 'bar')).toBe(true);
            expect(testRowText(4, 'Top 3')).toBe(true);

            // Collapse the top level nodes
            // So now only top levels which contain a "bar" somewhere in their hierarchy should be visible.
            rootNode.collapseChildren();
            expect(view.all.getCount()).toBe(2);
            expect(view.store.getCount()).toBe(2);
            expect(testRowText(0, 'Top 1')).toBe(true);
            expect(testRowText(1, 'Top 3')).toBe(true);
        });
    });

    describe('sorting', function() {
        it('should sort nodes', function() {
            var bNode;

            makeTree(testNodes, null, {
                folderSort: true,
                sorters: [{
                    property: 'text',
                    direction: 'ASC'
                }]
            });
            tree.expandAll();
            bNode = tree.store.getNodeById('B');

            // Insert an out of order node.
            // MUST be leaf: true so that the automatically prepended sort by leaf status has no effect.
            bNode.insertChild(0, {
                text:'Z',
                leaf: true
            });

            // Check that we have disrupted the sorted state.
            expect(bNode.childNodes[0].get('text')).toBe('Z');
            expect(bNode.childNodes[1].get('text')).toBe('C');
            expect(bNode.childNodes[2].get('text')).toBe('D');

            // Sort using the owning TreeStore's sorter set.
            // It is by leaf status, then text, ASC.
            // These are all leaf nodes.
            bNode.sort();
            expect(bNode.childNodes[0].get('text')).toBe('C');
            expect(bNode.childNodes[1].get('text')).toBe('D');
            expect(bNode.childNodes[2].get('text')).toBe('Z');

            // Sort passing a comparator which does a descending sort on text
            bNode.sort(function(node1, node2) {
                return node1.get('text') > node2.get('text') ? -1 : 1;
            });
            expect(bNode.childNodes[0].get('text')).toBe('Z');
            expect(bNode.childNodes[1].get('text')).toBe('D');
            expect(bNode.childNodes[2].get('text')).toBe('C');
        });
    });
    
    describe('Buffered rendering large, expanded root node', function() {
        function makeNodes() {
            var nodes = [],
                i, j,
                ip1, jp1,
                node;

            for (i = 0; i < 50; i++) {
                ip1 = i + 1;
                node = {
                    id: 'n' + ip1,
                    text: 'Node' + ip1,
                    children: [
                        
                    ]
                };
                for (j = 0; j < 50; j++) {
                    jp1 = j + 1;
                    node.children.push({
                        id: 'n' + ip1 + '.' + jp1,
                        text: 'Node' + ip1 + '/' + jp1,
                        leaf: true
                    });
                }
                nodes.push(node);
            }
            return nodes;
        }

        function completeWithNodes() {
            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.encode(makeNodes())
            });
        }

        it('should maintain scroll position on reload', function() {
            makeTree(null, {
                height: 400,
                width: 350
            }, {
                proxy: {
                    type: 'ajax',
                    url: '/tree/Panel/load'
                },
                root: {
                    id: 'root',
                    text: 'Root',
                    expanded: true
                }
            });

            completeWithNodes();

            view.setScrollY(500);
            store.reload();

            completeWithNodes();

            expect(view.getScrollY()).toBe(500);
        });

        it('should negate the animate flag and not throw an error', function() {
            makeTree(null, {
                height: 400,
                width: 350,
                animate: true
            }, {
                proxy: {
                    type: 'ajax',
                    url: '/tree/Panel/load'
                },
                root: {
                    id: 'root',
                    text: 'Root',
                    expanded: true
                }
            });
            completeWithNodes();

            // EXTJS-13673 buffered rendering should be turned on by default
            expect(tree.view.bufferedRenderer instanceof Ext.grid.plugin.BufferedRenderer).toBe(true);
        });

        it('should scroll to unloaded nodes by absolute path', function() {
            makeTree(null, {
                height: 400,
                width: 350
            }, {// lazyFill means childNodes do not load locally available children arrays until expanded.
                lazyFill: true,
                proxy: {
                    type: 'ajax',
                    url: '/tree/Panel/load'
                },
                root: {
                    id: 'root',
                    text: 'Root',
                    expanded: false
                }
            });

            // forces the root to load even though we configure it expanded: false.
            // We want to exercise the ability of pathing to expand all the way from the root.
            store.load();

            completeWithNodes();
            
            tree.ensureVisible('/root/n50/n50.50');
            expect(Ext.fly(view.getNode(store.getById('n50.50'))).getBox().bottom).toBeLessThanOrEqual(view.getBox().bottom);
        });

        it('should throw an error when being asked to scroll to an invisible root node', function() {
            makeTree(null, {
                height: 400,
                width: 350,
                rootVisible: false
            }, {                
                // lazyFill means childNodes do not load locally available children arrays until expanded.
                lazyFill: true,
                proxy: {
                    type: 'ajax',
                    url: '/tree/Panel/load'
                },
                root: {
                    id: 'root',
                    text: 'Root',
                    expanded: true
                }
            });

            // forces the root to load even though we configure it expanded: false.
            // We want to exercise the ability of pathing to expand all the way from the root.
            store.load();

            completeWithNodes();

            runs(function() {
                expect(function() {
                    tree.ensureVisible(rootNode);
                }).toThrow('Unknown record passed to BufferedRenderer#scrollTo');
            });
        });

        it('should scroll to loaded nodes by relative path', function() {
            makeTree(null, {
                height: 400,
                width: 350
            }, {
                proxy: {
                    type: 'ajax',
                    url: '/tree/Panel/load'
                },
                root: {
                    id: 'root',
                    text: 'Root',
                    expanded: false
                }
            });

            // forces the root to load even though we configure it expanded: false.
            // We want to exercise the ability of pathing to expand all the way from the root.
            store.load();

            completeWithNodes();
            
            runs(function() {
                tree.ensureVisible('n50.50');
                expect(Ext.fly(view.getNode(store.getById('n50.50'))).getBox().bottom).toBeLessThanOrEqual(view.getBox().bottom);
            });
        });
    });
    
    describe('multi append node', function() {
        var layoutCounter,
            height;

        beforeEach(function() {
            makeTree(testNodes, null, null, {
                expanded: true
            });
            layoutCounter = view.componentLayoutCounter;
        });

        it('should only update the view once when an array of nodes is passed', function() {
            height = tree.getHeight();
            expect(view.all.getCount()).toEqual(4);
            tree.getRootNode().appendChild([{
                id: 'append-1',
                text: 'append-1',
                secondaryId: 'append-1'
            }, {
                id: 'append-2',
                text: 'append-2',
                secondaryId: 'append-2'
            }, {
                id: 'append-3',
                text: 'append-3',
                secondaryId: 'append-3'
            }, {
                id: 'append-4',
                text: 'append-4',
                secondaryId: 'append-4'
            }, {
                id: 'append-5',
                text: 'append-5',
                secondaryId: 'append-5'
            }]);
        
            // We added 5 nodes
            expect(view.all.getCount()).toEqual(9);
            
            // We are shrinkwrap height, so it shuold have grown
            expect(tree.getHeight()).toBeGreaterThan(height);

            // All should have been done in one, rather than one update per node
            expect(view.componentLayoutCounter).toEqual(layoutCounter + 1);
        });
    });

    describe('tracking removed nodes', function() {
        it('should not add nodes removed by virtue of their parent collapsing to the removed list', function() {
            var done = false;
            makeTree(testNodes, null, {
                trackRemoved: true
            });
            tree.expandAll(function() {
                tree.collapseAll(function() {
                    done = true;
                });
            });
            waitsFor(function() {
                return done;
            });
            runs(function() {
                expect(tree.store.getRemovedRecords().length).toBe(0);
            });
        });
        
        it('should add descendants of collapsed nodes to the removed list', function() {
            // Create tree with collapsed root node;
            makeTree(testNodes, null, {
                trackRemoved: true
            });
            runs(function() {
                tree.store.getRootNode().drop();

                // All nodes, even though they are not present in the store's Collection should have been added to the tracked list
                expect(tree.store.getRemovedRecords().length).toBe(14);
            });
        });
        
        it('should add descendants of filtered out nodes to the removed list', function() {
            var done = false;

            // Create tree with collapsed root node;
            makeTree(testNodes, null, {
                trackRemoved: true
            });
            tree.expandAll(function() {
                done = true;
            });
            waitsFor(function() {
                return done;
            });

            // When all are expanded, filter them all out.
            // Dropping the root node should still remove all descendants
            runs(function() {
                tree.store.filter('id', 'all_nodes_filtered_out');

                // Filtering should not add to remove list
                expect(tree.store.getRemovedRecords().length).toBe(0);

                tree.store.getRootNode().drop();

                // All nodes, even though they are not present in the store's Collection should have been added to the tracked list
                expect(tree.store.getRemovedRecords().length).toBe(14);
            });
        });
    });

    describe('Changing root node', function() {
        it('should remove all listeners from old root node', function() {
            tree = new Ext.tree.Panel({
                title: 'Test',
                height: 200,
                width: 400,
                root: {
                    text: 'Root',
                    expanded: true,
                    children: [{
                        text: 'A',
                        leaf: true
                    }, {
                        text: 'B',
                        leaf: true
                    }]
                }
            });

            var oldRoot = tree.getRootNode();

            // The old root should have some listeners
            expect(Ext.Object.getKeys(oldRoot.hasListeners).length).toBeGreaterThan(0);

            tree.store.setRoot({
                text: 'NewRoot',
                expanded: true,
                children: [{
                    text: 'New A',
                    leaf: true
                }, {
                    text: 'New B',
                    leaf: true
                }]
            });

            // The old root should have no listeners
            expect(Ext.Object.getKeys(oldRoot.hasListeners).length).toBe(0);

        });
    });
});
