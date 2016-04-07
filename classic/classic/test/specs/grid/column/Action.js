describe("Ext.grid.column.Action", function(){
    var store, grid, view, actionColumn,
        synchronousLoad = true,
        proxyStoreLoad = Ext.data.ProxyStore.prototype.load,
        loadStore;
    
    function getCell(rowIdx, colIdx) {
        return grid.getView().getCellInclusive({
            row: rowIdx,
            column: colIdx
        });
    }
    
    function triggerAction(type, row, colIdx) {
        var cell = getCell(row || 0, colIdx || 1);
        jasmine.fireMouseEvent(cell.down('.' + Ext.grid.column.Action.prototype.actionIconCls, true), type || 'click');
        return cell;
    }

    function makeGrid(gridCfg, storeCfg) {
        store = new Ext.data.Store(Ext.apply({
            fields: ['text', 'actionCls'],
            data: [{
                text: 'text',
                actionCls: 'x-form-clear-trigger'
            }],
            autoDestroy: true
        }, storeCfg || {}));
        
        grid = new Ext.grid.Panel(Ext.apply({
            store: store,
            columns: [{
                dataIndex: 'text',
                header: 'Text'
            }, {
                xtype: 'actioncolumn',
                dataIndex: 'actionCls',
                header: 'Action',
                renderer: Ext.emptyFn,
                items: [{
                    handler: Ext.emptyFn,
                    isDisabled: Ext.emptyFn
                }]
            }],
            renderTo: Ext.getBody()
        }, gridCfg || {}));

        view = grid.view;
        actionColumn = grid.columnManager.getHeaderByDataIndex('actionCls');
    }

    beforeEach(function() {
        // Override so that we can control asynchronous loading
        loadStore = Ext.data.ProxyStore.prototype.load = function() {
            proxyStoreLoad.apply(this, arguments);
            if (synchronousLoad) {
                this.flushLoad.apply(this, arguments);
            }
            return this;
        };
    });

    afterEach(function() {
        // Undo the overrides.
        Ext.data.ProxyStore.prototype.load = proxyStoreLoad;

        store = grid = view = actionColumn = Ext.destroy(grid);
    });

    describe('events', function () {
        var handled = false;

        beforeEach(function () {
            makeGrid({
                columns: [{
                    dataIndex: 'text',
                    header: 'Text'
                }, {
                    xtype: 'actioncolumn',
                    dataIndex: 'actionCls',
                    header: 'Action',
                    items: [{
                        handler: function () {
                            handled = true;
                        }
                    }]
                }]
            });
        });

        afterEach(function () {
            handled = false;
        });

        it('should process click events', function () {
            triggerAction('click');
            expect(handled).toBe(true);
        });

        it('should not process mousedown events', function () {
            triggerAction('mousedown');
            expect(handled).toBe(false);
        });
    });

    it("should not be sortable if there is no dataIndex even if sortable: true", function() {
        makeGrid({
            sortableColumns: true,
            columns: [{
                dataIndex: 'text',
                header: 'Text'
            }, {
                xtype: 'actioncolumn',
                handler: Ext.emptyFn
            }]
        });
        var columns = grid.query('gridcolumn');
        expect(columns[0].sortable).toBe(true);
        expect(columns[1].sortable).toBe(false);
    });

    describe("getClass", function() {
        it("should use the dataIndex and pass it to getClass", function() {
            var handlerSpy = jasmine.createSpy(),
                classSpy = jasmine.createSpy();

            makeGrid({
                columns: [{
                    dataIndex: 'text',
                    header: 'Text'
                }, {
                    xtype: 'actioncolumn',
                    dataIndex: 'actionCls',
                    header: 'Action',
                    items: [{
                        getClass: classSpy.andReturn('x-form-clear-trigger'),
                        handler: handlerSpy
                    }]
                }]
            });

            expect(classSpy.mostRecentCall.args[0]).toBe('x-form-clear-trigger');
            triggerAction();
            expect(handlerSpy).toHaveBeenCalled();
        });
    });

    describe('focus', function () {
        it('should not select and focus the row when clicking the action item', function () {
            // See EXTJSIV-11177.
            var cell;

            makeGrid();
            cell = triggerAction();

            expect(grid.selModel.isSelected(grid.view.getRecord(cell))).toBe(false);
        });
    });

    describe("stopSelection", function() {
        it("should not select the row when clicking the action with stopSelection: true", function() {
            makeGrid({
                columns: [{}, {
                    xtype: 'actioncolumn',
                    stopSelection: true,
                    dataIndex: 'actionCls',
                    header: 'Action',
                    items: [{
                        handler: Ext.emptyFn
                    }]
                }]
            });
            triggerAction();
            expect(grid.getSelectionModel().getSelection().length).toBe(0);
        });

        it("should select the row & focus the cell when clicking the action with stopSelection: false", function() {
            makeGrid({
                columns: [{}, {
                    xtype: 'actioncolumn',
                    stopSelection: false,
                    dataIndex: 'actionCls',
                    header: 'Action',
                    items: [{
                        handler: Ext.emptyFn
                    }]
                }]
            });

            triggerAction();
            expect(grid.getSelectionModel().isSelected(store.first())).toBe(true);
            var pos = grid.view.getNavigationModel().getPosition();
            expect(pos.record).toBe(store.first());
            expect(pos.column).toBe(grid.down('actioncolumn'));
        });
    });
    
    describe("handler", function() {
        var spy1, spy2, col, scope1, scope2;
        function makeHandlerGrid(actionCfg) {
            actionCfg = Ext.apply({
                xtype: 'actioncolumn',
                dataIndex: 'actionCls',
                header: 'Action',
                itemId: 'theAction'
            }, actionCfg);
            makeGrid({
                columns: [{
                    dataIndex: 'text',
                    header: 'Text'
                }, actionCfg]
            });
            col = grid.down('#theAction');
        }
        
        beforeEach(function() {
            spy1 = jasmine.createSpy();
            spy2 = jasmine.createSpy();
            scope1 = {
                foo: function() {}
            };
            scope2 = {
                foo: function() {}
            };
            spyOn(scope1, 'foo');
            spyOn(scope2, 'foo');
        });
        
        afterEach(function() {
            scope1 = scope2 = col = null;
        });
        
        describe("handler priority", function() {
            it("should use a handler on the column", function() {
                makeHandlerGrid({
                    handler: spy1
                });
                triggerAction();
                expect(spy1).toHaveBeenCalled();
            });
            
            it("should use a handler on the item", function() {
                makeHandlerGrid({
                    items: [{
                        handler: spy1
                    }]
                });
                triggerAction();
                expect(spy1).toHaveBeenCalled();
            });
            
            it("should favour the handler on the item", function() {
                makeHandlerGrid({
                    handler: spy1,
                    items: [{
                        handler: spy2
                    }]
                });
                triggerAction();
                expect(spy1).not.toHaveBeenCalled();
                expect(spy2).toHaveBeenCalled();
            });
        });
        
        describe("enabled/disabled state", function() {
            it("should not fire the handler if configured as disabled", function() {
                makeHandlerGrid({
                    handler: spy1,
                    items: [{
                        disabled: true,
                        iconCls : 'icon-pencil'
                    }]
                });

                var view   = grid.getView(),
                    rowEl  = view.getNode(0),
                    img    = Ext.get(rowEl).down('.x-action-col-icon'),
                    imgCls = img.hasCls('x-item-disabled');

                triggerAction();
                expect(spy1).not.toHaveBeenCalled();
                expect(imgCls).toBe(true);
            });
            
            it("should fire if enabled dynamically", function() {
                makeHandlerGrid({
                    handler: spy1,
                    items: [{
                        disabled: true,
                        iconCls : 'icon-pencil'
                    }]
                });

                var view   = grid.getView(),
                    rowEl  = view.getNode(0),
                    img    = Ext.get(rowEl).down('.x-action-col-icon'),
                    imgCls = img.hasCls('x-item-disabled');

                col.enableAction(0);
                triggerAction();
                expect(spy1).toHaveBeenCalled();
                expect(imgCls).toBe(true);
            });
            
            it("should not fire if disabled dynamically", function() {
                makeHandlerGrid({
                    handler: spy1,
                    items: [{
                    }]
                });

                var view   = grid.getView(),
                    rowEl  = view.getNode(0),
                    img    = Ext.get(rowEl).down('.x-action-col-icon');

                expect(img.hasCls('x-item-disabled')).toBe(false);
                col.disableAction(0);
                expect(img.hasCls('x-item-disabled')).toBe(true);

                triggerAction();
                expect(spy1).not.toHaveBeenCalled();
            });
        });
        
        describe("scoping", function() {
            it("should default the scope to the column", function() {
                makeHandlerGrid({
                    handler: spy1
                });
                triggerAction();
                expect(spy1.mostRecentCall.object).toBe(col);
            });
            
            describe("with handler on the column", function() {
                it("should use the scope on the column", function() {
                    makeHandlerGrid({
                        handler: spy1,
                        scope: scope1,
                        items: [{
                        }]
                    });
                    triggerAction();
                    expect(spy1.mostRecentCall.object).toBe(scope1);
                });
                
                it("should use the scope on the item", function() {
                    makeHandlerGrid({
                        handler: spy1,
                        items: [{
                            scope: scope1
                        }]
                    });
                    triggerAction();
                    expect(spy1.mostRecentCall.object).toBe(scope1);
                });
                
                it("should favour the scope on the item", function() {
                    makeHandlerGrid({
                        handler: spy1,
                        scope: scope1,
                        items: [{
                            scope: scope2
                        }]
                    });
                    triggerAction();
                    expect(spy1.mostRecentCall.object).toBe(scope2);
                });
            });
            
            describe("with handler on the item", function() {
                it("should use the scope on the column", function() {
                    makeHandlerGrid({
                        scope: scope1,
                        items: [{
                            handler: spy1
                        }]
                    });
                    triggerAction();
                    expect(spy1.mostRecentCall.object).toBe(scope1);
                });
                
                it("should use the scope on the item", function() {
                    makeHandlerGrid({
                        items: [{
                            handler: spy1,
                            scope: scope1
                        }]
                    });
                    triggerAction();
                    expect(spy1.mostRecentCall.object).toBe(scope1);
                });
                
                it("should favour the scope on the item", function() {
                    makeHandlerGrid({
                        scope: scope1,
                        items: [{
                            handler: spy1,
                            scope: scope2
                        }]
                    });
                    triggerAction();
                    expect(spy1.mostRecentCall.object).toBe(scope2);
                });
            });
        });
        
        describe("string handler", function() {
            describe("handler on the column", function() {
                it("should lookup a scope on the column", function() {
                    makeHandlerGrid({
                        scope: scope1,
                        handler: 'foo',
                        items: [{}]
                    });
                    triggerAction();
                    expect(scope1.foo).toHaveBeenCalled();
                });
                
                it("should lookup a scope on the item", function() {
                    makeHandlerGrid({
                        handler: 'foo',
                        items: [{
                            scope: scope1
                        }]
                    });
                    triggerAction();
                    expect(scope1.foo).toHaveBeenCalled();
                });
                
                it("should favour the scope on the item", function() {
                    makeHandlerGrid({
                        handler: 'foo',
                        scope: scope1,
                        items: [{
                            scope: scope2
                        }]
                    });
                    triggerAction();
                    expect(scope1.foo).not.toHaveBeenCalled();
                    expect(scope2.foo).toHaveBeenCalled();
                });
            });
            
            describe("handler on the item", function() {
                it("should lookup a scope on the column", function() {
                    makeHandlerGrid({
                        scope: scope1,
                        items: [{
                            handler: 'foo'
                        }]
                    });
                    triggerAction();
                    expect(scope1.foo).toHaveBeenCalled();
                });
                
                it("should lookup a scope on the item", function() {
                    makeHandlerGrid({
                        items: [{
                            handler: 'foo',
                            scope: scope1
                        }]
                    });
                    triggerAction();
                    expect(scope1.foo).toHaveBeenCalled();
                });
                
                it("should favour the scope on the item", function() {
                    makeHandlerGrid({
                        scope: scope1,
                        items: [{
                            handler: 'foo',
                            scope: scope2
                        }]
                    });
                    triggerAction();
                    expect(scope1.foo).not.toHaveBeenCalled();
                    expect(scope2.foo).toHaveBeenCalled();
                });
            });
            
            describe("no scope", function() {
                it("should resolve the scope", function() {
                    makeHandlerGrid({
                        handler: 'foo'
                    });
                    
                    col.resolveListenerScope = function() {
                        return scope2;
                    };
                    triggerAction();
                    expect(scope2.foo).toHaveBeenCalled();
                });
            });
        });
        
        it("should pass view, rowIdx, cellIndex, item, e, record, row", function() {
            makeHandlerGrid({
                handler: spy1
            });
            triggerAction();
            var args = spy1.mostRecentCall.args;
            expect(args[0]).toBe(grid.getView());
            expect(args[1]).toBe(0);
            expect(args[2]).toBe(1);
            expect(args[3].dataIndex).toBe('actionCls');
            expect(args[4] instanceof Ext.event.Event).toBe(true);
            expect(args[5]).toBe(store.first());
            expect(args[6]).toBe(grid.getView().getRow(0));
        });
    });

    describe("destroy", function() {
        describe("as a subclass with items on the class", function() {
            var Cls = Ext.define(null, {
                extend: 'Ext.grid.column.Action',
                items: [{
                    iconCls: 'foo'
                }]
            });

            it("should not cause an exception when not rendered", function() {
                makeGrid({
                    renderTo: null,
                    columns: [new Cls()]
                });

                expect(function() {
                    grid.destroy();
                }).not.toThrow();
            });

            it("should not cause an exception when rendered", function() {
                makeGrid({
                    columns: [new Cls()]
                });

                expect(function() {
                    grid.destroy();
                }).not.toThrow();
            });
        });

        describe("as a config with items on the class", function() {
            it("should not cause an exception when not rendered", function() {
                makeGrid({
                    renderTo: null
                });

                expect(function() {
                    grid.destroy();
                }).not.toThrow();
            });

            it("should not cause an exception when rendered", function() {
                makeGrid();

                expect(function() {
                    grid.destroy();
                }).not.toThrow();
            });
        });
    });

    describe('callbacks', function () {
        describe('when the model is updated', function () {
            describe('renderers', function () {
                function runTest(method) {
                    it('should call ' + method, function () {
                        makeGrid();
                        spyOn(actionColumn, method).andCallThrough();
                        store.getAt(0).set('text', 'Kilgore Trout');

                        expect(actionColumn[method].callCount).toBe(1);
                    });
                }

                runTest('origRenderer'); // the defined column.renderer
                runTest('defaultRenderer');
            });

            describe('isDisabled on items', function () {
                it('should call isDisabled', function () {
                    var item;

                    makeGrid();
                    item = actionColumn.items[0];
                    spyOn(item, 'isDisabled').andCallThrough();
                    store.getAt(0).set('text', 'Kilgore Trout');

                    expect(item.isDisabled.callCount).toBe(1);
                });
            });
        });
    });
});
