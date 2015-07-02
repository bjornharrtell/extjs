describe('Ext.grid.NavigationModel', function() {
    
    // Expect that a row and column are focused.
    // Column index is overall across a locked pair.
    function expectPosition(rowIdx, colIdx) {
        var column = grid.getVisibleColumnManager().getColumns()[colIdx];

        expect(grid.getNavigationModel().getPosition().isEqual(new Ext.grid.CellContext(column.getView()).setPosition(rowIdx, column))).toBe(true);
    }

    function findCell(rowIdx, cellIdx) {
        return grid.getView().getCellInclusive({
            row: rowIdx,
            column: cellIdx
        }, true);
    }

    function triggerCellMouseEvent(type, rowIdx, cellIdx, button, x, y) {
        var target = findCell(rowIdx, cellIdx);

        jasmine.fireMouseEvent(target, type, x, y, button);
    }

    function triggerCellKeyEvent(rowIdx, cellIdx, type, key) {
        var target = findCell(rowIdx, cellIdx);
        jasmine.fireKeyEvent(target, type, key);
    }

    var GridModel = Ext.define(null, {
        extend: 'Ext.data.Model',
        fields: [
            'field1',
            'field2',
            'field3',
            'field4',
            'field5',
            'field6',
            'field7',
            'field8',
            'field9',
            'field10'
        ]
    }), view, colRef;

    function makeStore(data) {
        store = new Ext.data.Store({
            model: GridModel,
            data: data || [{
                field1: 1,
                field2: 2,
                field3: 3,
                field4: 4,
                field5: 5,
                field6: 6,
                field7: 7,
                field8: 8,
                field9: 9,
                field10: 10
            }]
        });
        return store;
    }

    function makeGrid(columns, data, cfg, options, locked) {
        options = options || {};
        cfg = cfg || {};

        var i, dataCount, dataRow;

        if (!options.preventColumnCreate && (!columns || typeof columns === 'number')) {
            var colCount = typeof columns === 'number' ? columns : 10;

            columns = [];
            for (i = 1; i <= colCount; i++) {
                columns.push({
                    dataIndex: 'field' + i,
                    text: 'Field ' + i,
                    width: 90,
                    // First column gets locked if we are doing locking tests
                    locked: locked && i === 1
                });
            }
        }

        // Could pass number of required records
        if (typeof data === 'number') {
            dataCount = data;
            data = [];
            for (i = 0; i < dataCount; i++) {
                dataRow = {
                    id: 'rec' + i
                };
                for (var j = 0; j < columns.length; j++) {
                    dataRow[columns[j].dataIndex] = (i + 1) + ', ' + (j + 1);
                }
                data.push(dataRow);
            }
        }

        if (!options.preventStoreCreate) {
            makeStore(data);
        }

        grid = new Ext.grid.Panel(Ext.apply({
            columns: columns,
            store: store,
            width: 600,
            height: 400,
            border: false,
            viewConfig: Ext.apply({
                mouseOverOutBuffer: false,
                deferHighlight: false
            }, cfg.viewConfig)
        }, cfg));

        // Don't use renderTo since that may throw and we won't set "grid"
        // and will then leak the component
        if (cfg.renderTo === undefined) {
            grid.render(Ext.getBody());
        }

        view = grid.getView();
        colRef = grid.getColumnManager().getColumns();
        navModel = view.getNavigationModel();
        selModel = view.getSelectionModel();
    }

    var proto = Ext.view.Table.prototype,
        grid, colRef, store, view, selModel, navModel;

    afterEach(function(){
        Ext.destroy(grid);
        grid = null;
        view = null;
        selModel = null;
    });

    describe('Re-entering grid after sorting', function() {
        it('should scroll last focused row into view on sort', function() {
            makeGrid(null, 500);
            var startPos = new Ext.grid.CellContext(view).setPosition(9, 4);

            navModel.setPosition(9, 4);

            waitsFor(function() {
                return navModel.lastFocused  && navModel.lastFocused.isEqual(startPos);
            });

            runs(function() {
                colRef[4].el.dom.focus();

                // Sort ascending
                jasmine.fireKeyEvent(colRef[4].el, 'keydown', Ext.event.Event.SPACE);

                // View's element Region MUST contain the focused cell.
                expect(view.getEl().getRegion().contains(view.getCellByPosition(navModel.lastFocused).getRegion())).toBe(true);

                // Sort descending
                jasmine.fireKeyEvent(colRef[4].el, 'keydown', Ext.event.Event.SPACE);

                // View's element Region MUST still contain the focused cell.
                expect(view.getEl().getRegion().contains(view.getCellByPosition(navModel.lastFocused).getRegion())).toBe(true);
            });
        });
    });

    describe('reacting to programmatic focus', function() {
        it('should set the position correctly', function() {
            makeGrid(null, 500);
            var focusContext = new Ext.grid.CellContext(view).setPosition(0, 0),
                newCell;

            // Focusing the outer focusEl will delegate to cell (0,) first time in.
            view.focus();

            // Wait until the NavigationModel has processed the onFocusEnter, and synched its position
            waitsFor(function() {
                return view.getNavigationModel().getPosition().isEqual(focusContext) && Ext.Element.getActiveElement() === focusContext.getCell(true);
            }, 'for position(0,0) to be focuised');


            runs(function() {
                focusContext = new Ext.grid.CellContext(view).setPosition(2, 2);
                newCell = focusContext.getCell(true);

                // Focus a different cell's DOM
                newCell.focus();
            });

            // Wait until the NavigationModel is synched up.
            waitsFor(function() {
                return view.getNavigationModel().getPosition().isEqual(focusContext) && Ext.Element.getActiveElement() === newCell;
            }, 'for cell (2,2) to be focused');
        });
    });
    
    describe('navigation in a locking grid', function() {
        it('should wrap and navigate from side to side seamlessly', function() {
            makeGrid(4, 100, null, null, true);

            navModel.setPosition(new Ext.grid.CellContext(grid.lockedGrid.view).setPosition(0, 0));
            expectPosition(0, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(0, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(0, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(0, 3);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 3);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 3);

            // Now do left arrow until we get back to 0, 0
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(2, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(2, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(2, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 3);

            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 3);

            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 0);
        });
    });
    
    describe('navigation in a non-locking grid', function() {
        it('should wrap and navigate correctly', function() {
            makeGrid(4, 100);

            navModel.setPosition(new Ext.grid.CellContext(grid.view).setPosition(0, 0));
            expectPosition(0, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(0, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(0, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(0, 3);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(1, 3);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.RIGHT);
            expectPosition(2, 3);

            // Now do left arrow until we get back to 0, 0
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(2, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(2, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(2, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 3);

            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(1, 0);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 3);

            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 2);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 1);
            
            jasmine.fireKeyEvent(navModel.cell, 'keydown', Ext.event.Event.LEFT);
            expectPosition(0, 0);
        });
    });

});