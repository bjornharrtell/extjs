describe("Ext.window.Window", function() {
    var win, container;
    
    function makeWindow(config, noShow) {
        config = Ext.apply(config || {}, {
            width: 200,
            height: 200,
            x: 10,
            y: 10
        });
        
        win = new Ext.window.Window(config);
        
        if (!noShow) {
            win.show();
        }
        
        return win;
    }

    afterEach(function(){
        if (win) {
            win.hide();
            Ext.destroy(win);
            win = null;
        }
        if (container) {
            Ext.destroy(container);
            container = null;
        }
    });
    
    describe("expandOnShow", function() {
        it("should expand a collapsed window on show with expandOnShow: true", function() {
            win = new Ext.window.Window({
                title: 'Foo',
                collapsible: true,
                collapsed: true,
                width: 200,
                height: 100,
                expandOnShow: true
            });    
            win.show();
            expect(win.getHeight()).toBe(100);
            expect(win.collapsed).toBe(false);
        });
        
        it("should leave a collapsed window on show with expandOnShow: false", function() {
            win = new Ext.window.Window({
                title: 'Foo',
                collapsible: true,
                collapsed: true,
                width: 200,
                height: 100,
                expandOnShow: false
            });    
            win.show();
            expect(win.getHeight()).toBe(win.header.getHeight());
            expect(win.collapsed).toBe(true);
        });  
    });

    describe('toFront on mousedown', function() {
        it('should bring to front on mousedown on the header', function() {
            var win1 = new Ext.window.Window({
                title: 'Foo',
                collapsible: true,
                collapsed: true,
                width: 200,
                height: 100,
                expandOnShow: true
            });
            win = new Ext.window.Window({
                title: 'Foo',
                collapsible: true,
                collapsed: true,
                width: 200,
                height: 100,
                expandOnShow: true
            });
            win.show();
            win1.show();

            // The last one shown will be on top
            expect(win1.zIndexManager.getActive() === win1);

            // Mousedown event should be captured by Floating and should trigger a toFront
            // before the DragTracker gets a chance to cancel it.
            jasmine.fireMouseEvent(win.header.el.dom, 'mousedown');

            // win should be at the front now
            expect(win1.zIndexManager.getActive() === win);
            Ext.destroy(win1);
        });
    });

    describe("shadow", function() {
        it("should sync the shadow on layout", function() {
            win = new Ext.window.Window({
                title: 'Window',
                items: [{
                    xtype: 'textfield',
                    width: 200
                }]
            });

            win.showAt([0, 0]);
            win.updateLayout();
            
            var winWidth = win.getWidth();
            var w = win.el.shadow.el.getWidth();

            if (Ext.isIE8) {
                expect(w).toBe(winWidth + 9);
            }
            else {
                expect(w).toBe(winWidth);
            }
        });
        
        it("should hide the shadow on hide to a target", function() {
            var el = Ext.getBody().appendChild({}),
                windowHidden = false;

            win = new Ext.window.Window({
                title: 'Window',
                items: [{
                    xtype: 'textfield',
                    width: 200
                }]
            });

            win.showAt([0, 0]);

            // Shadow should be visible
            expect(win.el.shadow.hidden).toBe(false);

            // Hide with animation to a target element
            win.hide(el, function() {
                windowHidden = true;
            });

            // Wait for the animation to finish
            waitsFor(function() {
                return windowHidden;
            });

            runs(function() {
                // Shadow should be hidden
                expect(win.el.shadow.hidden).toBe(true);
                el.destroy();
            });
        });
    });

    describe("animations & setPagePosition", function(){
        it("should normalize position to 'renderTo' element", function(){
            var fxQueue;
            runs(function(){
                container = Ext.widget({
                    xtype: 'panel',
                    x: 20,
                    y: 10,
                    width: 500,
                    height: 500,
                    renderTo: Ext.getBody(),
                    layout: 'fit',
                    items: [{
                        id: 'panel',
                        tbar: [{
                            id: 'button',
                            text: 'Go'
                        }]
                    }]
                });

                win = new Ext.window.Window({
                    renderTo: Ext.getCmp('panel').body.dom,
                    title: 'window',
                    width: 300,
                    height: 300,
                    x: 0,
                    y: 0
                }).show(Ext.getCmp('button').getEl().dom);
                fxQueue = Ext.fx.Manager.getFxQueue(win.ghostPanel.id);
            });

            waitsFor(function(){
                return fxQueue.length === 0;
            });

            runs(function(){
                var pos = win.el.getXY(),
                    cpos = container.el.getXY(),
                    tbar = container.items.first().dockedItems.first(),
                    tborder = 2,    // container top + panel top
                    lborder = 2;    // container left + panel left

                expect(pos[0]).toBe(cpos[0] + lborder);
                expect(pos[1]).toBe(cpos[1] + tbar.getHeight() + tborder);
            });
        });
    });

    describe('autoShow in a Panel', function() {
        it('Should show the Window inside the Panel', function() {
            container = Ext.create('Ext.panel.Panel', {
                renderTo: document.body,
                height: 200,
                width: 200,
                title: 'Panel',
                items: [{
                    id: 'constrainedWin',
                    xtype: 'window',
                    title: 'Constrained Window',
                    height: 100,
                    width: 100,
                    constrain: true,
                    autoShow: true
                }]
            });
            win = Ext.getCmp('constrainedWin');
            expect(container.body.getRegion().contains(win.el.getRegion())).toBe(true);
        });
    });
    
    describe('constrained in a Panel', function() {
        it('Should not move when the container or window is resized', function() {
            var pos;

            container = Ext.create('Ext.panel.Panel', {
                renderTo: document.body,
                height: 200,
                width: 200,
                title: 'Panel',
                items: [{
                    id: 'constrainedWin',
                    xtype: 'window',
                    title: 'Constrained Window',
                    height: 100,
                    width: 100,
                    constrain: true,
                    autoShow: true
                }]
            });
            win = Ext.getCmp('constrainedWin');
            pos = win.el.getXY();

            // Resize parent, and position should not change
            container.setHeight(220);
            expect(win.el.getXY()).toEqual(pos);
            
            // Resize browser window, and position should not change
            Ext.globalEvents.fireResize();
            expect(win.el.getXY()).toEqual(pos);

            // Test when only constraining the header
            win.constrainHeader = true;

            // Resize parent, and position should not change
            container.setHeight(240);
            expect(win.el.getXY()).toEqual(pos);
            
            // Resize browser window, and position should not change
            Ext.globalEvents.fireResize();
            expect(win.el.getXY()).toEqual(pos);
        });
        it('Should apply constraint insets and not allow moving past them', function() {
            var cw,ww,x,y,box,diff;

            container = Ext.create('Ext.panel.Panel', {
                renderTo: document.body,
                height: 200,
                width: 200,
                items: [{
                    id: 'constrainedWin',
                    xtype: 'window',
                    title: 'Constrained Window',
                    height: 100,
                    width: 100,
                    constraintInsets: '20 -20 -20 20',
                    constrain: true,
                    autoShow: true
                }]
            });
            win = Ext.getCmp('constrainedWin');
            win.setPosition([0,0]);
            x = win.getLocalX();
            y = win.getLocalY();
            cw = container.getWidth();
            ww = win.getWidth(),
            box = Ext.Element.parseBox(win.constraintInsets);
            // We need to subtract 1 because the position
            // is constraintInset exclusive
            diff = (cw - ww - x - 1); 
            
            // Testing top left            
            win.setPosition([-500,-500]);
            expect(win.getLocalXY()).toEqual([x,y]);
            // Testing top right
            win.setPosition([500,-500]);
            expect(win.getLocalXY()).toEqual([x+diff-box.left,y]);

            // Testing bottom left
            win.setPosition([-500,500]);
            expect(win.getLocalXY()).toEqual([x,y+diff-box.top]);

            // Testing bottom right
            win.setPosition([500,500]);
            expect(win.getLocalXY()).toEqual([x+diff+box.right,y+diff+box.bottom]);
        });
    });
    
    describe('maximize/restore', function() {
        it('should not throw an error if maximizing with no header', function() {
            win = new Ext.window.Window({
                height: 100, width: 100, header: false, maximized: true
            });
            expect(function() { win.show() }).not.toThrow();

            // If maximizing a headerless window did not throw an error, we're good (EXTJSIV-8820)
        });

        it("should be able to configured as maximized with no dimensions", function() {
            win = new Ext.window.Window({
                title: 'Foo',
                maximized: true
            });
            win.show();
            expect(win.getWidth()).toBe(Ext.dom.Element.getViewportWidth());
            expect(win.getHeight()).toBe(Ext.dom.Element.getViewportHeight());
        });

        it("should not cause an exception when configuring with maximized: true & constrainHeader: true", function() {
            win = new Ext.window.Window({
                title: 'Foo',
                maximized: true,
                constrainHeader: true
            });
            expect(function() {
                win.show();
            }).not.toThrow();
            expect(win.getWidth()).toBe(Ext.dom.Element.getViewportWidth());
            expect(win.getHeight()).toBe(Ext.dom.Element.getViewportHeight());
        });
        
        describe("tools", function(){
            beforeEach(function() {
                win = new Ext.window.Window({
                    width: 100,
                    height: 100,
                    title: 'Win',
                    collapsible: true,
                    maximizable: true,
                    autoShow: true
                });
                win.maximize();
            });
            
            describe("maximizing", function() {
                it("should change the maximize tool's type to 'restore'", function(){
                    expect(win.tools.maximize.type).toBe('restore');
                });

                it("should hide the collapse tool", function(){
                    expect(win.collapseTool.isVisible()).toBe(false);
                });
            });
            
            describe("restoring", function() {
                it("should change the maximize tool's type back to 'mazimize'", function(){
                    win.restore();
                    expect(win.tools.maximize.type).toBe('maximize');
                });

                it("should show the collapse tool", function(){
                    win.restore();
                    expect(win.collapseTool.isVisible()).toBe(true);
                });
            });
        });
        
        describe("events", function(){
            beforeEach(function() {
                win = new Ext.window.Window({
                    width: 100,
                    height: 100,
                    title: 'Win',
                    collapsible: true,
                    maximizable: true,
                    autoShow: true
                });
            });
            
            it("should fire a maximize event and pass the window", function(){
                var theWin;
                
                win.on('maximize', function(arg) {
                    theWin = arg;
                });    
                win.maximize();
                expect(theWin).toBe(win);
            });
            
            it("should not fire an event if the window is already maximized", function(){
                var called = false;
                   
                win.maximize();
                win.on('maximize', function() {
                    called = true;
                }); 
                win.maximize();
                expect(called).toBe(false);
            });
            
            it("should fire a restore event and pass the window", function(){
                var theWin;
                
                win.on('restore', function(arg) {
                    theWin = arg;
                });    
                win.setPosition(100, 100);
                win.maximize();
                expect(win.getPosition()).toEqual([0,0]);
                win.restore();
                expect(win.getPosition()).toEqual([100,100]);
                expect(theWin).toBe(win);
            });
            
            it("should not fire an event if the window is already restored", function(){
                var called = false;

                win.maximize();
                win.restore();
                win.on('restore', function() {
                    called = true;
                }); 
                win.restore();
                expect(called).toBe(false);
            });
        });
        
        describe("sizing", function(){
            it("should fill the container when maximizing", function(){
                win = new Ext.window.Window({
                    width: 100,
                    height: 100,
                    title: 'Win',
                    maximizable: true,
                    autoShow: true
                });
                win.maximize();
                expect(win.getSize()).toEqual(Ext.getBody().getViewSize());
            });
            
            it("should restore to the previous size when configured", function(){
                win = new Ext.window.Window({
                    width: 100,
                    height: 100,
                    title: 'Win',
                    maximizable: true,
                    autoShow: true
                });
                win.maximize();
                win.restore();
                var size = win.getSize();
                expect(size.width).toBe(100);
                expect(size.height).toBe(100);
            });
            
            // TODO Re-enable when https://sencha.jira.com/browse/EXTJS-18476 is completed
            (Ext.isIE8 ? xit : it)("should restore to the previous percentage size when configured", function() {
                win = new Ext.window.Window({
                    width: '60%',
                    height: '30%',
                    title: 'Win',
                    maximizable: true,
                    autoShow: true
                });
                
                var initSize = win.getSize();
                win.maximize();
                win.restore();
                
                var size = win.getSize();
                expect(size.width).toBe(initSize.width);
                expect(size.height).toBe(initSize.height);
            });

            it("should restore a shrink wrapped height", function(){
                win = new Ext.window.Window({
                    width: 100,
                    title: 'Win',
                    maximizable: true,
                    autoShow: true,
                    items: [{
                        xtype: 'component',
                        style: 'border: 1px solid red;',
                        html: '<div style="height: 98px;"></div>'
                    }, {
                        xtype: 'component',
                        style: 'border: 1px solid blue;',
                        html: '<div style="height: 98px;"></div>'
                    }]
                });
                var frameSize = win.getHeight() - 200;
                win.maximize();
                win.items.last().hide();
                win.restore();
                expect(win.getHeight()).toBe(frameSize + 100);
            });
            
            it("should restore a shrink wrapped width", function(){
                win = new Ext.window.Window({
                    height: 100,
                    title: 'Win',
                    maximizable: true,
                    autoShow: true,
                    items: [{
                        xtype: 'component',
                        style: 'border: 1px solid red;',
                        html: '<div style="width: 48px;"></div>'
                    }, {
                        xtype: 'component',
                        style: 'border: 1px solid blue;',
                        html: '<div style="width: 98px;"></div>'
                    }]
                });
                var frameSize = win.getWidth() - 100;
                win.maximize();
                win.items.last().hide();
                win.restore();
                expect(win.getWidth()).toBe(frameSize + 50);
            });
            
            it("should restore the position", function(){
                win = new Ext.window.Window({
                    width: 100,
                    height: 100,
                    title: 'Win',
                    maximizable: true,
                    autoShow: true,
                    x: 40,
                    y: 70
                });
                win.maximize();
                win.restore();
                var pos = win.getPosition();
                expect(pos[0]).toBe(40);
                expect(pos[1]).toBe(70);
            });
        });

        describe('in a panel', function () {
            // See EXTJS-13923, EXTJS-14076.
            var panel, panelBody, borderTop, winXY;

            function toggle(n) {
                while (n) {
                    expect(winXY).toEqual(win.getXY());
                    win.maximize();
                    win.restore();
                    expect(winXY).toEqual(win.getXY());
                    n--;
                }
            }

            beforeEach(function () {
                panel = Ext.widget({
                    xtype: 'panel',
                    title: 'mypanel',
                    style: {
                        position: 'absolute',
                        top: 100,
                        left: 100
                    },
                    height: 500,
                    width: 500,
                    items: [{
                        xtype: 'window',
                        width: 100,
                        height: 100,
                        title: 'Win',
                        constrainHeader: true,
                        maximizable: true,
                        autoShow: true
                    }],
                    renderTo: Ext.getBody()
                });

                panelBody = panel.body;
                win = panel.down('window');
                borderTop = parseInt(win.header.el.getStyle('border-top'));
            });

            afterEach(function () {
                panel = panelBody = borderTop = winXY = Ext.destroy(panel);
            });

            it('should not inherit absolute positions from its floatParent when maximized', function () {
                // When maximized, the window header should be flush against the bottom of the panel header.
                win.maximize();

                expect(win.getY()).toBe(panelBody.getY() + panelBody.getBorderWidth('t'));
            });

            it('should retain the same resize position when toggling maximize/restore', function () {
                winXY = win.getXY();

                toggle(8);
            });
        });
    });

    describe('destruction during dragging', function() {
            beforeEach(function() {
                win = new Ext.window.Window({
                    title: 'Drag Me',
                    height: 100,
                    width: 300,
                    x: 0,
                    y: 0
                });
                win.show();
            });

        it("should tolerate destruction during dragging", function(){
            var offset = 5;

            runs(function(){
                jasmine.fireMouseEvent(win.header.el, 'mouseover', offset, offset);
                jasmine.fireMouseEvent(win.header.el, 'mousedown', offset, offset);
                jasmine.fireMouseEvent(win.header.el, 'mousemove', 100, 0);
            });

            waits(1);

            runs(function() {
                win.destroy();

                // Continue mousemove dragging after destroy
                jasmine.fireMouseEvent(document.body, 'mousemove', 100, 0);
                jasmine.fireMouseEvent(document.body, 'mouseup', 200, 0);
            });

            // let the browser process everything
            waits(1);

            runs(function(){
                // It should continue running to this point with no errors
                expect(win.destroyed).toBe(true);
            });
        });
    });

    it("should maintain the correct titlePosition while dragging", function() {
        // https://sencha.jira.com/browse/EXTJS-13776
        win = Ext.widget({
            xtype: 'window',
            renderTo: Ext.getBody(),
            height: 100,
            width: 300,
            closable: true,
            maximizable: true,
            tools: [{type: 'pin'}],
            header: {
                title: 'Title',
                titlePosition: 2
            }
        }).show();

        win.ghost();

        var ghostHeader = win.ghostPanel.header;

        expect(ghostHeader.items.indexOf(ghostHeader.titleCmp)).toBe(2);

        win.destroy();
    });

    it("should correctly render the minimize/maximize tools when there is an iconCls present", function() {
        // https://sencha.jira.com/browse/EXTJS-13806
        win = Ext.create({
            xtype: 'window',
            renderTo: document.body,
            title: 'Window',
            iconCls: 'foo',
            height: 200,
            width: 200,
            maximizable: true,
            minimizable: true
        }).show();

        var header = win.header;

        expect(header.items.getAt(1).type).toBe('minimize');
        expect(header.items.getAt(2).type).toBe('maximize');
    });

    describe("defaultFocus", function() {
        var waitForFocus = jasmine.waitForFocus,
            focusAndWait = jasmine.focusAndWait,
            expectFocused = jasmine.expectFocused,
            cmp;
        
        afterEach(function() {
            cmp = null;
        });

        it("should accept a component instance", function() {
            cmp = new Ext.form.field.Text();
            
            makeWindow({
                defaultFocus: cmp,
                items: cmp
            });
            
            waitForFocus(cmp);
            
            expectFocused(cmp);
        });

        describe("with a number", function() {
            it("should focus the nth button", function() {
                makeWindow({
                    defaultFocus: 1,
                    buttons: [{
                        text: 'A'
                    }, {
                        text: 'B',
                        itemId: 'b'
                    }]
                }, true);
                
                cmp = win.down('#b');
                
                win.show();
                
                waitForFocus(cmp);
                
                expectFocused(cmp);
            });

            it("should focus the window if there is no button index", function() {
                makeWindow({
                    defaultFocus: 10,
                    defaultType: 'textfield',
                    buttons: [{
                        text: 'Foo'
                    }]
                });
                
                waitForFocus(win);
                
                expectFocused(win);
            });
        });

        describe("with a string", function() {
            it("should match the itemId of a child component", function() {
                makeWindow({
                    defaultFocus: 'bar',
                    defaultType: 'textfield',
                    items: [{
                        itemId: 'foo'
                    }, {
                        itemId: 'bar'
                    }, {
                        itemId: 'baz'
                    }]
                });
                
                cmp = win.down('#bar');
                
                waitForFocus(cmp);
                
                expectFocused(cmp);
            });

            it("should match a child selector", function() {
                makeWindow({
                    defaultFocus: '[foo=3]',
                    defaultType: 'textfield',
                    items: [{
                        itemId: 'foo',
                        foo: 1
                    }, {
                        itemId: 'bar',
                        foo: 2
                    }, {
                        itemId: 'baz',
                        foo: 3
                    }]
                });
                
                cmp = win.down('#baz');
                
                waitForFocus(cmp);
                
                expectFocused(cmp);
            });
            
            it("should allow an xtype#id selector", function() {
                makeWindow({
                    defaultFocus: 'textfield#bar',
                    defaultType: 'textfield',
                    items: [{
                        itemId: 'foo',
                        foo: 1
                    }, {
                        itemId: 'bar',
                        foo: 2
                    }, {
                        itemId: 'baz',
                        foo: 3
                    }]
                });
                
                cmp = win.down('#bar');
                
                waitForFocus(cmp);
                
                expectFocused(cmp);
            });

            it("should focus the window if the selector does not match", function() {
                makeWindow({
                    defaultFocus: '#notthere',
                    defaultType: 'textfield',
                    items: [{
                        itemId: 'foo'
                    }, {
                        itemId: 'bar'
                    }, {
                        itemId: 'baz'
                    }]
                });
                
                waitForFocus(win);
                
                expectFocused(win);
            });
        });

        it("it should not throw an error when the defaultFocus is a component and a loadmask is shown", function() {
            makeWindow({
                defaultFocus: 'username',
                items: [{
                    xtype: 'textfield',
                    itemId: 'username'
                }]
            });
            
            cmp = win.down('#username');
            
            waitForFocus(cmp);
            
            runs(function() {
                expect(function() {
                    win.setLoading(true);
                }).not.toThrow();
            });
        });
        
        describe("when header is clicked", function() {
            var btn;
            
            beforeEach(function() {
                btn = new Ext.button.Button({
                    renderTo: Ext.getBody(),
                    text: 'button'
                });
                
                makeWindow({
                    draggable: false,
                    defaultFocus: 'textfield',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'foo',
                        itemId: 'foo'
                    }]
                });
                
                cmp = win.down('#foo');
                
                focusAndWait(btn);
            });
            
            afterEach(function() {
                Ext.destroy(btn);
                btn = null;
            });
            
            it("should focus defaultFocus when header is clicked", function() {
                runs(function() {
                    jasmine.fireMouseEvent(win.header.el, 'click');
                });
                
                expectFocused(cmp);
            });
        });
    });
    
    describe("tab guards", function() {
        var docBody = Ext.getBody(),
            before, after;
        
        afterEach(function() {
            Ext.destroy(before, after);
            before = after = null;
        });
        
        describe("initTabGuards", function() {
            function expectTabbables(numberOfEls) {
                var tabbables = win.el.findTabbableElements({
                    skipSelf: true
                });
                
                expect(tabbables.length).toBe(numberOfEls);
            }
            
            describe("initially empty window", function() {
                beforeEach(function() {
                    makeWindow({
                        title: 'frobbe',
                        closable: false
                    });
                });
                
                it("should not set up tab guards", function() {
                    expectTabbables(0);
                });
                
                it("should add tab guards when tool is added", function() {
                    win.addTool({ type: 'pin' });
                    
                    expectTabbables(3);
                });
                
                it("should add tab guards when an item is docked", function() {
                    win.addDocked({
                        xtype: 'button',
                        text: 'foo'
                    });
                    
                    expectTabbables(3);
                });
                
                it("should add tab guards when a child component is added", function() {
                    win.add({
                        xtype: 'textfield',
                        fieldLabel: 'Throbbe'
                    });
                    
                    expectTabbables(3);
                });
            });
            
            describe("window becoming empty", function() {
                describe("removing items", function() {
                    it("should disarm tab guards when last item is removed", function() {
                        makeWindow({
                            title: 'guzzard',
                            closable: false,
                            items: [{
                                xtype: 'button',
                                text: 'frobbe'
                            }]
                        });
                        
                        var btn = win.down('button');
                        
                        win.remove(btn, true);
                        
                        expectTabbables(0);
                    });
                    
                    it("should disarm tab guards when last docked item is removed", function() {
                        makeWindow({
                            title: 'blerg',
                            closable: false,
                            dockedItems: [{
                                xtype: 'button',
                                text: 'sploosh!'
                            }]
                        });
                        
                        var btn = win.down('button');
                        
                        win.removeDocked(btn, true);
                        
                        expectTabbables(0);
                    });
                });
            });
        });
        
        describe("ARIA attributes", function() {
            beforeEach(function() {
                makeWindow();
            });
            
            function makeAttrSuite(position) {
                describe(position + " guard", function() {
                    var guard;
                    
                    function expectAria(attr, value) {
                        jasmine.expectAriaAttr(guard, attr, value);
                    }
                    
                    function expectNoAria(attr) {
                        jasmine.expectNoAriaAttr(guard, attr);
                    }
                    
                    beforeEach(function() {
                        guard = position === 'top' ? win.tabGuardBeforeEl : win.tabGuardAfterEl;
                    });
                
                    it("should have tabindex", function() {
                        expect(guard.isTabbable()).toBe(true);
                    });
                
                    it("should have button role on the top guard", function() {
                        expectAria('role', 'button');
                    });
            
                    it("should have aria-busy on the top guard", function() {
                        expectAria('aria-busy', 'true');
                    });
                    
                    // It is important that tab guards are not published
                    // to Assistive Technologies as announceable entities,
                    // hence the tests.
                    it("should have no title", function() {
                        expectNoAria('title');
                    });
                    
                    it("should not have aria-label", function() {
                        expectNoAria('aria-label');
                    });
                    
                    it("should not have aria-labelledby", function() {
                        expectNoAria('aria-labelledby');
                    });
                    
                    it("should have no aria-describedby", function() {
                        expectNoAria('aria-describedby');
                    });
                });
            }
            
            makeAttrSuite('top');
            makeAttrSuite('bottom');
        });
        
        // We repeat almost the same set of tests for both modal
        // and non-modal windows under the assumption that things
        // may not go according to plan and focus can somehow
        // get under the skin of the modal mask. This case,
        // however unlikely, should also be handled gracefully.
        function makeTabSuite(modal) {
            var pressTab = jasmine.pressTabKey,
                expectFocused = jasmine.expectFocused,
                tool, fooField, barField, okBtn;
            
            describe("tabbing with focusables inside, modal: " + modal, function() {
                beforeEach(function() {
                    before = new Ext.button.Button({
                        renderTo: docBody,
                        id: 'beforeButton',
                        text: 'before'
                    });
                    
                    makeWindow({
                        title: 'foo',
                        
                        modal: modal,
                        
                        // This will add tools and make the header a toolbar;
                        // we need this to test that the top tab guard is indeed
                        // at the top of the tab order above the window header.
                        minimizable: true,
                        maximizable: true,
                        
                        layout: 'form',
                        
                        items: [{
                            xtype: 'textfield',
                            name: 'foo',
                            fieldLabel: 'foo'
                        }, {
                            xtype: 'textfield',
                            name: 'bar',
                            fieldLabel: 'bar'
                        }],
                        
                        // Buttons toolbar is there to test that bottom tab guard
                        // is below it in the tab order.
                        buttons: [{
                            text: 'OK'
                        }, {
                            text: 'Cancel'
                        }]
                    });
                    
                    tool = win.down('tool');
                    fooField = win.down('textfield[name=foo]');
                    barField = win.down('textfield[name=bar]');
                    okBtn = win.down('button[text=OK]');
                    
                    after = new Ext.button.Button({
                        renderTo: docBody,
                        id: 'afterButton',
                        text: 'after'
                    });
                });
                
                describe("from outside the window", function() {
                    it("should tab from before button to the first tool", function() {
                        pressTab(before, true);
                        
                        expectFocused(tool);
                    });
                    
                    it("should shift-tab from after button to the OK button", function() {
                        pressTab(after, false);
                        
                        expectFocused(okBtn);
                    });
                });
                
                describe("from window", function() {
                    it("should tab to the first tool", function() {
                        pressTab(win, true);
                        
                        expectFocused(tool);
                    });
                });
                
                describe("within window", function() {
                    describe("forward", function() {
                        it("should tab from first tool to the foo field", function() {
                            pressTab(tool, true);
                            
                            expectFocused(fooField);
                        });
                        
                        it("should tab from foo field to bar field", function() {
                            pressTab(fooField, true);
                            
                            expectFocused(barField);
                        });
                        
                        it("should tab from bar field to OK button", function() {
                            pressTab(barField, true);
                            
                            expectFocused(okBtn);
                        });
                        
                        it("should tab from OK button back to the first tool", function() {
                            pressTab(okBtn, true);
                            
                            expectFocused(tool);
                        });
                    });
                    
                    describe("backward", function() {
                        it("should shift-tab from Ok button to bar field", function() {
                            pressTab(okBtn, false);
                            
                            expectFocused(barField);
                        });
                        
                        it("should shift-tab from bar field to foo field", function() {
                            pressTab(barField, false);
                            
                            expectFocused(fooField);
                        });
                        
                        it("should shift-tab from foo field to the firs tool", function() {
                            pressTab(fooField, false);
                            
                            expectFocused(tool);
                        });
                        
                        it("should shift-tab from the first tool back to OK button", function() {
                            pressTab(tool, false);
                            
                            expectFocused(okBtn);
                        });
                    });
                });
            });
            
            // Modal window will mask all elements below its own el, so tabbing
            // to and fro does not make any sense
            if (!modal) {
                describe("tabbing with no focusables", function() {
                    beforeEach(function() {
                        before = new Ext.button.Button({
                            renderTo: docBody,
                            id: 'beforeButton',
                            text: 'before'
                        });
                        
                        // This window should have no tools at all
                        makeWindow({
                            title: 'bar',
                            
                            modal: modal,
                            closable: false,
                            draggable: false
                        });
                        
                        after = new Ext.button.Button({
                            renderTo: docBody,
                            id: 'afterButton',
                            text: 'after'
                        });
                    });
                    
                    describe("from outside the window", function() {
                        it("should tab from before button to the after button", function() {
                            pressTab(before, true);
                            
                            expectFocused(after);
                        });
                        
                        it("should shift-tab from after button to the before button", function() {
                            pressTab(after, false);
                            
                            expectFocused(before);
                        });
                    });
                });
            }
        }
        
        // Trapping focus within the window relies on finding next or previous
        // tabbable element, which is done in Element.findTabbableElements().
        // However that method is busted in IE8/9 due to a bug in querySelectorAll()
        // See https://sencha.jira.com/browse/EXTJS-17170
        if (!Ext.isIE9) {
            makeTabSuite(false);
            makeTabSuite(true);
        }
    });
});
