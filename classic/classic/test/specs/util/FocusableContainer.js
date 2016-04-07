describe("Ext.util.FocusableContainer", function() {
    var forward = true,
        backward = false,
        autoId = 0,
        focusAndWait = jasmine.focusAndWait,
        pressTab = jasmine.pressTabKey,
        pressArrow = jasmine.pressArrowKey,
        waitForFocus = jasmine.waitForFocus,
        expectFocused = jasmine.expectFocused,
        expectAria = jasmine.expectAriaAttr,
        expectNoAria = jasmine.expectNoAriaAttr,
        Container, fc, fcEl;
    
    function makeButton(config) {
        config = config || {};
        
        Ext.applyIf(config, {
            // It is easier to troubleshoot test failures when error message
            // says "expected fooBtn-xyz to be afterBtn-xyz", rather than
            // "expected button-xyz to be button-zyx"; since these
            // messages often display element id's, it's easier to set component
            // id here than guesstimate later.
            id: (config.text || 'button') + '-' + ++autoId,
            renderTo: Ext.getBody()
        });
        
        var btn = new Ext.button.Button(config);
        
        return btn;
    }
    
    function makeContainer(config) {
        var items, i, len, item;
        
        config = Ext.apply({
            id: 'focusableContainer-' + ++autoId,
            width: 1000,
            height: 50,
            style: {
                'background-color': 'green'
            },
            layout: 'hbox',
            defaults: {
                xtype: 'button'
            },
            renderTo: Ext.getBody()
        }, config);
        
        items = config.items;
        
        if (items) {
            for (i = 0, len = items.length; i < len; i++) {
                item = items[i];
            
                if (item.xtype === 'button') {
                    item.id = (item.text || 'button') + '-' + ++autoId;
                };
            }
        }
        
        fc = new Container(config);
        fcEl = fc.getFocusableContainerEl();
        
        return fc;
    }
    
    beforeEach(function() {
        Container = Ext.define('spec.FocusableContainer', {
            extend: 'Ext.container.Container',
            
            mixins: [
                'Ext.util.FocusableContainer'
            ]
        });
    });
    
    afterEach(function() {
        if (fc) {
            fc.destroy();
        }
        
        Ext.undefine('spec.FocusableContainer');
        Container = fc = fcEl = null;
    });
    
    describe("init/destroy", function() {
        var proto, first, second, third;
        
        function setupContainer(config) {
            config = Ext.apply({
                activeChildTabIndex: 42,
                items: [{
                    xtype: 'button',
                    itemId: 'first',
                    text: 'first'
                }, {
                    xtype: 'button',
                    itemId: 'second',
                    text: 'second',
                    disabled: true
                }, {
                    xtype: 'button',
                    itemId: 'third',
                    text: 'third',
                    tabIndex: -10
                }]
            }, config);
            
            makeContainer(config);
            
            first = fc.down('#first');
            second = fc.down('#second');
            third = fc.down('#third');
            
            return fc;
        }
        
        beforeEach(function() {
            proto = Container.prototype;
            
            spyOn(proto, 'doInitFocusableContainer').andCallThrough();
            spyOn(proto, 'doDestroyFocusableContainer').andCallThrough();
        });
        
        afterEach(function() {
            proto = first = second = third = null;
        });
        
        describe("enableFocusableContainer === true (default)", function() {
            describe("enableFocusableContainer stays true", function() {
                beforeEach(function() {
                    setupContainer();
                });
                
                it("should call init", function() {
                    expect(fc.doInitFocusableContainer).toHaveBeenCalled();
                });
                
                it("should place tabindex on container el", function() {
                    expectAria(fc, 'tabIndex', '42');
                });
                
                it("should create keyNav", function() {
                    expect(fc.focusableKeyNav).toBeDefined();
                });
                
                it("should set tabindex on the first child", function() {
                    expectAria(first, 'tabIndex', '-1');
                });
                
                it("should NOT set tabindex on the second child", function() {
                    expectNoAria(second, 'tabIndex');
                });
                
                it("should set tabindex on the third child", function() {
                    expectAria(third, 'tabIndex', '-1');
                });
                
                it("should call destroy", function() {
                    fc.destroy();
                    
                    expect(fc.doDestroyFocusableContainer).toHaveBeenCalled();
                });
            });
            
            describe("enableFocusableContainer stays true with no enabled children", function() {
                beforeEach(function() {
                    setupContainer({ renderTo: undefined });
                    
                    first.disable();
                    third.disable();
                    
                    fc.render(Ext.getBody());
                });
                
                it("should call init", function() {
                    expect(fc.doInitFocusableContainer).toHaveBeenCalled();
                });
                
                it("should NOT set tabindex on container el", function() {
                    expectNoAria(fc, 'tabIndex');
                });
                
                it("should create keyNav", function() {
                    expect(fc.focusableKeyNav).toBeDefined();
                });
                
                it("should not set tabindex on the first child", function() {
                    expectNoAria(first, 'tabIndex');
                });
                
                it("should not set tabindex on the second child", function() {
                    expectNoAria(second, 'tabIndex');
                });
                
                it("should not set tabindex on the third child", function() {
                    expectNoAria(third, 'tabIndex');
                });
                
                it("should call destroy", function() {
                    fc.destroy();
                    
                    expect(fc.doDestroyFocusableContainer).toHaveBeenCalled();
                });
            });
            
            // This is common case when a toolbar needs to make a late decision to bail out
            // of being a FocusableContainer because one or more of its children needs to handle
            // arrow key presses. See https://sencha.jira.com/browse/EXTJS-17458
            describe("enableFocusableContainer changes to false before rendering", function() {
                beforeEach(function() {
                    setupContainer({ renderTo: undefined });
                    fc.enableFocusableContainer = false;
                    fc.render(Ext.getBody());
                });
                
                it("should not call init", function() {
                    expect(fc.doInitFocusableContainer).not.toHaveBeenCalled();
                });
                
                it("should not place tabindex on container el", function() {
                    expectNoAria(fc, 'tabIndex');
                });
                
                it("should not create keyNav", function() {
                    expect(fc.focusableKeyNav).not.toBeDefined();
                });
                
                it("should not add tabindex to second child", function() {
                    expectNoAria(second, 'tabIndex');
                });
                
                it("should not alter tabindex on last child", function() {
                    expectAria(third, 'tabIndex', '-10');
                });
                
                it("should not call destroy", function() {
                    fc.destroy();
                    
                    expect(fc.doDestroyFocusableContainer).not.toHaveBeenCalled();
                });
            });
        });
        
        describe("enableFocusableContainer === false", function() {
            beforeEach(function() {
                setupContainer({ enableFocusableContainer: false });
            });
            
            it("should not call init", function() {
                expect(fc.doInitFocusableContainer).not.toHaveBeenCalled();
            });
            
            it("should not place tabindex on container el", function() {
                expectNoAria(fc, 'tabIndex');
            });
            
            it("should not create keyNav", function() {
                expect(fc.focusableKeyNav).not.toBeDefined();
            });
            
            it("should not alter tabindex on first child", function() {
                expectAria(first, 'tabIndex', '0');
            });
            
            it("should not add tabindex to second child", function() {
                expectNoAria(second, 'tabIndex');
            });
            
            it("should not alter tabindex on last child", function() {
                expectAria(third, 'tabIndex', '-10');
            });
            
            it("should not call destroy", function() {
                fc.destroy();
                
                expect(fc.doDestroyFocusableContainer).not.toHaveBeenCalled();
            });
        });
    });
    
    describe("show", function() {
        beforeEach(function() {
            makeContainer({
                items: [{
                    xtype: 'button',
                    text: 'OK'
                }]
            });
        });
        
        it("should reactivate FC el upon show", function() {
            fc.hide();
            fc.el.set({ tabIndex: -1 });
            fc.show();
            
            expect(fc.el.dom.getAttribute('tabIndex')).toBe('0');
        });
    });
    
    describe("predicates", function() {
        describe("isFocusableContainerActive", function() {
            var button;
            
            function expectActive(want) {
                var have = fc.isFocusableContainerActive();
                
                expect(have).toBe(want);
            }
            
            beforeEach(function() {
                makeContainer({
                    items: [{ text: 'foo' }]
                });
                
                button = fc.down('button');
            });
            
            afterEach(function() {
                button = null;
            });
            
            it("should return true by default", function() {
                expectActive(true);
            });
            
            it("should return false when container el is not tabbable", function() {
                fcEl.dom.removeAttribute('tabIndex');
                
                expectActive(false);
            });
            
            describe("after activating a child", function() {
                beforeEach(function() {
                    focusAndWait(button);
                });
                
                it("should return true when child is focused", function() {
                    expectActive(true);
                });
                
                it("should return false if active child is not tabbable", function() {
                    button.getFocusEl().dom.removeAttribute('tabIndex');
                    
                    expectActive(false);
                });
            });
        });
    });
    
    describe("child lookup", function() {
        describe("first/last child", function() {
            function makeSuite(name, config) {
                describe(name, function() {
                    var fooBtn, barBtn;
                    
                    beforeEach(function() {
                        makeContainer(config);
                        
                        fooBtn = fc.down('button[text=fooBtn]');
                        barBtn = fc.down('button[text=barBtn]');
                    });
                    
                    it("finds foo going forward", function() {
                        var child = fc.findNextFocusableChild({ step: true });
                        
                        expect(child).toBe(fooBtn);
                    });
                    
                    it("finds bar going backward", function() {
                        var child = fc.findNextFocusableChild({ step: false });
                        
                        expect(child).toBe(barBtn);
                    });
                });
            }
            
            makeSuite('focusable child', {
                items: [
                    { xtype: 'button', text: 'fooBtn' },
                    { xtype: 'button', text: 'barBtn' }
                ]
            });
            
            makeSuite('non-focusable child', {
                items: [
                    { xtype: 'tbtext', text: 'text1'  },
                    { xtype: 'button', text: 'fooBtn' },
                    { xtype: 'button', text: 'barBtn' },
                    { xtype: 'tbtext', text: 'text2'  }
                ]
            });
            
            makeSuite('focusable but disabled child', {
                items: [
                    { xtype: 'button', text: 'disabled1', disabled: true },
                    { xtype: 'button', text: 'fooBtn' },
                    { xtype: 'button', text: 'barBtn' },
                    { xtype: 'button', text: 'disabled2', disabled: true }
                ]
            });
            
            makeSuite('focusable/disabled AND non-focusable child', {
                items: [
                    { xtype: 'tbtext', text: 'text1'  },
                    { xtype: 'button', text: 'disabled1', disabled: true },
                    { xtype: 'button', text: 'fooBtn' },
                    { xtype: 'button', text: 'barBtn' },
                    { xtype: 'tbtext', text: 'text2'  },
                    { xtype: 'button', text: 'disabled2', disabled: true }
                ]
            });
        });
        
        describe("from existing child", function() {
            var fooBtn, barBtn, fooInput, barInput, disabled1, disabled2;
        
            function expectToFind(whatNext, whereFrom, goingForward) {
                var child = fc.findNextFocusableChild({ child: whereFrom, step: goingForward });
            
                expect(child).toBe(whatNext);
            }
        
            beforeEach(function() {
                makeContainer({
                    items: [
                        { xtype: 'tbtext', text: 'text1' },
                        { xtype: 'button', text: 'disabled1', disabled: true },
                        { xtype: 'button', text: 'fooBtn' },
                        { xtype: 'tbseparator' },
                        { xtype: 'textfield', fieldLabel: 'foo field' },
                        { xtype: 'button', text: 'disabled2', disabled: true },
                        { xtype: 'button', text: 'barBtn' },
                        { xtype: 'tbfill' },
                        { xtype: 'combobox', fieldLabel: 'bar combo' }
                    ]
                });
                
                fooBtn = fc.down('button[text=fooBtn]');
                barBtn = fc.down('button[text=barBtn]');
                
                disabled1 = fc.down('button[text=disabled1]');
                disabled2 = fc.down('button[text=disabled2]');
                
                fooInput = fc.down('textfield');
                barInput = fc.down('combobox');
            });
            
            afterEach(function() {
                fooBtn = barBtn = fooInput = barInput = disabled1 = disabled2 = null;
            });
        
            describe("forward", function() {
                describe("disabled buttons not changed", function() {
                    it("finds fooBtn as the first item", function() {
                        expectToFind(fooBtn, null, forward);
                    });
                    
                    it("finds fooInput from fooBtn", function() {
                        expectToFind(fooInput, fooBtn, forward);
                    });
                    
                    it("finds barBtn from fooInput", function() {
                        expectToFind(barBtn, fooInput, forward);
                    });
                    
                    it("finds barInput from barBtn", function() {
                        expectToFind(barInput, barBtn, forward);
                    });
                    
                    it("finds fooBtn from barInput (wraps over)", function() {
                        expectToFind(fooBtn, barInput, forward);
                    });
                });
                
                describe("disabled1 state changed", function() {
                    beforeEach(function() {
                        disabled1.enable();
                    });
                    
                    it("finds disabled1 as the first item", function() {
                        expectToFind(disabled1, null, forward);
                    });
                    
                    it("finds fooBtn from disabled1", function() {
                        expectToFind(fooBtn, disabled1, forward);
                    });
                    
                    it("finds fooInput from fooBtn", function() {
                        expectToFind(fooInput, fooBtn, forward);
                    });
                    
                    it("finds barBtn from fooInput", function() {
                        expectToFind(barBtn, fooInput, forward);
                    });
                    
                    it("finds barInput from barBtn", function() {
                        expectToFind(barInput, barBtn, forward);
                    });
                    
                    it("finds disabled1 from barInput (wraps over)", function() {
                        expectToFind(disabled1, barInput, forward);
                    });
                });
                
                describe("disabled2 state changed", function() {
                    beforeEach(function() {
                        disabled2.enable();
                    });
                    
                    it("finds fooBtn as the first item", function() {
                        expectToFind(fooBtn, null, forward);
                    });
                    
                    it("finds fooInput from fooBtn", function() {
                        expectToFind(fooInput, fooBtn, forward);
                    });
                    
                    it("finds disabled2 from fooInput", function() {
                        expectToFind(disabled2, fooInput, forward);
                    });
                    
                    it("finds barBtn from disabled2", function() {
                        expectToFind(barBtn, disabled2, forward);
                    });
                    
                    it("finds barInput from barBtn", function() {
                        expectToFind(barInput, barBtn, forward);
                    });
                    
                    it("finds fooBtn from barInput (wraps over)", function() {
                        expectToFind(fooBtn, barInput, forward);
                    });
                });
            });
        
            describe("backward", function() {
                describe("disabled buttons not changed", function() {
                    it("finds barInput as the first item", function() {
                        expectToFind(barInput, null, backward);
                    });
                    
                    it("finds barBtn from barInput", function() {
                        expectToFind(barBtn, barInput, backward);
                    });
                    
                    it("finds fooInput from barBtn", function() {
                        expectToFind(fooInput, barBtn, backward);
                    });
                    
                    it("finds fooBtn from fooInput", function() {
                        expectToFind(fooBtn, fooInput, backward);
                    });
                    
                    it("finds barInput from fooBtn (wraps over)", function() {
                        expectToFind(barInput, fooBtn, backward);
                    });
                });
                
                describe("disabled1 state changed", function() {
                    beforeEach(function() {
                        disabled1.enable();
                    });
                    
                    it("finds barInput as the first item", function() {
                        expectToFind(barInput, null, backward);
                    });
                    
                    it("finds barBtn from barInput", function() {
                        expectToFind(barBtn, barInput, backward);
                    });
                    
                    it("finds fooInput from barBtn", function() {
                        expectToFind(fooInput, barBtn, backward);
                    });
                    
                    it("finds fooBtn from fooInput", function() {
                        expectToFind(fooBtn, fooInput, backward);
                    });
                    
                    it("finds disabled1 from fooBtn", function() {
                        expectToFind(disabled1, fooBtn, backward);
                    });
                    
                    it("finds barInput from disabled1 (wraps over)", function() {
                        expectToFind(barInput, disabled1, backward);
                    });
                });
                
                describe("disabled2 state changed", function() {
                    beforeEach(function() {
                        disabled2.enable();
                    });
                    
                    it("finds barInput as the first item", function() {
                        expectToFind(barInput, null, backward);
                    });
                    
                    it("finds barBtn from barInput", function() {
                        expectToFind(barBtn, barInput, backward);
                    });
                    
                    it("finds disabled2 from barBtn", function() {
                        expectToFind(disabled2, barBtn, backward);
                    });
                    
                    it("finds fooInput from disabled2", function() {
                        expectToFind(fooInput, disabled2, backward);
                    });
                    
                    it("finds fooBtn from fooInput", function() {
                        expectToFind(fooBtn, fooInput, backward);
                    });
                    
                    it("finds barInput from fooBtn (wraps over)", function() {
                        expectToFind(barInput, fooBtn, backward);
                    });
                });
            });
        });
    });
    
    describe("child state handling", function() {
        var first, second;
        
        afterEach(function() {
            first = second = null;
        });
        
        describe("initially enabled children", function() {
            beforeEach(function() {
                makeContainer({
                    items: [{
                        itemId: 'first',
                        text: 'first'
                    }, {
                        itemId: 'second',
                        text: 'second'
                    }]
                });
                
                first = fc.down('#first');
                second = fc.down('#second');
            });
            
            it("should activate container el", function() {
                expectAria(fc, 'tabIndex', '0');
            });
            
            it("should deactivate container el when all children become disabled", function() {
                first.disable();
                second.disable()
                
                expectNoAria(fc, 'tabIndex');
            });
        });
        
        describe("initially disabled children", function() {
            beforeEach(function() {
                makeContainer({
                    items: [{
                        itemId: 'first',
                        text: 'first',
                        disabled: true
                    }, {
                        itemId: 'second',
                        text: 'second',
                        disabled: true
                    }]
                });
                
                first = fc.down('#first');
                second = fc.down('#second');
            });
            
            it("should not activate container el", function() {
                expectNoAria(fc, 'tabIndex');
            });
            
            it("should activate container el when one child becomes enabled", function() {
                first.enable();
                
                expectAria(fc, 'tabIndex', '0');
            });
        });
        
        describe("child state changes", function() {
            beforeEach(function() {
                makeContainer({
                    items: [{
                        itemId: 'first',
                        text: 'first'
                    }, {
                        itemId: 'second',
                        text: 'second'
                    }]
                });
                
                first = fc.down('#first');
                second = fc.down('#second');
            });
            
            it("should set lastFocusedChild when child is focused", function() {
                focusAndWait(first);
                
                runs(function() {
                    expect(fc.lastFocusedChild).toBe(first);
                });
            });
            
            describe("children become disabled, none focused", function() {
                beforeEach(function() {
                    first.disable();
                    second.disable();
                });
                
                it("should deactivate container el", function() {
                    expectNoAria(fc, 'tabIndex');
                });
                
                it("should not reset first child tabIndex", function() {
                    expectNoAria(first, 'tabIndex');
                });
                
                it("should not reset second child tabIndex", function() {
                    expectNoAria(second, 'tabIndex');
                });
                
                describe("one child becoming enabled", function() {
                    beforeEach(function() {
                        second.enable();
                    });
                    
                    it("should activate container el", function() {
                        expectAria(fc, 'tabIndex', '0');
                    });
                    
                    it("should not reset first child tabIndex", function() {
                        expectNoAria(first, 'tabIndex');
                    });
                    
                    it("should reset second child tabIndex", function() {
                        expectAria(second, 'tabIndex', '-1');
                    });
                });
                
                describe("both children become enabled", function() {
                    beforeEach(function() {
                        first.enable();
                        second.enable();
                    });
                    
                    it("should activate container el", function() {
                        expectAria(fc, 'tabIndex', '0');
                    });
                    
                    it("should reset first child tabIndex", function() {
                        expectAria(first, 'tabIndex', '-1');
                    });
                    
                    it("should reset second child tabIndex", function() {
                        expectAria(second, 'tabIndex', '-1');
                    });
                });
            });
            
            describe("last focusable child becoming disabled", function() {
                beforeEach(function() {
                    runs(function() {
                        first.disable();
                    });
                    
                    focusAndWait(second);
                    
                    runs(function() {
                        second.disable();
                    });
                });
                
                it("should not reset lastFocusedChild when child is disabled", function() {
                    expect(fc.lastFocusedChild).toBe(second);
                });
                
                it("should deactivate container el", function() {
                    expectNoAria(fc, 'tabIndex');
                });
                
                it("should not reset tabIndex on the child", function() {
                    expectNoAria(second, 'tabIndex');
                });
                
                describe("becoming enabled again", function() {
                    beforeEach(function() {
                        second.tabIndex = 42;
                        second.enable();
                    });
                    
                    it("should not activate container el", function() {
                        expectNoAria(fc, 'tabIndex');
                    });
                    
                    it("should not interfere with child tabIndex", function() {
                        expectAria(second, 'tabIndex', '42');
                    });
                });
                
                describe("all children become enabled", function() {
                    beforeEach(function() {
                        first.tabIndex = 101;
                        second.tabIndex = 102;
                        second.enable();
                        first.enable();
                    });
                    
                    it("should not activate container el", function() {
                        expectNoAria(fc, 'tabIndex');
                    });
                    
                    it("should reset first child tabIndex", function() {
                        expectAria(first, 'tabIndex', '-1');
                    });
                    
                    it("should not interfere with second child tabIndex", function() {
                        expectAria(second, 'tabIndex', '102');
                    });
                });
            });
        });
    });
    
    describe("focus handling", function() {
        var beforeBtn, fooBtn, barBtn;
        
        beforeEach(function() {
            // Before button is outside of the container
            beforeBtn = makeButton({ text: 'beforeBtn' });
        });
            
        afterEach(function() {
            if (beforeBtn) {
                beforeBtn.destroy();
            }
            
            beforeBtn = null;
        });
            
        describe("have focusables", function() {
            beforeEach(function() {
                makeContainer({
                    items: [
                        { xtype: 'button', text: 'fooBtn' },
                        { xtype: 'button', text: 'barBtn' }
                    ]
                });
                
                fooBtn = fc.down('button[text=fooBtn]');
                barBtn = fc.down('button[text=barBtn]');
            });
            
            describe("focusing container el", function() {
                beforeEach(function() {
                    focusAndWait(fcEl, fooBtn);
                });
                
                describe("in FocusableContainer", function() {
                    it("should focus first child", function() {
                        expectFocused(fooBtn);
                    });
                    
                    it("should make first child tabbable", function() {
                        expectAria(fooBtn, 'tabIndex', '0');
                    });
                    
                    it("should make itself untabbable", function() {
                        expectNoAria(fc, 'tabIndex');
                    });
                });
            
                describe("out of FocusableContainer", function() {
                    beforeEach(function() {
                        focusAndWait(beforeBtn);
                    });
                    
                    it("should keep first child tabbable", function() {
                        expectAria(fooBtn, 'tabIndex', '0');
                    });
                    
                    it("should not make itself tabbable", function() {
                        expectNoAria(fc, 'tabIndex');
                    });
                });
            });
            
            describe("focusing children", function() {
                beforeEach(function() {
                    focusAndWait(fooBtn);
                });
                
                describe("into FocusableContainer", function() {
                    it("should not prevent the child from getting focus", function() {
                        expectFocused(fooBtn);
                    });
                    
                    it("should make the child tabbable", function() {
                        expectAria(fooBtn, 'tabIndex', '0');
                    });
                    
                    it("should make its el untabbable", function() {
                        expectNoAria(fc, 'tabIndex');
                    });
                });
                
                describe("out of FocusableContainer", function() {
                    beforeEach(function() {
                        focusAndWait(beforeBtn);
                    });
                    
                    it("should not prevent focus from leaving", function() {
                        expectFocused(beforeBtn);
                    });
                    
                    it("should keep the child tabbable", function() {
                        expectAria(fooBtn, 'tabIndex', '0');
                    });
                    
                    it("should keep its el untabbable", function() {
                        expectNoAria(fc, 'tabIndex');
                    });
                });
            });
            
            describe("disabling currently focused child", function() {
                beforeEach(function() {
                    focusAndWait(fooBtn);
                });
                
                describe("when there are other focusable children remaining", function() {
                    beforeEach(function() {
                        fooBtn.disable();
                    });
                    
                    it("should focus next child", function() {
                        expectFocused(barBtn);
                    });
                    
                    it("should not make container el focusable", function() {
                        expectNoAria(fcEl, 'tabIndex');
                    });
                    
                    it("should update lastFocusedChild", function() {
                        expect(fc.lastFocusedChild).toBe(barBtn);
                    });
                });
                
                describe("when there are no focusable children remaining", function() {
                    beforeEach(function() {
                        barBtn.disable();
                        
                        fooBtn.findFocusTarget = function() {
                            return beforeBtn;
                        };
                        
                        fooBtn.disable();
                    });
                    
                    it("should focus findFocusTarget result", function() {
                        expectFocused(beforeBtn);
                    });
                    
                    it("should deactivate container el", function() {
                        expectNoAria(fc, 'tabIndex');
                    });
                    
                    it("should not update lastFocusedChild", function() {
                        expect(fc.lastFocusedChild).toBe(fooBtn);
                    });
                });
            });
        });
    });
    
    describe("mouse event handling", function() {
        var beforeBtn, text, fooBtn, input;
        
        beforeEach(function() {
            beforeBtn = makeButton({ text: 'beforeBtn' });
            
            makeContainer({
                style: {
                    'margin-left': '100px'
                },
                items: [
                    { xtype: 'tbtext', text: '****' },
                    { xtype: 'button', text: 'fooBtn' },
                    { xtype: 'textfield', fieldLabel: 'fooInput' }
                ]
            });
            
            text   = fc.down('tbtext');
            fooBtn = fc.down('button');
            input  = fc.down('textfield');
        });
        
        afterEach(function() {
            beforeBtn.destroy();
            
            beforeBtn = null;
        });
        
        it("should ignore left click on container body el", function() {
            focusAndWait(beforeBtn);
            
            runs(function() {
                jasmine.fireMouseEvent(fc.el, 'click');
            });
            
            expectFocused(beforeBtn);
        });
        
        it("should ignore right click on container body el", function() {
            focusAndWait(beforeBtn);
            
            runs(function() {
                jasmine.fireMouseEvent(fc.el, 'click', null, null, 1);
            });
            
            expectFocused(beforeBtn);
        });
        
        it("should not react to clicks in non-focusable children", function() {
            focusAndWait(beforeBtn);
            
            runs(function() {
                jasmine.fireMouseEvent(text.el, 'click');
            });
            
            expectFocused(beforeBtn);
        });
        
        describe("clicks on focusable child", function() {
            var spy;
            
            // We're listening to mousedown instead of click here because Ext 5/Touch
            // event system is doing crazy translation of touch/mouse/pointer events
            // that is browser specific. Click is translated from 'tap' in IE10+
            // but for some reason firing 'tap' event doesn't seem to be reaching
            // the proper event plumbing in the Button, so Button's click event never fires.
            // Mousedown on the element works, and that's good enough for this case.
            beforeEach(function() {
                spy = jasmine.createSpy('click');
                
                fooBtn.on('click', spy);
                
                // Right clicks are blocked by Button's code
                fooBtn.el.on('mousedown', spy);
            });
            
            it("should not block left click", function() {
                runs(function() {
                    jasmine.fireMouseEvent(fooBtn.el, 'click');
                });
                
                waitsForSpy(spy, 'left click', 100);
                
                runs(function() {
                    expect(spy).toHaveBeenCalled();
                });
            });
            
            it("should not block right click", function() {
                runs(function() {
                    jasmine.fireMouseEvent(fooBtn.el, 'click', null, null, 1);
                });
                
                waitsForSpy(spy, 'right click', 100);
                
                runs(function() {
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });
    
    describe("keyboard event handling", function() {
        var forward = true,
            backward = false,
            beforeBtn, afterBtn, fooBtn, barBtn, fooInput, barInput, slider,
            disabledBtn1, disabledBtn2;
        
        function tabAndExpect(from, direction, to, debug) {
            pressTab(from, direction);
            
            expectFocused(to);
        }
        
        function arrowAndExpect(from, arrow, to) {
            pressArrow(from, arrow);
            
            expectFocused(to);
        }
        
        // Unfortunately we cannot test that the actual problem is solved,
        // which is scrolling the parent container caused by default action
        // on arrow keys. This is because synthetic injected events do not cause
        // default action. The best we can do is to check that event handlers
        // are calling preventDefault() on the events.
        // See https://sencha.jira.com/browse/EXTJS-18186
        describe("preventing parent scroll", function() {
            var upSpy, downSpy, rightSpy, leftSpy;
            
            beforeEach(function() {
                makeContainer({
                    renderTo: undefined,
                    items: [{
                        xtype: 'button',
                        text: 'fooBtn'
                    }, {
                        xtype: 'button',
                        text: 'barBtn'
                    }]
                });
                
                fooBtn = fc.down('button[text=fooBtn]');
                barBtn = fc.down('button[text=barBtn]');
                
                upSpy = spyOn(fc, 'onFocusableContainerUpKey').andCallThrough();
                downSpy = spyOn(fc, 'onFocusableContainerDownKey').andCallThrough();
                rightSpy = spyOn(fc, 'onFocusableContainerRightKey').andCallThrough();
                leftSpy = spyOn(fc, 'onFocusableContainerLeftKey').andCallThrough();
                
                fc.render(Ext.getBody());
            });
            
            afterEach(function() {
                fooBtn = barBtn = null;
                upSpy = downSpy = rightSpy = leftSpy = null;
            });
            
            it("should preventDefault on the Up arrow key", function() {
                pressArrow(barBtn, 'up');
                
                waitForFocus(fooBtn);
                
                runs(function() {
                    expect(upSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
            
            it("should preventDefault on the Down arrow key", function() {
                pressArrow(fooBtn, 'down');
                
                waitForFocus(barBtn);
                
                runs(function() {
                    expect(downSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
            
            it("should preventDefault on the Right arrow key", function() {
                pressArrow(fooBtn, 'right');
                
                waitForFocus(barBtn);
                
                runs(function() {
                    expect(rightSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
            
            it("should preventDefault on the Left arrow key", function() {
                pressArrow(barBtn, 'left');
                
                waitForFocus(fooBtn);
                
                runs(function() {
                    expect(leftSpy.mostRecentCall.args[0].defaultPrevented).toBe(true);
                });
            });
        });
        
        describe("enableFocusableContainer === true", function() {
            beforeEach(function() {
                runs(function() {
                    beforeBtn = makeButton({ text: 'beforeBtn' });
                    
                    makeContainer({
                        items: [
                            { xtype: 'tbtext', text: '**' },
                            { xtype: 'button', text: 'disabledBtn1', disabled: true },
                            { xtype: 'button', text: 'fooBtn' },
                            { xtype: 'tbseparator' },
                            { xtype: 'textfield', id: 'fooInput-' + ++autoId },
                            { xtype: 'tbseparator' },
                            {
                                xtype: 'slider',
                                id: 'slider-' + ++autoId,
                                value: 50,
                                width: 100,
                                animate: false
                            },
                            { xtype: 'tbseparator' },
                            { xtype: 'tbfill' },
                            { xtype: 'tbseparator' },
                            { xtype: 'button', text: 'barBtn' },
                            { xtype: 'button', text: 'disabledBtn2', disabled: true },
                            { xtype: 'combobox', id: 'barInput-' + ++autoId },
                            { xtype: 'tbtext', text: '***' }
                        ]
                    });
                    
                    fooBtn = fc.down('button[text=fooBtn]');
                    barBtn = fc.down('button[text=barBtn]');
                    
                    fooInput = fc.down('textfield');
                    barInput = fc.down('combobox');
                    slider   = fc.down('slider');
                    
                    disabledBtn1 = fc.down('button[text=disabledBtn1]');
                    disabledBtn2 = fc.down('button[text=disabledBtn2]');
                    
                    afterBtn = makeButton({ text: 'afterBtn' });
                });
            
                jasmine.waitAWhile();
            });
            
            afterEach(function() {
                beforeBtn.destroy();
                afterBtn.destroy();
            });
            
            describe("tabbing", function() {
                describe("clean state in/out", function() {
                    it("should tab from beforeBtn to fooBtn", function() {
                        tabAndExpect(beforeBtn, forward, fooBtn);
                    });
                    
                    it("should shift-tab from fooBtn fo beforeBtn", function() {
                        tabAndExpect(fooBtn, backward, beforeBtn);
                    });
                    
                    it("should tab from fooBtn to afterBtn", function() {
                        tabAndExpect(fooBtn, forward, afterBtn);
                    });
                    
                    it("should shift-tab from afterBtn to fooBtn", function() {
                        tabAndExpect(afterBtn, backward, fooBtn);
                    });
                });
                
                describe("needArrowKeys children", function() {
                    it("should tab from fooInput to slider", function() {
                        tabAndExpect(fooInput, forward, slider);
                    });
                    
                    it("should tab from slider to barBtn", function() {
                        tabAndExpect(slider, forward, barBtn);
                    });
                    
                    it("should tab from barInput to afterBtn", function() {
                        tabAndExpect(barInput, forward, afterBtn);
                    });
                    
                    it("should shift-tab from barInput to barBtn", function() {
                        tabAndExpect(barInput, backward, barBtn);
                    });
                    
                    it("should shift-tab from slider to fooInput", function() {
                        tabAndExpect(slider, backward, fooInput);
                    });
                    
                    it("should shift-tab from fooInput to fooBtn", function() {
                        tabAndExpect(fooInput, backward, fooBtn);
                    });
                });
                
                describe("last focused child", function() {
                    it("should shift-tab back into barInput from afterBtn", function() {
                        tabAndExpect(barInput, forward, afterBtn);
                        tabAndExpect(afterBtn, backward, barInput);
                    });
                    
                    it("should shift-tab back to barBtn from afterBtn", function() {
                        tabAndExpect(barBtn, forward, afterBtn);
                        tabAndExpect(afterBtn, backward, barBtn);
                    });
                    
                    describe("disabled state changes", function() {
                        it("should choose fooBtn when shift-tabbing from afterBtn", function() {
                            tabAndExpect(barBtn, forward, afterBtn);
                            
                            runs(function() {
                                barBtn.disable();
                            });
                            
                            tabAndExpect(afterBtn, backward, fooBtn);
                        });
                        
                        it("should choose disabledBtn1 when tabbing from beforeBtn", function() {
                            tabAndExpect(barBtn, backward, beforeBtn);
                            
                            runs(function() {
                                barBtn.disable();
                                disabledBtn1.enable();
                            });
                            
                            tabAndExpect(beforeBtn, forward, disabledBtn1);
                        });
                    });
                });
            });
            
            describe("arrow keys", function() {
                describe("simple children (buttons, etc)", function() {
                    it("should go right from fooBtn to fooInput", function() {
                        arrowAndExpect(fooBtn, 'right', fooInput);
                    });
                    
                    it("should go down from fooBtn to fooInput", function() {
                        arrowAndExpect(fooBtn, 'down', fooInput);
                    });
                    
                    it("should wrap over left from fooBtn to barInput", function() {
                        arrowAndExpect(fooBtn, 'left', barInput);
                    });
                    
                    it("should wrap over up from fooBtn to barInput", function() {
                        arrowAndExpect(fooBtn, 'up', barInput);
                    });
                    
                    it("should go left from barBtn to slider", function() {
                        arrowAndExpect(barBtn, 'left', slider);
                    });
                    
                    it("should go up from barBtn to slider", function() {
                        arrowAndExpect(barBtn, 'up', slider);
                    });
                });
                
                describe("needArrowKeys children", function() {
                    describe("slider", function() {
                        function makeSpec(key) {
                            it("should not block " + key + " arrow key", function() {
                                var changed = false;
                                
                                runs(function() {
                                    slider.on('change', function() { changed = true });
                                });
                                
                                pressArrow(slider, key);
                                
                                runs(function() {
                                    expect(changed).toBeTruthy();
                                });
                            });
                        }
                        
                        makeSpec('left');
                        makeSpec('right');
                        makeSpec('up');
                        makeSpec('down');
                    });
                    
                    describe("combo box", function() {
                        beforeEach(function() {
                            Ext.apply(barInput, {
                                queryMode: 'local',
                                displayField: 'name'
                            });
                            
                            var store = new Ext.data.Store({
                                fields: ['name'],
                                data: [{ name: 'foo' }]
                            });
                            
                            barInput.setStore(store);
                        });
                        
                        it("should not block down arrow key", function() {
                            pressArrow(barInput, 'down');
                            
                            runs(function() {
                                expect(barInput.isExpanded).toBeTruthy();
                            });
                        });
                    });
                });
            });
        });
        
        describe("enableFocusableContainer === false", function() {
            beforeEach(function() {
                runs(function() {
                    beforeBtn = makeButton({ text: 'beforeBtn' });
                    
                    makeContainer({
                        renderTo: undefined,
                        items: [
                            { xtype: 'tbtext', text: '**' },
                            { xtype: 'button', text: 'disabledBtn1', disabled: true },
                            { xtype: 'button', text: 'fooBtn' },
                            { xtype: 'tbseparator' },
                            { xtype: 'textfield', id: 'fooInput-' + ++autoId },
                            { xtype: 'tbseparator' },
                            {
                                xtype: 'slider',
                                id: 'slider-' + ++autoId,
                                value: 50,
                                width: 100,
                                animate: false
                            },
                            { xtype: 'tbseparator' },
                            { xtype: 'tbfill' },
                            { xtype: 'tbseparator' },
                            { xtype: 'button', text: 'barBtn' },
                            { xtype: 'button', text: 'disabledBtn2', disabled: true },
                            { xtype: 'combobox', id: 'barInput-' + ++autoId },
                            { xtype: 'tbtext', text: '***' }
                        ]
                    });
                    
                    fooBtn = fc.down('button[text=fooBtn]');
                    barBtn = fc.down('button[text=barBtn]');
                    
                    fooInput = fc.down('textfield');
                    barInput = fc.down('combobox');
                    slider   = fc.down('slider');
                    
                    disabledBtn1 = fc.down('button[text=disabledBtn1]');
                    disabledBtn2 = fc.down('button[text=disabledBtn2]');
                    
                    fc.enableFocusableContainer = false;
                    fc.render(Ext.getBody());
                    
                    afterBtn = makeButton({ text: 'afterBtn' });
                });
                
                jasmine.waitAWhile();
            });
            
            afterEach(function() {
                beforeBtn.destroy();
                afterBtn.destroy();
            });
            
            describe("tabbing", function() {
                it("should tab from beforeBtn to fooBtn", function() {
                    tabAndExpect(beforeBtn, forward, fooBtn);
                });
                
                it("should shift-tab from fooBtn to beforeBtn", function() {
                    tabAndExpect(fooBtn, backward, beforeBtn);
                });
                
                it("should tab from fooBtn to fooInput", function() {
                    tabAndExpect(fooBtn, forward, fooInput);
                });
                
                it("should shift-tab from fooInput to fooBtn", function() {
                    tabAndExpect(fooInput, backward, fooBtn);
                });
                
                it("should tab from fooInput to slider", function() {
                    tabAndExpect(fooInput, forward, slider);
                });
                
                it("should shift-tab from slider to fooInput", function() {
                    tabAndExpect(slider, backward, fooInput);
                });
                
                it("should tab from slider to barBtn", function() {
                    tabAndExpect(slider, forward, barBtn);
                });
                
                it("should shift-tab from barBtn to slider", function() {
                    tabAndExpect(barBtn, backward, slider);
                });
                
                it("should tab from barBtn to barInput", function() {
                    tabAndExpect(barBtn, forward, barInput);
                });
                
                it("should shift-tab from barInput to barBtn", function() {
                    tabAndExpect(barInput, backward, barBtn);
                });
                
                it("should tab from barInput to afterBtn", function() {
                    tabAndExpect(barInput, forward, afterBtn);
                });
                
                it("should shift-tab from afterBtn to barInput", function() {
                    tabAndExpect(afterBtn, backward, barInput);
                });
                
                describe("disabled state changes", function() {
                    beforeEach(function() {
                        disabledBtn1.enable();
                        disabledBtn2.enable();
                    });
                    
                    it("should tab from beforeBtn to disabledBtn1", function() {
                        tabAndExpect(beforeBtn, forward, disabledBtn1);
                    });
                    
                    it("should shift-tab from disabledBtn1 to beforeBtn", function() {
                        tabAndExpect(disabledBtn1, backward, beforeBtn);
                    });
                    
                    it("should tab from disabledBtn1 to fooBtn", function() {
                        tabAndExpect(disabledBtn1, forward, fooBtn);
                    });
                    
                    it("should shift-tab from fooBtn to disabledBtn1", function() {
                        tabAndExpect(fooBtn, backward, disabledBtn1);
                    });
                    
                    it("should tab from barBtn to disabledBtn2", function() {
                        tabAndExpect(barBtn, forward, disabledBtn2);
                    });
                    
                    it("should shift-tab from disabledBtn2 to barBtn", function() {
                        tabAndExpect(disabledBtn2, backward, barBtn);
                    });
                    
                    it("should tab from disabledBtn2 to barInput", function() {
                        tabAndExpect(disabledBtn2, forward, barInput);
                    });
                    
                    it("should shift-tab from barInput to disabledBtn2", function() {
                        tabAndExpect(barInput, backward, disabledBtn2);
                    });
                });
            });
            
            // Arrow keys should not navigate when FocusableContainer is disabled;
            // we have to make sure of that!
            describe("arrow keys", function() {
                describe("fooBtn", function() {
                    it("should stay focused on left arrow", function() {
                        arrowAndExpect(fooBtn, 'left', fooBtn);
                    });
                    
                    it("should stay focused on right arrow", function() {
                        arrowAndExpect(fooBtn, 'right', fooBtn);
                    });
                    
                    it("should stay focused on up arrow", function() {
                        arrowAndExpect(fooBtn, 'up', fooBtn);
                    });
                    
                    it("should stay focused on down arrow", function() {
                        arrowAndExpect(fooBtn, 'down', fooBtn);
                    });
                });
                
                describe("slider", function() {
                    function makeSpec(key) {
                        it("should not block " + key + " arrow key", function() {
                            var changed = false;
                            
                            runs(function() {
                                slider.on('change', function() { changed = true });
                            });
                            
                            pressArrow(slider, key);
                            
                            runs(function() {
                                expect(changed).toBeTruthy();
                            });
                        });
                    }
                    
                    makeSpec('left');
                    makeSpec('right');
                    makeSpec('up');
                    makeSpec('down');
                });
                
                describe("combo box", function() {
                    beforeEach(function() {
                        Ext.apply(barInput, {
                            queryMode: 'local',
                            displayField: 'name'
                        });
                        
                        var store = new Ext.data.Store({
                            fields: ['name'],
                            data: [{ name: 'foo' }]
                        });
                        
                        barInput.setStore(store);
                    });
                    
                    it("should not block down arrow key", function() {
                        pressArrow(barInput, 'down');
                        
                        runs(function() {
                            expect(barInput.isExpanded).toBeTruthy();
                        });
                    });
                });
            });
        });
    });
});
