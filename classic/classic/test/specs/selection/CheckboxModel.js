describe('Ext.selection.CheckboxModel', function() {
    var grid, view, store, checkboxModel, data,
        donRec, evanRec, nigeRec,
        synchronousLoad = true,
        proxyStoreLoad = Ext.data.ProxyStore.prototype.load,
        loadStore;

    function makeGrid(selectionCfg, cfg) {
        checkboxModel = new Ext.selection.CheckboxModel(selectionCfg);
        checkboxModel.getHeaderCheckbox = function() {
            return this.views[0].headerCt.child('gridcolumn[isCheckerHd]');
        };

        grid = new Ext.grid.Panel(Ext.apply({
            store: store,
            columns: [
                {text: "name", flex: 1, sortable: true, dataIndex: 'name'}
            ],
            columnLines: true,
            selModel: checkboxModel,
            width: 300,
            height: 300,
            renderTo: Ext.getBody()
        }, cfg));
        view = grid.view;
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

        Ext.define('spec.CheckboxModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'name'
            }]
        });

        store = Ext.create('Ext.data.Store', {
            model: 'spec.CheckboxModel',
            proxy: 'memory',
            data: data || [{
                id: 1,
                name: 'Don'
            }, {
                id: 2,
                name: 'Evan'
            }, {
                id: 3,
                name: 'Nige'
            }]
        });

        donRec = store.getById(1);
        evanRec = store.getById(2);
        nigeRec = store.getById(3);
    });

    afterEach(function() {
        // Undo the overrides.
        Ext.data.ProxyStore.prototype.load = proxyStoreLoad;

        donRec = evanRec = nigeRec = data = null;
        grid.destroy();
        checkboxModel.destroy();
        store.destroy();
        Ext.undefine('spec.CheckboxModel');
        Ext.data.Model.schema.clear();
    });

    function expectHeaderChecked(checkboxModel, checked) {
        var headerCheckbox = checkboxModel.getHeaderCheckbox();
        expect(headerCheckbox.hasCls(checkboxModel.checkerOnCls)).toBe(checked);
    }

    function clickOnHeaderCheckbox() {
        jasmine.fireMouseEvent(checkboxModel.getHeaderCheckbox().el.dom, 'click', 10, 10);
    }

    function clickCheckbox(rowIdx) {
        var cell = view.getCellByPosition({
            row: rowIdx,
            column: 0
        });
        view.focus();
        jasmine.fireMouseEvent(cell.down(checkboxModel.checkSelector), 'click');
    }

    function clickCell(rowIdx, colIdx) {
        var cell = view.getCellByPosition({
            row: rowIdx,
            column: colIdx
        });
        view.focus();
        jasmine.fireMouseEvent(cell, 'click');
    }

    function keyCheckbox(rowIdx, keyCode, shiftKey, ctrlKey, altKey) {
        var cell = grid.getView().getCellByPosition({
            row: rowIdx,
            column: 0
        });
        jasmine.fireKeyEvent(cell.down(checkboxModel.checkSelector), 'keydown', keyCode, shiftKey, ctrlKey, altKey);
    }

    describe("column insertion", function() {
        var cols;

        afterEach(function() {
            cols = null;
        });

        it("should ignore any xtype defaults and insert a gridcolumn", function() {
            makeGrid(null, {
                columns: {
                    defaults: {
                        xtype: 'widgetcolumn',
                        widget: {
                            xtype: 'button'
                        }
                    },
                    items: [{
                        dataIndex: 'name'
                    }]
                }
            });
            var allCols = grid.getColumnManager().getColumns();
            expect(allCols[0].$className).toBe('Ext.grid.column.Column');
            expect(allCols[0].isCheckerHd).toBe(true);
        });

        describe("without locking", function() {
            beforeEach(function() {
                cols = [{
                    dataIndex: 'name'
                }, {
                    dataIndex: 'name'
                }, {
                    dataIndex: 'name'
                }]
            });

            it("should insert the column at the start by default", function() {
                makeGrid(null, {
                    columns: cols
                });

                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[0];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(allCols.length).toBe(4);
            });

            it("should insert the column at the start with injectCheckbox: 'first'", function() {
                makeGrid({
                    injectCheckbox: 'first'
                }, {
                    columns: cols
                });

                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[0];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(allCols.length).toBe(4);
            });

            it("should insert the column at the end with injectCheckbox: 'last'", function() {
                makeGrid({
                    injectCheckbox: 'last'
                }, {
                    columns: cols
                });

                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[3];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(allCols.length).toBe(4);
            });

            it("should insert the column at the specified index", function() {
                makeGrid({
                    injectCheckbox: 1
                }, {
                    columns: cols
                });

                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[1];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(allCols.length).toBe(4);
            });
        });

        describe("with locking", function() {
            beforeEach(function() {
                cols = [{
                    dataIndex: 'name',
                    locked: true
                }, {
                    dataIndex: 'name',
                    locked: true
                }, {
                    dataIndex: 'name',
                    locked: true
                }, {
                    dataIndex: 'name'
                }, {
                    dataIndex: 'name'
                }, {
                    dataIndex: 'name'
                }];
            });

            it("should insert the column at the start by default", function() {
                makeGrid(null, {
                    columns: cols
                });

                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[0];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(grid.normalGrid.query('[isCheckerHd]').length).toBe(0);
                expect(allCols.length).toBe(7);
            });

            it("should insert the column at the start with injectCheckbox: 'first'", function() {
                makeGrid({
                    injectCheckbox: 'first'
                }, {
                    columns: cols
                });
                
                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[0];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(grid.normalGrid.query('[isCheckerHd]').length).toBe(0);
                expect(allCols.length).toBe(7);
            });

            it("should insert the column at the end with injectCheckbox: 'last'", function() {
                makeGrid({
                    injectCheckbox: 'last'
                }, {
                    columns: cols
                });

                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[3];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(grid.normalGrid.query('[isCheckerHd]').length).toBe(0);
                expect(allCols.length).toBe(7);
            });

            it("should insert the column at the specified index", function() {
                makeGrid({
                    injectCheckbox: 1
                }, {
                    columns: cols
                });

                var allCols = grid.getColumnManager().getColumns(),
                    col = allCols[1];

                expect(col.isCheckerHd).toBe(true);
                expect(grid.query('[isCheckerHd]').length).toBe(1);
                expect(grid.normalGrid.query('[isCheckerHd]').length).toBe(0);
                expect(allCols.length).toBe(7);
            });
        });
    });

    describe("multiple selection", function() {
        beforeEach(function() {
            makeGrid();
        });
        describe('by clicking', function() {
            // for some reason this spec fails in IE10+, although the functionality works
            // when tested manually
            (Ext.isIE ? xit : it)('should select unselected records on click, and deselect selected records on click', function() {
                grid.focus();

                // Wait for the asynchronous focus processing to occur for IE
                waitsFor(function() {
                    return view.cellFocused;
                });
                
                runs(function() {
                    clickCheckbox(0);
                    clickCheckbox(1);
                    clickCheckbox(2);
                });
                waitsFor(function() {
                    return checkboxModel.getSelection().length === 3;
                }, 'all three records to be selected');
                runs(function() {
                    clickCheckbox(1);
                });
                waitsFor(function() {
                    return checkboxModel.getSelection().length === 2;
                }, 'the first record to be deselected');
            });
        });
        describe('by key navigation', function() {
            it('should select unselected records on ctrl+SPACE, and deselect selected records on ctrl+SPACE', function() {
                grid.view.getNavigationModel().setPosition(0);
                expect(checkboxModel.getSelection().length).toBe(0);
                keyCheckbox(0, Ext.event.Event.SPACE);
                expect(checkboxModel.getSelection().length).toBe(1);
                keyCheckbox(0, Ext.event.Event.DOWN, false, true);
                expect(checkboxModel.getSelection().length).toBe(1);
                keyCheckbox(1, Ext.event.Event.DOWN, false, true);
                keyCheckbox(2, Ext.event.Event.SPACE);
                expect(checkboxModel.getSelection().length).toBe(2);
                keyCheckbox(2, Ext.event.Event.UP, false, true);
                keyCheckbox(1, Ext.event.Event.UP, false, true);
                keyCheckbox(0, Ext.event.Event.SPACE);
                expect(checkboxModel.getSelection().length).toBe(1);
            });
        });
    });

    describe("header state", function() {
        beforeEach(function() {
            makeGrid();
        });

        it("should be initially unchecked", function() {
            expectHeaderChecked(checkboxModel, false);
        });
        
        it("should be unchecked if there are no records", function(){
            store.removeAll();
            expectHeaderChecked(checkboxModel, false);
        });

        it("should check header when all rows are selected", function() {
            expectHeaderChecked(checkboxModel, false);

            checkboxModel.select(donRec, true);
            expectHeaderChecked(checkboxModel, false);

            checkboxModel.select(evanRec, true);
            expectHeaderChecked(checkboxModel, false);

            checkboxModel.select(nigeRec, true);
            expectHeaderChecked(checkboxModel, true);
        });

        it("should uncheck header when any row is deselected", function() {
            checkboxModel.selectAll();
            expectHeaderChecked(checkboxModel, true);

            checkboxModel.selectAll();
            checkboxModel.deselect(donRec);
            expectHeaderChecked(checkboxModel, false);

            checkboxModel.selectAll();
            checkboxModel.deselect(evanRec);
            expectHeaderChecked(checkboxModel, false);

            checkboxModel.selectAll();
            checkboxModel.deselect(nigeRec);
            expectHeaderChecked(checkboxModel, false);
        });

        describe("loading", function() {
            it("should keep the header checked when reloaded and all items were checked", function() {
                checkboxModel.selectAll();
                expectHeaderChecked(checkboxModel, true);
                store.load();
                expectHeaderChecked(checkboxModel, true);
            });
            
            it("should keep the header checked when reloaded and loading a subset of items", function() {
                checkboxModel.selectAll();
                expectHeaderChecked(checkboxModel, true);

                store.getProxy().setData([{
                    id: 1,
                    name: 'Don'
                }]);
                store.load();
                expectHeaderChecked(checkboxModel, true);
            });
            
            it("should be unchecked when the loaded items do not match", function() {
                checkboxModel.selectAll();
                expectHeaderChecked(checkboxModel, true);

                store.getProxy().setData([{
                    id: 4,
                    name: 'Foo'
                }]);
                store.load();
                expectHeaderChecked(checkboxModel, false);
            });            
        });

        it("should uncheck header when an unchecked record is added", function() {
            checkboxModel.selectAll();
            expectHeaderChecked(checkboxModel, true);

            store.add({name: 'Marcelo'});
            expectHeaderChecked(checkboxModel, false);
        });

        it("should check header when last unchecked record is removed before rows are rendered", function() {
            checkboxModel.select(donRec, true);
            checkboxModel.select(evanRec, true);
            expectHeaderChecked(checkboxModel, false);

            store.removeAt(store.find('name', 'Nige'));

            waitsFor(function() {
                return grid.view.viewReady;
            });
            runs(function() {
                expectHeaderChecked(checkboxModel, true);
            });
        });

        it("should check header when last unchecked record is removed after rows are rendered", function() {
            checkboxModel.select(donRec, true);
            checkboxModel.select(evanRec, true);
            expectHeaderChecked(checkboxModel, false);

            waitsFor(function() {
                return grid.view.viewReady;
            });

            runs(function() {
                store.remove(nigeRec);
                expectHeaderChecked(checkboxModel, true);
            });
        });

    });

    describe("check all", function() {
        describe('mode="SINGLE"', function () {
            it('should not render the header checkbox by default', function () {
                makeGrid({
                    mode: 'SINGLE'
                });

                expect(checkboxModel.getHeaderCheckbox()).toBe(null);
            });

            it('should not render the header checkbox by config', function () {
                expect(function () {
                    makeGrid({
                        mode: 'SINGLE',
                        showHeaderCheckbox: true
                    });
                }).toThrow('The header checkbox is not supported for SINGLE mode selection models.')
            });
        });

        describe('mode="MULTI"', function () {
            beforeEach(function() {
                makeGrid();
            });

            it("should check all when no record is checked", function() {
                expectHeaderChecked(checkboxModel, false);

                clickOnHeaderCheckbox();
                expectHeaderChecked(checkboxModel, true);

                expect(checkboxModel.isSelected(donRec)).toBe(true);
                expect(checkboxModel.isSelected(evanRec)).toBe(true);
                expect(checkboxModel.isSelected(nigeRec)).toBe(true);
            });

            it("should check all when some records are checked", function() {
                expectHeaderChecked(checkboxModel, false);

                checkboxModel.select(donRec, true);
                checkboxModel.select(nigeRec, true);

                clickOnHeaderCheckbox();
                expectHeaderChecked(checkboxModel, true);

                expect(checkboxModel.isSelected(donRec)).toBe(true);
                expect(checkboxModel.isSelected(evanRec)).toBe(true);
                expect(checkboxModel.isSelected(nigeRec)).toBe(true);
            });
        });
    });

    describe("uncheck all", function() {
        beforeEach(function() {
            makeGrid();
        });

        it("should uncheck all when all records are checked", function() {
            checkboxModel.select(donRec, true);
            checkboxModel.select(evanRec, true);
            checkboxModel.select(nigeRec, true);
            expectHeaderChecked(checkboxModel, true);

            clickOnHeaderCheckbox();
            expectHeaderChecked(checkboxModel, false);
            expect(checkboxModel.isSelected(donRec)).toBe(false);
            expect(checkboxModel.isSelected(evanRec)).toBe(false);
            expect(checkboxModel.isSelected(nigeRec)).toBe(false);
        });

    });

    describe("checkOnly", function() {
        function byPos(row, col) {
            return grid.getView().getCellByPosition({
                row: row,
                column: col
            });
        }

        function makeCheckGrid(checkOnly, mode) {
            makeGrid({
                checkOnly: checkOnly,
                mode: mode
            });
        }

        describe("mode: multi", function() {
            describe("with checkOnly: true", function() {
                beforeEach(function() {
                    makeCheckGrid(true, 'MULTI');
                });

                it("should not select when clicking on the row", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                });

                it("should not select when calling selectByPosition on a cell other than the checkbox cell", function() {
                    checkboxModel.selectByPosition({
                        row: 0,
                        column: 1
                    });
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                });

                it("should not select when navigating with keys", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    jasmine.fireKeyEvent(byPos(0, 1), 'keydown', Ext.event.Event.LEFT);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                    jasmine.fireKeyEvent(byPos(0, 0), 'keydown', Ext.event.Event.RIGHT);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                });

                it("should select when clicking on the checkbox", function() {
                    var checker = byPos(0, 0).down(checkboxModel.checkSelector);
                    jasmine.fireMouseEvent(checker, 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });

                it("should select when pressing space with the checker focused", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    jasmine.fireKeyEvent(byPos(0, 1), 'keydown', Ext.event.Event.LEFT);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                    jasmine.fireKeyEvent(byPos(0, 0), 'keydown', Ext.event.Event.SPACE);
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });
            });

            describe("with checkOnly: false", function() {
                beforeEach(function() {
                    makeCheckGrid(false, 'MULTI');
                });

                it("should select when clicking on the row", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });

                it("should select when calling selectByPosition on a cell other than the checkbox cell", function() {
                    checkboxModel.selectByPosition({
                        row: 0,
                        column: 1
                    });
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });

                it("should select when navigating with keys", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    jasmine.fireKeyEvent(byPos(0, 1), 'keydown', Ext.event.Event.DOWN);
                    expect(checkboxModel.isSelected(evanRec)).toBe(true);
                });

                it("should select when clicking on the checkbox", function() {
                    var checker = byPos(0, 0).down(checkboxModel.checkSelector);
                    jasmine.fireMouseEvent(checker, 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });
            });
        });

        describe("mode: single", function() {
            describe("with checkOnly: true", function() {
                beforeEach(function() {
                    makeCheckGrid(true, 'SINGLE');
                });

                it("should not select when clicking on the row", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                });

                it("should not select when navigating with keys", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    jasmine.fireKeyEvent(byPos(0, 1), 'keydown', Ext.event.Event.LEFT);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                    jasmine.fireKeyEvent(byPos(0, 0), 'keydown', Ext.event.Event.RIGHT);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                });

                it("should select when clicking on the checkbox", function() {
                    var checker = byPos(0, 0).down(checkboxModel.checkSelector);
                    jasmine.fireMouseEvent(checker, 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });

                it("should select when pressing space with the checker focused", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    jasmine.fireKeyEvent(byPos(0, 1), 'keydown', Ext.event.Event.LEFT);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                    jasmine.fireKeyEvent(byPos(0, 0), 'keydown', Ext.event.Event.SPACE);
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });
            });

            describe("with checkOnly: false", function() {
                beforeEach(function() {
                    makeCheckGrid(false, 'SINGLE');
                });

                it("should select when clicking on the row", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });

                it("should select when navigating with keys", function() {
                    jasmine.fireMouseEvent(byPos(0, 1), 'click');
                    jasmine.fireKeyEvent(byPos(0, 1), 'keydown', Ext.event.Event.DOWN);
                    expect(checkboxModel.isSelected(evanRec)).toBe(true);
                });

                it("should select when clicking on the checkbox", function() {
                    var checker = byPos(0, 0).down(checkboxModel.checkSelector);
                    jasmine.fireMouseEvent(checker, 'click');
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });
            });
        });
    });

    describe("event selection", function() {
        var changeSpy, selectSpy, deselectSpy;

        function makeSpies() {
            changeSpy = jasmine.createSpy();
            selectSpy = jasmine.createSpy();
            deselectSpy = jasmine.createSpy();

            checkboxModel.on('selectionchange', changeSpy);
            checkboxModel.on('select', selectSpy);
            checkboxModel.on('deselect', deselectSpy);
        }

        function expectChangeSpy(records) {
            var args = changeSpy.mostRecentCall.args;
            expect(changeSpy.callCount).toBe(1);
            expect(args[0]).toBe(checkboxModel);
            expect(args[1]).toEqual(records);
        }

        function expectSelectSpy(record) {
            var args = selectSpy.mostRecentCall.args;
            expect(selectSpy.callCount).toBe(1);
            expect(args[0]).toBe(checkboxModel);
            expect(args[1]).toBe(record);
        }

        function expectDeselectSpy(record) {
            var args = deselectSpy.mostRecentCall.args;
            expect(deselectSpy.callCount).toBe(1);
            expect(args[0]).toBe(checkboxModel);
            expect(args[1]).toBe(record);
        }

        afterEach(function() {
            changeSpy = selectSpy = deselectSpy = null;
        });

        describe("multi", function() {
            beforeEach(function() {
                makeGrid({
                    mode: 'MULTI'
                });
            });

            describe("selection when clicking on the checkbox", function() {
                describe("on a selected record", function() {
                    it("should deselect when there are no other selections", function() {
                        checkboxModel.select(donRec);
                        makeSpies();
                        clickCheckbox(0);
                        expect(checkboxModel.isSelected(donRec)).toBe(false);
                        expectChangeSpy([]);
                        expectDeselectSpy(donRec);
                        expect(selectSpy).not.toHaveBeenCalled();
                    });

                    it("should deselect and keep existing selections", function() {
                        checkboxModel.selectAll();
                        makeSpies();
                        clickCheckbox(0);
                        expect(checkboxModel.isSelected(donRec)).toBe(false);
                        expectChangeSpy([evanRec, nigeRec]);
                        expectDeselectSpy(donRec);
                        expect(selectSpy).not.toHaveBeenCalled();
                    });
                });

                describe("on an unselected record", function() {
                    it("should select the record when there are no other selections", function() {
                        makeSpies();
                        clickCheckbox(0);
                        expect(checkboxModel.isSelected(donRec)).toBe(true);
                        expectChangeSpy([donRec]);
                        expectSelectSpy(donRec);
                        expect(deselectSpy).not.toHaveBeenCalled();
                    });

                    it("should select and keep existing selections", function() {
                        checkboxModel.select([evanRec, nigeRec]);
                        makeSpies();
                        clickCheckbox(0);
                        expect(checkboxModel.isSelected(donRec)).toBe(true);
                        expectChangeSpy([evanRec, nigeRec, donRec]);
                        expectSelectSpy(donRec);
                        expect(deselectSpy).not.toHaveBeenCalled();
                    });
                });
            });

            describe("with shiftKey", function() {
                var philRec;

                beforeEach(function() {
                    philRec = store.add({
                        id: 4,
                        name: 'Phil'
                    })[0];
                });

                it("should deselect everything past & including the clicked item", function() {
                    checkboxModel.selectAll();
                    var view = grid.getView(),
                        cell;

                    clickCell(0, 1);
                    spyOn(view, 'processUIEvent').andCallFake(function(e) {
                        if (e.type === 'click') {
                            e.shiftKey = true;
                        }
                        Ext.grid.View.prototype.processUIEvent.apply(view, arguments);
                    });

                    clickCell(2, 1);
                    clickCell(1, 1);
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                    expect(checkboxModel.isSelected(evanRec)).toBe(true);
                    expect(checkboxModel.isSelected(nigeRec)).toBe(false);
                    expect(checkboxModel.isSelected(philRec)).toBe(false);
                });
            });
        });

        describe("single", function() {
            beforeEach(function() {
                makeGrid({
                    mode: 'SINGLE'
                });
            });

            describe("on the checkbox", function() {
                it("should select the record on click", function() {
                    clickCheckbox(0);
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });

                it("should deselect any selected records", function() {
                    clickCheckbox(0);
                    clickCheckbox(1);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                    expect(checkboxModel.isSelected(evanRec)).toBe(true);
                });
            });

            describe("on the row", function() {
                it("should select the record on click", function() {
                    clickCheckbox(0);
                    expect(checkboxModel.isSelected(donRec)).toBe(true);
                });

                it("should deselect any selected records", function() {
                    clickCheckbox(0);
                    clickCheckbox(1);
                    expect(checkboxModel.isSelected(donRec)).toBe(false);
                    expect(checkboxModel.isSelected(evanRec)).toBe(true);
                });
            });
        });
    });

});
