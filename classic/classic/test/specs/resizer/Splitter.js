describe('Ext.resizer.Splitter', function () {
    var splitter, c;

    function makeContainer(splitterCfg) {
        splitter = new Ext.resizer.Splitter(splitterCfg || {});

        c = new Ext.Container({
            layout: 'hbox',
            width: 500,
            height: 500,
            defaultType: 'container',
            items: [{
                html: 'foo',
                flex: 1
            }, splitter, {
                html: 'bar',
                flex: 1
            }],
            renderTo: Ext.getBody()
        });
    }
    
    function expectAria(attr, value) {
        jasmine.expectAriaAttr(splitter, attr, value);
    }

    afterEach(function () {
        c.destroy();
        splitter = c = null;
    });

    describe('init', function () {
        describe('the tracker', function () {
            it('should create a SplitterTracker by default', function () {
                makeContainer();

                expect(splitter.tracker instanceof Ext.resizer.SplitterTracker).toBe(true);
            });

            it('should honor a custom tracker config', function () {
                makeContainer({
                    tracker: {
                        xclass: 'Ext.resizer.BorderSplitter',
                        foo: 'baz'
                    }
                });

                expect(splitter.tracker instanceof Ext.resizer.BorderSplitter).toBe(true);
                expect(splitter.tracker.foo).toBe('baz');
            });
        });
    });
    
    describe("ARIA", function() {
        beforeEach(function() {
            makeContainer();
        });
        
        it("should be tabbable", function() {
            expect(splitter.el.isTabbable()).toBe(true);
        });
        
        it("should have separator role", function() {
            expectAria('role', 'separator');
        });
        
        it("should have aria-orientation", function() {
            expectAria('aria-orientation', 'vertical');
        });
    });
});
