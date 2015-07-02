describe("Ext.toolbar.Toolbar", function(){
    var expectAria = jasmine.expectAriaAttr,
        expectNoAria = jasmine.expectNoAriaAttr,
        toolbar;

    function createToolbar(cfg) {
        toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            width: 200,
            renderTo: Ext.getBody()
        }, cfg || {}));
    }

    afterEach(function () {
        Ext.destroy(toolbar);
        toolbar = null;
    });
    
    it("should default to using a hbox layout", function() {
        createToolbar();
        expect(toolbar.getLayout() instanceof Ext.layout.container.HBox);
    });

    describe('enableOverflow', function () {
        describe('when false', function () {
            it('should not create a menu', function () {
                // false is the default value.
                createToolbar({
                    enableOverflow: false
                });
                expect(toolbar.layout.overflowHandler).toBeNull();
            });
        });

        describe('when true', function () {
            it('should create an overflow menu', function () {
                createToolbar({
                    enableOverflow: true
                });
                expect(toolbar.layout.overflowHandler.menu).toBeDefined();
            });

            it('should create an overflow menu with type "menu"', function () {
                createToolbar({
                    enableOverflow: true
                });
                expect(toolbar.layout.overflowHandler.type).toBe('menu');
            });
        });
    });

    describe('defaultButtonUI', function() {
        it("should use the defaultButtonUI for child buttons with no ui configured on the instance", function() {
            createToolbar({
                defaultButtonUI: 'foo',
                items: [{
                    text: 'Bar'
                }]
            });

            expect(toolbar.items.getAt(0).ui).toBe('foo-small');
        });

        it("should not use the defaultButtonUI for child buttons with ui configured on the instance", function() {
            createToolbar({
                defaultButtonUI: 'foo',
                items: [{
                    text: 'Bar',
                    ui: 'bar'
                }]
            });

            expect(toolbar.items.getAt(0).ui).toBe('bar-small');
        });

        it("should not use the defaultButtonUI for child buttons with ui of 'default' configured on the instance", function() {
            createToolbar({
                defaultButtonUI: 'foo',
                items: [{
                    text: 'Bar',
                    ui: 'default'
                }]
            });

            expect(toolbar.items.getAt(0).ui).toBe('default-small');
        });

        it("should use the defaultButtonUI for segmented buttons with no defaultUI configured on the instance", function() {
            createToolbar({
                defaultButtonUI: 'foo',
                items: [{
                    xtype: 'segmentedbutton',
                    items: [{
                        text: 'Bar'
                    }]
                }]
            });

            expect(toolbar.items.getAt(0).getDefaultUI()).toBe('foo');
            expect(toolbar.items.getAt(0).items.getAt(0).ui).toBe('foo-small');
        });

        it("should not use the defaultButtonUI for segmented buttons with defaultUI configured on the instance", function() {
            createToolbar({
                defaultButtonUI: 'foo',
                items: [{
                    xtype: 'segmentedbutton',
                    defaultUI: 'bar',
                    items: [{
                        text: 'Bar'
                    }]
                }]
            });

            expect(toolbar.items.getAt(0).getDefaultUI()).toBe('bar');
            expect(toolbar.items.getAt(0).items.getAt(0).ui).toBe('bar-small');
        });

        it("should not use the defaultButtonUI for segmented buttons with defaultUI of 'default' configured on the instance", function() {
            createToolbar({
                defaultButtonUI: 'foo',
                items: [{
                    xtype: 'segmentedbutton',
                    defaultUI: 'default',
                    items: [{
                        text: 'Bar'
                    }]
                }]
            });

            expect(toolbar.items.getAt(0).getDefaultUI()).toBe('default');
            expect(toolbar.items.getAt(0).items.getAt(0).ui).toBe('default-small');
        });
    });

    describe('defaultFieldUI', function() {
        it("should use the defaultFieldUI for child fields with no ui configured on the instance", function() {
            createToolbar({
                defaultFieldUI: 'foo',
                items: [{
                    xtype: 'textfield'
                }]
            });

            expect(toolbar.items.getAt(0).ui).toBe('foo');
        });

        it("should not use the defaultFieldUI for child fields with ui configured on the instance", function() {
            createToolbar({
                defaultFieldUI: 'foo',
                items: [{
                    xtype: 'textfield',
                    ui: 'bar'
                }]
            });

            expect(toolbar.items.getAt(0).ui).toBe('bar');
        });

        it("should not use the defaultFieldUI for child fields with ui of 'default' configured on the instance", function() {
            createToolbar({
                defaultFieldUI: 'foo',
                items: [{
                    xtype: 'textfield',
                    ui: 'default'
                }]
            });

            expect(toolbar.items.getAt(0).ui).toBe('default');
        });
    });
    
    describe("FocusableContainer", function() {
        it("should be on with buttons", function() {
            createToolbar({
                items: [{
                    xtype: 'button'
                }, {
                    xtype: 'button'
                }]
            });
            
            expectAria(toolbar, 'tabIndex', '0');
        });
        
        it("should be off with input fields", function() {
            createToolbar({
                items: [{
                    xtype: 'button'
                }, {
                    xtype: 'textfield'
                }]
            });
            
            expectNoAria(toolbar, 'tabIndex');
        });
        
        it("should be off with sliders", function() {
            createToolbar({
                items: [{
                    xtype: 'button'
                }, {
                    xtype: 'slider'
                }]
            });
            
            expectNoAria(toolbar, 'tabIndex');
        });
    });
});
