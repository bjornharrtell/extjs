describe("grid-aria", function() {
    var expectAria = jasmine.expectAriaAttr,
        expectNoAria = jasmine.expectNoAriaAttr,
        stdStore = {
            type: 'array',
            fields: ['field1', 'field2', 'field3', 'field4', 'field5'],
            data: [
                ['foo', 'bar', 'baz', 'qux', 'fred'],
                ['frob', 'throbbe', 'bonzo', 'mymse', 'xyzzy']
            ]
        },
        stdColumns = [{
            dataIndex: 'field1',
            text: 'field 1'
        }, {
            dataIndex: 'field2',
            text: 'field 2'
        }, {
            dataIndex: 'field3',
            text: 'field 3'
        }, {
            dataIndex: 'field4',
            text: 'field 4'
        }, {
            dataIndex: 'field5',
            text: 'field 5'
        }],
        grid;
    
    function makeGrid(cfg) {
        cfg = Ext.apply({
            renderTo: Ext.getBody(),
            width: 500,
            height: 300,
            
            store: stdStore,
            columns: stdColumns
        }, cfg);
        
        grid = new Ext.grid.Panel(cfg);
    }
    
    afterEach(function() {
        if (grid) {
            grid.destroy();
            grid = null;
        }
    });
    
    describe("structure", function() {
        var hdr, col, view;
        
        afterEach(function() {
            hdr = col = view = null;
        });
        
        describe("with header", function() {
            beforeEach(function() {
                makeGrid();
                
                hdr  = grid.getHeaderContainer();
                col  = grid.getColumns()[0];
                view = grid.getView();
            });
            
            it("should have grid role on the main el", function() {
                expectAria(grid, 'role', 'grid');
            });
            
            it("should have rowgroup role on the column header main el", function() {
                expectAria(hdr, 'role', 'rowgroup');
            });
            
            it("should have row role on the column header innerCt el", function() {
                expectAria(hdr.layout.innerCt, 'role', 'row');
            });
            
            it("should have columnheader role on first column header", function() {
                expectAria(col, 'role', 'columnheader');
            });
            
            it("should have rowgroup role on the view", function() {
                expectAria(view, 'role', 'rowgroup');
            });
            
            it("should not have aria-hidden on the view", function() {
                expectNoAria(view, 'aria-hidden');
            });
            
            it("should not have aria-disabled on the view", function() {
                expectNoAria(view, 'aria-disabled');
            });
            
            it("should have presentation role on the row table node", function() {
                var node = view.getNode(0);
                
                expectAria(node, 'role', 'presentation');
            });
            
            it("should have row role on the row tr node", function() {
                var row = view.getRow(0);
                
                expectAria(row, 'role', 'row');
            });
            
            it("should have gridcell role on cell td nodes", function() {
                var cell = view.getCell(0, col);
                
                expectAria(cell, 'role', 'gridcell');
            });
            
            it("should have no role on the cell inner div", function() {
                var cell = view.getCell(0, col),
                    innerDiv = cell.dom.firstChild;
                
                expectNoAria(innerDiv, 'role');
            });
        });
        
        describe("without header", function() {
            var col, view;
            
            beforeEach(function() {
                makeGrid({ hideHeaders: true });
                
                col  = grid.getColumns()[0];
                view = grid.getView();
            });

            it("should have grid role on the main el", function() {
                expectAria(grid, 'role', 'grid');
            });
            
            it("should have rowgroup role on the view", function() {
                expectAria(view, 'role', 'rowgroup');
            });
            
            it("should not have aria-hidden on the view", function() {
                expectNoAria(view, 'aria-hidden');
            });
            
            it("should not have aria-disabled on the view", function() {
                expectNoAria(view, 'aria-disabled');
            });
            
            it("should have presentation role on the row table node", function() {
                var node = view.getNode(0);
                
                expectAria(node, 'role', 'presentation');
            });
            
            it("should have row role on the row tr node", function() {
                var row = view.getRow(0);
                
                expectAria(row, 'role', 'row');
            });
            
            it("should have gridcell role on cell td nodes", function() {
                var cell = view.getCell(0, col);
                
                expectAria(cell, 'role', 'gridcell');
            });
            
            it("should have no role on the cell inner div", function() {
                var cell = view.getCell(0, col),
                    innerDiv = cell.dom.firstChild;
                
                expectNoAria(innerDiv, 'role');
            });
        });
    });
    
    describe("grouped columns", function() {
        describe("labelling", function() {
            beforeEach(function() {
                makeGrid({
                    columns: [{
                        text: 'group',
                        columns: [{
                            dataIndex: 'field1',
                            text: 'column 1'
                        }, {
                            dataIndex: 'field2',
                            text: 'column 2'
                        }]
                    }]
                });
            });
            
            it("should have aria-label on first column header", function() {
                var col = grid.getColumns()[0];
                
                expectAria(col, 'aria-label', 'group column 1');
            });
            
            it("should have aria-label on second column header", function() {
                var col = grid.getColumns()[1];
                
                expectAria(col, 'aria-label', 'group column 2');
            });
        });
        
        describe("HTML in labels", function() {
            beforeEach(function() {
                makeGrid({
                    columns: [{
                        text: '<span><tt>group</tt></span>',
                        columns: [{
                            dataIndex: 'field1',
                            text: '<span><b>column 1</b></span>'
                        }]
                    }]
                });
            });
            
            it("should strip HTML tags from group and column text", function() {
                var col = grid.getColumns()[0];
                
                expectAria(col, 'aria-label', 'group column 1');
            });
        });
    });
    
    describe("sort state", function() {
        var col1, col2;
        
        beforeEach(function() {
            makeGrid({
                columns: [{
                    dataIndex: 'field1',
                    text: 'sortable 1',
                    sortable: true
                }, {
                    dataIndex: 'field2',
                    text: 'sortable 2',
                    sortable: true
                }]
            });
            
            col1 = grid.getColumns()[0];
            col2 = grid.getColumns()[1];
        });
        
        afterEach(function() {
            col1 = col2 = null;
        });
        
        it("should have no aria-sort when not sorted by default", function() {
            expectNoAria(col1, 'aria-sort');
        });
        
        it("should have aria-sort when sorted ascending", function() {
            col1.sort('ASC');
            
            expectAria(col1, 'aria-sort', 'ascending');
        });
        
        it("should have aria-sort when sorted descending", function() {
            col1.sort('DESC');
            
            expectAria(col1, 'aria-sort', 'descending');
        });
        
        it("should have aria-sort removed when sort state is reset", function() {
            col1.sort('ASC');
            col2.sort('DESC');
            
            expectNoAria(col1, 'aria-sort');
        });
    });
    
    describe("aria-readonly", function() {
        it("should be true when not editable", function() {
            makeGrid();
            
            expectAria(grid, 'aria-readonly', 'true');
        });
        
        it("should be false with cellediting plugin", function() {
            makeGrid({
                plugins: [{ ptype: 'cellediting' }]
            });
            
            expectAria(grid, 'aria-readonly', 'false');
        });
        
        it("should be false with rowediting plugin", function() {
            makeGrid({
                plugins: [{ ptype: 'rowediting' }]
            });
            
            expectAria(grid, 'aria-readonly', 'false');
        });
        
        it("should have aria-readonly on the column headers", function() {
            makeGrid({
                plugins: [{ ptype: 'cellediting' }]
            });
            
            var col = grid.getColumns()[0];
            
            expectAria(col, 'aria-readonly', 'true');
        });
    });
    
    describe("aria-multiselectable", function() {
        it("should be false with SINGLE", function() {
            makeGrid();
            
            expectAria(grid, 'aria-multiselectable', 'false');
        });
        
        it("should be true with SIMPLE", function() {
            makeGrid({
                selModel: {
                    mode: 'SIMPLE'
                }
            });
            
            expectAria(grid, 'aria-multiselectable', 'true');
        });
        
        it("should be true with MULTI", function() {
            makeGrid({
                selModel: {
                    mode: 'MULTI'
                }
            });
            
            expectAria(grid, 'aria-multiselectable', 'true');
        });
    });
    
    describe("aria-selected", function() {
        var selModel;
        
        beforeEach(function() {
            makeGrid({
                selModel: {
                    type: 'spreadsheet',
                    mode: 'MULTI'
                }
            });
            
            selModel = grid.getSelectionModel();
        });
        
        describe("row", function() {
            var row;
            
            beforeEach(function() {
                row = grid.getView().getRow(0);
            });
            
            afterEach(function() {
                row = null;
            });
            
            it("should not be set when not selected", function() {
                expectNoAria(row, 'aria-selected');
            });
            
            it("should be set when selected", function() {
                selModel.select(0);
                
                expectAria(row, 'aria-selected', 'true');
            });
            
            it("should be removed when deselected", function() {
                selModel.select(0);
                selModel.deselect(0);
                
                expectNoAria(row, 'aria-selected');
            });
        });
        
        describe("cell", function() {
            var cell;
            
            beforeEach(function() {
                cell = grid.getView().getCell(0, grid.getColumns()[0]);
            });
            
            it("should not be set when not selected", function() {
                expectNoAria(cell, 'aria-selected');
            });
            
            it("should be set when selected", function() {
                selModel.selectCells([0, 0], [1, 5]);
                
                expectAria(cell, 'aria-selected', 'true');
            });
            
            it("should be removed when deselected", function() {
                selModel.selectCells([0, 0], [1, 5]);
                selModel.resetSelection(true);
                
                expectNoAria(cell, 'aria-selected');
            });
        });
    });
});
