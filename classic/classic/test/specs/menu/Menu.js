describe("Ext.menu.Menu", function() {
    var pressArrow = jasmine.pressArrowKey,
        waitForFocus = jasmine.waitForFocus,
        menu, itGoodBrowsers = Ext.isWebKit || Ext.isGecko ? it : xit;

    function makeMenu(cfg) {
        menu = new Ext.menu.Menu(cfg || {});
        return menu;
    }

    afterEach(function() {
        if (menu) {
            menu.hide();
            Ext.destroy(menu);
            menu = null;
        }
    });

    describe('dockedItems', function () {
        it('should move body below docked title', function () {
            makeMenu({
                title: 'Some Menu',

                items: [{
                    text: 'Hello'
                }, {
                    text: 'World'
                }]
            });

            menu.show();

            var bodyXY = menu.body.getXY();
            var menuXY = menu.el.getXY();
            var title = menu.dockedItems.items[0];
            var titleHeight = title.el.getHeight();
            var titleXY = title.el.getXY();

            expect(bodyXY[1]).toBe(titleXY[1] + titleHeight);
        });
    });

    describe("reference", function() {
        it("should have a reference when used as a config on a button", function() {
            // Ensure the state is clean
            Ext.ComponentManager.fixReferences();

            var ct = new Ext.container.Container({
                renderTo: Ext.getBody(),
                referenceHolder: true,
                items: {
                    xtype: 'button',
                    text: 'Foo',
                    menu: {
                        reference: 'menu',
                        items: [{
                            reference: 'item'
                        }]
                    }
                }
            });

            menu = ct.items.getAt(0).getMenu();

            expect(ct.lookupReference('menu')).toBe(menu);
            expect(ct.lookupReference('item')).toBe(menu.items.getAt(0));

            ct.destroy();
        });

        it("should have a reference when used as an instance on a button", function() {
            // Ensure the state is clean
            Ext.ComponentManager.fixReferences();

            makeMenu({
                reference: 'menu',
                items: [{
                    reference: 'item'
                }]
            });

            var ct = new Ext.container.Container({
                renderTo: Ext.getBody(),
                referenceHolder: true,
                items: {
                    xtype: 'button',
                    text: 'Foo',
                    menu: menu
                }
            });

            expect(ct.lookupReference('menu')).toBe(menu);
            expect(ct.lookupReference('item')).toBe(menu.items.getAt(0));

            ct.destroy();
        });
    });
    
    describe("MenuManager hideAll", function() {
        it("should hide a single menu", function() {
            makeMenu({
                items: {
                    text: 'Foo'
                }
            });
            menu.show();
            expect(menu.isVisible()).toBe(true);
            Ext.menu.Manager.hideAll();
            expect(menu.isVisible()).toBe(false);
        });

        it("should hide multiple menus", function() {
            var m1 = makeMenu({items: {text: 'M1'}, allowOtherMenus: true}),
                m2 = makeMenu({items: {text: 'M2'}, allowOtherMenus: true}),
                m3 = makeMenu({items: {text: 'M3'}, allowOtherMenus: true});

            m1.show();
            m2.show();
            m3.show();

            expect(m1.isVisible()).toBe(true);
            expect(m2.isVisible()).toBe(true);
            expect(m3.isVisible()).toBe(true);

            Ext.menu.Manager.hideAll();

            expect(m1.isVisible()).toBe(false);
            expect(m2.isVisible()).toBe(false);
            expect(m3.isVisible()).toBe(false);

            Ext.destroy(m1, m2, m3);
        });

        it("should hide a menu and submenus", function() {
            makeMenu({
                items: {
                    text: 'Foo',
                    menu: {
                        items: {
                            text: 'Bar'
                        }
                    }
                }
            });

            menu.show();
            var item = menu.items.first();
            item.activated = true;
            item.expandMenu(null, 0);

            expect(menu.isVisible()).toBe(true);
            expect(item.getMenu().isVisible()).toBe(true);

            Ext.menu.Manager.hideAll();

            expect(menu.isVisible()).toBe(false);
            expect(item.getMenu().isVisible()).toBe(false);
        });

        it("should only hide menus visible at the time of being called", function() {
            var m1 = makeMenu({allowOtherMenus: true, items: {text: 'Foo'}}),
                m2 = makeMenu({allowOtherMenus: true, items: {text: 'Bar'}}),
                m3 = makeMenu({allowOtherMenus: true, items: {text: 'Baz'}});

            m1.show();
            m2.show();

            m1.on('hide', function() {
                m3.show();
            });

            expect(m1.isVisible()).toBe(true);
            expect(m2.isVisible()).toBe(true);
            expect(m3.isVisible()).toBe(false);

            Ext.menu.Manager.hideAll();

            expect(m1.isVisible()).toBe(false);
            expect(m2.isVisible()).toBe(false);
            expect(m3.isVisible()).toBe(true);

            Ext.destroy(m1, m2, m3);
        });
    });

    describe("moving menu", function() {
        describe("moving from button to menu item", function() {
            it("should be able to show the menu", function() {
                makeMenu({
                    items: [{
                        text: 'Foo'
                    }]
                });

                var b = new Ext.button.Button({
                    renderTo: Ext.getBody(),
                    text: 'Foo',
                    menu: menu
                });

                b.showMenu();
                b.hideMenu();

                delete menu.menuClickBuffer;

                var other = new Ext.menu.Menu({
                    items: [{
                        text: 'Child',
                        menuExpandDelay: 0
                    }]
                }), item;

                item = other.items.getAt(0);
                item.setMenu(menu);

                other.show();
                jasmine.focusAndWait(item);
                runs(function() {
                    item.activated = true;
                    item.expandMenu(null, 0);
                    expect(menu.isVisible()).toBe(true);
                    Ext.destroy(other, b);
                });
            });
        });

        describe("moving from menu item to button", function() {
            it("should be able to show the menu", function() {
                makeMenu({
                    menuClickBuffer: 0,
                    items: [{
                        text: 'Foo'
                    }]
                });

                var b = new Ext.button.Button({
                    renderTo: Ext.getBody(),
                    text: 'Foo'
                });

                var other = new Ext.menu.Menu({
                    items: [{
                        text: 'Child',
                        menuExpandDelay: 0,
                        menu: menu
                    }]
                }), item;

                item = other.items.getAt(0);

                other.show();
                jasmine.focusAndWait(item);
                runs(function() {
                    item.activated = true;
                    item.expandMenu(null, 0);
                    
                    other.hide();
                    b.setMenu(menu);
                    delete menu.menuClickBuffer;
                    b.showMenu();
                    expect(menu.isVisible()).toBe(true);
                    Ext.destroy(other, b);
                });
            });
        });
    });

    describe('hiding all other menus', function() {
        var menu1, menu2;
        
        afterEach(function() {
            Ext.destroy(menu1, menu2);
            menu1 = menu2 = null;
        });
        
        it('should hide all other menus on menu show', function() {
            menu1 = makeMenu();
            menu2 = makeMenu();

            menu1.show();
            expect(menu1.isVisible()).toBe(true);

            // Showing another menu should hide menu1
            menu2.show();
            expect(menu1.isVisible()).toBe(false);
            expect(menu2.isVisible()).toBe(true);
        });

        it('should not hide all other menus on menu show when allowOtherMenus: true', function() {
            menu1 = makeMenu({ allowOtherMenus: true });
            menu2 = makeMenu({ allowOtherMenus: true });

            menu1.show();
            expect(menu1.isVisible()).toBe(true);

            // Showing another menu should NOT hide menu1 because of allowOtherMenus setting
            menu2.show();
            expect(menu2.isVisible()).toBe(true);
            expect(menu2.isVisible()).toBe(true);
        });

        it("should not hide menus when they are a child of a direct menu item", function() {
            makeMenu({
                items: [{
                    text: 'Foo',
                    menu: {
                        items: [{
                            text: 'Bar'
                        }]
                    }
                }]
            });

            var item = menu.items.getAt(0),
                child = item.getMenu();

            menu.show();

            item.activated = true;
            item.expandMenu(null, 0);
            
            expect(menu.isVisible()).toBe(true);
            expect(child.isVisible()).toBe(true);
        });

        it("should not hide menus when they are nested as part of other components", function() {
            makeMenu({
                items: {
                    xtype: 'container',
                    items: [{
                        xtype: 'button',
                        text: 'Child',
                        menu: {
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    }]
                }
            });

            menu.show();

            var button = menu.items.getAt(0).items.getAt(0),
                child = button.getMenu();
                
            button.showMenu();

            expect(menu.isVisible()).toBe(true);
            expect(child.isVisible()).toBe(true);
        });
    });

    describe("hiding when doing an action outside the menu", function() {
        it("should hide the menu", function() {
            var field = new Ext.form.field.Text({
                renderTo: Ext.getBody()
            });

            makeMenu({
                items: [{
                    text: 'Foo'
                }]
            });
            menu.show();
            jasmine.fireMouseEvent(field.inputEl, 'mousedown');
            expect(menu.isVisible()).toBe(false);
            field.destroy();
        });

        it("should hide the menu even if the event propagation is stopped", function() {
            var el = Ext.getBody().createChild({
                tag: 'input'
            });

            el.on('mousedown', function(e) {
                e.stopPropagation();
            });

            makeMenu({
                items: [{
                    text: 'Foo'
                }]
            });
            menu.show();
            jasmine.fireMouseEvent(el, 'mousedown');
            expect(menu.isVisible()).toBe(false);
            el.destroy();
        });

        it("should hide all menus", function() {
            var field = new Ext.form.field.Text({
                renderTo: Ext.getBody()
            });

            var m1 = makeMenu({allowOtherMenus: true, items: [{text: 'Foo'}]}),
                m2 = makeMenu({allowOtherMenus: true, items: [{text: 'Bar'}]});

            m1.showAt(100, 100);
            m2.showAt(100, 150);

            jasmine.fireMouseEvent(field.inputEl, 'mousedown');
            expect(m1.isVisible()).toBe(false);
            expect(m2.isVisible()).toBe(false);
            Ext.destroy(field, m1, m2);
        });
    });

    describe('binding an ownerRef', function () {
        var ctn;

        beforeEach(function () {
            ctn = new Ext.container.Container({
                renderTo: Ext.getBody()
            });
        });

        afterEach(function () {
            ctn.destroy();
            ctn = null;
        });

        it('should bind an ownerCt reference to the menu if added as an item to a container (but not rendered)', function () {
            makeMenu();
            ctn.add(menu);

            expect(menu.ownerCt).toBe(ctn);
        });

        it('should bind an floatParent reference to the menu when shown/rendered', function () {
            makeMenu();
            ctn.add(menu);
            menu.show();

            expect(menu.floatParent).toBe(ctn);
        });

        it('should not have an ownerRef if not a child item of a container', function () {
            makeMenu();
            menu.show();

            expect(menu.floatParent).toBeUndefined();
            expect(menu.ownerCt).toBeUndefined();
        });
    });

    describe("not floating", function(){
        it("should set constrain false", function(){
            makeMenu({
                floating: false
            });
            expect(menu.constrain).toBe(false);
        });
        
        it('should not hide onFocusLeave', function() {
            makeMenu({
                renderTo: document.body,
                floating: false,
                items: [{
                    text: 'Menu Item 1'
                }]
            });
            
            menu.items.items[0].focus();
            
            waitsFor(function() {
                return menu.containsFocus;
            });
            runs(function() {
                menu.items.items[0].blur();
            });
            waitsFor(function() {
                return !menu.containsFocus;
            });
            runs(function() {
                expect(menu.isVisible()).toBe(true);
            });
        });
    });

    describe("popup menu", function() {

        it("should have a full-height vertical separator", function() {

            makeMenu({
                id: 'popup-menu',
                items: [{
                    text: 'Short',
                    id: 'popup-menu-short-item'
                }, {
                    text: 'Shrink wrap to my width, and stretch mysibling!',
                    id: 'popup-menu-long-item',
                    style: 'width:268px'
                }]
            });
            menu.showAt(0, 0);

            expect(menu.body.child('.x-menu-icon-separator').getHeight()).toEqual(menu.body.getHeight());
        });

        xit("should stretch the shortest item to match the longest", function() {

            makeMenu({
                id: 'popup-menu',
                items: [{
                    text: 'Short',
                    id: 'popup-menu-short-item'
                }, {
                    text: 'Shrink wrap to my width, and stretch mysibling!',
                    id: 'popup-menu-long-item',
                    style: 'width:268px'
                }]
            });
            menu.showAt(0, 0);

            expect(menu).toHaveLayout({
                "el": {
                    "xywh": "0 0 274 62"
                },
                "body": {
                    "xywh": "0 0 274 62"
                },
                "iconSepEl": {
                    "xywh": "0 0 2 60"
                },
                "items": {
                    "popup-menu-short-item": {
                        "el": {
                            "xywh": "3 3 268 28"
                        },
                        "arrowEl": {
                            "xywh": "62 22 1 1"
                        },
                        "textEl": {
                            "xywh": "36 12 26 13"
                        },
                        "iconEl": {
                            "xywh": "7 8 16 16"
                        },
                        "itemEl": {
                            "xywh": "4 4 266 26"
                        }
                    },
                    "popup-menu-long-item": {
                        "el": {
                            "xywh": "3 31 268 28"
                        },
                        "arrowEl": {
                            "xywh": "267 50 1 1"
                        },
                        "textEl": {
                            "xywh": "36 40 231 13"
                        },
                        "iconEl": {
                            "xywh": "7 36 16 16"
                        },
                        "itemEl": {
                            "xywh": "4 32 266 26"
                        }
                    }
                }
            });
        });
    });

    describe('registering with an owner', function () {
        describe('constrainTo', function () {
            describe('when owner is a button', function () {
                var button;

                beforeEach(function () {
                    makeMenu({
                        width: 200,
                        items: [{
                            text: 'foo'
                        }]
                    });
                });

                afterEach(function () {
                    button.destroy();
                    button = null;
                });

                it('should not constrain itself to the button', function () {
                    button = new Ext.button.Button({
                        menu: menu,
                        renderTo: Ext.getBody()
                    });

                    button.showMenu();

                    expect(button.menu.constrainTo).toBeUndefined();
                });
            });
        });
    });

    // These specs use a hashchange listener which is not supported in IE9m.
    // We decided to disable for all IE b/c it was too difficult to test in those browsers.
    (Ext.isIE ? xdescribe : describe)('navigation', function () {
        var hash = '#foo',
            hashChangeHandler;

        beforeEach(function () {
            hashChangeHandler = jasmine.createSpy();
            Ext.getWin().on('hashchange', hashChangeHandler);
            location.hash = hash;

            waitsFor(function() {
                return hashChangeHandler.callCount === 1;
            });
        });

        afterEach(function () {
            var callCount = hashChangeHandler.callCount;

            location.hash = '';

            waitsFor(function() {
                return hashChangeHandler.callCount === (callCount + 1);
            });

            runs(function() {
                Ext.getWin().un('hashchange', hashChangeHandler);
            });
        });

        it("should navigate when a child item has an href config", function() {
            makeMenu({
                renderTo: Ext.getBody(),
                width: 400,
                floating: false,
                items: [{
                    text: 'item with href',
                    href: '#blah'
                }]
            });

            jasmine.fireMouseEvent(menu.items.getAt(0).itemEl.dom, 'click');

            waitsFor(function() {
                return hashChangeHandler.callCount === 2;
            });

            runs(function() {
                expect(location.hash).toBe('#blah');
            });
        });

        it("should not navigate when a child item does not have an href config", function () {
            makeMenu({
                renderTo: Ext.getBody(),
                width: 400,
                floating: false,
                items: [{
                    text: 'item with no href'
                }]
            });

            jasmine.fireMouseEvent(menu.items.getAt(0).itemEl.dom, 'click');

            // since hashchange happens asynchronously the only way to test that it did not
            // happen is to wait a bit
            waits(100);

            runs(function() {
                expect(hashChangeHandler.callCount).toBe(1);
            });
        });
    });
    
    describe("ARIA attributes", function() {
        function expectAria(attr, value) {
            jasmine.expectAriaAttr(menu, attr, value);
        }
        
        function expectNoAria(attr) {
            jasmine.expectNoAriaAttr(menu, attr);
        }
        
        describe("floating", function() {
            beforeEach(function() {
                makeMenu();
                
                // To render
                menu.show();
                menu.hide();
            });
            
            describe("aria-expanded", function() {
                it("should be false when hidden", function() {
                    expectAria('aria-expanded', 'false');
                });
                
                it("should be true after showing", function() {
                    menu.show();
                    
                    expectAria('aria-expanded', 'true');
                });
            });
        });
        
        describe("non-floating", function() {
            beforeEach(function() {
                makeMenu({
                    floating: false,
                    renderTo: Ext.getBody()
                });
            });
            
            it("should not have aria-expanded attribute", function() {
                expectNoAria('aria-expanded');
            });
        });
    });
    
    describe("focus anchor", function() {
        var focusAndWait = jasmine.focusAndWait,
            expectFocused = jasmine.expectFocused,
            pressTab = jasmine.simulateTabKey,
            foo, bar, item;
        
        function showItem(level, text) {
            var tempMenu, tempItem;
            
            tempMenu = menu;
            
            for (var i = 1; i <= level; i++) {
                tempItem = tempMenu.down('[text="submenu ' + i + '"]');
                
                if (tempItem && tempItem.menu) {
                    tempMenu = tempItem.menu;
                    
                    tempItem.focus();
                    tempItem.expandMenu(null, 0);
                }
            }
            
            if (tempMenu && text) {
                item = tempMenu.down('[text="' + text + '"]');
            }
            
            if (item) {
                item.focus();
            }
            
            return item;
        }
        
        beforeEach(function() {
            foo = new Ext.button.Button({
                renderTo: Ext.getBody(),
                text: 'foo'
            });
            
            bar = new Ext.button.Button({
                renderTo: Ext.getBody(),
                text: 'bar'
            });
            
            makeMenu({
                defaults: {
                    hideOnClick: false
                },
                
                items: [{
                    text: 'item 1'
                }, {
                    text: 'item 2',
                }, {
                    text: 'submenu 1',
                    menu: [{
                        text: 'item 1'
                    }, {
                        text: 'item 2'
                    }, {
                        text: 'submenu 2', 
                        menu: [{
                            text: 'item 1'
                        }, {
                            text: 'should be enough'
                        }]
                    }]
                }]
            });
            
            focusAndWait(foo);
            
            runs(function() {
                menu.show();
            });
        });
        
        afterEach(function() {
            Ext.destroy(foo, bar);
            foo = bar = item = null;
        });
        
        it("should capture focus anchor when opening", function() {
            expect(menu.focusAnchor).toBe(foo.el.dom);
        });
        
        it("should tab from 1st level menu to bar", function() {
            showItem(0, 'item 1');
            
            pressTab(item, true);
            
            expectFocused(bar);
        });
        
        it("should shift-tab from 1st level menu to foo", function() {
            menu.focusAnchor = bar.el.dom;
            
            showItem(0, 'item 2');
            
            pressTab(item, false);
            
            expectFocused(foo);
        });
        
        it("should tab from 2nd level menu to bar", function() {
            showItem(1, 'item 1');
            
            pressTab(item, true);
            
            expectFocused(bar);
        });
        
        it("should tab from 3rd level menu to bar", function() {
            showItem(2, "should be enough");
            
            pressTab(item, true);
            
            expectFocused(bar);
        });
    });
    
    describe("cleanup", function() {
        var Manager = Ext.menu.Manager;
        
        beforeEach(function() {
            makeMenu();
            menu.show();
        });
        
        it("should be removed from visible array when hiding", function() {
            menu.hide();
            
            var doesContain = Ext.Array.contains(Manager.visible, menu);
            
            expect(doesContain).toBe(false);
        });
        
        it("should be removed from visible array after destroying", function() {
            menu.destroy();
            
            var doesContain = Ext.Array.contains(Manager.visible, menu);
            
            expect(doesContain).toBe(false);
        });
    });

    describe('hide on click', function() {
        var testWindow,
            button,
            topMenu,
            topMenuItem,
            menu2,
            menu2Item,
            menu3,
            menu3Item,
            clicked;

        beforeEach(function() {
            testWindow = new Ext.window.Window({
                renderTo: Ext.getBody(),
                width: 300,
                tbar: [button = new Ext.button.Button({
                    xtype: 'button',
                    text: 'Foo',
                    menu: topMenu = new Ext.menu.Menu({
                        onBeforeShow: function() {
                            return true
                        },
                        items: topMenuItem = new Ext.menu.Item({
                            text: 'Top menu item',
                            menu: menu2 = new Ext.menu.Menu({
                                items: menu2Item = new Ext.menu.Item({
                                    text: 'Second level menu item',
                                    menu: menu3 = new Ext.menu.Menu({
                                        items: menu3Item = new Ext.menu.Item({
                                            text: 'Third level menu',
                                            handler: function() {
                                                clicked = true;
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                })]
            });
            testWindow.show();
        });
        afterEach(function() {
            testWindow.destroy();
        });
        itGoodBrowsers('should hide on click, and on reshow of parent, should not show again', function() {
            button.el.focus();
            
            waitsFor(function() {
                return button.hasFocus;
            }, 'button to recieve focus');
            runs(function() {
                jasmine.fireMouseEvent(button.el, 'click');
                jasmine.fireKeyEvent(button.el, 'keydown', Ext.event.Event.DOWN);
            });
            waitsFor(function() {
                return topMenu.isVisible() && topMenuItem.hasFocus;
            }, 'topMenuItem to recieve focus');
            runs(function() {
                jasmine.fireKeyEvent(topMenuItem.el, 'keydown', Ext.event.Event.RIGHT);
            });
            waitsFor(function() {
                return menu2.isVisible() && menu2Item.hasFocus;
            }, 'menu2Item to recieve focus');
            runs(function() {
                jasmine.fireKeyEvent(menu2Item.el, 'keydown', Ext.event.Event.RIGHT);
            });
            waitsFor(function() {
                return menu3.isVisible && menu3Item.hasFocus;
            }, 'menu3Item to recieve focus');

            runs(function() {
                // All three menus must be visible
                expect(topMenu.isVisible()).toBe(true);
                expect(menu2.isVisible()).toBe(true);
                expect(menu3.isVisible()).toBe(true);

                // click the last menu item
                jasmine.fireMouseEvent(menu3Item.el, 'click');
            });

            // All menus must have hidden and focus must revert to the button
            waitsFor(function() {
                return clicked === true && !topMenu.isVisible() && !menu2.isVisible() && !menu3.isVisible() && button.hasFocus;
            }, 'all menus to hide');
            
            runs(function() {
                jasmine.fireMouseEvent(button.el, 'click');
            });
            waitsFor(function() {
                return topMenu.isVisible();
            }, 'topMenu to show for the second time');
            runs(function() {
                expect(menu2.isVisible()).toBe(false);
                expect(menu3.isVisible()).toBe(false);
            });
        });
    });
    
    describe("keyboard interaction", function() {
        var item, submenu, subitem;
        
        beforeEach(function() {
            makeMenu({
                items: [{
                    text: 'item'
                }, {
                    text: 'submenu',
                    menu: [{
                        text: 'subitem'
                    }]
                }]
            });
            
            item = menu.down('[text=item]');
            submenu = menu.down('[text=submenu]');
            subitem = submenu.menu.down('[text=subitem]');
        });
        
        afterEach(function() {
            item = submenu = subitem = null;
        });
        
        // Unfortunately we cannot test that the actual problem is solved,
        // which is scrolling the parent container caused by default action
        // on arrow keys. This is because synthetic injected events do not cause
        // default action. The best we can do is to check that event handlers
        // are calling preventDefault() on the events.
        // See https://sencha.jira.com/browse/EXTJS-18186
        describe("preventing parent scroll", function() {
            var upSpy, downSpy, rightSpy, leftSpy;
            
            beforeEach(function() {
                upSpy = spyOn(menu, 'onFocusableContainerUpKey').andCallThrough();
                downSpy = spyOn(menu, 'onFocusableContainerDownKey').andCallThrough();
                rightSpy = spyOn(menu, 'onFocusableContainerRightKey').andCallThrough();
                
                menu.show();
            });
            
            afterEach(function() {
                upSpy = downSpy = rightSpy = leftSpy = null;
            });
            
            it("should preventDefault on the Up arrow key", function() {
                pressArrow(submenu, 'up');
                
                waitForFocus(item);
                
                runs(function() {
                    expect(upSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
            
            it("should preventDefault on the Down arrow key", function() {
                pressArrow(item, 'down');
                
                waitForFocus(submenu);
                
                runs(function() {
                    expect(downSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
            
            it("should preventDefault on the Right key", function() {
                pressArrow(submenu, 'right');
                
                runs(function() {
                    waitForFocus(subitem);
                });
                
                runs(function() {
                    expect(rightSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
            
            it("should preventDefault on the Left key", function() {
                runs(function() {
                    leftSpy = spyOn(submenu.menu, 'onFocusableContainerLeftKey').andCallThrough();
                    
                    submenu.activated = true;
                    submenu.expandMenu(null, 0);
                    
                    pressArrow(subitem, 'left');
                });
                
                waitForFocus(submenu);
                
                runs(function() {
                    expect(leftSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
        });
    });
});
