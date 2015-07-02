describe("Ext.tree.TreeGrid", function() {

    var TreeGridItem = Ext.define(null, {
        extend: 'Ext.data.Model',
        fields: ['f1', 'f2'],
        proxy: {
            type: 'memory'
        }
    }),
    tree,
    view,
    store,
    recordCount,
    treeData = {
        f1: 'root1',
        f2: 'root.a',

        // Add cls. Tests must not throw errors with this present.
        cls: 'test-EXTJS-16367',
        children: [{
            f1: '1',
            f2: 'a',
            children: [{
                f1: '1.1',
                f2: 'a.a',
                leaf: true
            }, {
                f1: '1.2',
                f2: 'a.b',
                leaf: true
            }, {
                f1: '1.3',
                f2: 'a.c',
                leaf: true
            }, {
                f1: '1.4',
                f2: 'a.d',
                leaf: true
            }]
        }, {
            f1: '2',
            f2: 'b',
            children: [{
                f1: '2.1',
                f2: 'b.a',
                leaf: true
            }, {
                f1: '2.2',
                f2: 'b.b',
                leaf: true
            }, {
                f1: '2.3',
                f2: 'b.c',
                leaf: true
            }, {
                f1: '2.4',
                f2: 'b.d',
                leaf: true
            }]
        }, {
            f1: '3',
            f2: 'c',
            children: [{
                f1: '3.1',
                f2: 'c.a',
                leaf: true
            }, {
                f1: '3.2',
                f2: 'c.b',
                leaf: true
            }, {
                f1: '3.3',
                f2: 'c.c',
                leaf: true
            }, {
                f1: '3.4',
                f2: 'c.d',
                leaf: true
            }]
        }, {
            f1: '4',
            f2: 'd',
            children: [{
                f1: '4.1',
                f2: 'd.a',
                leaf: true
            }, {
                f1: '4.2',
                f2: 'd.b',
                leaf: true
            }, {
                f1: '4.3',
                f2: 'd.c',
                leaf: true
            }, {
                f1: '4.4',
                f2: 'd.d',
                leaf: true
            }]
        }, {
            f1: '5',
            f2: 'e',
            children: [{
                f1: '5.1',
                f2: 'e.a',
                leaf: true
            }, {
                f1: '5.2',
                f2: 'e.b',
                leaf: true
            }, {
                f1: '5.3',
                f2: 'e.c',
                leaf: true
            }, {
                f1: '5.4',
                f2: 'e.d',
                leaf: true
            }]
        }, {
            f1: '6',
            f2: 'f',
            children: [{
                f1: '6.1',
                f2: 'f.a',
                leaf: true
            }, {
                f1: '6.2',
                f2: 'f.b',
                leaf: true
            }, {
                f1: '6.3',
                f2: 'f.c',
                leaf: true
            }, {
                f1: '6.4',
                f2: 'f.d',
                leaf: true
            }]
        }]
    };
    
    function makeTreeGrid(cfg, storeCfg) {
        tree = new Ext.tree.Panel(Ext.apply({
            animate: false,
            renderTo: Ext.getBody(),
            store: store = new Ext.data.TreeStore(Ext.apply({
                model: TreeGridItem,
                root: Ext.clone(treeData)
            }, storeCfg)),
            trailingBufferZone: 1000,
            leadingBufferZone: 1000,
            width: 200,
            columns: [{
                xtype: 'treecolumn',
                text: 'F1',
                dataIndex: 'f1',
                width: 100
            }, {
                text: 'F2',
                dataIndex: 'f2',
                flex: 1
            }]
        }, cfg));
        view = tree.getView();
    }
    
    afterEach(function(){
        Ext.destroy(tree);
    });
    
    describe('Model mutation', function() {
        it('should not have to render a whole row, it should update innerHTML of cell', function() {
            makeTreeGrid();

            // Test cls config
            expect(view.getCellByPosition({row:0, column: 0}).hasCls('test-EXTJS-16367')).toBe(true);

            var createRowSpy = spyOn(view, 'createRowElement').andCallThrough();
            store.getAt(0).set({
                f1: 'ploot',
                f2: 'gronk'
            });

            // MUST not have created a bew row, we must have just updated the text within the cell
            expect(createRowSpy).not.toHaveBeenCalled();
        });
    });

    describe('autoloading', function() {
        it('should not autoload the store if the root is visible', function() {
            var loadCount = 0;
            // rootVisible defaults to true, so no autoload
            makeTreeGrid({
                columns: [{
                    xtype: 'treecolumn',
                    text: 'F1',
                    dataIndex: 'f1',
                    width: 100
                }],
                    store: {
                    listeners: {
                        load: function() {
                            loadCount++;
                        }
                    }
                }
            });
            expect(loadCount).toBe(0);
        });
        it('should not autoload the store if the root is visible and there is a locked column', function() {
            var loadCount = 0;
            // rootVisible defaults to true, so no autoload
            makeTreeGrid({
                columns: [{
                    xtype: 'treecolumn',
                    text: 'F1',
                    dataIndex: 'f1',
                    width: 100,
                    locked: true
                }],
                store: {
                    listeners: {
                        load: function() {
                            loadCount++;
                        }
                    }
                }
            });
            expect(loadCount).toBe(0);
        });
        it('should autoload the store if the root is visible', function() {
            var loadCount = 0;
            // rootVisible set to false, so autoload so that user sees the tree content
            makeTreeGrid({
                rootVisible: false,
                columns: [{
                    xtype: 'treecolumn',
                    text: 'F1',
                    dataIndex: 'f1',
                    width: 100
                }],
                store: {
                    proxy: 'memory',
                    listeners: {
                        load: function() {
                            loadCount++;
                        }
                    }
                }
            });
            expect(loadCount).toBe(1);
        });
        it('should autoload the store if the root is visible and there is a locked column', function() {
            var loadCount = 0;
            // rootVisible set to false, so autoload so that user sees the tree content
            makeTreeGrid({
                rootVisible: false,
                columns: [{
                    xtype: 'treecolumn',
                    text: 'F1',
                    dataIndex: 'f1',
                    width: 100,
                    locked: true
                }],
                store: {
                    proxy: 'memory',
                    listeners: {
                        load: function() {
                            loadCount++;
                        }
                    }
                }
            });
            expect(loadCount).toBe(1);
        });
    });

    describe("Buffered rendering", function() {
        var rootNode;

        beforeEach(function() {
            makeTreeGrid({
                height: 45,
                plugins: Ext.create('Ext.grid.plugin.BufferedRenderer', {
                    trailingBufferZone: 1,
                    leadingBufferZone: 1
                })
            });
            tree.expandAll();
            recordCount = tree.view.store.getCount();
            rootNode = tree.getRootNode();
        });
        it("should not render every node", function() {

            expect(recordCount).toEqual(31);

            // The view's Composite element should only contain the visible rows plus buffer zones.
            // Should be less than the total node count in the Tree structure.
            expect(tree.view.all.getCount()).toBeLessThan(recordCount);
        });
        it("should not not scroll upon node expand", function() {
            tree.collapseAll();
            rootNode.expand();
            tree.view.setScrollY(40);
            tree.getRootNode().childNodes[1].expand();

            // Expanding a node should not scroll.
            expect(tree.view.getScrollY()).toEqual(40);
        });
    });

    describe('buffered rendering with locking and rootVisible: false', function() {
        var rootNode;
        beforeEach(function() {
                makeTreeGrid({
                    renderTo: Ext.getBody(),
                    height: 120,
                    store: new Ext.data.TreeStore({
                        model: TreeGridItem,
                        root: {
                            f1: 'Root',
                            f2: 'root',
                            children: [{
                                f1: 'c0',
                                f2: 'c0',
                                leaf: true
                            }, {
                                f1: 'c1',
                                f2: 'c1',
                                leaf: true
                            }, {
                                f1: 'c2',
                                f2: 'c2',
                                leaf: true
                            }]
                        }
                    }),
                    plugins: Ext.create('Ext.grid.plugin.BufferedRenderer', {
                        trailingBufferZone: 1,
                        leadingBufferZone: 1
                    }),
                    columns: [{
                        xtype: 'treecolumn',
                        text: 'F1',
                        dataIndex: 'f1',
                        width: 100,
                        locked: true
                    }, {
                        text: 'F2',
                        dataIndex: 'f2',
                        flex: 1
                    }],
                    rootVisible: false
                });
                recordCount = tree.lockedGrid.view.store.getCount();
                rootNode = tree.getRootNode();
        });

        it('should work when inserting a node at the top', function() {
            expect(tree.lockedGrid.view.all.getCount()).toEqual(3);
            expect(tree.normalGrid.view.all.getCount()).toEqual(3);
            rootNode.insertBefore({text:'Top'}, rootNode.childNodes[0]);

            expect(tree.lockedGrid.view.all.getCount()).toEqual(4);
            expect(tree.normalGrid.view.all.getCount()).toEqual(4);
        });
    });

    describe("Buffered rendering and locking", function() {
        var rootNode;

        beforeEach(function() {
            makeTreeGrid({
                height: 45,
                plugins: Ext.create('Ext.grid.plugin.BufferedRenderer', {
                    trailingBufferZone: 1,
                    leadingBufferZone: 1
                }),
                columns: [{
                    xtype: 'treecolumn',
                    text: 'F1',
                    dataIndex: 'f1',
                    width: 100,
                    locked: true
                }, {
                    text: 'F2',
                    dataIndex: 'f2',
                    flex: 1
                }]
            });
            tree.expandAll();
            recordCount = tree.lockedGrid.view.store.getCount();
            rootNode = tree.getRootNode();
        });
        it("should not render every node", function() {
            var lockedTree = tree.lockedGrid,
                normalGrid = tree.normalGrid,
                viewSize = lockedTree.view.all.getCount();
            expect(recordCount).toEqual(31);

            // The view's Composite element should only contain the visible rows plus buffer zones.
            // Should be less than the total node count in the Tree structure.
            expect(viewSize).toBeLE(recordCount);
            expect(normalGrid.view.all.getCount()).toEqual(viewSize);
        });

        it('should sync scroll positions between the two sides', function() {
            var lockedTree = tree.lockedGrid,
                normalGrid = tree.normalGrid,
                lockedView = lockedTree.view,
                normalView = normalGrid.view;

            tree.collapseAll();
            rootNode.expand();
            normalView.setScrollY(30);
            waits(200); // Wait for the scroll listener (deferred to next animation Frame)
            runs(function() {
                expect(lockedView.getScrollY()).toEqual(30);

                // Now, at 120px high, the entire tree is rendered, scrolling will not triggert action by the buffered renderer
                // Scrolling should still sync
                tree.setHeight(120);

                normalView.setScrollY(45);
                waits(200); // Wait for the scroll listener (deferred to next animation Frame)
                runs(function() {
                    expect(lockedView.getScrollY()).toEqual(45);

                    rootNode.childNodes[2].expand();

                    // Root node, its 6 children, and child[2]'s 4 children: 11 records in NodeStore
                    expect(normalView.store.getCount()).toEqual(11);

                    // But scroll position should not change
                    expect(lockedView.el.dom.scrollTop).toEqual(45);
                });
            });
        });
    });
    
    describe('reconfigure', function() {
        it('should allow reconfigure', function() {
            var cols = [{
                xtype: 'treecolumn',
                text: 'Task',
                flex: 1,
                dataIndex: 'task'
            }, {
                text: 'URL',
                flex: 1,
                sortable: false,
                dataIndex: 'url'
            }];

            var cols2 = [{
                xtype: 'treecolumn',
                text: 'New Task',
                flex: 1,
                dataIndex: 'new_task'
            }, {
                text: 'New URL',
                flex: 1,
                sortable: false,
                dataIndex: 'new_url'
            }];

            Ext.define('ReconfigureTestTask', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'task',
                    type: 'string'
                }, {
                    name: 'url',
                    type: 'string'
                }]
            });

            Ext.define('ReconfigureTestNewTask', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'new_task',
                    type: 'string'
                }, {
                    name: 'new_url',
                    type: 'string'
                }]
            });

            var store = Ext.create('Ext.data.TreeStore', {
                model: 'ReconfigureTestTask',
                root: {
                    expanded: true,
                    children: [{
                        task: 'task1',
                        url: 'url1',
                        expanded: true,
                        children: [{
                            task: 'task1.1',
                            url: 'url1.1',
                            leaf: true
                        }]
                    }, {
                        task: 'task2',
                        url: 'url2',
                        expanded: true,
                        children: [{
                            task: 'task2.1',
                            url: 'url2.1',
                            leaf: true
                        }]
                    }]
                }
            });

            var store2 = Ext.create('Ext.data.TreeStore', {
                model: 'ReconfigureTestNewTask',
                root: {
                    expanded: true,
                    children: [{
                        new_task: 'new-task1',
                        new_url: 'new-url1',
                        expanded: true,
                        children: [{
                            new_task: 'new-task1.1',
                            new_url: 'new-url1.1',
                            leaf: true
                        }]
                    }, {
                        new_task: 'new-task2',
                        new_url: 'new-url2',
                        expanded: true,
                        children: [{
                            new_task: 'new-task2.1',
                            new_url: 'new-url2.1',
                            leaf: true
                        }]
                    }]
                }
            });

            var myTree = Ext.create('Ext.tree.Panel', {
                title: 'treegrid',
                width: 600,
                height: 300,
                renderTo: Ext.getBody(),
                collapsible: true,
                rootVisible: false,
                useArrows: true,
                store: store,
                multiSelect: true,
                columns: cols
            }),
            root = myTree.getRootNode();
            expect(root.childNodes[0].data.task).toEqual('task1');
            expect(root.childNodes[0].data.url).toEqual('url1');
            expect(root.childNodes[0].childNodes[0].data.task).toEqual('task1.1');
            expect(root.childNodes[0].childNodes[0].data.url).toEqual('url1.1');
            expect(root.childNodes[1].data.task).toEqual('task2');
            expect(root.childNodes[1].data.url).toEqual('url2');
            expect(root.childNodes[1].childNodes[0].data.task).toEqual('task2.1');
            expect(root.childNodes[1].childNodes[0].data.url).toEqual('url2.1');

            myTree.reconfigure(store2, cols2);
            root = myTree.getRootNode();
            expect(root.childNodes[0].data.new_task).toEqual('new-task1');
            expect(root.childNodes[0].data.new_url).toEqual('new-url1');
            expect(root.childNodes[0].childNodes[0].data.new_task).toEqual('new-task1.1');
            expect(root.childNodes[0].childNodes[0].data.new_url).toEqual('new-url1.1');
            expect(root.childNodes[1].data.new_task).toEqual('new-task2');
            expect(root.childNodes[1].data.new_url).toEqual('new-url2');
            expect(root.childNodes[1].childNodes[0].data.new_task).toEqual('new-task2.1');
            expect(root.childNodes[1].childNodes[0].data.new_url).toEqual('new-url2.1');
            
            myTree.destroy();
            Ext.undefine('ReconfigureTestTask');
            Ext.undefine('ReconfigureTestNewTask');
        });
    });
    
});
