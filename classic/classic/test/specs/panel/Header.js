describe("Ext.panel.Header", function() {
    var header;
    
    function makeHeader(cfg) {
        cfg = Ext.apply({
            title: 'foo',
            renderTo: Ext.getBody()
        }, cfg);
        
        return header = new Ext.panel.Header(cfg);
    }
    
    function expectAria(attr, value) {
        jasmine.expectAriaAttr(header, attr, value);
    }
    
    function expectNoAria(attr) {
        jasmine.expectNoAriaAttr(header, attr);
    }
    
    afterEach(function() {
        Ext.destroy(header);
        header = null;
    });

    describe('Title value', function() {
        it('should set it as configured', function() {
            makeHeader({
                title: 10
            });
            expect(header.title.getText()).toBe(10);
        });
    });
    
    describe("setTitlePosition", function() {
        beforeEach(function() {
            makeHeader({
                tools: [
                    { type: 'close' },
                    { type: 'pin' }
                ]
            });
        });

        it("should insert the header at the new title position", function() {
            header.setTitlePosition(2);
            expect(header.items.getAt(2)).toBe(header.getTitle());
        });

        it("should update the titlePosition property", function() {
            header.setTitlePosition(2);
            expect(header.titlePosition).toBe(2);
        });

        it("should not allow a titlePosition greater than the max item index", function() {
            header.setTitlePosition(3);
            expect(header.items.getAt(2)).toBe(header.getTitle());
            expect(header.titlePosition).toBe(2);
        });
    });
    
    describe("ARIA", function() {
        function expectTitleAria(attr, value) {
            jasmine.expectAriaAttr(header.titleCmp, attr, value);
        }
        
        function expectNoTitleAria(attr) {
            jasmine.expectNoAriaAttr(header.titleCmp, attr);
        }
        
        function expectTitleTextAria(attr, value) {
            jasmine.expectAriaAttr(header.titleCmp.textEl, attr, value);
        }
        
        function expectNoTitleTextAria(attr) {
            jasmine.expectNoAriaAttr(header.titleCmp.textEl, attr);
        }
        
        it("should have el as ariaEl", function() {
            makeHeader();
            
            expect(header.ariaEl).toBe(header.el);
        });
        
        describe("no tools", function() {
            describe("ordinary header", function() {
                beforeEach(function() {
                    makeHeader();
                });
                
                it("should have presentation ariaRole", function() {
                    expect(header.ariaRole).toBe('presentation');
                });
                
                it("should have presentation role on header el", function() {
                    expectAria('role', 'presentation');
                });
                
                it("should have presentation role on titleCmp el", function() {
                    expectTitleAria('role', 'presentation');
                });
                
                it("should have presentation role on titleCmp textEl", function() {
                    expectTitleTextAria('role', 'presentation');
                });
                
                it("should have FocusableContainer disabled", function() {
                    expect(header.enableFocusableContainer).toBe(false);
                });
                
                describe("after adding tools", function() {
                    beforeEach(function() {
                        header.addTool({ type: 'expand' });
                    });
                    
                    it("should change ariaRole to toolbar", function() {
                        expect(header.ariaRole).toBe('toolbar');
                    });
                    
                    it("should change header el role to toolbar", function() {
                        expectAria('role', 'toolbar');
                    });
                    
                    it("should not change titleCmp el role", function() {
                        expectTitleAria('role', 'presentation');
                    });
                    
                    it("should not change titleCmp textEl role", function() {
                        expectTitleTextAria('role', 'presentation');
                    });
                    
                    it("should enable FocusableContainer", function() {
                        expect(header.enableFocusableContainer).toBe(true);
                    });
                });
            });
            
            describe("accordion header", function() {
                beforeEach(function() {
                    makeHeader({ isAccordionHeader: true });
                });
                
                it("should have presentation ariaRole", function() {
                    expect(header.ariaRole).toBe('presentation');
                });
                
                it("should have presentation role on header el", function() {
                    expectAria('role', 'presentation');
                });
                
                it("should have tab role on titleCmp el", function() {
                    expectTitleAria('role', 'tab');
                });
                
                it("should have no role on titleCmp textEl", function() {
                    expectNoTitleTextAria('role');
                });
                
                it("should have FocusableContainer disabled", function() {
                    expect(header.enableFocusableContainer).toBe(false);
                });
                
                describe("after adding tools", function() {
                    beforeEach(function() {
                        header.addTool({ type: 'pin' });
                    });
                    
                    it("should not change ariaRole", function() {
                        expect(header.ariaRole).toBe('presentation');
                    });
                    
                    it("should not change header el role", function() {
                        expectAria('role', 'presentation');
                    });
                    
                    it("should not change titleCmp el role", function() {
                        expectTitleAria('role', 'tab');
                    });
                    
                    it("should not change titleCmp textEl role", function() {
                        expectNoTitleTextAria('role');
                    });
                    
                    it("should not enable FocusableContainer", function() {
                        expect(header.enableFocusableContainer).toBe(false);
                    });
                });
            });
        });
        
        describe("with tools", function() {
            describe("ordinary header", function() {
                beforeEach(function() {
                    makeHeader({
                        tools: [{
                            type: 'close'
                        }]
                    });
                });
                
                it("should have toolbar ariaRole", function() {
                    expect(header.ariaRole).toBe('toolbar');
                });
                
                it("should have toolbar role on header el", function() {
                    expectAria('role', 'toolbar');
                });
                
                it("should have presentation role on titleCmp", function() {
                    expectTitleAria('role', 'presentation');
                });
                
                it("should have presentation role on titleCmp textEl", function() {
                    expectTitleTextAria('role', 'presentation');
                });
                
                it("should have FocusableContainer enabled", function() {
                    expect(header.enableFocusableContainer).toBe(true);
                });
            });
            
            describe("accordion header", function() {
                beforeEach(function() {
                    makeHeader({
                        isAccordionHeader: true,
                        tools: [{
                            type: 'collapse'
                        }]
                    });
                });
                
                it("should have presentation ariaRole", function() {
                    expect(header.ariaRole).toBe('presentation');
                });
                
                it("should have presentation role on header el", function() {
                    expectAria('role', 'presentation');
                });
                
                it("should have tab role on titleCmp el", function() {
                    expectTitleAria('role', 'tab');
                });
                
                it("should have no role on titleCmp textEl", function() {
                    expectNoTitleTextAria('role');
                });
                
                it("should have FocusableContainer disabled", function() {
                    expect(header.enableFocusableContainer).toBe(false);
                });
            });
        });
    });
});
