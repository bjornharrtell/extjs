describe("Ext.Img", function() {
    var img, defaultFamily;

    function makeImage(cfg) {
        img = new Ext.Img(Ext.apply({
            renderTo: Ext.getBody(),
            alt: 'Image'
        }, cfg));
    }
    
    function expectAria(attr, value) {
        jasmine.expectAriaAttr(img, attr, value);
    }

    beforeEach(function() {
        defaultFamily = Ext._glyphFontFamily;
        Ext._glyphFontFamily = 'FooFont';
    });

    afterEach(function() {
        Ext._glyphFontFamily = defaultFamily;
        Ext.destroy(img);
        defaultFamily = img = null;
    });

    describe("glyph", function() {

        function expectGlyph(code) {
            expect(img.el.dom.innerHTML.charCodeAt(0)).toBe(code);
        }

        function expectFontFamily(family) {
            expect(img.el.getStyle('font-family')).toBe(family);
        }

        describe("initial configuration", function() {
            it("should set a numeric glyph & use the default font family", function() {
                makeImage({
                    glyph: 1234
                });
                expectGlyph(1234);
                expectFontFamily('FooFont');
            });

            it("should accept a string glyph & use the default font family", function() {
                makeImage({
                    glyph: '2345'
                });
                expectGlyph(2345);
                expectFontFamily('FooFont');
            });

            it("should accept a string glyph with the font family", function() {
                makeImage({
                    glyph: '3456@BarFont'
                });
                expectGlyph(3456);
                expectFontFamily('BarFont');
            });

            it("should not override other font styles", function() {
                makeImage({
                    glyph: '1234@BarFont',
                    style: 'font-size: 40px;'
                });
                expectGlyph(1234);
                expectFontFamily('BarFont');
                expect(img.el.getStyle('font-size')).toBe('40px');
            });
            
            it("should have img role", function() {
                makeImage({
                    glyph: '1234'
                });
                
                expectAria('role', 'img');
            });
        });

        describe("setGlyph", function() {
            describe("before render", function() {
                it("should be able to overwrite a glyph", function() {
                    makeImage({
                        renderTo: null,
                        glyph: '4321'
                    });
                    img.setGlyph(1234);
                    img.render(Ext.getBody());
                    expectGlyph(1234);
                    expectFontFamily('FooFont');
                });

                it("should be able to overwrite a glyph with a font family", function() {
                    makeImage({
                        renderTo: null,
                        glyph: '4321@BarFont'
                    });
                    img.setGlyph('1234@BazFont');
                    img.render(Ext.getBody());
                    expectGlyph(1234);
                    expectFontFamily('BazFont');
                });

                it("should not overwrite other font styles", function() {
                    makeImage({
                        renderTo: null,
                        glyph: '4321',
                        style: 'font-size: 32px;'
                    });
                    img.setGlyph('1234@BarFont');
                    img.render(Ext.getBody());
                    expectGlyph(1234);
                    expectFontFamily('BarFont');
                    expect(img.el.getStyle('font-size')).toBe('32px');
                });
            });

            describe("after render", function() {
                it("should be able to overwrite a glyph", function() {
                    makeImage({
                        glyph: '4321'
                    });
                    img.setGlyph(1234);
                    expectGlyph(1234);
                    expectFontFamily('FooFont');
                });

                it("should be able to overwrite a glyph with a font family", function() {
                    makeImage({
                        glyph: '4321@BarFont'
                    });
                    img.setGlyph('1234@BazFont');
                    expectGlyph(1234);
                    expectFontFamily('BazFont');
                });

                it("should use the default font if initially configured with a font and a new one is not provided", function() {
                    makeImage({
                        glyph: '4321@BarFont'
                    });
                    img.setGlyph('1234');
                    expectGlyph(1234);
                    expectFontFamily('FooFont');
                });

                it("should not overwrite other font styles", function() {
                    makeImage({
                        glyph: '4321',
                        style: 'font-size: 32px;'
                    });
                    img.setGlyph('1234@BarFont');
                    expectGlyph(1234);
                    expectFontFamily('BarFont');
                    expect(img.el.getStyle('font-size')).toBe('32px');
                });
            });
        });

    });
    
    describe("img tag", function() {
        beforeEach(function() {
            // Warning here is expected
            spyOn(Ext.log, 'warn');
            
            img = new Ext.Img({ renderTo: Ext.getBody() });
        });
        
        it("should have default alt attribute", function() {
            expect(img.el.dom.hasAttribute('alt')).toBe(true);
        });
        
        it("should not have role attribute", function() {
            expect(img.el.dom.hasAttribute('role')).toBe(false);
        });
    });
});
