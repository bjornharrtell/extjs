describe("Ext.menu.CheckItem", function(){

    var menu, c;

    function makeItem(cfg) {
        menu = Ext.widget({
            xtype: 'menu',
            renderTo: document.body,
            items: [
                Ext.apply({
                    xtype: 'menucheckitem'
                }, cfg)
            ]
        });
        c = menu.items.getAt(0);
    }

    afterEach(function(){
        Ext.destroy(menu);
        c = null;
    });

    describe("initial config", function(){

        it("should have the checked property as false by default", function(){
            makeItem();
            expect(c.checked).toBe(false);    
        });

    });
    
    describe("setChecked", function() {
        
        it("should set the checked state on the component", function(){
            makeItem();
            c.setChecked(true);
            expect(c.checked).toBe(true);
            
            c.setChecked(false);
            expect(c.checked).toBe(false);
        });
        
        describe("element classes", function(){
            it("should add the checkedCls and remove uncheckedCls when checking", function(){
                makeItem();
                c.setChecked(true);
                expect(c.el.hasCls(c.checkedCls)).toBe(true);
                expect(c.el.hasCls(c.uncheckedCls)).toBe(false);
            });  
            
            it("should add the uncheckedCls and remove checkedCls when unchecking", function(){
                makeItem({
                    checked: true
                });
                c.setChecked(false);
                expect(c.el.hasCls(c.uncheckedCls)).toBe(true);
                expect(c.el.hasCls(c.checkedCls)).toBe(false);
            });  
        });
        
        describe("events", function() {
            describe("no state change", function() {
                it("should not fire any events setting checked: false when not checked", function() {
                    var called = false;
                    makeItem();
                    c.on('beforecheckchange', function(){
                        called = true;
                    });
                    c.setChecked(false);
                    expect(called).toBe(false);    
                });  
            
                it("should not fire any events setting checked: true when checked", function() {
                    var called = false;
                    makeItem({
                        checked: true
                    });
                    c.on('beforecheckchange', function(){
                        called = true;
                    });
                    c.setChecked(true);
                    expect(called).toBe(false);
                });    
            }); 
            
            describe("supressEvents", function(){
                it("should not fire beforecheckchange", function(){
                    var called = false;
                    makeItem();
                    c.on('beforecheckchange', function(){
                        called = true;
                    });
                    c.setChecked(true, true);
                    expect(called).toBe(false);   
                });  
                
                it("should not fire checkchange", function(){
                    var called = false;
                    makeItem();
                    c.on('checkchange', function(){
                        called = true;
                    });
                    c.setChecked(true, true);
                    expect(called).toBe(false);   
                }); 
                
                it("should not trigger a checkHandler", function(){
                    var called = false;
                    makeItem({
                        checkHandler: function(){
                            called = true;
                        }
                    });
                    c.setChecked(true, true);
                    expect(called).toBe(false);  
                })
            });
            
            describe("veto", function(){
                it("should not trigger a change if beforecheckchange returns false", function(){
                    makeItem();
                    c.on('beforecheckchange', function(){
                        return false;
                    });
                    c.setChecked(true);
                    expect(c.checked).toBe(false);
                })
            });
            
            describe("params", function(){
                it("should fire beforecheckchange with the item and the new checked state", function(){
                    var comp, state;
                    makeItem();
                    c.on('beforecheckchange', function(arg1, arg2){
                        comp = arg1;
                        state = arg2;
                    });
                    c.setChecked(true);
                    expect(comp).toBe(c);
                    expect(state).toBe(true);
                });  
                
                it("should fire checkchange with the item and the new checked state", function(){
                    var comp, state;
                    makeItem();
                    c.on('checkchange', function(arg1, arg2){
                        comp = arg1;
                        state = arg2;
                    });
                    c.setChecked(true);
                    expect(comp).toBe(c);
                    expect(state).toBe(true);
                });
                
                it("should trigger checkHandler with the item and the new checked state", function(){
                    var comp, state;
                    makeItem({
                        checkHandler: function(arg1, arg2){
                            comp = arg1;
                            state = arg2;
                        }
                    });
                    c.setChecked(true);
                    expect(comp).toBe(c);
                    expect(state).toBe(true);
                });
                
                describe("checkHandler scope", function(){
                    it("should default the scope to the component", function(){
                        var scope;
                        makeItem({
                            checkHandler: function(){
                                scope = this;
                            }
                        });
                        c.setChecked(true);
                        expect(scope).toBe(c);
                    });
                    
                    it("should use a passed scope", function(){
                        var o = {}, 
                            scope;
                            
                        makeItem({
                            scope: o,
                            checkHandler: function(){
                                scope = this;
                            }
                        });
                        c.setChecked(true);
                        expect(scope).toBe(o);
                    });
                })
            });
        });
    });
});
