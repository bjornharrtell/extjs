describe("Ext.util.KeyboardInteractive", function() {
    var Event = Ext.event.Event,
        createSpy = jasmine.createSpy,
        focusAndWait = jasmine.focusAndWait,
        waitAWhile = jasmine.waitAWhile,
        pressArrowKey = jasmine.pressArrowKey,
        fireKeyEvent = jasmine.fireKeyEvent,
        c, focusEl;
    
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
            },
            onKeyDefault: Ext.emptyFn
        }, config);
    }
    
    function makeComponent(config) {
        var cmpCfg = stdComponent(config);
        
        c = new Ext.Component(cmpCfg);
        
        return c;
    }
    
    afterEach(function() {
        if (c) {
            c.destroy();
        }
        
        c = null;
    });
    
    describe("config handling", function() {
        beforeEach(function() {
            makeComponent();
        });
        
        it("should accept binding as function", function() {
            spyOn(Ext.log, 'warn');
            
            c.setKeyHandlers({ UP: Ext.emptyFn });
            
            expect(Ext.log.warn).not.toHaveBeenCalled();
            
            var handlers = c.getKeyHandlers();
            
            expect(handlers.UP).toBe(Ext.emptyFn);
        });
        
        it("should accept binding as fn name", function() {
            c.setKeyHandlers({ DOWN: 'onKeyDefault' });
            
            var handlers = c.getKeyHandlers();
            
            expect(handlers.DOWN).toBe(Ext.emptyFn);
        });
        
        it("should throw on unknown keycode", function() {
            var err = "Unknown key: FOO in keyHandlers config for " + c.id +
                      ". Key names should be in UPPER CASE.";
            
            expect(function() {
                c.setKeyHandlers({ FOO: 'onKeyFoo' });
            }).toThrow(err);
        });
        
        it("should warn on undefined binding", function() {
            // The warning is expected
            spyOn(Ext.log, 'warn');
            
            c.setKeyHandlers({ UP: 'onKeyUp' });
            
            var have = Ext.log.warn.mostRecentCall.args[0],
                want = "Undefined binding onKeyUp for UP key " +
                       "in keyHandlers config for " + c.id;
            
            expect(have).toBe(want);
        });
    });
    
    describe("keydown listener", function() {
        describe("w/o config", function() {
            beforeEach(function() {
                makeComponent();
                
                focusEl = c.getFocusEl();
            });
            
            it("should not attach listener initially", function() {
                expect(focusEl.hasListener('keydown')).toBe(false);
            });
            
            it("should attach listener on config update", function() {
                c.setKeyHandlers({ HOME: 'onKeyDefault' });
                
                expect(focusEl.hasListener('keydown')).toBe(true);
            });
        });
        
        describe("with config", function() {
            beforeEach(function() {
                makeComponent({
                    keyHandlers: {
                        LEFT: 'onKeyDefault'
                    }
                });
                
                focusEl = c.getFocusEl();
            });
        
            it("should attach listener after render", function() {
                expect(focusEl.hasListener('keydown')).toBe(true);
            });
            
            it("should not attach listener more than once", function() {
                c.setKeyHandlers({ RIGHT: 'onKeyDefault' });
                
                expect(focusEl.hasListeners.keydown).toBe(1);
            });
        });
    });
    
    describe("handlers", function() {
        var leftSpy, rightSpy;
        
        beforeEach(function() {
            leftSpy = createSpy('left');
            rightSpy = createSpy('right');
            
            makeComponent({
                keyHandlers: {
                    LEFT: 'onKeyLeft',
                    RIGHT: 'onKeyRight'
                },
                
                onKeyLeft: leftSpy,
                onKeyRight: rightSpy
            });
        });
        
        afterEach(function() {
            leftSpy = rightSpy = null;
        });
        
        describe("resolving", function() {
            it("should resolve handler name to function", function() {
                var handlers = c.getKeyHandlers();
                
                expect(handlers.LEFT).toBe(leftSpy);
            });
        });
        
        describe("invoking", function() {
            describe("matching a handler", function() {
                it("should invoke the handler", function() {
                    pressArrowKey(c, 'left');
                
                    runs(function() {
                        expect(leftSpy).toHaveBeenCalled();
                    });
                });
            
                it("should pass the key event", function() {
                    focusAndWait(c);
                
                    runs(function() {
                        fireKeyEvent(c.getFocusEl(), 'keydown', Event.RIGHT);
                    });
                
                    waitAWhile();
                
                    runs(function() {
                        var args = rightSpy.mostRecentCall.args,
                            ev = args[0];
                        
                        expect(ev.getKey()).toBe(Event.RIGHT);
                    });
                });
            });
            
            describe("not matching a handler", function() {
                it("should not throw", function() {
                    focusAndWait(c);
                    
                    runs(function() {
                        expect(function() {
                            fireKeyEvent(c.getFocusEl(), 'keydown', Event.UP);
                        }).not.toThrow();
                    });
                });
            });
        });
    });
});
