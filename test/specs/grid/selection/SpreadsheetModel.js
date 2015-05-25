describe("Ext.grid.selection.SpreadsheetModel", function() {
    
    var grid, view, store, selModel, colRef,
        // Unreliable synthetic events on IE.
        // SelModel tests are not broiwser-dependent though
        smDescribe = Ext.isIE ? xdescribe : describe;
    
    function triggerCellMouseEvent(type, rowIdx, cellIdx, button, x, y) {
        var target = findCell(rowIdx, cellIdx);
        jasmine.fireMouseEvent(target, type, x, y, button);
    }
    
    function findCell(rowIdx, cellIdx) {
        return view.getCell(rowIdx, colRef[cellIdx]);
    }

    function isCellSelected(row, col) {
        return view.getSelectionModel().isCellSelected(view, row, col);
    }

    function isColumnSelected(index) {
        var colCells = view.el.query(colRef[index].getCellSelector()),
            len = colCells.length,
            i;

        for (i = 0; i < len; i++) {
            if (!Ext.fly(colCells[i]).hasCls(view.selectedCellCls)) {
                return false;
            }
        }
        return true;
    }

    function isRowSelected(index) {
        return view.getSelectionModel().isSelected(index);
    }

    function clickRowNumberer(index, ctrlKey) {
        var target = findCell(index, 0);
        jasmine.fireMouseEvent(target, 'click', null, null, null, null, ctrlKey);
    }

    function spyOnEvent(object, eventName, fn) {
        var obj = {
            fn: fn || Ext.emptyFn
        },
        spy = spyOn(obj, 'fn');

        object.addListener(eventName, obj.fn);
        return spy;
    }

    function makeGrid(columns, cfg, selModelCfg, storeCfg, locked) {
        Ext.define('spec.SpreadsheetModel', {
            extend: 'Ext.data.Model',
            fields: [
                'field1',
                'field2',
                'field3',
                'field4',
                'field5'
            ]
        });

        selModel = new Ext.grid.selection.SpreadsheetModel(Ext.apply({
            dragSelect: true,
            cellSelect: true,
            columnSelect: true,
            rowSelect: true,
            checkboxSelect: false
        }, selModelCfg));
        
        var data = [],
            defaultCols = [],
            i;
        
        if (!columns) {
            for (i = 1; i <= 5; ++i) {
                defaultCols.push({
                    name: 'F' + i,
                    dataIndex: 'field' + i,

                    // First column locked if locked passed
                    locked: locked && i === 1
                });
            }
        }
            
        for (i = 1; i <= 10; ++i) {
            data.push({
                field1: i + '.' + 1,
                field2: i + '.' + 2,
                field3: i + '.' + 3,
                field4: i + '.' + 4,
                field5: i + '.' + 5
            });
        }

        storeCfg = Ext.apply({
            model: spec.SpreadsheetModel
        }, storeCfg);

        // Apply the generated data to the store, or if a memory proxy, to the proxy
        if (storeCfg.proxy && storeCfg.proxy.type === 'memory' && !storeCfg.proxy.data) {
            storeCfg.proxy.data = data;
        } else if (!('data' in storeCfg)) {
            storeCfg.data = data;
        }

        store = new Ext.data.Store(storeCfg);
        
        grid = new Ext.grid.Panel(Ext.apply({
            columns: columns || defaultCols,
            store: store,
            selModel: selModel,
            width: 600,
            height: 300,
            renderTo: Ext.getBody()
        }, cfg));
        view = grid.getView();
        selModel = grid.getSelectionModel();
        colRef = grid.getColumnManager().getColumns();
    }
    
    afterEach(function(){
        Ext.destroy(grid, store);
        selModel = grid = store = view = null;
        Ext.undefine('spec.SpreadsheetModel');
        Ext.data.Model.schema.clear();
    });

    smDescribe("Non-rendered operation", function() {
        it("should allow reconfiguration before render", function() {
            makeGrid(null, {
                renderTo: null
            });

            // These configs have to work before render
            expect(function() {
                selModel.setRowSelect(false);
                selModel.setRowSelect(true);
                selModel.setColumnSelect(false);
                selModel.setColumnSelect(true);
                selModel.setCellSelect(false);
                selModel.setCellSelect(true);
            }).not.toThrow();
        });
        it("should allow selection of cells before render", function() {
            var cell;

            makeGrid(null, {
                renderTo: null
            });

            selModel.selectCells(cell = new Ext.grid.CellContext(view).setPosition(2, 2), cell);

            grid.render(document.body);
            expect(isCellSelected(2, 2)).toBe(true);
        });
        it("should allow selection of records before render", function() {
            makeGrid(null, {
                renderTo: null
            });

            selModel.select(store.getAt(2));

            grid.render(document.body);

            // Should have selected row 2
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(1);
            expect(isRowSelected(2)).toBe(true);
        });
        it("should allow selection of columns before render", function() {
            makeGrid(null, {
                renderTo: null
            });

            selModel.selectColumn(colRef[2]);

            grid.render(document.body);

            // Should have selected all cells under column 2
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[2].getCellSelector()).length);
            expect(isColumnSelected(2)).toBe(true);
        });
    });

    smDescribe("Select all", function() {
        it("should select all on click of header zero", function() {
            makeGrid();
            var r2c0 = findCell(2, 0);

            jasmine.fireMouseEvent(colRef[0].el.dom, 'click');

            // Should have selected all rows
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(store.getCount());

            jasmine.fireMouseEvent(colRef[0].el.dom, 'click');

            // Should have deselected all rows
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(0);

            jasmine.fireMouseEvent(colRef[0].el.dom, 'click');

            // Should have selected all rows
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(store.getCount());

            // Confirm that row 2 is selected, then click the rownumberer cell in row 2
            expect(selModel.isSelected(2)).toBe(true);
            jasmine.fireMouseEvent(r2c0, 'click', null, null, null, null, true);

            // Should have deselected row 2
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(store.getCount() - 1);
            expect(selModel.isSelected(2)).toBe(false);

            // Now that not all is selected, clicking this should select all again.
            jasmine.fireMouseEvent(colRef[0].el.dom, 'click');

            // Should have selected all cells
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(store.getCount());
        });
    });    

    smDescribe("Column selection", function() {
        it("should select a column on click of a header", function() {
            makeGrid();
            var spy = spyOnEvent(store, "sort").andCallThrough();

            jasmine.fireMouseEvent(colRef[1].el.dom, 'click');

            // Should have selected all cells under column 1
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[1].getCellSelector()).length);
            expect(isColumnSelected(1)).toBe(true);

            jasmine.fireMouseEvent(colRef[1].el.dom, 'click');

            // Should have deselected all cells
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(0);

            // Activating the header as a column select should NOT sort
            expect(spy).not.toHaveBeenCalled();
        });
        it("should select a column on click of a header and deselect previous columns", function() {
            makeGrid();
            var spy = spyOnEvent(store, "sort").andCallThrough();
            jasmine.fireMouseEvent(colRef[1].el.dom, 'click');

            // Should have selected all cells under column 1
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[1].getCellSelector()).length);
            expect(isColumnSelected(1)).toBe(true);

            jasmine.fireMouseEvent(colRef[2].el.dom, 'click');

            // Should have selected all cells under column 2
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[2].getCellSelector()).length);
            expect(isColumnSelected(2)).toBe(true);

            jasmine.fireKeyEvent(colRef[2].el.dom, 'keydown', Ext.EventObject.RIGHT);
            jasmine.fireKeyEvent(colRef[3].el.dom, 'keydown', Ext.EventObject.SPACE);

            // Should have selected all cells under column 3
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[3].getCellSelector()).length);
            expect(isColumnSelected(3)).toBe(true);

            // Activating the header as a column select should NOT sort
            expect(spy).not.toHaveBeenCalled();
        });
        it("should select a column on CTRL/click of a header and not deselect previous columns", function() {
            makeGrid();
            var spy = spyOnEvent(store, "sort").andCallThrough();
            jasmine.fireMouseEvent(colRef[1].el.dom, 'click');

            // Should have selected all cells under column 1
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[1].getCellSelector()).length);
            expect(isColumnSelected(1)).toBe(true);

            // CTRL/click
            jasmine.fireMouseEvent(colRef[2].el.dom, 'click', 0, 0, 1, false, true);

            // Should have selected all cells under column 2
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[1].getCellSelector()).length + view.el.query(colRef[2].getCellSelector()).length);
            expect(isColumnSelected(1)).toBe(true);
            expect(isColumnSelected(2)).toBe(true);

            jasmine.fireKeyEvent(colRef[2].el.dom, 'keydown', Ext.EventObject.RIGHT);
            jasmine.fireKeyEvent(colRef[3].el.dom, 'keydown', Ext.EventObject.SPACE, false, true);

            // Should have selected all cells under column 3
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[1].getCellSelector()).length + view.el.query(colRef[2].getCellSelector()).length + view.el.query(colRef[3].getCellSelector()).length);
            expect(isColumnSelected(1)).toBe(true);
            expect(isColumnSelected(2)).toBe(true);
            expect(isColumnSelected(3)).toBe(true);

            // Activating the header as a column select should NOT sort
            expect(spy).not.toHaveBeenCalled();
        });
    }); 

    smDescribe("Row selection", function() {
        it("should select a column on click of a rownumberer", function() {
            makeGrid();
            clickRowNumberer(1);

            // Should have selected row 1
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(1);
            expect(isRowSelected(1)).toBe(true);

            jasmine.fireMouseEvent(colRef[1].el.dom, 'click');

            // Should have deselected all rows
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(0);
        });
        it("should select a row on click of a rownumberer and deselect previous rows", function() {
            makeGrid();
            clickRowNumberer(1);

            // Should have selected row 1
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(1);
            expect(isRowSelected(1)).toBe(true);

            clickRowNumberer(2);

            // Should have selected row 2
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(1);
            expect(isRowSelected(2)).toBe(true);

            jasmine.fireKeyEvent(findCell(2, 0), 'keydown', Ext.EventObject.DOWN, null, true);
            jasmine.fireKeyEvent(findCell(3, 0), 'keydown', Ext.EventObject.SPACE);

            // Should have selected row 3
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(1);
            expect(isRowSelected(3)).toBe(true);
        });
        it("should select a rownumberer on CTRL/click of a rownumberer and not deselect previous rows", function() {
            makeGrid();
            clickRowNumberer(1);

            // Should have selected row 1
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(1);
            expect(isRowSelected(1)).toBe(true);

            // CTRL/click
            clickRowNumberer(2, true);

            // Should have selected row 2
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(2);
            expect(isRowSelected(1)).toBe(true);
            expect(isRowSelected(2)).toBe(true);

            // CTRL/DOWN
            jasmine.fireKeyEvent(findCell(2, 0), 'keydown', Ext.EventObject.DOWN, null, true);
            jasmine.fireKeyEvent(findCell(3, 0), 'keydown', Ext.EventObject.SPACE, null, true);

            // Should have selected row 3
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(3);
            expect(isRowSelected(1)).toBe(true);
            expect(isRowSelected(2)).toBe(true);
            expect(isRowSelected(3)).toBe(true);
        });
        it("should fire the selectionchange event when rows are selected and rowSelect is set to false", function() {
            makeGrid();
            clickRowNumberer(1);

            // Should have selected row 1
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(1);
            expect(isRowSelected(1)).toBe(true);
            
            var selChangeSpy = spyOnEvent(grid, 'selectionchange');

            // Disable row selection.
            selModel.setRowSelect(false);

            // Should have deselected all rows
            expect(view.el.query('.'+view.selectedItemCls).length).toBe(0);

            // Should have deselected the selection
            expect(selChangeSpy).toHaveBeenCalled();
        });
    });
    
    smDescribe("Range selection", function() {
        it("should select a range on drag", function() {
            makeGrid();
            var c2 = findCell(2, 2),
                c4 = findCell(4, 4);

            jasmine.fireMouseEvent(c2, 'mousedown');
            jasmine.fireMouseEvent(c2, 'mousemove');
            jasmine.fireMouseEvent(c4, 'mousemove');

            // Should have selected the 9 cells spanned
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(9);

            expect( isCellSelected(2, 2) &&
                    isCellSelected(3, 2) &&
                    isCellSelected(4, 2) &&
                    isCellSelected(2, 3) &&
                    isCellSelected(3, 3) &&
                    isCellSelected(4, 3) &&
                    isCellSelected(2, 4) &&
                    isCellSelected(3, 4) &&
                    isCellSelected(4, 4)).toBe(true);
        });
        it("should select a range in a single row on drag", function() {
            makeGrid();
            var c2 = findCell(2, 2),
                c4 = findCell(2, 4);

            jasmine.fireMouseEvent(c2, 'mousedown');
            jasmine.fireMouseEvent(c2, 'mousemove');
            jasmine.fireMouseEvent(c4, 'mousemove');

            // Should have selected the 9 cells spanned
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(3);

            expect( isCellSelected(2, 2) &&
                    isCellSelected(2, 4) &&
                    isCellSelected(2, 4)).toBe(true);
        });
    });

    smDescribe("Single cell selection", function() {
        it("should select a single cell on click", function() {
            makeGrid();

            jasmine.fireMouseEvent(findCell(2, 2), 'click');
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(1);
            expect(isCellSelected(2, 2)).toBe(true);

            jasmine.fireMouseEvent(findCell(5, 5), 'click');
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(1);
            expect(isCellSelected(5, 5)).toBe(true);
        });
    });

    describe("pruneRemoved", function() {
        describe('pruneRemoved: true', function() {
            it('should remove records from selection by default when they are removed from the store', function() {
                //columns, cfg, selModelCfg, storeCfg
                makeGrid(null, {
                    bbar: {
                        xtype: 'pagingtoolbar'
                    }
                }, null, {
                    autoLoad: false,
                    pageSize: 5,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                });
                store.proxy.enablePaging = true;

                var tb = grid.down('pagingtoolbar'),
                    selection;

                tb.setStore(store);
                store.loadPage(1);
                selModel.select(0);
                selection = selModel.getSelection();

                // We have selected the first record
                expect(selection.length).toBe(1);
                expect(selection[0] === store.getAt(0)).toBe(true);

                // Row zero has the selected class
                expect(Ext.fly(view.getNode(0)).hasCls(view.selectedItemCls)).toBe(true);

                // Load page 2
                tb.moveNext();

                // First row in new page NOT selected
                expect(Ext.fly(view.getNode(0)).hasCls(view.selectedItemCls)).toBe(false);

                // Go back to page 1
                tb.movePrevious();
                selection = selModel.getSelection();

                // Selection has gone
                expect(selection.length).toBe(0);

                // Row zero must not be selected
                expect(Ext.fly(view.getNode(0)).hasCls(view.selectedItemCls)).toBe(false);
            });
        });

        describe('pruneRemoved: false', function() {
            it('should NOT remove records from selection if pruneRemoved:false when they are removed from the store', function() {
                makeGrid(null, {
                    bbar: {
                        xtype: 'pagingtoolbar'
                    }
                }, {
                    pruneRemoved: false
                }, {
                    autoLoad: false,
                    pageSize: 5,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                });
                store.proxy.enablePaging = true;

                var tb = grid.down('pagingtoolbar'),
                    selection;

                tb.setStore(store);
                store.loadPage(1);
                selModel.select(0);
                selection = selModel.getSelection();

                // We have selected the first record
                expect(selection.length).toBe(1);
                expect(selection[0] === store.getAt(0)).toBe(true);

                // Row zero has the selected class
                expect(Ext.fly(view.getNode(0)).hasCls(view.selectedItemCls)).toBe(true);

                // Load page 2
                tb.moveNext();

                // First row in new page NOT selected
                expect(Ext.fly(view.getNode(0)).hasCls(view.selectedItemCls)).toBe(false);

                // Go back to page 1
                tb.movePrevious();
                selection = selModel.getSelection();

                // We have selected the first record
                expect(selection.length).toBe(1);
                expect(selection[0] === store.getAt(0)).toBe(true);

                // Row zero must be selected
                expect(Ext.fly(view.getNode(0)).hasCls(view.selectedItemCls)).toBe(true);
            });
        });
    });

    describe("view model selection", function() {
        var viewModel, spy, columns;

        function createGrid(gridCfg, selModelCfg, storeCfg) {
            selModel = new Ext.selection.RowModel(selModelCfg || {});

            grid = new Ext.grid.Panel(Ext.apply({
                store: new Ext.data.Store(Ext.apply({
                    fields: ['name'],
                    proxy: {
                        type: 'memory',
                        data: [
                            { name: 'Phil' },
                            { name: 'Ben' },
                            { name: 'Evan' },
                            { name: 'Don' },
                            { name: 'Nige' },
                            { name: 'Alex' }
                        ]
                    }
                }, storeCfg)),
                columns: [
                    { text: 'Name',  dataIndex: 'name' }
                ],
                selModel: selModel,
                height: 200,
                width: 200,
                renderTo: Ext.getBody()
            }, gridCfg));
            store = grid.getStore();
            if (!storeCfg || storeCfg.autoLoad !== false) {
                store.load();
            }
            view = grid.getView();
            columns = grid.view.getVisibleColumnManager().getColumns();
        }

        beforeEach(function() {
            spy = jasmine.createSpy();
            viewModel = new Ext.app.ViewModel();
        });

        afterEach(function() {
            spy = selModel = viewModel = null;
        });

        function selectNotify(rec) {
            selModel.select(rec);
            viewModel.notify();
        }

        function byName(name) {
            var index = store.findExact('name', name);
            return store.getAt(index);
        }

        describe("reference", function() {
            beforeEach(function() {
                createGrid({
                    reference: 'userList',
                    viewModel: viewModel
                });
                viewModel.bind('{userList.selection}', spy);
                viewModel.notify();
            });

            it("should publish null by default", function() {
                var args = spy.mostRecentCall.args;
                expect(args[0]).toBeNull();
                expect(args[1]).toBeUndefined();
            });

            it("should publish the value when selected", function() {
                var rec = byName('Ben');
                selectNotify(rec);
                var args = spy.mostRecentCall.args;
                expect(args[0]).toBe(rec);
                expect(args[1]).toBeNull();
            });

            it("should publish when the selection is changed", function() {
                var rec1 = byName('Ben'),
                    rec2 = byName('Nige');

                selectNotify(rec1);
                spy.reset();
                selectNotify(rec2);
                var args = spy.mostRecentCall.args;
                expect(args[0]).toBe(rec2);
                expect(args[1]).toBe(rec1);
            });

            it("should publish when an item is deselected", function() {
                var rec = byName('Ben');
                selectNotify(rec);
                spy.reset();
                selModel.deselect(rec);
                viewModel.notify();
                var args = spy.mostRecentCall.args;
                expect(args[0]).toBeNull();
                expect(args[1]).toBe(rec);
            });
        });

        describe("two way binding", function() {
            beforeEach(function() {
                createGrid({
                    viewModel: viewModel,
                    bind: {
                        selection: '{foo}'
                    }
                });
                viewModel.bind('{foo}', spy);
                viewModel.notify();
            });

            describe("changing the selection", function() {
                it("should trigger the binding when adding a selection", function() {
                    var rec = byName('Don');
                    selectNotify(rec);
                    var args = spy.mostRecentCall.args;
                    expect(args[0]).toBe(rec);
                    expect(args[1]).toBeUndefined();
                });

                it("should trigger the binding when changing the selection", function() {
                    var rec1 = byName('Ben'),
                        rec2 = byName('Nige');

                    selectNotify(rec1);
                    spy.reset();
                    selectNotify(rec2);
                    var args = spy.mostRecentCall.args;
                    expect(args[0]).toBe(rec2);
                    expect(args[1]).toBe(rec1);
                });

                it("should trigger the binding when an item is deselected", function() {
                    var rec = byName('Don');
                    selectNotify(rec);
                    spy.reset();
                    selModel.deselect(rec);
                    viewModel.notify();
                    var args = spy.mostRecentCall.args;
                    expect(args[0]).toBeNull();
                    expect(args[1]).toBe(rec);
                });
            });

            describe("changing the viewmodel value", function() {
                it("should select the record when setting the value", function() {
                    var rec = byName('Phil');
                    viewModel.set('foo', rec);
                    viewModel.notify();
                    expect(selModel.isSelected(rec)).toBe(true);
                });

                it("should select the record when updating the value", function() {
                    var rec1 = byName('Phil'),
                        rec2 = byName('Ben');

                    viewModel.set('foo', rec1);
                    viewModel.notify();
                    viewModel.set('foo', rec2);
                    viewModel.notify();
                    expect(selModel.isSelected(rec1)).toBe(false);
                    expect(selModel.isSelected(rec2)).toBe(true);
                });

                it("should deselect when clearing the value", function() {
                    var rec = byName('Evan');

                    viewModel.set('foo', rec);
                    viewModel.notify();
                    viewModel.set('foo', null);
                    viewModel.notify();
                    expect(selModel.isSelected(rec)).toBe(false);
                });
            });
        });
    });

    describe('Locked grids', function() {
        describe('mouse cell selection', function(){
            it('should track across from locked to normal', function() {
                makeGrid(null, null, null, null, true);
                var c1 = findCell(1, 1),
                    c3 = findCell(3, 3);

                jasmine.fireMouseEvent(c1, 'mousedown');
                jasmine.fireMouseEvent(c1, 'mousemove');
                jasmine.fireMouseEvent(c3, 'mousemove');

                expect(selModel.getSelected().isCells).toBe(true);

                // Should have selected the 9 cells spanned
                expect(view.el.query('.'+view.selectedCellCls).length).toBe(9);

                // Selection object should have a count of 9
                expect(selModel.getSelected().getCount()).toBe(9);

                expect( isCellSelected(1, 1) &&
                    isCellSelected(1, 2) &&
                    isCellSelected(1, 3) &&
                    isCellSelected(2, 1) &&
                    isCellSelected(2, 2) &&
                    isCellSelected(2, 3) &&
                    isCellSelected(3, 1) &&
                    isCellSelected(3, 2) &&
                    isCellSelected(3, 2)).toBe(true);
            });
        });

        describe('mouse row selection', function(){
            it('should track across from locked to normal', function() {
                makeGrid(null, null, null, null, true);
                var c0 = findCell(0, 0),
                    c2 = findCell(2, 2);

                jasmine.fireMouseEvent(c0, 'mousedown');
                jasmine.fireMouseEvent(c0, 'mousemove');
                jasmine.fireMouseEvent(c2, 'mousemove');

                expect(selModel.getSelected().isRows).toBe(true);

                // Should have selected the 9 cells spanned
                expect(view.el.query('.'+view.selectedItemCls).length).toBe(6);

                // Rows 0, 1, 2 should be selected
                expect(isRowSelected(0)).toBe(true);
                expect(isRowSelected(1)).toBe(true);
                expect(isRowSelected(2)).toBe(true);

                // Selection object should have a count of 3
                expect(selModel.getSelected().getCount()).toBe(3);

                expect(selModel.getSelected().contains(store.getAt(0))).toBe(true);
                expect(selModel.getSelected().contains(store.getAt(1))).toBe(true);
                expect(selModel.getSelected().contains(store.getAt(2))).toBe(true);
            });
        });
    });

    describe('mouse column selection', function() {
        it('should select in both locked and normal sides', function() {
            makeGrid(null, null, null, null, true);

            jasmine.fireMouseEvent(colRef[1].el.dom, 'click');

            expect(selModel.getSelected().isColumns).toBe(true);

            // Should have selected all cells under column 1
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[1].getCellSelector()).length);
            expect(isColumnSelected(1)).toBe(true);

            // CTRL/click
            jasmine.fireMouseEvent(colRef[2].el.dom, 'click', 0, 0, 0, false, true);

            // Selection object should have a count of 2
            expect(selModel.getSelected().getCount()).toBe(2);

            // Should have selected all cells under column 2
            expect(view.el.query('.'+view.selectedCellCls).length).toBe(view.el.query(colRef[1].getCellSelector()).length + view.el.query(colRef[2].getCellSelector()).length);
            expect(isColumnSelected(1)).toBe(true);
            expect(isColumnSelected(2)).toBe(true);
        });
    });

    describe('Buffered store', function() {
        function getData(start, limit) {
            var end = start + limit,
                recs = [],
                i;

            for (i = start; i < end; ++i) {
                recs.push({
                    id: i,
                    title: 'Title' + i
                });
            }
            return recs;
        }

        function satisfyRequests(total) {
            var requests = Ext.Ajax.mockGetAllRequests(),
                request, params, data;

            while (requests.length) {
                request = requests[0];

                params = request.options.params;
                data = getData(params.start, params.limit);

                Ext.Ajax.mockComplete({
                    status: 200,
                    responseText: Ext.encode({
                        total: total || 5000,
                        data: data
                    })
                });

                requests = Ext.Ajax.mockGetAllRequests();
            }
        }
        
        beforeEach(function() {
            MockAjaxManager.addMethods();
        });

        afterEach(function() {
            MockAjaxManager.removeMethods();
        });

        it('should not throw an error', function() {
            makeGrid(null, null, null, {
                buffered: true,
                pageSize: 100,
                proxy: {
                    type: 'ajax',
                    url: 'fakeUrl',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                data: null
            });
            store.loadPage(1);
            satisfyRequests();
        });
    });

});
