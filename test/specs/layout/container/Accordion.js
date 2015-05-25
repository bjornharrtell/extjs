describe("Ext.layout.container.Accordion", function() {

    describe("single item", function() {
        var panel, child;
        function makePanel(multi, fill) {
            panel = new Ext.panel.Panel({
                width: 100,
                height: 100,
                layout: {
                    type: 'accordion',
                    animate: false,
                    multi: multi,
                    fill: fill === false ? false : true
                },
                items: [{
                    title: 'Child Panel'
                }],
                renderTo: Ext.getBody()
            });
            child = panel.items.getAt(0);
        }

        afterEach(function() {
            panel.destroy();
        });

        describe("single collapse", function() {
            beforeEach(function() {
                makePanel();
            });

            it("should not allow the item to collapse", function() {
                child.collapse();
                expect(child.collapsed).toBe(false);
            });
        });

        describe("multi collapse", function() {
            beforeEach(function() {
                makePanel(true);
            });

            it("should not allow the item to collapse", function() {
                child.collapse();
                expect(child.collapsed).toBe(false);
            });
        });

    });
    
    describe("dynamic items", function(){
        var ct, makeCt, expectCollapsed, expectExpanded;
        
        beforeEach(function(){
            makeCt = function(items, isMulti) {
                ct = new Ext.container.Container({
                    renderTo: document.body,
                    width: 200,
                    height: 400,
                    layout: {
                        type: 'accordion',
                        animate: false,
                        multi: isMulti
                    },
                    items: items
                });    
            };
            
            expectCollapsed = function(index){
                expect(ct.items.getAt(index).collapsed).toBeTruthy();    
            };
            
            expectExpanded = function(index){
                expect(ct.items.getAt(index).collapsed).toBeFalsy();    
            };
        });
        
        afterEach(function(){
            Ext.destroy(ct);
            makeCt = ct = expectExpanded = expectCollapsed = null;
        });
        
        describe("single", function() {
            it("should collapse a dynamic item by default", function(){
                makeCt([{
                    title: 'Default'
                }]);
                var c = new Ext.panel.Panel({
                    title: 'Dynamic'
                });
                ct.add(c);
                expectCollapsed(1);
            });

            it("should be able to expand items that were added dynamically", function() {
                makeCt([{
                    title: 'Default'
                }]);
                var c = new Ext.panel.Panel({
                    title: 'Dynamic'
                });
                ct.add(c);
                c.expand();
                expectCollapsed(0);
                expectExpanded(1);
            });

            it("should be able to expand items that were added dynamically", function() {
                makeCt([{
                    title: 'Default'
                }]);
                var c = new Ext.panel.Panel({
                    title: 'Dynamic'
                });
                ct.add(c);
                c.expand();
                c.collapse();
                expectExpanded(0);
                expectCollapsed(1);
            });

            it("should not expand other items when adding", function() {
                makeCt([{
                    title: 'Expanded'
                }, {
                    title: 'Static - Collapsed'
                }]);
                ct.add({
                    title: 'Dynamic'
                });
                expectExpanded(0);
                expectCollapsed(1);
                expectCollapsed(2);
            });
        });
        
        describe("multi", function(){
            it("should leave an item expanded by default", function(){
                makeCt([{
                    title: 'Default'
                }], true);
                var c = new Ext.panel.Panel({
                    title: 'Dynamic'
                });
                ct.add(c);
                expectExpanded(1);
            });
            
            it("should collapse the item if we specify it explicitly", function(){
                makeCt([{
                    title: 'Default'
                }], true);
                var c = new Ext.panel.Panel({
                    title: 'Dynamic',
                    collapsed: true
                });
                ct.add(c);
                expectCollapsed(1);
            });

            it("should be able to expand items that were added dynamically", function() {
                makeCt([{
                    title: 'Default'
                }], true);
                var c = new Ext.panel.Panel({
                    title: 'Dynamic',
                    collapsed: true
                });
                ct.add(c);
                c.expand();
                expectExpanded(0);
                expectExpanded(1);
            });

            it("should be able to collapse items that were added dynamically", function() {
                makeCt([{
                    title: 'Default'
                }], true);
                var c = new Ext.panel.Panel({
                    title: 'Dynamic',
                    collapsed: true
                });
                ct.add(c);
                c.expand();
                c.collapse();
                expectExpanded(0);
                expectCollapsed(1);
            });
        });
    });
    
    describe("expand/collapse", function(){
        
        var ct, makeCt, expectCollapsed, expectExpanded;
        
        beforeEach(function(){
            makeCt = function(items, multi, fill) {
                ct = new Ext.container.Container({
                    renderTo: document.body,
                    width: 200,
                    height: 400,
                    layout: {
                        type: 'accordion',
                        animate: false,
                        multi: multi,
                        fill: fill === false ? false : true
                    },
                    items: items
                });    
            };
            
            expectCollapsed = function(index){
                var item = ct.items.getAt(index);
                expect(item.collapsed).toBeTruthy();
            };
            
            expectExpanded = function(index){
                var item = ct.items.getAt(index);
                expect(item.collapsed).toBeFalsy();
            };
        });
        
        afterEach(function(){
            Ext.destroy(ct);
            makeCt = ct = expectExpanded = expectCollapsed = null;
        });
        
        var tests = function(fill) {
            describe("single", function(){
                it("should expand the first item by default if none are collapsed: false", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3'
                    }], false, fill);
                    expectExpanded(0);
                });
            
                it("should expand a collapsed: false item by default", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2',
                        collapsed: false
                    }, {
                        title: 'P3'
                    }], false, fill);
                    expectExpanded(1);
                });
            
                it("should expand the first collapsed: false item by default", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2',
                        collapsed: false
                    }, {
                        title: 'P3'
                    }], false, fill);
                    expectExpanded(1);
                    expectCollapsed(2);
                });
            
                it("should expand the next item when collapsing an item", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3'
                    }], false, fill);
                    ct.items.first().collapse();
                    expectCollapsed(0);
                    expectExpanded(1);
                });
            
                it("should expand the previous item when collapsing an item and next is not available", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3',
                        collapsed: false
                    }], false, fill);
                    ct.items.last().collapse();
                    expectCollapsed(2);
                    expectExpanded(1);
                });
            
                it("should collapse the expanded item when expanding an item", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3'
                    }], false, fill);
                    ct.items.last().expand();
                    expectCollapsed(0);
                    expectExpanded(2);
                });
            });
        
            describe("multi", function(){
                it("should have each item expanded unless specified as collapsed", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3'
                    }], true, fill);
                    expectExpanded(0);
                    expectExpanded(1);
                    expectExpanded(2);
                });
            
                it("should collapse any items with collapsed: true", function(){
                    makeCt([{
                        title: 'P1',
                        collapsed: true
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3',
                        collapsed: true
                    }], true, fill);
                    expectExpanded(1);
                });
            
                it("should not modify other items when collapsing an item", function(){
                    makeCt([{
                        title: 'P1'
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3'
                    }], true, fill);
                    ct.items.getAt(1).collapse();
                    expectExpanded(0);
                    expectCollapsed(1);
                    expectExpanded(2);
                });
            
                it("should not modify other items when expanding an item", function(){
                    makeCt([{
                        title: 'P1',
                        collapsed: true
                    }, {
                        title: 'P2'
                    }, {
                        title: 'P3',
                        collapsed: true
                    }], true, fill);
                    ct.items.first().expand();
                    expectExpanded(0);
                    expectExpanded(1);
                    expectCollapsed(2);
                });
            });  
        };
        
        // The behaviour for the accordion should be the same for both fill values
        describe("fill: true", function() {
           tests(true); 
        });
        
        describe("fill: false", function(){
            tests(false);
        });
    });

    describe("show/hide", function(){
        var ct, makeCt, expectCollapsed, expectExpanded;
        
        beforeEach(function(){
            makeCt = function(items) {
                ct = new Ext.container.Container({
                    renderTo: document.body,
                    width: 200,
                    height: 400,
                    layout: {
                        type: 'accordion',
                        animate: false
                    },
                    items: items
                });    
            };
            
            expectCollapsed = function(index){
                var item = ct.items.getAt(index);

                expect(item.collapsed).toBeTruthy();    
                expect(item.getInherited().collapsed).toBeTruthy();
            };
            
            expectExpanded = function(index){
                var item = ct.items.getAt(index);

                expect(item.collapsed).toBeFalsy();    
                expect(item.getInherited().collapsed).toBeFalsy();
            };
        });
        
        afterEach(function(){
            Ext.destroy(ct);
            makeCt = ct = expectExpanded = expectCollapsed = null;
        });

        it("should retain the same state when hidden", function(){
            makeCt([{
                title: 'P1'
            }, {
                title: 'P2',
                collapsed: true
            }, {
                title: 'P3',
                collapsed: true
            }]);
            ct.items.first().hide();
            expectExpanded(0);

            ct.items.last().hide();
            expectCollapsed(2);
        });
    
        it("should not expand when shown when not the first item", function(){
            makeCt([{
                title: 'P1',
                collapsed: true,
                hidden: true
            }, {
                title: 'P2',
                collapsed: true
            }, {
                title: 'P3',
                hidden: true
            }]);
            ct.items.getAt(1).show();
            expectCollapsed(1);

            ct.items.last().show();
            expectCollapsed(2);
        });
    });  

    describe("filling", function(){
        
        var ct, h = 300;
        function makeCt(items, multi, fill) {
            ct = new Ext.container.Container({
                width: 100,
                height: h,
                layout: {
                    type: 'accordion',
                    animate: false,
                    multi: multi,
                    fill: fill === false ? false : true
                },
                items: items,
                renderTo: Ext.getBody()
            });
        }

        afterEach(function() {
            ct.destroy();
            ct = null;
        });
        
        describe("fill: true", function(){
            describe("single", function(){
                it("should stretch the item to the height", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }], false, true);
                    expect(ct.items.first().getHeight()).toBe(h);    
                });
            
                it("should stretch the item to the height - the other panel headers", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }, {
                        title: 'Item 2',
                        html: 'I2'
                    }], false, true);    
                    var left = ct.items.last().getHeight();
                    expect(ct.items.first().getHeight()).toBe(h - left);
                });  
            });
            
            describe("multi", function(){
                it("should stretch the item to the height", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }], true, true);
                    expect(ct.items.first().getHeight()).toBe(h);    
                });
                
                it("should stretch the item to the height - the other panel headers", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }, {
                        title: 'Item 2',
                        html: 'I2'
                    }], true, true);    
                    var left = ct.items.last().getHeight();
                    expect(ct.items.first().getHeight()).toBe(h - left);
                }); 
                
                it("should stretch the both items evenly", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1',
                        collapsed: false
                    }, {
                        title: 'Item 2',
                        html: 'I2',
                        collapsed: false
                    }], true, true);
                    expect(ct.items.first().getHeight()).toBe(h / 2);
                    expect(ct.items.last().getHeight()).toBe(h / 2);        
                });
            });
        });
        
        describe("fill: false", function(){
            describe("single", function(){
                it("should not stretch the item to the height", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }], false, false);
                    // We don't know the exact height, but it should be smaller
                    expect(ct.items.first().getHeight()).toBeLessThan(100);    
                });
            
                it("should not stretch either item height", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }, {
                        title: 'Item 2',
                        html: 'I2'
                    }], false, false);    
                    // We don't know the exact height, but it should be smaller
                    expect(ct.items.first().getHeight()).toBeLessThan(100);
                    expect(ct.items.last().getHeight()).toBeLessThan(100);  
                });  
            });
            
            describe("multi", function(){
                it("should not stretch the item to the height", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }], true, false);
                    // We don't know the exact height, but it should be smaller
                    expect(ct.items.first().getHeight()).toBeLessThan(100);    
                });
                
                it("should not stretch either item height", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1'
                    }, {
                        title: 'Item 2',
                        html: 'I2'
                    }], true, false);    
                    // We don't know the exact height, but it should be smaller
                    expect(ct.items.first().getHeight()).toBeLessThan(100);
                    expect(ct.items.last().getHeight()).toBeLessThan(100);
                }); 
                
                it("should not stretch either item", function(){
                    makeCt([{
                        title: 'Item 1',
                        html: 'I1',
                        collapsed: false
                    }, {
                        title: 'Item 2',
                        html: 'I2',
                        collapsed: false
                    }], true, false);
                    expect(ct.items.first().getHeight()).toBeLessThan(100);
                    expect(ct.items.last().getHeight()).toBeLessThan(100);        
                });
            });
        });
    });
    
    describe("collapseFirst", function(){
        var makePanel, panel, tools = [{
            type: 'print'    
        }, {
            type: 'refresh'
        }];
        beforeEach(function(){
            makePanel = function(items, collapseFirst) {
                panel = new Ext.panel.Panel({
                    width: 100,
                    height: 100,
                    layout: {
                        type: 'accordion',
                        animate: false,
                        collapseFirst: collapseFirst
                    },
                    items: items,
                    renderTo: Ext.getBody()
                });
            };
        }); 
        
        afterEach(function(){
            Ext.destroy(panel);
            makePanel = panel = null;
        });   
        
        it("should use the collapseFirst option on the child items as a default", function(){
            makePanel([{
                collapseFirst: true,
                title: 'A',
                tools: tools
            }, {
                collapseFirst: false,
                title: 'B',
                tools: tools
            }]);    
            var p1 = panel.items.first(),
                p2 = panel.items.last();
                
            expect(p1.tools[0].type).toBe('collapse-top');
            expect(p1.tools[1].type).toBe('print');
            expect(p1.tools[2].type).toBe('refresh');
            
            expect(p2.tools[0].type).toBe('print');
            expect(p2.tools[1].type).toBe('refresh');
            expect(p2.tools[2].type).toBe('expand-bottom');
        });
        
        it("should use the collapseFirst: false on the layout", function(){
             makePanel([{
                title: 'A',
                tools: tools
            }, {
                title: 'B',
                tools: tools
            }], false);    
            
            var p1 = panel.items.first(),
                p2 = panel.items.last();
                
            expect(p1.tools[0].type).toBe('print');
            expect(p1.tools[1].type).toBe('refresh');
            expect(p1.tools[2].type).toBe('collapse-top');
            
            expect(p2.tools[0].type).toBe('print');
            expect(p2.tools[1].type).toBe('refresh');
            expect(p2.tools[2].type).toBe('expand-bottom');
        });
        
        it("should use the collapseFirst: true on the layout", function(){
             makePanel([{
                title: 'A',
                tools: tools
            }, {
                title: 'B',
                tools: tools
            }], true);    
            
            var p1 = panel.items.first(),
                p2 = panel.items.last();
                
            expect(p1.tools[0].type).toBe('collapse-top');
            expect(p1.tools[1].type).toBe('print');
            expect(p1.tools[2].type).toBe('refresh');
            
            expect(p2.tools[0].type).toBe('expand-bottom');
            expect(p2.tools[1].type).toBe('print');
            expect(p2.tools[2].type).toBe('refresh');
        });
        
    });
    
    describe("activeOnTop", function(){
        
        var makePanel, panel;
        
        beforeEach(function(){
            makePanel = function(items, collapseFirst) {
                panel = new Ext.panel.Panel({
                    width: 100,
                    height: 100,
                    layout: {
                        type: 'accordion',
                        animate: false,
                        activeOnTop: true
                    },
                    items: items,
                    renderTo: Ext.getBody()
                });
            };
        }); 
        
        afterEach(function(){
            Ext.destroy(panel);
            makePanel = panel = null;
        });  
        
        it("should move initial active item to the top", function(){
            var c1 = new Ext.panel.Panel({
                    title: 'A'
                }),
                c2 = new Ext.panel.Panel({
                    title: 'B'
                }),
                c3 = new Ext.panel.Panel({
                    title: 'C',
                    collapsed: false 
                });
                
            makePanel([c1, c2, c3]);
            expect(panel.items.indexOf(c3)).toBe(0);
        });
        
        it("should move the item to the top when expanded", function(){
            var c1 = new Ext.panel.Panel({
                    title: 'A'
                }),
                c2 = new Ext.panel.Panel({
                    title: 'B'
                }),
                c3 = new Ext.panel.Panel({
                    title: 'C'
                });
                
            makePanel([c1, c2, c3]);
            c3.expand();
            expect(panel.items.indexOf(c3)).toBe(0);
        });
        
        it("should move the active item to the top when a new item is inserted above it", function(){
            var c1 = new Ext.panel.Panel({
                    title: 'A'
                }),
                c2 = new Ext.panel.Panel({
                    title: 'B'
                }),
                c3 = new Ext.panel.Panel({
                    title: 'C'
                }), newItem;
                
            makePanel([c1, c2, c3]);
            newItem = panel.insert(0, {});
            expect(panel.items.indexOf(c1)).toBe(0);
            expect(panel.items.indexOf(newItem)).toBe(1);
        });
            
    });
    
    describe("removing items", function(){
        it("should expand the first item with multi: false & removing the expanded item", function(){
            var ct = new Ext.container.Container({
                width: 200,
                height: 200,
                layout: {
                    type: 'accordion',
                    animate: false
                },
                items: [{
                    title: 'A'    
                }, {
                    title: 'B'
                }, {
                    title: 'C'
                }]
            });
            ct.remove(0);
            expect(ct.items.first().collapsed).toBe(false);
            ct.destroy();
        });   
        
        it("should not attempt to expand any items when destroying the container", function() {
            var count = 0;
            var ct = new Ext.container.Container({
                width: 200,
                height: 200,
                layout: {
                    type: 'accordion',
                    animate: false
                },
                items: [{
                    title: 'A'   
                }, {
                    title: 'B'
                }, {
                    title: 'C'
                }]
            });
            
            ct.items.each(function(item) {
                item.on('expand', function() {
                    ++count;
                })
            });
            
            ct.destroy();
            expect(count).toBe(0);
        });
    });
    
    describe("misc", function() {
        it("should expand inside a panel", function() {
            var p = new Ext.panel.Panel({
                layout: {
                    type: 'accordion',
                    animate: false
                },
                items: [{
                    title: 'P1'
                }, {
                    title: 'P2'
                }, {
                    title: 'P3'
                }]
            }); 
            
            var outer = new Ext.panel.Panel({
                width: 200,
                height: 200,
                layout: 'fit',
                renderTo: Ext.getBody(),
                items: p
            });
            
               
            p.getComponent(1).expand();
            expect(p.getComponent(0).collapsed).toBe('top');
            outer.destroy();
        });  
    });
});
