describe("Ext.plugin.Viewport", function() {
    var c, DomScrollDescribe = Ext.supports.touchScroll ? xdescribe : describe;

    function makeComponent(cfg, ComponentClass) {
        c = new (ComponentClass || Ext.Component)(Ext.apply({
            renderTo: Ext.getBody(),
            plugins: 'viewport'
        }, cfg));
    }

    afterEach(function() {
        c = Ext.destroy(c);
    });

    describe("size model", function() {
        it("should be configured before render", function() {
            var sizeModel;

            makeComponent({
                listeners: {
                    beforerender: function(c) {
                        sizeModel = c.getSizeModel();
                    }
                }
            });
            expect(sizeModel.width.configured).toBe(true);
            expect(sizeModel.height.configured).toBe(true);
        });

        it("should be configured after render", function() {
            makeComponent();
            var sizeModel = c.getSizeModel();
            expect(sizeModel.width.configured).toBe(true);
            expect(sizeModel.height.configured).toBe(true);
        });
    });

    describe("inherited state", function() {
        describe("viewmodel", function() {
            var vm;

            beforeEach(function() {
                vm = new Ext.app.ViewModel({
                    data: {
                        foo: 'bar'
                    }
                });
                makeComponent({
                    viewModel: vm
                });
            });

            afterEach(function() {
                vm = Ext.destroy(vm);
            });

            it("should use the viewmodel on the rootInheritedState", function() {
                expect(Ext.rootInheritedState.viewModel).toBe(vm);
            });

            it("should allow non children of the viewport to inherit the viewmodel", function() {
                var other = new Ext.Component({
                    bind: '{foo}',
                    renderTo: Ext.getBody()
                });
                expect(other.lookupViewModel()).toBe(vm);
                other.destroy();
            });
        });

        describe("session", function() {
            var session;

            beforeEach(function() {
                session = new Ext.data.Session();
                makeComponent({
                    session: session
                });
            });

            afterEach(function() {
                session = Ext.destroy(session);
            });

            it("should use the session on the rootInheritedState", function() {
                expect(Ext.rootInheritedState.session).toBe(session);
            });

            it("should allow non children of the viewport to inherit the session", function() {
                var other = new Ext.Component({
                    renderTo: Ext.getBody()
                });
                expect(other.lookupSession()).toBe(session);
                other.destroy();
            });
        });

        describe("controller", function() {
            var controller;

            beforeEach(function() {
                controller = new Ext.app.ViewController();
                makeComponent({
                    controller: controller
                });
            });

            afterEach(function() {
                controller = null;
            });

            it("should use the controller on the rootInheritedState", function() {
                expect(Ext.rootInheritedState.controller).toBe(controller);
            });

            it("should allow non children of the viewport to inherit the controller", function() {
                var other = new Ext.Component({
                    renderTo: Ext.getBody()
                });
                expect(other.lookupController()).toBe(controller);
                other.destroy();
            });
        });
    });

    describe("destruction", function() {
        it("should not pollute the rootInheritedState with a viewmodel", function() {
            var vm = new Ext.app.ViewModel();
            makeComponent({
                viewModel: vm
            });
            c.destroy();
            expect(Ext.rootInheritedState.viewModel).toBeUndefined();
        });

        it("should not pollute the rootInheritedState with a session", function() {
            var session = new Ext.data.Session();
            makeComponent({
                session: session
            });
            c.destroy();
            expect(Ext.rootInheritedState.session).toBeUndefined();
            session.destroy();
        });

        it("should not pollute the rootInheritedState with a controller", function() {
            var controller = new Ext.app.ViewController();
            makeComponent({
                controller: controller
            });
            c.destroy();
            expect(Ext.rootInheritedState.controller).toBeUndefined();
        });
    });
    
    describe("ARIA attributes", function() {
        beforeEach(function() {
            makeComponent();
        });
        
        it("should assign role=application to the document body", function() {
            expect(Ext.getBody().dom.getAttribute('role')).toBe('application');
        });
    });

    describe('scroll events on auto layout Container viewport', function() {
        var DomScroller = Ext.scroll.DomScroller,
            viewportScrollCount = 0,
            documentScrollCount = 0;

        beforeEach(function() {
            // Gets destroyed by viewports, so restore to initial conditions for tests
            if (!DomScroller.document) {
                DomScroller.document = new DomScroller({
                    x: true,
                    y: true,
                    element: document.body
                });
            };

            document.documentElement.style.height = '500px';
            document.documentElement.style.overflow = 'auto';
            // This must not fire.
            // We can't use a single global listener because different
            // event sources are used on different platforms.
            // We are checking that the global instance is destroyed and fires
            // no events.
            DomScroller.document.on('scroll', function() {
                documentScrollCount++;
            });
            makeComponent({
                scrollable: true,
                style: 'background-color:red',
                items: {
                    xtype: 'component',
                    style: 'background-color:green',
                    height: 5000,
                    width: 100
                }
            }, Ext.Container);
            c.getScrollable().on({
                scroll: function() {
                    viewportScrollCount++;
                }
            });
        });
        afterEach(function() {
            document.documentElement.style.height = document.documentElement.style.overflow = document.body.style.backgroundColor = '';
        });
        
        it('should only fire one global scroll event per scroll', function() {
            c.scrollTo(null, 500);

            // Wait for potentially asynchronous scroll events to fire.
            waits(100);

            runs(function() {
                // Document scroller must have been destroyed
                expect(DomScroller.document == null).toBe(true);

                expect(viewportScrollCount).toBe(1);

                // We must have received no scroll events from the document scroller
                expect(documentScrollCount).toBe(0);
            });
        });
    });

    describe('scroll events on auto layout Panel Viewport', function() {
        var DomScroller = Ext.scroll.DomScroller,
            viewportScrollCount = 0,
            documentScrollCount = 0;

        beforeEach(function() {
            // Gets destroyed by viewports, so restore to initial conditions for tests
            if (!DomScroller.document) {
                DomScroller.document = new DomScroller({
                    x: true,
                    y: true,
                    element: document.body
                });
            };

            document.documentElement.style.height = '500px';
            document.documentElement.style.overflow = 'auto';
            // This must not fire.
            // We can't use a single global listener because different
            // event sources are used on different platforms.
            // We are checking that the global instance is destroyed and fires
            // no events.
            DomScroller.document.on('scroll', function() {
                documentScrollCount++;
            });
            makeComponent({
                scrollable: true,
                items: {
                    xtype: 'component',
                    height: 5000,
                    width: 100
                }
            }, Ext.panel.Panel);
            c.getScrollable().on({
                scroll: function() {
                    viewportScrollCount++;
                }
            });
        });
        afterEach(function() {
            document.documentElement.style.height = document.documentElement.style.overflow = document.body.style.backgroundColor = '';
        });
        
        it('should only fire one global scroll event per scroll', function() {
            c.scrollTo(null, 500);

            // Wait for potentially asynchronous scroll events to fire.
            waits(100);

            runs(function() {
                // Document scroller must have been destroyed
                expect(DomScroller.document == null).toBe(true);

                expect(viewportScrollCount).toBe(1);

                // We must have received no scroll events from the document scroller
                expect(documentScrollCount).toBe(0);
            });
        });
    });

    DomScrollDescribe('Global DOM scroll events on auto layout Container viewport', function() {
        var DomScroller = Ext.scroll.DomScroller,
            viewportScrollCount = 0,
            documentScrollCount = 0;

        beforeEach(function() {
            // Gets destroyed by viewports, so restore to initial conditions for tests
            if (!DomScroller.document) {
                DomScroller.document = new DomScroller({
                    x: true,
                    y: true,
                    element: document.body
                });
            };

            // This must not fire.
            // We can't use a single global listener because different
            // event sources are used on different platforms.
            // We are checking that the global instance is destroyed and fires
            // no events.
            DomScroller.document.on('scroll', function() {
                documentScrollCount++;
            });
            Ext.on('scroll', function() {
                viewportScrollCount++;
            });
            makeComponent({
                scrollable: true,
                items: {
                    xtype: 'component',
                    height: 5000,
                    width: 100
                }
            }, Ext.Container);
        });
        
        it('should only fire one global scroll event per scroll', function() {
            c.scrollTo(null, 500);

            // Wait for potentially asynchronous scroll events to fire.
            waits(100);

            runs(function() {
                // Document scroller must have been destroyed
                expect(DomScroller.document == null).toBe(true);

                expect(viewportScrollCount).toBe(1);

                // We must have received no scroll events from the document scroller
                expect(documentScrollCount).toBe(0);
            });
        });
    });

    DomScrollDescribe('Global DOM scroll events on auto layout Panel Viewport', function() {
        var DomScroller = Ext.scroll.DomScroller,
            viewportScrollCount = 0,
            documentScrollCount = 0;

        beforeEach(function() {
            // Gets destroyed by viewports, so restore to initial conditions for tests
            if (!DomScroller.document) {
                DomScroller.document = new DomScroller({
                    x: true,
                    y: true,
                    element: document.body
                });
            };

            // This must not fire.
            // We can't use a single global listener because different
            // event sources are used on different platforms.
            // We are checking that the global instance is destroyed and fires
            // no events.
            DomScroller.document.on('scroll', function() {
                documentScrollCount++;
            });
            Ext.on('scroll', function() {
                viewportScrollCount++;
            });
            makeComponent({
                scrollable: true,
                items: {
                    xtype: 'component',
                    height: 5000,
                    width: 100
                }
            }, Ext.panel.Panel);
        });
        
        it('should only fire one global scroll event per scroll', function() {
            c.scrollTo(null, 500);

            // Wait for potentially asynchronous scroll events to fire.
            waits(100);

            runs(function() {
                // Document scroller must have been destroyed
                expect(DomScroller.document == null).toBe(true);

                expect(viewportScrollCount).toBe(1);

                // We must have received no scroll events from the document scroller
                expect(documentScrollCount).toBe(0);
            });
        });
    });
});