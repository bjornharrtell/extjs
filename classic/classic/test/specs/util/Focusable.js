describe("Ext.util.Focusable", function() {
    var focusAndWait = jasmine.focusAndWait,
        waitAWhile = jasmine.waitAWhile,
        expectFocused = jasmine.expectFocused,
        c, container;
    
    function stdComponent(config) {
        return Ext.apply({
            xtype: 'component',
            renderTo: Ext.getBody(),
            width: 100,
            height: 100,
            focusable: true,
            tabIndex: 0,
            getFocusEl: function() {
                return this.el;
            }
        }, config);
    }
    
    function makeComponent(config) {
        var cmpCfg = stdComponent(config);
        
        c = new Ext.Component(cmpCfg);
        
        return c;
    }
    
    function makeContainer(config) {
        container = new Ext.container.Container(Ext.apply({
            renderTo: Ext.getBody(),
            width: 100,
            height: 200
        }, config));
    }
    
    function expectAria(attr, value) {
        return jasmine.expectAriaAttr(c, attr, value);
    }
    
    function expectNoAria(attr) {
        return jasmine.expectNoAriaAttr(c, attr);
    }
    
    afterEach(function() {
        if (container) {
            container.destroy();
        }
        
        if (c) {
            c.destroy();
        }
        
        c = container = null;
    });
    
    describe("tabIndex handling", function() {
        describe("component not focusable", function() {
            it("should not render tabindex attribute when tabIndex property is undefined", function() {
                makeComponent({
                    focusable: undefined,
                    tabIndex: undefined
                });
                
                expectNoAria('tabIndex');
            });
            
            it("should not render tabindex attribute when tabIndex property is defined", function() {
                makeComponent({
                    focusable: undefined,
                    tabIndex: 0
                });
                
                expectNoAria('tabIndex');
            });
        });
        
        describe("component is focusable", function() {
            it("should not render tabindex attribute when tabIndex property is undefined", function() {
                makeComponent({
                    focusable: true,
                    tabIndex: undefined
                });
                
                expectNoAria('tabIndex');
            });
            
            it("should render tabindex attribute when tabIndex property is defined", function() {
                makeComponent({
                    focusable: true,
                    tabIndex: 0
                });
                
                expectAria('tabIndex', '0');
            });
        });
    });
    
    describe("isFocusable", function() {
        describe("component", function() {
            describe("not rendered", function() {
                beforeEach(function() {
                    makeComponent({
                        renderTo: undefined
                    });
                });
                
                it("should return false", function() {
                    expect(c.isFocusable()).toBe(false);
                });
            });
            
            describe("rendered", function() {
                beforeEach(function() {
                    makeComponent();
                });
                
                describe("focusable === true", function() {
                    it("should return true when visible", function() {
                        expect(c.isFocusable()).toBe(true);
                    });
                    
                    it("should return false when disabled", function() {
                        c.disable();
                        
                        expect(c.isFocusable()).toBe(false);
                    });
                    
                    it("should return false when invisible", function() {
                        c.hide();
                        
                        expect(c.isFocusable()).toBe(false);
                    });
                    
                    it("should return false when destroyed", function() {
                        c.destroy();
                        
                        expect(c.isFocusable()).toBe(false);
                        
                        c = null;
                    });
                });
                
                describe("focusable === false", function() {
                    beforeEach(function() {
                        c.focusable = false;
                    });
                    
                    it("should return false", function() {
                        expect(c.isFocusable()).toBe(false);
                    });
                
                    it("should disregard deep parameter", function() {
                        spyOn(c, 'getFocusEl').andCallThrough();
                        
                        expect(c.isFocusable(true)).toBe(false);
                        expect(c.getFocusEl).not.toHaveBeenCalled();
                    });
                });
            });
        });
        
        describe("container", function() {
            describe("not rendered", function() {
                beforeEach(function() {
                    makeContainer({
                        renderTo: undefined,
                        items: [
                            stdComponent({
                                renderTo: undefined
                            })
                        ]
                    });
                });
                
                it("should return false with deep === false", function() {
                    expect(container.isFocusable()).toBe(false);
                });
                
                it("should return false with deep === true", function() {
                    expect(container.isFocusable(true)).toBe(false);
                });
            });
            
            describe("rendered", function() {
                var fooCmp;
                
                beforeEach(function() {
                    makeContainer({
                        items: [
                            stdComponent({
                                renderTo: undefined,
                                itemId: 'foo'
                            })
                        ],
                        
                        focusable: true,
                        tabIndex: 0
                    });
                    
                    fooCmp = container.down('#foo');
                });
                
                describe("deep === false", function() {
                    describe("focusable === false", function() {
                        beforeEach(function() {
                            container.focusable = false;
                        });
                        
                        it("should return false", function() {
                            expect(container.isFocusable()).toBe(false);
                        });
                    });
                    
                    describe("focusable === true, no tabIndex", function() {
                        beforeEach(function() {
                            container.setTabIndex(undefined);
                        });
                        
                        it("should return false", function() {
                            expect(container.isFocusable()).toBe(false);
                        });
                    });
                    
                    describe("focusable === true, tabIndex === 0", function() {
                        it("should return true when container is visible", function() {
                            expect(container.isFocusable()).toBe(true);
                        });
                        
                        it("should return false when container is hidden", function() {
                            container.hide();
                            
                            expect(container.isFocusable()).toBe(false);
                        });
                        
                        it("should return false when container is disabled", function() {
                            container.disable();
                            
                            expect(container.isFocusable()).toBe(false);
                        });
                        
                        it("should return false when container is destroyed", function() {
                            container.destroy();
                            
                            expect(container.isFocusable()).toBe(false);
                            
                            container = null;
                        });
                    });
                });
                
                describe("deep === true", function() {
                    beforeEach(function() {
                        container.defaultFocus = '#foo';
                    });
                    
                    describe("container not focusable", function() {
                        beforeEach(function() {
                            container.focusable = false;
                        });
                        
                        it("should return true when delegate is focusable", function() {
                            expect(container.isFocusable(true)).toBe(true);
                        });
                        
                        it("should return false when delegate is not focusable", function() {
                            fooCmp.focusable = false;
                            
                            expect(container.isFocusable(true)).toBe(false);
                        });
                        
                        it("should return false when delegate is hidden", function() {
                            fooCmp.hide();
                            
                            expect(container.isFocusable(true)).toBe(false);
                        });
                        
                        it("should return false when delegate is disabled", function() {
                            fooCmp.disable();
                            
                            expect(container.isFocusable(true)).toBe(false);
                        });
                        
                        it("should return false when delegate is destroyed", function() {
                            fooCmp.destroy();
                            
                            expect(container.isFocusable(true)).toBe(false);
                        });
                        
                        describe("dynamic delegate", function() {
                            beforeEach(function() {
                                container.remove(fooCmp);
                                fooCmp.destroy();
                                fooCmp = null;
                            });
                            
                            it("should return false when delegate is removed", function() {
                                expect(container.isFocusable(true)).toBe(false);
                            });
                            
                            it("should return true when matching delegate is added", function() {
                                container.add(stdComponent({
                                    renderTo: undefined,
                                    itemId: 'foo'
                                }));
                                
                                expect(container.isFocusable(true)).toBe(true);
                            });
                        });
                    });
                    
                    describe("container is focusable", function() {
                        it("should return true", function() {
                            expect(container.isFocusable(true)).toBe(true);
                        });
                    });
                });
            });
        });
    });
    
    describe("getTabIndex", function() {
        beforeEach(function() {
            makeComponent({
                renderTo: undefined,
                tabIndex: 42
            });
        });
        
        it("should return undefined when !focusable", function() {
            c.focusable = false;
            
            expect(c.getTabIndex()).toBe(undefined);
        });
        
        it("should return configured tabIndex when component is not rendered", function() {
            expect(c.rendered).toBe(false);
            expect(c.getTabIndex()).toBe(42);
        });
        
        it("should return actual tabIndex when component is rendered", function() {
            c.render(Ext.getBody());
            c.el.set({ tabIndex: 1 });
            
            expect(c.rendered).toBe(true);
            expect(c.getTabIndex()).toBe(1);
        });
    });
    
    describe("setTabIndex", function() {
        beforeEach(function() {
            makeComponent({
                renderTo: undefined,
                tabIndex: 43
            });
        });
        
        it("should do nothing when !focusable", function() {
            c.focusable = false;
            
            c.setTabIndex(-1);
            
            expect(c.tabIndex).toBe(43);
        });
        
        it("should set tabIndex property when not rendered", function() {
            c.setTabIndex(-1);
            
            expect(c.tabIndex).toBe(-1);
        });
        
        it("should set tabIndex property when el is a string", function() {
            c.el = 'foo'; // element id
            
            c.setTabIndex(-1);
            
            expect(c.tabIndex).toBe(-1);
        });
        
        it("should set el tabindex when rendered", function() {
            c.render(Ext.getBody());
            
            c.setTabIndex(-1);
            
            var index = c.el.getAttribute('tabIndex') - 0;
            
            expect(index).toBe(-1);
        });
    });
    
    describe("container delegated getTabIndex/setTabIndex", function() {
        beforeEach(function() {
            makeContainer({
                focusable: true,
                
                items: [makeComponent({
                    renderTo: undefined,
                    tabIndex: 1
                })],
                
                getFocusEl: function() {
                    return this.child();
                }
            });
        });
        
        it("should return child's tabIndex", function() {
            expect(container.getTabIndex()).toBe(1);
        });
        
        it("should set child's tabIndex", function() {
            container.setTabIndex(88);
            
            var index = c.el.getAttribute('tabIndex') - 0;
            
            expect(index).toBe(88);
        });
    });
    
    describe("focusCls handling", function() {
        beforeEach(function() {
            makeComponent({
                renderTpl: [
                    '<div id="{id}-focusClsEl" data-ref="focusClsEl">foo</div>'
                ],
                
                childEls: ['focusClsEl'],
                
                getFocusClsEl: function() {
                    return this.focusClsEl;
                }
            });
            
            focusAndWait(c);
        });
        
        describe("focusing", function() {
            it("should add focusCls to focusClsEl", function() {
                expect(c.focusClsEl.hasCls('x-focus')).toBe(true);
            });
            
            it("should not add focusCls to el", function() {
                expect(c.el.hasCls('x-focus')).toBe(false);
            });
        });
        
        describe("blurring", function() {
            beforeEach(function() {
                c.blur();
                
                waitAWhile();
            });
            
            it("should remove focusCls from focusClsEl", function() {
                expect(c.focusClsEl.hasCls('x-focus')).toBe(false);
            });
        });
        
        describe("disabling", function() {
            beforeEach(function() {
                // Disabling is synchronous, so no wait necessary
                c.disable();
            });
            
            it("should remove focusCls from focusClsEl", function() {
                expect(c.focusClsEl.hasCls('x-focus')).toBe(false);
            });
        });
    });
    
    describe("blur/focus", function() {
        var focusCls = Ext.baseCSSPrefix + 'focus';
        
        beforeEach(function(){
            makeComponent({
                autoEl: 'button',
                focusCls: 'focus'
            });
        });
        
        it("should look up focused Component", function() {
            c.focus();
            
            waitsFor(function() {
                return c.el.hasCls(focusCls);
            }, 'CSS class to be added', 100);
            
            runs(function() {
                var cmp = Ext.ComponentManager.getActiveComponent();
                
                expect(cmp).toEqual(c);
            });
        });
        
        it("should cancel previous delayed focus", function() {
            var c2 = new Ext.Component({
                renderTo: Ext.getBody(),
                autoEl: 'button',
                focusCls: 'focus',
                focusable: true,
                getFocusEl: function() {
                    return this.el;
                }
            });
            
            spyOn(Ext.focusTask, 'delay');
            spyOn(Ext.focusTask, 'cancel');
            
            c.focus(false, true);

            expect(Ext.focusTask.delay).toHaveBeenCalled();
            
            c2.focus();
            
            expect(Ext.focusTask.cancel).toHaveBeenCalled();
            
            Ext.destroy(c2);
        });
        
        describe("focus delegation", function() {
            var fooCmp, barCmp;
            
            beforeEach(function() {
                makeContainer({
                    height: 200,
                    
                    items: [
                        stdComponent({
                            itemId: 'foo',
                            renderTo: undefined
                        }),
                        
                        stdComponent({
                            itemId: 'bar',
                            renderTo: undefined
                        })
                    ]
                });
                
                fooCmp = container.down('#foo');
                barCmp = container.down('#bar');
            });
            
            it("should focus foo", function() {
                container.defaultFocus = 'component';
                
                // We're calling container.focus() here but expecting
                // fooCmp to be focused
                focusAndWait(container, fooCmp);
                
                expectFocused(fooCmp);
            });
            
            it("should focus bar", function() {
                container.defaultFocus = '#bar';
                
                focusAndWait(container, barCmp);
                
                expectFocused(barCmp);
            });
        });
        
        describe("events", function(){
            it("should fire the focus event", function(){
                var fired;
                
                runs(function() {
                    c.on('focus', function(){
                        fired = true;
                    });
                    c.focus();
                });
                
                waitsFor(function() {
                    return fired;
                }, 'Event to fire', 100);
                
                runs(function() {
                    expect(fired).toBe(true);
                });
            });  
            
            it("should not fire the focus event if the component has focus", function(){
                var fired = 0;  
                
                runs(function() {
                    c.on('focus', function(){
                        ++fired;
                    });
                    c.focus();
                    c.focus();
                });
                
                waitsFor(function() {
                    return fired > 0;
                }, 'Event to fire', 100);
                
                // Enough time for the second event to fire, if any
                waits(50);
                
                runs(function() {
                    expect(fired).toBe(1);
                });
            });  
            
            it("should fire the blur event", function(){
                var fired;  
                
                runs(function() {
                    c.on('blur', function(){
                        fired = true;
                    });
                    c.focus();
                    c.blur();
                });
                
                waitsFor(function() {
                    return fired;
                }, 'Event to fire', 100);
                
                runs(function() {
                    expect(fired).toBe(true);
                });
            });
        });
    });
    
    describe("enable/disable tabbing", function() {
        describe("simple component", function() {
            beforeEach(function() {
                makeComponent();
                
                c.disableTabbing();
            });
            
            it("should disable tabbing", function() {
                expect(c.el.isTabbable()).toBe(false);
            });
            
            it("should re-enable tabbing", function() {
                c.enableTabbing();
                
                expect(c.el.isTabbable()).toBe(true);
            });
        });
        
        describe("non-focusable container with delegate", function() {
            var delegate;
            
            beforeEach(function() {
                makeContainer({
                    defaultFocus: 'foo',
                    items: [
                        stdComponent({ itemId: 'foo' })
                    ]
                });
                
                delegate = container.down('#foo');
                
                container.disableTabbing();
            });
            
            it("should disable tabbing", function() {
                expect(delegate.el.isTabbable()).toBe(false);
            });
            
            it("should re-enable tabbing", function() {
                container.enableTabbing();
                
                expect(delegate.el.isTabbable()).toBe(true);
            });
        });
        
        // We're simulating a window here
        describe("focusable container with delegate", function() {
            var delegate;
            
            beforeEach(function() {
                makeContainer({
                    floating: true,
                    focusable: true,
                    tabIndex: 0,
                    defaultFocus: 'bar',
                    items: [
                        stdComponent({ itemId: 'bar' })
                    ]
                });
                
                delegate = container.down('#bar');
                
                container.disableTabbing();
            });
            
            it("should disable tabbing on container", function() {
                expect(container.el.isTabbable()).toBe(false);
            });
            
            it("should disable tabbing on delegate", function() {
                expect(delegate.el.isTabbable()).toBe(false);
            });
            
            describe("re-enable", function() {
                beforeEach(function() {
                    container.enableTabbing();
                });
                
                it("should enable tabbing on container", function() {
                    expect(container.el.isTabbable()).toBe(true);
                });
                
                it("should enable tabbing on delegate", function() {
                    expect(delegate.el.isTabbable()).toBe(true);
                });
            });
        });
        
        // TODO Refactor this test not to depend on File field
        describe("focusEl outside of component DOM", function() {
            beforeEach(function() {
                c = new Ext.form.field.File({
                    renderTo: Ext.getBody()
                });
                
                c.disableTabbing();
            });
            
            it("should disable tabbing", function() {
                expect(c.button.fileInputEl.isTabbable()).toBe(false);
            });
            
            it("should re-enable tabbing", function() {
                c.enableTabbing();
                
                expect(c.button.fileInputEl.isTabbable()).toBe(true);
            });
        });
    });

    describe('Disabling focused component', function() {
        it('should move focus to a relation', function() {
            var p = new Ext.panel.Panel({
                renderTo: document.body,
                items: [{
                    xtype: 'textfield'
                }],
                bbar: [{
                    text: 'Button 1'
                }, {
                    text: 'Button 2'
                }]
            }),
            textfield = p.down('textfield'),
            button1 = p.down('[text=Button 1]'),
            button2 = p.down('[text=Button 2]'),
            textFieldFocusSpy = spyOn(textfield, 'focus'),
            button2FocusSpy = spyOn(button2, 'focus');

            // Fake focusing button 1 just so that it will call focus on button2.
            // Real focusing will not work in test situation.
            button1.hasFocus = true;
            button1.disable();
            
            // Disabling b1 should call button2.focus()
            expect(button2FocusSpy.callCount).toBe(1);

            button2.hasFocus = true;
            button2.disable();

            // Disabling b2 should call textfield.focus()
            expect(textFieldFocusSpy.callCount).toBe(1);

            p.destroy();
        });
    });

    describe('Focusing disabled component', function() {
        it('should move focus to a relation', function() {
            var p = new Ext.panel.Panel({
                renderTo: document.body,
                items: [{
                    xtype: 'textfield'
                }],
                bbar: [{
                    text: 'Button 1',
                    disabled: true
                }, {
                    text: 'Button 2'
                }]
            }),
            textfield = p.down('textfield'),
            button1 = p.down('[text=Button 1]'),
            button2 = p.down('[text=Button 2]'),
            textFieldFocusSpy = spyOn(textfield, 'focus'),
            button2FocusSpy = spyOn(button2, 'focus');

            // Because it is disabled, focus should move to button 2
            button1.focus();
            
            // Disabling b1 should call button2.focus()
            expect(button2FocusSpy.callCount).toBe(1);

            button2.hasFocus = true;
            button2.disable();

            // Disabling b2 should call textfield.focus()
            expect(textFieldFocusSpy.callCount).toBe(1);

            p.destroy();
        });
    });

    describe('Hiding a component which contains focus when previous focus has been disabled', function() {
        it('should move focus to a relation or the previously focused component', function() {
            var p = new Ext.panel.Panel({
                renderTo: document.body,
                items: [{
                    xtype: 'textfield'
                }, {
                    xtype: 'fieldset',
                    items: [{
                        xtype: 'textfield'
                    }]
                }],
                bbar: [{
                    text: 'Button 1'
                }, {
                    text: 'Button 2'
                }]
            }),
            fieldset = p.down('fieldset'),
            textfield = fieldset.down('textfield'),
            button1 = p.down('[text=Button 1]'),
            button2 = p.down('[text=Button 2]');
            
            button1.focus();
            waitsFor(function() {
                return button1.hasFocus;
            });

            // Focus enters the fieldset, and the previously focused component
            // (button1) should be cached at that point.
            runs(function() {
                textfield.focus();
            });

            waitsFor(function() {
                return fieldset.containsFocus;
            });

            // The hide should attempt to revert focus back to button1.
            // But now that is disabled, it should go to button2
            runs(function() {
                button1.disable();
                fieldset.hide();
            });

            waitsFor(function() {
                return button2.hasFocus;
            });

            runs(function() {
                p.destroy();
            });
        });
    });
    
    describe('Wrapping a Component which contains focus', function() {
        var container,
            cmp,
            newEl;

        afterEach(function() {
            container.destroy();
            newEl.destroy();
        });
        it('should not call onFocusLeave on a Component which is wrapped', function() {
            container = new Ext.Container({
                items: {
                    xtype: 'textfield'
                },
                renderTo: document.body
            }),
            cmp = container.child(),
            newEl;

            spyOn(container, 'onFocusLeave').andCallThrough();

            cmp.focus();

            waitsFor(function() {
                return container.containsFocus;
            });

            runs(function() {
                expect(Ext.Element.getActiveElement() === cmp.inputEl.dom).toBe(true);
                newEl = container.el.wrap();
            });

            // Wait for a possible (it would be a bug) focus leave of the component
            // we can't wait for anything, because we want NOTHING to happen.
            waits(10);

            // The Component must have retained focus
            runs(function() {
                expect(container.onFocusLeave).not.toHaveBeenCalled();
                expect(container.containsFocus).toBe(true);
                expect(Ext.Element.getActiveElement() === cmp.inputEl.dom).toBe(true);
            });
        });
    });
});
