describe('Ext.grid.NavigationModel', function() {
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

        if (!options.preventColumnCreate && !columns) {
            columns = [];
            for (i = 1; i < 11; i++) {
                columns.push({
                    dataIndex: 'field' + i,
                    text: 'Field ' + i,
                    width: 90,
                    // First column gets locked if we are goibng locking tests
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
            
            navModel.setPosition(9, 4);
            colRef[4].el.dom.focus();

            // Sort ascending
            jasmine.fireKeyEvent(colRef[4].el, 'keydown', Ext.EventObject.SPACE);

            // View's element Region MUST contain the focused cell.
            expect(view.getEl().getRegion().contains(view.getCellByPosition(navModel.lastFocused).getRegion())).toBe(true);

            // Sort descending
            jasmine.fireKeyEvent(colRef[4].el, 'keydown', Ext.EventObject.SPACE);

            // View's element Region MUST still contain the focused cell.
            expect(view.getEl().getRegion().contains(view.getCellByPosition(navModel.lastFocused).getRegion())).toBe(true);
        });
    });

});