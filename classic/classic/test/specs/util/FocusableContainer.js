describe("Ext.util.FocusableContainer", function() {
    var autoId = 0,
        focusAndWait = jasmine.focusAndWait,
        pressTab = jasmine.pressTabKey,
        pressArrow = jasmine.pressArrowKey,
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
    
    function expectTabIndex(wantIndex, el) {
        jasmine.expectTabIndex(wantIndex, el || fcEl);
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
                    expectTabIndex(42);
                });
                
                it("should create keyNav", function() {
                    expect(fc.focusableKeyNav).toBeDefined();
                });
                
                it("should set tabindex on the first child", function() {
                    expectAria(first, 'tabIndex', '-1');
                });
                
                it("should set tabindex on the second child", function() {
                    expectAria(second, 'tabIndex', '-1');
                });
                
                it("should not set tabindex on the third child", function() {
                    expectAria(third, 'tabIndex', '-1');
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
            
            expect(fc.el.getAttribute('tabIndex')).toBe('0');
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
                        var child = fc.findNextFocusableChild(null, true);
                        
                        expect(child).toBe(fooBtn);
                    });
                    
                    it("finds bar going backward", function() {
                        var child = fc.findNextFocusableChild(null, false);
                        
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
            var fooBtn, barBtn, fooInput, barInput;
        
            function expectToFind(whatNext, whereFrom, goingForward) {
                var child = fc.findNextFocusableChild(whereFrom, goingForward);
            
                expect(child).toBe(whatNext);
            }
        
            beforeEach(function() {
                makeContainer({
                    items: [
                        { xtype: 'tbtext', text: 'text1' },
                        { xtype: 'button', text: 'fooBtn' },
                        { xtype: 'tbseparator' },
                        { xtype: 'textfield', fieldLabel: 'foo field' },
                        { xtype: 'button', text: 'barBtn' },
                        { xtype: 'tbfill' },
                        { xtype: 'combobox', fieldLabel: 'bar combo' }
                    ]
                });
            
                fooBtn = fc.down('button[text=fooBtn]');
                barBtn = fc.down('button[text=barBtn]');
            
                fooInput = fc.down('textfield');
                barInput = fc.down('combobox');
            });
        
            describe("forward", function() {
                it("finds fooInput from fooBtn", function() {
                    expectToFind(fooInput, fooBtn, true);
                });
            
                it("finds barBtn from fooInput", function() {
                    expectToFind(barBtn, fooInput, true);
                });
            
                it("finds barInput from barBtn", function() {
                    expectToFind(barInput, barBtn, true);
                });
            
                it("finds fooBtn from barInput (wraps over)", function() {
                    expectToFind(fooBtn, barInput, true);
                });
            });
        
            describe("backward", function() {
                it("finds barBtn from barInput", function() {
                    expectToFind(barBtn, barInput, false);
                });
            
                it("finds fooInput from barBtn", function() {
                    expectToFind(fooInput, barBtn, false);
                });
            
                it("finds fooBtn from fooInput", function() {
                    expectToFind(fooBtn, fooInput, false);
                });
            
                it("finds barInput from fooBtn (wraps over)", function() {
                    expectToFind(barInput, fooBtn, false);
                });
            });
        });
    });
    
    describe("focus handling", function() {
        var fooBtn, barBtn;
        
        beforeEach(function() {
            // Bar button is outside of the container
            barBtn = makeButton({ text: 'barBtn' });
        });
            
        afterEach(function() {
            if (barBtn) {
                barBtn.destroy();
            }
            
            barBtn = null;
        });
            
        describe("no children", function() {
            beforeEach(function() {
                makeContainer();
                
                focusAndWait(fcEl);
            });
            
            describe("focusing in", function() {
                it("should keep focus on the container el", function() {
                    expectFocused(fc, true);
                });
            });
            
            describe("focusing out", function() {
                beforeEach(function() {
                    focusAndWait(barBtn);
                });
                
                it("should keep its el tabbable", function() {
                    expectTabIndex(0);
                });
            });
        });
        
        describe("no focusable children", function() {
            beforeEach(function() {
                makeContainer({
                    items: [{ xtype: 'button', text: 'fooBtn', disabled: true }]
                });
                
                focusAndWait(fcEl);
            });
            
            describe("focusing in", function() {
                it("should keep focus on the container el", function() {
                    expectFocused(fc, true);
                });
            });
            
            describe("focusing out", function() {
                beforeEach(function() {
                    focusAndWait(barBtn);
                });
                
                it("should keep its el tabbable", function() {
                    expectTabIndex(0);
                });
            });
        });
        
        describe("have focusables", function() {
            beforeEach(function() {
                makeContainer({
                    items: [{ xtype: 'button', text: 'fooBtn' }]
                });
                
                fooBtn = fc.down('button');
            });
            
            describe("placing focus", function() {
                beforeEach(function() {
                    focusAndWait(fcEl, fooBtn);
                });
                
                describe("in FocusableContainer", function() {
                    it("should focus first child", function() {
                        expectFocused(fooBtn);
                    });
        
                    it("should make itself untabbable", function() {
                        expectTabIndex(-1);
                    });
                });
            
                describe("out of FocusableContainer", function() {
                    beforeEach(function() {
                        focusAndWait(barBtn);
                    });
                
                    it("should not make itself tabbable", function() {
                        expectTabIndex(-1);
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
                        expectTabIndex(0, fooBtn);
                    });
                
                    it("should make its el untabbable", function() {
                        expectTabIndex(-1);
                    });
                });
                
                describe("out of FocusableContainer", function() {
                    beforeEach(function() {
                        focusAndWait(barBtn);
                    });
                    
                    it("should not prevent focus from leaving", function() {
                        expectFocused(barBtn);
                    });
                    
                    it("should keep the child tabbable", function() {
                        expectTabIndex(0, fooBtn);
                    });
                    
                    it("should keep its el untabbable", function() {
                        expectTabIndex(-1);
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
    
    // Some tests in this suite are failing in IE8; most probably because of
    // asynchronous focusing implications, as well as general browser slowness.
    (Ext.isIE8 ? xdescribe : describe)("keyboard event handling", function() {
        var forward = true,
            backward = false,
            beforeBtn, afterBtn, fooBtn, barBtn, fooInput, barInput, slider,
            disabledBtn1, disabledBtn2;
        
        function tabAndExpect(from, direction, to) {
            pressTab(from, direction);
            
            expectFocused(to);
        }
        
        function arrowAndExpect(from, arrow, to) {
            pressArrow(from, arrow);
            
            expectFocused(to);
        }
        
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
