describe("Ext.grid.column.Check", function() {
    var grid, store, col;

    function getColCfg() {
        return {
            xtype: 'checkcolumn',
            text: 'Checked',
            dataIndex: 'val'
        };
    }
    
    function makeGrid(columns) {
        store = new Ext.data.Store({
            model: spec.CheckColumnModel,
            data: [{
                val: true
            }, {
                val: true
            }, {
                val: false
            }, {
                val: true
            }, {
                val: false
            }]
        });

        if (!columns) {
            columns = [getColCfg()];
        }
        
        grid = new Ext.grid.Panel({
            width: 200,
            height: 100,
            renderTo: Ext.getBody(),
            store: store,
            columns: columns
        });
        col = grid.getColumnManager().getFirst();
    }
    
    function triggerCellMouseEvent(type, rowIdx, cellIdx, button, x, y) {
        var target = getCellImg(rowIdx, cellIdx);

        jasmine.fireMouseEvent(target, type, x, y, button);
    }
       
    function getCell(rowIdx) {
        return grid.getView().getCellInclusive({
            row: rowIdx,
            column: 0
        });
    }
    
    function getCellImg(rowIdx) {
        var cell = getCell(rowIdx);
        return Ext.fly(cell).down('.x-grid-checkcolumn');
    }
    
    function hasCls(el, cls) {
        return Ext.fly(el).hasCls(cls);
    }
    
    beforeEach(function() {
        Ext.define('spec.CheckColumnModel', {
            extend: 'Ext.data.Model',
            fields: ['val']
        });
    });
    
    afterEach(function() {
        Ext.destroy(grid, store);
        col = grid = store = null;
        Ext.undefine('spec.CheckColumnModel');
        Ext.data.Model.schema.clear();
    });
    
    describe("check rendering", function() {
        
        it("should add the x-grid-checkcolumn class to the checkbox element", function() {
            makeGrid();
            
            expect(hasCls(getCellImg(0), 'x-grid-checkcolumn')).toBe(true);
        });
        
        it("should set the x-grid-checkcolumn-checked class on checked items", function() {
            makeGrid();
            
            expect(hasCls(getCellImg(0), 'x-grid-checkcolumn-checked')).toBe(true);
            expect(hasCls(getCellImg(2), 'x-grid-checkcolumn-checked')).toBe(false);
        });
    });
    
    describe("enable/disable", function() {
        describe("during config", function() {
            it("should not include the disabledCls if the column is not disabled", function() {
                makeGrid();
                expect(hasCls(getCell(0), col.disabledCls)).toBe(false);
            });
        
            it("should include the disabledCls if the column is disabled", function() {
                var cfg = getColCfg();
                cfg.disabled = true;
                makeGrid([cfg]);
                expect(hasCls(getCell(0), col.disabledCls)).toBe(true);
            });
        });
        
        describe("after render", function() {
            it("should add the disabledCls if disabling", function() {
                makeGrid();
                col.disable();
                expect(hasCls(getCell(0), col.disabledCls)).toBe(true);
                expect(hasCls(getCell(1), col.disabledCls)).toBe(true);
                expect(hasCls(getCell(2), col.disabledCls)).toBe(true);
                expect(hasCls(getCell(3), col.disabledCls)).toBe(true);
                expect(hasCls(getCell(4), col.disabledCls)).toBe(true);
            });
            
            it("should remove the disabledCls if enabling", function() {
                var cfg = getColCfg();
                cfg.disabled = true;
                makeGrid([cfg]);
                col.enable();
                expect(hasCls(getCell(0), col.disabledCls)).toBe(false);
                expect(hasCls(getCell(1), col.disabledCls)).toBe(false);
                expect(hasCls(getCell(2), col.disabledCls)).toBe(false);
                expect(hasCls(getCell(3), col.disabledCls)).toBe(false);
                expect(hasCls(getCell(4), col.disabledCls)).toBe(false);
            });
        });
    });
    
    describe("interaction", function() {
        describe("stopSelection", function() {
            describe("stopSelection: false", function() {
                it("should select when a full row update is required", function() {
                    var cfg = getColCfg();
                    cfg.stopSelection = false;
                    // Template column always required a full update
                    makeGrid([cfg, {
                        xtype: 'templatecolumn',
                        dataIndex: 'val',
                        tpl: '{val}'
                    }]);
                    triggerCellMouseEvent('click', 0);
                    expect(grid.getSelectionModel().isSelected(store.getAt(0))).toBe(true);
                });

                it("should select when a full row update is not required", function() {
                    var cfg = getColCfg();
                    cfg.stopSelection = false;
                    // Template column always required a full update
                    makeGrid([cfg, {
                        dataIndex: 'val'
                    }]);
                    triggerCellMouseEvent('click', 0);
                    expect(grid.getSelectionModel().isSelected(store.getAt(0))).toBe(true);
                });
            });

            describe("stopSelection: true", function() {
                it("should not select when a full row update is required", function() {
                    var cfg = getColCfg();
                    cfg.stopSelection = true;
                    // Template column always required a full update
                    makeGrid([cfg, {
                        xtype: 'templatecolumn',
                        dataIndex: 'val',
                        tpl: '{val}'
                    }]);
                    triggerCellMouseEvent('click', 0);
                    expect(grid.getSelectionModel().isSelected(store.getAt(0))).toBe(false);
                });

                it("should not select when a full row update is not required", function() {
                    var cfg = getColCfg();
                    cfg.stopSelection = true;
                    // Template column always required a full update
                    makeGrid([cfg, {
                        dataIndex: 'val'
                    }]);
                    triggerCellMouseEvent('click', 0);
                    expect(grid.getSelectionModel().isSelected(store.getAt(0))).toBe(false);
                });
            });
        });

        describe("events", function() {
            it("should pass the column, record index & new checked state for beforecheckchange", function() {
                var arg1, arg2, arg3;
                makeGrid();
                col.on('beforecheckchange', function(a, b, c) {
                    arg1 = a;
                    arg2 = b;
                    arg3 = c; 
                });
                triggerCellMouseEvent('mousedown', 0);
                expect(arg1).toBe(col);
                expect(arg2).toBe(0);
                expect(arg3).toBe(false);
            });
            
            it("should pass the column, record index & new checked state for checkchange", function() {
                var arg1, arg2, arg3;
                makeGrid();
                col.on('checkchange', function(a, b, c) {
                    arg1 = a;
                    arg2 = b;
                    arg3 = c; 
                });
                triggerCellMouseEvent('mousedown', 2);
                expect(arg1).toBe(col);
                expect(arg2).toBe(2);
                expect(arg3).toBe(true);
            });
            
            it("should not fire fire checkchange if beforecheckchange returns false", function() {
                var called = false;
                makeGrid();
                col.on('checkchange', function(a, b, c) {
                    called = true;
                });
                col.on('beforecheckchange', function() {
                    return false;
                });
                triggerCellMouseEvent('mousedown', 2);
                expect(called).toBe(false);
            });
        });
        
        it("should invert the record value", function() {
            makeGrid();
            triggerCellMouseEvent('mousedown', 0);
            expect(store.getAt(0).get('val')).toBe(false);
            triggerCellMouseEvent('mousedown', 2);
            expect(store.getAt(2).get('val')).toBe(true);
        });
        
        it("should not trigger any changes when disabled", function() {
            var cfg = getColCfg();
            cfg.disabled = true;
            makeGrid([cfg]);
            triggerCellMouseEvent('mousedown', 0);
            expect(store.getAt(0).get('val')).toBe(true);
            triggerCellMouseEvent('mousedown', 2);
            expect(store.getAt(2).get('val')).toBe(false);
        });
    });
});
