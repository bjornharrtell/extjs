describe("Ext.layout.container.Table", function() {

    var ct;

    afterEach(function() {
        ct = Ext.destroy(ct);
    });

    describe("fixed/auto sizing", function() {
        
        // See EXTJSIV-7667
        it("should be able to auto-size tables correctly", function() {
            ct = new Ext.container.Container({
                width: 400,
                height: 200,
                renderTo: Ext.getBody(),
                items: {
                    xtype: 'panel',
                    layout: {
                        type: 'table',
                        columns: 1
                    },
                    items: [{
                        border: false,
                        itemId: 'item',
                        xtype: 'panel',
                        title: 'Lots of Spanning',
                        html: '<div style="width: 100px;"></div>'
                    }]
                }
            });
            // Tolerate 100-104 range due to browser diffs
            expect(ct.down('#item').getWidth()).toBeGreaterThan(99);
            expect(ct.down('#item').getWidth()).toBeLessThan(105);
            ct.destroy();    
       });
        
    });

    describe("cell reuse", function() {
        function makeCt(items) {
            ct = new Ext.container.Container({
                renderTo: Ext.getBody(),
                items: items || [],
                layout: {
                    type: 'table',
                    columns: 1
                }
            });
        }
        describe("when changing cellId", function() {
            it("should not leave an element in the cache & should update the cell", function() {
                makeCt([{
                    cellId: 'foo'
                }]);

                var td = ct.getEl().down('td');
                expect(td.id).toBe('foo');

                ct.removeAll();
                ct.add({
                    cellId: 'bar'
                });
                expect(td.id).toBe('bar');
                expect(Ext.get('foo')).toBeNull();
            });
        });

        describe("when clearing the cellId", function() {
            it("should not leave an element in the cache & should update the cell", function() {
                makeCt([{
                    cellId: 'foo'
                }]);

                var td = ct.getEl().down('td');
                expect(td.id).toBe('foo');

                ct.removeAll();
                ct.add({});
                expect(td.id).not.toBe('foo');
                expect(Ext.get('foo')).toBeNull();
            });
        });

        describe("when setting the cellId", function() {
            it("should set the cell id", function() {
                makeCt([{}]);

                var td = ct.getEl().down('td');
                expect(td.id).not.toBe('foo');

                ct.removeAll();
                ct.add({
                    cellId: 'foo'
                });
                expect(td.id).toBe('foo');
            });
        })
    });
    
});