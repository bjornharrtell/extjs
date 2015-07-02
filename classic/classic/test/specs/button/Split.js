describe("Ext.button.Split", function() {
    var focusAndWait = jasmine.focusAndWait,
        button;
    
    function makeButton(config) {
        config = Ext.apply({
            renderTo: Ext.getBody(),
            text: 'foo'
        }, config);
        
        return button = new Ext.button.Split(config);
    }
    
    function expectMainAria(attr, value) {
        return jasmine.expectAriaAttr(button, attr, value);
    }
    
    function expectNoMainAria(attr) {
        return jasmine.expectNoAriaAttr(button, attr);
    }
    
    function expectArrowAria(attr, value) {
        return jasmine.expectAriaAttr(button.arrowEl, attr, value);
    }
    
    function expectNoArrowAria(attr) {
        return jasmine.expectNoAriaAttr(button.arrowEl, attr);
    }
    
    afterEach(function() {
        if (button) {
            button.destroy();
        }
        
        button = null;
    });
    
    describe("arrowEl", function() {
        beforeEach(function() {
            makeButton();
        });
        
        it("should render arrowEl", function() {
            expect(button.arrowEl.dom.nodeName).toBe('SPAN');
        });
    });
    
    describe("ARIA attributes", function() {
        describe("tabindex", function() {
            describe("default", function() {
                beforeEach(function() {
                    makeButton();
                });
                
                it('should have tabindex="0" on the main el', function() {
                    expectMainAria('tabIndex', '0');
                });
                
                it('should have tabindex="0" on the arrowEl', function() {
                    expectArrowAria('tabIndex', '0');
                });
            });
            
            describe("configured", function() {
                beforeEach(function() {
                    makeButton({ tabIndex: -10 });
                });
                
                it('should have tabindex="-10" on the main el', function() {
                    expectMainAria('tabIndex', '-10');
                });
                
                it('should have tabindex="-10" on the arrowEl', function() {
                    expectArrowAria('tabIndex', '-10');
                });
            });
            
            describe("when disabled", function() {
                beforeEach(function() {
                    makeButton({ disabled: true });
                });
                
                // TODO Enable this and in enabling/disabling below when 
                // https://github.com/extjs/SDK/pull/15682 is merged
                xit('should have no tabindex on the main el', function() {
                    expectNoMainAria('tabIndex');
                });
                
                it("should have no tabindex on the arrowEl", function() {
                    expectNoArrowAria('tabIndex');
                });
            });
            
            describe("setTabIndex", function() {
                beforeEach(function() {
                    makeButton();
                    button.setTabIndex(42);
                });
                
                it('should have tabindex="42" on the main el', function() {
                    expectMainAria('tabIndex', '42');
                });
                
                it('should have tabindex="42" on the arrowEl', function() {
                    expectArrowAria('tabIndex', '42');
                });
            });
            
            describe("disabling", function() {
                beforeEach(function() {
                    makeButton({ tabIndex: 99 });
                    button.disable();
                });
                
                xit("should have tabindex removed from the main el", function() {
                    expectNoMainAria('tabIndex');
                });
                
                it("should have tabindex removed from the arrowEl", function() {
                    expectNoArrowAria('tabIndex');
                });
                
                describe("enabling", function() {
                    beforeEach(function() {
                        button.enable();
                    });
                    
                    it('should have tabindex="99" on the main el', function() {
                        expectMainAria('tabIndex', '99');
                    });
                    
                    it('should have tabindex="99" on the arrowEl', function() {
                        expectArrowAria('tabIndex', '99');
                    });
                });
            });
        });
        
        describe("role", function() {
            beforeEach(function() {
                makeButton();
            });
            
            it("should have button role on the main el", function() {
                expectMainAria('role', 'button');
            });
            
            it("should have button role on the arrowEl", function() {
                expectArrowAria('role', 'button');
            });
        });
        
        describe("aria-hidden", function() {
            describe("default", function() {
                beforeEach(function() {
                    makeButton();
                });
                
                it("should be set to false on the main el", function() {
                    expectMainAria('aria-hidden', 'false');
                });
                
                it("should be set to false on the arrowEl", function() {
                    expectArrowAria('aria-hidden', 'false');
                });
                
                describe("hiding", function() {
                    beforeEach(function() {
                        button.hide();
                    });
                    
                    it("should be set to true on the main el", function() {
                        expectMainAria('aria-hidden', 'true');
                    });
                    
                    it("should be set to true on the arrowEl", function() {
                        expectArrowAria('aria-hidden', 'true');
                    });
                    
                    describe("showing", function() {
                        beforeEach(function() {
                            button.show();
                        });
                        
                        it("should be set to false on the main el", function() {
                            expectMainAria('aria-hidden', 'false');
                        });
                        
                        it("should be set to false on the arrowEl", function() {
                            expectArrowAria('aria-hidden', 'false');
                        });
                    });
                });
            });
            
            describe("configured hidden", function() {
                beforeEach(function() {
                    makeButton({ hidden: true });
                });
                
                it("should be set to true on the main el", function() {
                    expectMainAria('aria-hidden', 'true');
                });
                
                it("should be set to true on the arrowEl", function() {
                    expectArrowAria('aria-hidden', 'true');
                });
            });
        });
        
        describe("aria-disabled", function() {
            describe("default", function() {
                beforeEach(function() {
                    makeButton();
                });
                
                it("should be set to false on the main el", function() {
                    expectMainAria('aria-disabled', 'false');
                });
                
                it("should be set to false on the arrowEl", function() {
                    expectArrowAria('aria-disabled', 'false');
                });
                
                describe("disabling", function() {
                    beforeEach(function() {
                        button.disable();
                    });
                    
                    it("should be set to true on the main el", function() {
                        expectMainAria('aria-disabled', 'true');
                    });
                    
                    it("should be set to true on the arrowEl", function() {
                        expectArrowAria('aria-disabled', 'true');
                    });
                    
                    describe("enabling", function() {
                        beforeEach(function() {
                            button.enable();
                        });
                        
                        it("should be set to false on the main el", function() {
                            expectMainAria('aria-disabled', 'false');
                        });
                        
                        it("should be set to false on the arrowEl", function() {
                            expectArrowAria('aria-disabled', 'false');
                        });
                    });
                });
            });
            
            describe("configured disabled", function() {
                beforeEach(function() {
                    makeButton({ disabled: true });
                });
                
                it("should be set to true on the main el", function() {
                    expectMainAria('aria-disabled', 'true');
                });
                
                it("should be set to true on the arrowEl", function() {
                    expectArrowAria('aria-disabled', 'true');
                });
            });
        });
        
        describe("labelling", function() {
            describe("with arrowTooltip", function() {
                beforeEach(function() {
                    makeButton({ arrowTooltip: 'fee fie foe foo' });
                });
                
                it("should have aria-label", function() {
                    expectArrowAria('aria-label', 'fee fie foe foo');
                });
                
                it("should not have aria-labelledby", function() {
                    expectNoArrowAria('aria-labelledby');
                });
            });
            
            describe("no arrowTooltip", function() {
                beforeEach(function() {
                    makeButton();
                });
                
                it("should have aria-labelledby", function() {
                    expectArrowAria('aria-labelledby', button.el.id);
                });
                
                it("should not have aria-label", function() {
                    expectNoArrowAria('aria-label');
                });
            });
        });
    });
    
    describe("focus styling", function() {
        var before;
        
        beforeEach(function() {
            before = new Ext.button.Button({
                renderTo: Ext.getBody(),
                text: 'before'
            });
            
            makeButton();
        });
        
        afterEach(function() {
            before.destroy();
            before = null;
        });
        
        describe("focusing main el", function() {
            beforeEach(function() {
                focusAndWait(button);
            });
            
            it("should add focusCls", function() {
                expect(button.el.hasCls('x-btn-focus')).toBe(true);
            });
            
            it("should not add x-arrow-focus", function() {
                expect(button.el.hasCls('x-arrow-focus')).toBe(false);
            });
            
            describe("blurring main el", function() {
                beforeEach(function() {
                    focusAndWait(before);
                });
                
                it("should remove x-btn-focus", function() {
                    expect(button.el.hasCls('x-btn-focus')).toBe(false);
                });
                
                it("should not have x-arrow-focus", function() {
                    expect(button.el.hasCls('x-arrow-focus')).toBe(false);
                });
            });
        });
        
        describe("focusing arrowEl", function() {
            beforeEach(function() {
                focusAndWait(button.arrowEl);
            });
            
            it("should add x-arrow-focus", function() {
                expect(button.el.hasCls('x-arrow-focus')).toBe(true);
            });
            
            it("should not add x-btn-focus", function() {
                expect(button.el.hasCls('x-btn-focus')).toBe(false);
            });
            
            describe("blurring arrowEl", function() {
                beforeEach(function() {
                    focusAndWait(before);
                });
                
                it("should remove x-arrow-focus", function() {
                    expect(button.el.hasCls('x-arrow-focus')).toBe(false);
                });
                
                it("should not have x-btn-focus", function() {
                    expect(button.el.hasCls('x-btn-focus')).toBe(false);
                });
            });
        });
    });
    
    describe("events", function() {
        var before, focusSpy, blurSpy, elFocusSpy, arrowElFocusSpy, beforeFocusSpy;
        
        beforeEach(function() {
            beforeFocusSpy = jasmine.createSpy('beforeFocusSpy');
            
            before = new Ext.button.Button({
                renderTo: Ext.getBody(),
                text: 'before',
                listeners: {
                    focus: beforeFocusSpy
                }
            });
            
            // Component events
            focusSpy = jasmine.createSpy('focus');
            blurSpy  = jasmine.createSpy('blur');
            
            makeButton({
                listeners: {
                    focus: focusSpy,
                    blur: blurSpy
                }
            });
            
            // Element events
            elFocusSpy      = jasmine.createSpy('elFocus');
            arrowElFocusSpy = jasmine.createSpy('arrowElFocus');
            
            button.el.on('focus', elFocusSpy);
            button.arrowEl.on('focus', arrowElFocusSpy);
        });
        
        afterEach(function() {
            before.destroy();
            before = focusSpy = blurSpy = beforeFocusSpy = null;
            elFocusSpy = arrowElFocusSpy = null;
        });
        
        describe("focus", function() {
            beforeEach(function() {
                focusAndWait(before);
                
                waitForSpy(beforeFocusSpy);
            });
            
            it("should fire when main el is focused from the outside", function() {
                focusAndWait(button.el);
                
                waitForSpy(elFocusSpy);
                
                runs(function() {
                    expect(focusSpy).toHaveBeenCalled();
                });
            });
            
            it("should fire when arrowEl is focused from the outside", function() {
                focusAndWait(button.arrowEl);
                
                waitForSpy(arrowElFocusSpy);
                
                runs(function() {
                    expect(focusSpy).toHaveBeenCalled();
                });
            });
            
            it("should not fire when focus moved from main el to arrowEl", function() {
                focusAndWait(button.el);
                focusAndWait(button.arrowEl);
                
                waitForSpy(arrowElFocusSpy);
                
                runs(function() {
                    // First time is when the main el is focused
                    expect(focusSpy.callCount).toBe(1);
                });
            });
            
            it("should not fire when focus moved from arrowEl to main el", function() {
                focusAndWait(button.arrowEl);
                focusAndWait(button.el);
                
                waitForSpy(elFocusSpy);
                
                runs(function() {
                    // First time is when the arrowEl is focused
                    expect(focusSpy.callCount).toBe(1);
                });
            });
        });
        
        describe("blur", function() {
            it("should fire when main el is blurring to the outside", function() {
                focusAndWait(button.el);
                
                waitForSpy(elFocusSpy);
                
                focusAndWait(before);
                
                waitForSpy(beforeFocusSpy);
                
                runs(function() {
                    expect(blurSpy).toHaveBeenCalled();
                });
            });
            
            it("should fire when arrowEl is blurring to the outside", function() {
                focusAndWait(button.arrowEl);
                
                waitForSpy(arrowElFocusSpy);
                
                focusAndWait(before);
                
                waitForSpy(beforeFocusSpy);
                
                runs(function() {
                    expect(blurSpy).toHaveBeenCalled();
                });
            });
            
            it("should not fire when focus moved from main el to arrowEl", function() {
                focusAndWait(button.el);
                
                waitForSpy(elFocusSpy);
                
                focusAndWait(button.arrowEl);
                
                waitForSpy(arrowElFocusSpy);
                
                runs(function() {
                    expect(blurSpy).not.toHaveBeenCalled();
                });
            });
            
            it("should not fire when focus moved from arrowEl to main el", function() {
                focusAndWait(button.arrowEl);
                
                waitForSpy(arrowElFocusSpy);
                
                focusAndWait(button.el);
                
                waitForSpy(elFocusSpy);
                
                runs(function() {
                    expect(blurSpy).not.toHaveBeenCalled();
                });
            });
        });
    });
    
    describe("dynamic setMenu", function() {
        describe("removing menu", function() {
            beforeEach(function() {
                makeButton({
                    tabIndex: 1,
                    menu: [{
                        text: 'item 1'
                    }, {
                        text: 'item 2'
                    }]
                });
                
                button.setMenu(null);
            });
            
            it("should remove tabindex from arrowEl", function() {
                expectNoArrowAria('tabIndex');
            });
            
            it("should set display:none on arrowEl", function() {
                expect(button.arrowEl.dom.style.display).toBe('none');
            });
            
            describe("re-adding menu", function() {
                beforeEach(function() {
                    button.setMenu({
                        items: [{
                            text: 'foo 1'
                        }, {
                            text: 'foo 2'
                        }]
                    });
                });
                
                it("should add tabindex to arrowEl", function() {
                    expectArrowAria('tabIndex', '1');
                });
                
                it("should remove display:none from arrowEl", function() {
                    expect(button.arrowEl.isVisible(true)).toBe(true);
                });
            });
        });
    });
    
    describe("keyboard interaction", function() {
        var pressKey = jasmine.pressKey,
            clickSpy, enterSpy, downSpy;
        
        afterEach(function() {
            clickSpy = enterSpy = downSpy = null;
        });
        
        describe("keydown processing", function() {
            beforeEach(function() {
                makeButton({ renderTo: undefined });
                
                enterSpy = spyOn(button, 'onEnterKey').andCallThrough();
                downSpy  = spyOn(button, 'onDownKey').andCallThrough();
                clickSpy = spyOn(button, 'onClick').andCallThrough();
                
                button.render(Ext.getBody());
            });
            
            describe("Space key", function() {
                beforeEach(function() {
                    pressKey(button.arrowEl, 'space');
                });
                
                it("should call onClick", function() {
                    expect(clickSpy).toHaveBeenCalled();
                });
                
                it("should stop the keydown event", function() {
                    var args = enterSpy.mostRecentCall.args;
                    
                    expect(args[0].isStopped).toBe(true);
                });
                
                it("should return false to stop propagation", function() {
                    expect(enterSpy.mostRecentCall.result).toBe(false);
                });
            });
            
            describe("Enter key", function() {
                beforeEach(function() {
                    pressKey(button.arrowEl, 'enter');
                });
                
                it("should call onClick", function() {
                    expect(clickSpy).toHaveBeenCalled();
                });
                
                it("should stop the keydown event", function() {
                    var args = enterSpy.mostRecentCall.args;
                    
                    expect(args[0].isStopped).toBeTruthy();
                });
                
                it("should return false to stop propagation", function() {
                    expect(enterSpy.mostRecentCall.result).toBe(false);
                });
            });
            
            describe("Down arrow key", function() {
                beforeEach(function() {
                    pressKey(button.arrowEl, 'down');
                });
                
                it("should NOT call onClick", function() {
                    expect(clickSpy).not.toHaveBeenCalled();
                });
                
                it("should NOT stop the keydown event", function() {
                    var args = downSpy.mostRecentCall.args;
                    
                    expect(args[0].isStopped).toBeFalsy();
                });
                
                it("should NOT return false to stop propagation", function() {
                    expect(downSpy.mostRecentCall.result).not.toBeDefined();
                });
            });
        });
        
        describe("with menu", function() {
            beforeEach(function() {
                makeButton({
                    renderTo: undefined,
                    menu: [{
                        text: 'foo'
                    }, {
                        text: 'bar'
                    }]
                });
                
                enterSpy = spyOn(button, 'onEnterKey').andCallThrough();
                downSpy  = spyOn(button, 'onDownKey').andCallThrough();
                clickSpy = spyOn(button, 'onClick').andCallThrough();
                
                button.render(Ext.getBody());
            });
            
            it("should open the menu on Space key", function() {
                pressKey(button.arrowEl, 'space');
                
                waitForSpy(enterSpy);
                
                runs(function() {
                    expect(button.menu.isVisible()).toBe(true);
                });
            });
            
            it("should open the menu on Enter key", function() {
                pressKey(button.arrowEl, 'enter');
                
                waitForSpy(enterSpy);
                
                runs(function() {
                    expect(button.menu.isVisible()).toBe(true);
                });
            });
            
            it("should open the menu on Down arrow key", function() {
                pressKey(button.arrowEl, 'down');
                
                waitForSpy(downSpy);
                
                runs(function() {
                    expect(button.menu.isVisible()).toBe(true);
                });
            });
        });
        
        describe("with arrowHandler", function() {
            var handlerSpy;
            
            beforeEach(function() {
                handlerSpy = jasmine.createSpy('arrowHandler');
                
                makeButton({
                    renderTo: undefined,
                    arrowHandler: handlerSpy
                });

                enterSpy = spyOn(button, 'onEnterKey').andCallThrough();
                downSpy  = spyOn(button, 'onDownKey').andCallThrough();
                clickSpy = spyOn(button, 'onClick').andCallThrough();
                
                button.render(Ext.getBody());
            });
            
            it("should fire the handler on Space key", function() {
                pressKey(button.arrowEl, 'space');
                
                waitForSpy(enterSpy);
                
                runs(function() {
                    expect(handlerSpy).toHaveBeenCalled();
                });
            });
            
            it("should fire the handler on Enter key", function() {
                pressKey(button.arrowEl, 'enter');
                
                waitForSpy(enterSpy);
                
                runs(function() {
                    expect(handlerSpy).toHaveBeenCalled();
                });
            });
            
            it("should not fire the handler on down arrow key", function() {
                pressKey(button.arrowEl, 'down');
                
                waitForSpy(downSpy);
                
                runs(function() {
                    expect(handlerSpy).not.toHaveBeenCalled();
                });
            });
        });
    });
});
