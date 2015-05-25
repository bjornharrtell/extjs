describe("Ext.tab.Tab", function() {
    var tab, card;
    
    function createTab(config) {
        return new Ext.tab.Tab(Ext.apply({}, config));
    }
    
    beforeEach(function() {
        card = {
            title: 'Some title',
            iconCls: 'some-iconCls'
        };
    });
    
    describe("if a card is specified", function() {
        beforeEach(function() {
            spyOn(Ext.tab.Tab.prototype, 'setCard').andCallThrough();
        });
        
        it("should call setCard during initialization", function() {
            createTab({
                card: card
            });
            
            expect(Ext.tab.Tab.prototype.setCard).toHaveBeenCalledWith(card);
        });
    });
    
    describe("setting a card", function() {
        beforeEach(function() {
            tab = createTab();
            
            spyOn(tab, 'setText').andReturn(true);
            spyOn(tab, 'setIconCls').andReturn(true);
            
            tab.setCard(card);
        });
        
        it("should set the title text", function() {
            expect(tab.setText).toHaveBeenCalledWith(card.title);
        });
        
        it("should set the icon class", function() {
            expect(tab.setIconCls).toHaveBeenCalledWith(card.iconCls);
        });
        
        describe("setting the title text", function() {
            describe("if the tab has a specific title", function() {
                beforeEach(function() {
                    tab = createTab({
                        title: 'Specific title'
                    });
                    
                    spyOn(tab, 'setText').andReturn(true);
                });
                
                it("should retain that title", function() {
                    tab.setCard(card);
                    
                    expect(tab.setText).toHaveBeenCalledWith('Specific title');
                });
            });

            describe("if the tab does not have a specific title", function() {
                it("should use the title of the new card", function() {
                    tab.setCard(card);
                    
                    expect(tab.setText).toHaveBeenCalledWith(card.title);
                });
            });
        });

        describe("setting the icon class", function() {
            describe("if the tab has a specific title", function() {
                beforeEach(function() {
                    tab = createTab({
                        iconCls: 'specificCls'
                    });
                    
                    spyOn(tab, 'setIconCls').andReturn(true);
                });
                
                it("should retain that title", function() {
                    tab.setCard(card);
                    
                    expect(tab.setIconCls).toHaveBeenCalledWith('specificCls');
                });
            });

            describe("if the tab does not have a specific title", function() {
                it("should use the title of the new card", function() {
                    tab.setCard(card);
                    
                    expect(tab.setIconCls).toHaveBeenCalledWith(card.iconCls);
                });
            });
        });
    });
    
    describe("activating", function() {
        beforeEach(function() {
            tab = createTab();
        });
        
        it("should set active to true", function() {
            tab.activate();
            expect(tab.active).toBe(true);
        });
        
        it("should fire the activate event with a reference to the tab", function() {
            var args;
            
            tab.on('activate', function() {
                args = arguments;
            }, this);
            
            tab.activate();
            
            expect(args[0]).toEqual(tab);
        });
    });
    
    describe("deactivating", function() {
        it("should set active to false", function() {
            tab.deactivate();
            
            expect(tab.active).toBe(false);
        });
        
        xit("should remove the activeCls from the element", function() {
            tab.deactivate();
            
            expect(tab.additionalCls).not.toContain(tab.activeCls);
        });
        
        it("should fire the deactivate event with a reference to the tab", function() {
            var args;
            
            tab.on('deactivate', function() {
                args = arguments;
            }, this);
            
            tab.deactivate();
            
            expect(args[0]).toEqual(tab);
        });
    });
    
    describe("setting closable", function() {
        it("should set closable to true", function() {
            delete tab.closable;
            
            tab.setClosable(true);
            
            expect(tab.closable).toBe(true);
        });
    });
    
    describe("setting not closable", function() {
        it("should set closable to false", function() {
            delete tab.closable;
            
            tab.setClosable(false);
            
            expect(tab.closable).toBe(false);
        });
        
        xit("should remove the closable class from the tab", function() {
            tab.setClosable(false);
            
            expect(tab.additionalCls).not.toContain(tab.closableCls);
        });
    });
    
    describe("when the close button is clicked", function() {
        beforeEach(function() {
            tab = createTab();
        });
        
        it("should fire the beforeclose event", function() {
            var called = false;
            
            tab.on('beforeclose', function() {
                called = true;
            }, this);
            
            tab.onCloseClick();
            
            expect(called).toBe(true);
        });
        
        it("should fire a close event", function() {
            var called = false;
            
            tab.on('close', function() {
                called = true;
            }, this);
            
            tab.onCloseClick();
            
            expect(called).toBe(true);
        });
        
        describe("if a listener returned false to beforeclose", function() {
            beforeEach(function() {
                tab.on('beforeclose', function() {
                    return false;
                }, this);
            });
            
            it("should not fire a close event", function() {
                var called = false;

                tab.on('close', function() {
                    called = true;
                }, this);

                tab.onCloseClick();

                expect(called).toBe(false);
            });
        });
        
        describe("if there is a configured tabBar", function() {
            var tabBar;
            
            beforeEach(function() {
                tabBar = {
                    closeTab: jasmine.createSpy()
                };
                
                tab = createTab({
                    tabBar: tabBar
                });
            });
            
            it("should call the tabBar's closeTab function", function() {
                tab.onCloseClick();
                
                expect(tabBar.closeTab).toHaveBeenCalledWith(tab);
            });
        });
    });
});
