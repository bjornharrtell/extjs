describe("Ext.panel.Tool", function() {
    var tool, el;
    
    function makeTool(cfg) {
        cfg = Ext.apply({
            renderTo: Ext.getBody()
        }, cfg);
        
        tool = new Ext.panel.Tool(cfg);
        el = tool.el;
        
        return tool;
    }
    
    function expectAria(attr, value) {
        jasmine.expectAriaAttr(tool, attr, value);
    }
    
    function expectNoAria(attr) {
        jasmine.expectNoAriaAttr(tool, attr);
    }
    
    afterEach(function() {
        Ext.destroy(tool);
        tool = null;
    });
    
    describe("ARIA attributes", function() {
        describe("rendered with no tooltip", function() {
            beforeEach(function() {
                makeTool({
                    type: 'collapse'
                });
            });
            
            it("should have el as ariaEl", function() {
                expect(tool.ariaEl).toBe(tool.el);
            });
            
            it("should have button role", function() {
                expectAria('role', 'button');
            });
            
            it("should not have title", function() {
                expectNoAria('title');
            });
            
            it("should not have aria-label", function() {
                expectNoAria('aria-label');
            });
            
            describe("setTooltip", function() {
                describe("default type", function() {
                    beforeEach(function() {
                        tool.setTooltip('foo');
                    });
                    
                    it("should set aria-label", function() {
                        expectAria('aria-label', 'foo');
                    });
                    
                    it("should not set title", function() {
                        expectNoAria('title');
                    });
                });
                
                describe("forced type", function() {
                    beforeEach(function() {
                        tool.setTooltip('bar', 'title');
                    });
                    
                    it("should set title", function() {
                        expectAria('title', 'bar');
                    });
                    
                    it("should not set aria-label", function() {
                        expectNoAria('aria-label');
                    });
                });
            });
        });
        
        describe("rendered with tooltip", function() {
            beforeEach(function() {
                makeTool({
                    type: 'expand',
                    tooltip: 'frob'
                });
            });
            
            it("should set aria-label", function() {
                expectAria('aria-label', 'frob');
            });
            
            it("should not set title", function() {
                expectNoAria('title');
            });
        });
    });
    
    describe("interaction", function() {
        var callbackSpy, handlerSpy, clickSpy, scope,
            toolOwner, ownerCt;
        
        beforeEach(function() {
            callbackSpy = jasmine.createSpy('callback');
            handlerSpy = jasmine.createSpy('handler');
            clickSpy = jasmine.createSpy('click');
            scope = {};
            toolOwner = {};
            ownerCt = {};
            
            makeTool({
                type: 'close',
                callback: callbackSpy,
                handler: handlerSpy,
                scope: scope,
                listeners: {
                    click: clickSpy
                },
                renderTo: undefined
            });
            
            spyOn(tool, 'onClick').andCallThrough();
            tool.render(Ext.getBody());
            el = tool.el;
            
            tool.toolOwner = toolOwner;
        });
        
        afterEach(function() {
            callbackSpy = handlerSpy = clickSpy = scope = null;
            toolOwner = ownerCt = null;
        });
        
        describe("pointer", function() {
            describe("mouseover", function() {
                beforeEach(function() {
                    jasmine.fireMouseEvent(el, 'mouseover', 1, 1);
                });
                
                it("should add toolOverCls on over", function() {
                    expect(el.hasCls(tool.toolOverCls)).toBe(true);
                });
                
                it("should remove toolOverCls on out", function() {
                    jasmine.fireMouseEvent(el, 'mouseout', 1, 1);
                    
                    expect(el.hasCls(tool.toolOveCls)).toBe(false);
                });
            });
            
            describe("mousedown", function() {
                beforeEach(function() {
                    jasmine.fireMouseEvent(el, 'mousedown', 1, 1);
                });
                
                it("should add toolPressedCls", function() {
                    expect(el.hasCls(tool.toolPressedCls)).toBe(true);
                });
                
                it("should prevent focusing the tool", function() {
                    expect(tool.hasFocus).toBe(false);
                });
            });
            
            describe("click", function() {
                var cArgs, cScope, hArgs, hScope, eArgs;
                
                function clickTool(t) {
                    t = t || tool;
                    
                    jasmine.fireMouseEvent(t.el, 'click', 1, 1);
                    
                    cArgs = callbackSpy.mostRecentCall.args;
                    cScope = callbackSpy.mostRecentCall.scope;
                    
                    hArgs = handlerSpy.mostRecentCall.args;
                    hScope = handlerSpy.mostRecentCall.scope;
                    
                    eArgs = clickSpy.mostRecentCall.args;
                }
                
                describe("enabled", function() {
                    beforeEach(function() {
                        tool.ownerCt = ownerCt;
                        clickTool();
                    });
                    
                    afterEach(function() {
                        cArgs = cScope = hArgs = hScope = eArgs = null;
                    });
                    
                    it("should remove toolPressedCls", function() {
                        expect(el.hasCls(tool.toolPressedCls)).toBe(false);
                    });
                    
                    describe("stopEvent", function() {
                        it("should stop the event by default", function() {
                            var e = tool.onClick.mostRecentCall.args[0];
                            
                            expect(e.isStopped).toBe(true);
                        });
                        
                        it("should not stop event when stopEvent is false", function() {
                            tool.stopEvent = false;
                            
                            clickTool(tool);
                            
                            var e = tool.onClick.mostRecentCall.args[0];
                            
                            expect(!!e.isStopped).toBe(false);
                        });
                    });
                    
                    describe("callback", function() {
                        beforeEach(function() {
                            tool.handler = null;
                            clickTool();
                        });
                        
                        it("should fire", function() {
                            expect(callbackSpy).toHaveBeenCalled();
                        });
                        
                        it("should fire in the specified scope", function() {
                            expect(cScope).toBe(scope);
                        });
                        
                        it("should pass event as the last argument", function() {
                            var e = cArgs.pop();
                            
                            expect(e.isEvent).toBe(true);
                        });
                        
                        it("should pass expected arguments with toolOwner", function() {
                            // Remove event
                            cArgs.pop();
                            
                            expect(cArgs).toEqual([toolOwner, tool]);
                        });
                        
                        it("should pass expected arguments w/o toolOwner", function() {
                            tool.toolOwner = null;
                            clickTool(tool);
                            
                            cArgs.pop();
                            
                            expect(cArgs).toEqual([ownerCt, tool]);
                        });
                    });
                    
                    describe("handler", function() {
                        it("should fire", function() {
                            expect(handlerSpy).toHaveBeenCalled();
                        });
                        
                        it("should fire in the specified scope", function() {
                            expect(hScope).toBe(scope);
                        });
                        
                        it("should pass event as first argument", function() {
                            var e = hArgs[0];
                            
                            expect(e.isEvent).toBe(true);
                        });
                        
                        it("should pass expected arguments", function() {
                            // Remove the event
                            hArgs.shift();
                            
                            expect(hArgs).toEqual([el.dom, ownerCt, tool]);
                        });
                    });
                    
                    describe("click event", function() {
                        it("should fire", function() {
                            expect(clickSpy).toHaveBeenCalled();
                        });
                        
                        it("should pass the tool as first argument", function() {
                            expect(eArgs[0]).toBe(tool);
                        });
                        
                        it("should pass event as the second argument", function() {
                            expect(eArgs[1].isEvent).toBe(true);
                        });
                        
                        it("should pass toolOwner as the third argument", function() {
                            expect(eArgs[2]).toBe(toolOwner);
                        });
                        
                        it("should pass ownerCt as the third argument w/o toolOwner", function() {
                            tool.toolOwner = null;
                            clickTool(tool);
                            
                            expect(eArgs[2]).toBe(ownerCt);
                        });
                    });
                });
                
                describe("disabled", function() {
                    beforeEach(function() {
                        tool.disable();
                        clickTool();
                    });
                    
                    it("should not fire callback", function() {
                        expect(callbackSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should not fire handler", function() {
                        expect(handlerSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should not fire click event", function() {
                        expect(clickSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should not stop event by default", function() {
                        var e = tool.onClick.mostRecentCall.args[0];
                        
                        expect(!!e.isStopped).toBe(false);
                    });
                });
            });
        });
        
        describe("keyboard", function() {
            var pressKey = jasmine.asyncPressKey;
            
            it("should be tabbable by default", function() {
                expect(el.isTabbable()).toBe(true);
            });
            
            describe("Space key", function() {
                beforeEach(function() {
                    pressKey(tool, 'space');
                });
                
                it("should call onClick when Space key is pressed", function() {
                    expect(tool.onClick).toHaveBeenCalled();
                });
                
                it("should stop event by default", function() {
                    var e = tool.onClick.mostRecentCall.args[0];
                    
                    expect(e.isStopped).toBe(true);
                });
            });
            
            describe("Enter key", function() {
                beforeEach(function() {
                    pressKey(tool, 'enter');
                });
                
                it("should call onClick when Enter key is pressed", function() {
                    expect(tool.onClick).toHaveBeenCalled();
                });
                
                it("should stop the event by default", function() {
                    var e = tool.onClick.mostRecentCall.args[0];
                    
                    expect(e.isStopped).toBe(true);
                });
            });
        });
    });
});
