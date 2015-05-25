describe('Ext.layout.container.boxOverflow.Menu', function () {
    var toolbar;

    function createToolbar(cfg) {
        toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            enableOverflow: true,
            width: 1,
            renderTo: Ext.getBody(),
            items: [{
                xtype: 'checkboxfield',
                name: 'check1',
                itemId: 'check1'
            }]
        }, cfg || {}));
    }

    afterEach(function () {
        Ext.destroy(toolbar);
        toolbar = null;
    });

    it("should be able to show a button menu after being overflowed", function() {
        createToolbar({
            items: [{
                xtype: 'button',
                text: 'Foo',
                menu: {
                    items: {
                        text: 'Some Menu'
                    }
                }
            }]
        });

        var menu = toolbar.layout.overflowHandler.menu,
            button = toolbar.items.first();

        menu.show();
        menu.hide();

        toolbar.setWidth(300);

        button.showMenu();
        expect(button.getMenu().isVisible(true)).toBe(true);
    });

    //FIXME
    xdescribe('addComponentToMenu', function () {
        it('should create an overflowClone bound to each toolbar item', function () {
            createToolbar();

            toolbar.layout.overflowHandler.menu.show();

            expect(toolbar.items.getAt(0).overflowClone).toBeDefined();
        });

        it('should create an overflowClone bound to each toolbar item that is a reference to each menu item', function () {
            var menu, item;

            createToolbar();

            menu = toolbar.layout.overflowHandler.menu;
            menu.show();

            item = menu.items.getAt(0);

            expect(toolbar.items.getAt(0).overflowClone).toBe(item);
            expect(item.name).toBe('check1');
        });
    });

    //FIXME
    xdescribe('createMenuConfig', function () {
        it('should have same state as its complement toolbar item', function () {
            var toolbarItems, overflowHandler, menuItems;

            createToolbar({
                items: [{
                    xtype: 'checkboxfield',
                    name: 'check1',
                    itemId: 'check1'
                }, {
                    xtype: 'checkboxfield',
                    name: 'check2',
                    itemId: 'check2',
                    checked: true
                }]
            });

            toolbarItems = toolbar.items;
            toolbarItems.getAt(0).setValue(true);
            toolbarItems.getAt(1).setValue(false);

            overflowHandler = toolbar.layout.overflowHandler;
            menuItems = overflowHandler.menu.items;

            overflowHandler.menu.show();

            expect(menuItems.getAt(0).checked).toBe(true);
            expect(menuItems.getAt(1).checked).toBe(false);
        });

        it('should not overwrite listeners config defined on the original component', function () {
            // This test demonstrates that the menu item created from the original component's config
            // will receive any listeners defined in the item's listeners config.
            var wasClicked = false,
                menu;

            createToolbar({
                items: [{
                    // Button by default.
                    xtype: 'button',
                    listeners: {
                        click: function () {
                            wasClicked = true;
                        }
                    }
                }]
            });

            menu = toolbar.layout.overflowHandler.menu;
            menu.show();
            jasmine.fireMouseEvent(menu.items.getAt(0).el, 'click');

            expect(wasClicked).toBe(true);
        });
    });
});
