describe("Ext.layout.container.Card", function(){

    var comp;

    function createCardContainer(config) {
        comp = Ext.widget(Ext.apply({
            xtype: 'container',
            width: 100,
            height: 100,
            layout: {
                type: 'card',
                deferredRender: config.deferredRender
            },
            renderTo: document.body
        }, config));
        return comp;
    }

    afterEach(function(){
        comp = Ext.destroy(comp);
    });

    describe("visibility", function() {
        it("should have the active item as visible", function() {
            createCardContainer({
                defaultType: 'component',
                items: [{
                    itemId: 'a'
                }, {
                    itemId: 'b'
                }]
            });
            expect(comp.down('#a').isVisible()).toBe(true);
        });

        it("should have the inactive items as not visible", function() {
            createCardContainer({
                defaultType: 'component',
                items: [{
                    itemId: 'a'
                }, {
                    itemId: 'b'
                }, {
                    itemId: 'c'
                }]
            });
            expect(comp.down('#b').isVisible()).toBe(false);
            expect(comp.down('#c').isVisible()).toBe(false);
        });

        it("should have child items of inactive items as not visible with deep: true", function() {
            createCardContainer({
                items: [{
                    xtype: 'component',
                    itemId: 'a'
                }, {
                    xtype: 'container',
                    items: {
                        xtype: 'component',
                        itemId: 'b'
                    }
                }, {
                    xtype: 'container',
                    items: {
                        xtype: 'component',
                        itemId: 'c'
                    }
                }]
            });
            expect(comp.down('#b').isVisible(true)).toBe(false);
            expect(comp.down('#c').isVisible(true)).toBe(false);
        });

        // Tests EXTJS-15545
        describe("with an added listener", function() {
            it("should have child items of inactive items as not visible with deep: true", function() {
                createCardContainer({
                    items: [{
                        xtype: 'component',
                        itemId: 'a'
                    }, {
                        xtype: 'container',
                        listeners: {added: function(){}},
                        items: {
                            xtype: 'component',
                            itemId: 'b'
                        }
                    }, {
                        xtype: 'container',
                        listeners: {added: function() {}},
                        items: {
                            xtype: 'component',
                            itemId: 'c'
                        }
                    }]
                });
                expect(comp.down('#b').isVisible(true)).toBe(false);
                expect(comp.down('#c').isVisible(true)).toBe(false);
            });
        });
    });

    describe("Sizing", function() {
        it("should size the child using both dimensions", function() {
            createCardContainer({
                items: {
                    xtype: 'component'
                }
            });
            expect(comp.items.items[0].getWidth()).toEqual(100);
            expect(comp.items.items[0].getHeight()).toEqual(100);
        });
        
        it("should size the child using height and shrinkWrap width", function() {
            createCardContainer({
                height: 100,
                width: undefined,
                style: 'position:absolute', // Avoid the 100% body width and allow the shrinkWrap
                items: {
                    xtype: 'component',
                    width: 200
                }
            });
            expect(comp.items.items[0].getHeight()).toEqual(100);
            expect(comp.getWidth()).toEqual(200);
        });

        it("should size the child using width and shrinkWrap height", function() {
            createCardContainer({
                width: 100,
                height: undefined,
                items: {
                    xtype: 'component',
                    height: 200
                }
            });
            expect(comp.items.items[0].getWidth()).toEqual(100);
            expect(comp.getHeight()).toEqual(200);
        });
    });
    
    describe('Deferred render', function() {
        it("should render all children", function(){
            createCardContainer({
                items: [{
                    xtype: 'component'
                }, {
                    xtype: 'component'
                }]
            });
            expect(comp.items.items[0].el).toBeDefined();
            expect(comp.items.items[1].el).toBeDefined();
        });

        it("should only render the active item", function() {
            createCardContainer({
                activeItem: 1,
                deferredRender: true,
                items: [{
                    xtype: 'component'
                }, {
                    xtype: 'component'
                }]
            });
            expect(comp.items.items[0].el).toBeUndefined();
            expect(comp.items.items[1].el).toBeDefined();
        });
    });
    
    describe('Events', function() {
        it("should fire beforeactivate and activate on item 1", function() {
            var comp1BeforeActivated, comp1Activated;
            createCardContainer({
                activeItem: 1,
                deferredRender: true,
                items: [{
                    xtype: 'component'
                }, {
                    xtype: 'component',
                    listeners: {
                        beforeactivate: function() {
                            comp1BeforeActivated = true;
                        },
                        activate: function() {
                            comp1Activated = true;
                        }
                    }
                }]
            });
            expect(comp1BeforeActivated).toEqual(true);
            expect(comp1Activated).toEqual(true);
            expect(comp.items.items[0].el).toBeUndefined();
            expect(comp.items.items[1].el).toBeDefined();
        });

        it("should veto activation of item 1", function() {
            var comp1BeforeActivated, comp1Activated;
            createCardContainer({
                activeItem: 1,
                deferredRender: true,
                items: [{
                    xtype: 'component'
                }, {
                    xtype: 'component',
                    listeners: {
                        beforeactivate: function() {
                            comp1BeforeActivated = true;
                            return false;
                        },
                        activate: function() {
                            comp1Activated = true;
                        }
                    }
                }]
            });
            expect(comp1BeforeActivated).toEqual(true);
            expect(comp1Activated).toBeUndefined();
            expect(comp.items.items[0].el).toBeUndefined();
            expect(comp.items.items[1].el).toBeUndefined();
        });
    });

    describe('Active Item', function () {
        describe('calling getActiveItem()', function () {
            it('should return a default item when activeItem is set', function () {
                comp = createCardContainer({
                    activeItem: 0,
                    items: {
                        xtype: 'component'
                    }
                });

                expect(comp.layout.getActiveItem()).toBe(comp.items.items[0]);
            });

            it('should return a default item if activeItem is not defined', function () {
                comp = createCardContainer({
                    items: {
                        xtype: 'component'
                    }
                });

                expect(comp.layout.getActiveItem()).toBe(comp.items.items[0]);
            });

            it('should return a default item if activeItem is undefined', function () {
                comp = createCardContainer({
                    activeItem: undefined,
                    items: {
                        xtype: 'component'
                    }
                });

                expect(comp.layout.getActiveItem()).toBe(comp.items.items[0]);
            });

            it('should not return a default item if activeItem is null', function () {
                comp = createCardContainer({
                    activeItem: null,
                    items: {
                        xtype: 'component'
                    }
                });

                expect(comp.layout.getActiveItem()).toBe(null);
            });

            it('should return the specified active item', function () {
                comp = createCardContainer({
                    activeItem: 1,
                    items: [{
                        xtype: 'component'
                    }, {
                        xtype: 'component'
                    }]
                });

                expect(comp.layout.getActiveItem()).toBe(comp.items.items[1]);
            });

            it('should return the specified active item if deferred render', function () {
                comp = createCardContainer({
                    activeItem: 1,
                    deferredRender: true,
                    items: [{
                        xtype: 'component'
                    }, {
                        xtype: 'component'
                    }]
                });

                expect(comp.layout.getActiveItem()).toBe(comp.items.items[1]);
            });
        });

        it('should display the first item as active item when active item is not set', function () {
            comp = createCardContainer({
                items: [{
                    xtype: 'component'
                }, {
                    xtype: 'component'
                }]
            });

            expect(comp.items.items[0].el.getStyle('display')).toBe('block');
            expect(comp.items.items[1].el.getStyle('display')).toBe('none');
        });

        it('should not display any item as active item when active item is null', function () {
            comp = createCardContainer({
                activeItem: null,
                items: [{
                    xtype: 'component'
                }, {
                    xtype: 'component'
                }]
            });

            expect(comp.items.items[0].el.getStyle('display')).toBe('none');
            expect(comp.items.items[1].el.getStyle('display')).toBe('none');
        });
    });

    describe('scroll position when changing cards', function () {
        var makeCard = (function () {
            var incr = 0;

            function makeText() {
                var text = '',
                    i;

                for (i = 0; i < 7000; i++) {
                    text += incr + ' ';
                }
                return text;
            }

            return function () {
                incr++;

                return new Ext.panel.Panel({
                    title: 'Loooooooong text',
                    scrollable: true,
                    items: {
                        xtype: 'box',
                        html: makeText()
                    }
                });
            };
        }());

        function removeCard() {
            var layout = comp.layout,
                c = layout.getActiveItem();

            layout.prev();
            c.destroy();
        }

        it('should not have scrolled a new item upon creation', function () {
            // This may seem odd, but there's a FF bug that will preserve the scroll position
            // of a destroyed card and reapply it to the next created one.
            // See EXTJS-16173.
            var c;

            createCardContainer({
                items: [makeCard()]
            });

            // Create a new card.
            c = comp.layout.setActiveItem(makeCard());
            // Scroll it.
            c.getScrollable().scrollTo(0, 10000);
            // Remove it and set the previous card as active.
            removeCard();
            // Create a new card and check its scroll position.
            c = comp.layout.setActiveItem(makeCard());

            expect(c.getScrollable().getElement().dom.scrollTop).toBe(0);
        });
    });
});
