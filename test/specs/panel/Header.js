describe("Ext.panel.Header", function() {
    describe("setTitlePosition", function() {
        var header;

        beforeEach(function() {
            header = new Ext.panel.Header({
                title: 'foo',
                renderTo: document.body,
                tools: [
                    { type: 'close' },
                    { type: 'pin' }
                ]
            });
        });

        afterEach(function() {
            header.destroy();
        });

        it("should insert the header at the new title position", function() {
            header.setTitlePosition(2);
            expect(header.items.getAt(2)).toBe(header.getTitle());
        });

        it("should update the titlePosition property", function() {
            header.setTitlePosition(2);
            expect(header.titlePosition).toBe(2);
        });

        it("should not allow a titlePosition greater than the max item index", function() {
            header.setTitlePosition(3);
            expect(header.items.getAt(2)).toBe(header.getTitle());
            expect(header.titlePosition).toBe(2);
        });
    });
});