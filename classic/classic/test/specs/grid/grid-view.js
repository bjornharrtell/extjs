describe("grid-view", function() {
    function createSuite(buffered) {
        describe(buffered ? "with buffered rendering" : "without buffered rendering", function() {
            var grid;
            
            afterEach(function(){
                Ext.destroy(grid);
                grid = null;
            });
            
            describe("locked view", function(){
                var innerSelector;
                beforeEach(function() {
                    Ext.define('spec.LockedModel', {
                        extend: 'Ext.data.Model',
                        fields: ['f1', 'f2', 'f3', 'f4']
                    });
                    
                    grid = new Ext.grid.Panel({
                        width: 600,
                        height: 300,
                        bufferedRenderer: buffered,
                        renderTo: Ext.getBody(),
                        store: {
                            model: spec.LockedModel,
                            data: [{
                                f1: 1,
                                f2: 2,
                                f3: 3,
                                f4: 4
                            }, {
                                f1: 5,
                                f2: 6,
                                f3: 7,
                                f4: 8
                            }, {
                                f1: 9,
                                f2: 10,
                                f3: 11,
                                f4: 12
                            }, {
                                f1: 13,
                                f2: 14,
                                f3: 15,
                                f4: 16
                            }]
                        },
                        columns: [{
                            locked: true,
                            dataIndex: 'f1'
                        }, {
                            locked: true,
                            dataIndex: 'f2'
                        }, {
                            dataIndex: 'f3'
                        }, {
                            dataIndex: 'f4'
                        }]
                    });
                    innerSelector = grid.normalGrid.getView().innerSelector;
                    
                });
                
                afterEach(function(){
                    Ext.undefine('spec.LockedModel');
                    Ext.data.Model.schema.clear();
                });
                
                describe("getCellInclusive", function(){
                    it("should be able to get a cell in the locked area", function(){
                        var cell = grid.getView().getCellInclusive({
                            row: 0,
                            column: 0
                        });
                        expect(cell.down(innerSelector, true).innerHTML).toBe('1'); 
                    });
                    
                    it("should be able to get a cell in the unlocked area", function(){
                        var cell = grid.getView().getCellInclusive({
                            row: 3,
                            column: 3
                        });
                        expect(cell.down(innerSelector, true).innerHTML).toBe('16'); 
                    });
                    
                    it("should return false if the cell doesn't exist", function(){
                        var cell = grid.getView().getCellInclusive({
                            row: 20,
                            column: 20
                        });
                        expect(cell).toBe(false); 
                    });
                    
                    it("should return a dom element if the returnDom param is passed", function(){
                        var cell = grid.getView().getCellInclusive({
                            row: 1,
                            column: 1
                        }, true);
                        expect(cell.tagName).not.toBeUndefined();
                        expect(Ext.fly(cell).down(innerSelector, true).innerHTML).toBe('6'); 
                    });
                });

                describe('reconfigure', function() {
                    beforeEach(function() {
                        // Suppress console warnings about Store created with no model
                        spyOn(Ext.log, 'warn');
                    });
                    
                    it('should use the new store to refresh', function() {
                        expect(grid.lockedGrid.view.all.getCount()).toBe(4);
                        expect(grid.normalGrid.view.all.getCount()).toBe(4);

                        grid.reconfigure(new Ext.data.Store(), [{dataIndex : name, locked : true }, { dataIndex : 'name' }]);

                        // Should have refreshed both sides to have no rows.
                        expect(grid.lockedGrid.view.all.getCount()).toBe(0);
                        expect(grid.normalGrid.view.all.getCount()).toBe(0);
                    });
                });        
            });
        });
    }
    createSuite(false);
    createSuite(true);
});
