xdescribe("Ext.app.Application", function() {
    var Class, app, initCalled, launchCalled;

    beforeEach(function() {
        this.addMatchers({
            toBeFunction: function(expected) {
                var actual = this.actual;

                return expected ? Ext.isFunction(actual) && actual === expected
                     :            Ext.isFunction(actual)
                     ;
            }
        });

        Ext.app.addNamespaces('TestApplication');

        Ext.define('TestApplication.controller.Foo', {
            extend: 'Ext.app.Controller',

            id: 'Foo',

            initialized: false,
            launched:    false,

            init: function() {
                this.initialized = true;
            },

            onLaunch: function() {
                this.launched = true;
            }
        });

        Ext.define('TestApplication.view.Viewport', {
            create: function() {}
        });

        spyOn(Ext.Loader, 'require').andCallThrough();

        spyOn(Ext.Loader, 'injectScriptElement').andReturn();
        spyOn(Ext.Loader, 'onFileLoadError').andReturn();

        Class = Ext.define('TestApplication.Application', {
            extend: 'Ext.app.Application',

            name: 'TestApplication',
            
            namespaces: [
                'TestApplication.Foo',
                'TestApplication.Bar'
            ],

            controllers: [
                'Foo'
            ],

            autoCreateViewport: true,

            init: function() {
                initCalled = true;
            },

            launch: function() {
                launchCalled = true;
            }
        });
    });
    
    afterEach(function() {
        Ext.app.clearNamespaces();

        if (Ext.isIE) {
            window.TestApplication = undefined;
        } else {
            delete window.TestApplication;
        }
    });

    describe("resolves global namespaces upon class creation", function() {
        it("has TestApplication namespace", function() {
            expect(Ext.app.namespaces['TestApplication']).toBeTruthy();
        });
        
        it("has TestApplication.Foo namespace", function() {
            expect(Ext.app.namespaces['TestApplication.Foo']).toBeTruthy();
        });
        
        it("has TestApplication.Bar namespace", function() {
            expect(Ext.app.namespaces['TestApplication.Bar']).toBeTruthy();
        });
    });
    
    describe("resolves class names", function() {
        it("resolves Viewport when autoCreateViewport is true", function() {
            var args = Ext.Loader.require.argsForCall[1][0];

            expect(args).toEqual([
                'TestApplication.view.Viewport'
            ]);
        });
        
        it("defaults to 'app' when appFolder is not set", function() {
            var path = Ext.Loader.config.paths.TestApplication;
            
            expect(path).toBe('app');
        });
        
        describe("when appFolder is set", function() {
            beforeEach(function() {
                Ext.define('TestApplication.AbstractApplication', {
                    extend: 'Ext.app.Application',
                
                    appFolder: 'foo'
                });
            
                Ext.define('TestApplication.Application', {
                    extend: 'TestApplication.AbstractApplication',
                
                    name: 'Foo',
                
                    autoCreateViewport: true
                });
            });
            
            it("resolves Viewport path", function() {
                var path = Ext.Loader.config.paths.Foo;
                
                expect(path).toBe('foo');
            });
        });
    });
    
    it("is constructable", function() {
        app = new TestApplication.Application();

        expect(app).toBeDefined();
    });

    it("adds getApplication method...", function() {
        expect(app.getApplication).toBeFunction();
    });

    it("... which returns Application instance", function() {
        var a = app.getApplication();

        expect(a).toEqual(app);
    });

    it("inits itself as a Controller", function() {
        expect(app._initialized).toBeTruthy();
    });

    it("inits dependent Controllers and sets their id", function() {
        var ctrl = app.getController('Foo');

        expect(ctrl.initialized).toBeTruthy();
        expect(ctrl.getId()).toBe('Foo');
    });

    it("calls onLaunch on dependent Controllers", function() {
        var ctrl = app.getController('Foo');

        expect(ctrl.launched).toBeTruthy();
    });

    it("calls its init() method", function() {
        expect(initCalled).toBeTruthy();
    });

    it("calls its launch() method", function() {
        expect(launchCalled).toBeTruthy();
    });

    it("fires launch event", function() {
        var fired = false;

        new TestApplication.Application({
            listeners: {
                launch: function() { fired = true; }
            }
        });

        expect(fired).toBeTruthy();
    });

    it("inits QuickTips", function() {
        spyOn(Ext.tip.QuickTipManager, 'init');

        new TestApplication.Application();

        expect(Ext.tip.QuickTipManager.init).toHaveBeenCalled();
    });

    it("inits Viewport when autoCreateViewport is true", function() {
        spyOn(TestApplication.view.Viewport, 'create');

        new TestApplication.Application();

        expect(TestApplication.view.Viewport.create).toHaveBeenCalled();
    });

    it("should init Ext.util.History", function() {
        app = new TestApplication.Application();

        return expect(Ext.util.History.ready).toEqual(true);
    });

    describe("should handle default hash", function() {
        var History = Ext.util.History;

        beforeEach(function() {
            History.useTopWindow = false;
        });

        afterEach(function() {
            History.useTopWindow = true;
        });

        it("adds defaultToken", function() {
            app = new TestApplication.Application({
                defaultToken : 'foo'
            });

            expect(History.getToken()).toEqual('foo');
        });

        it("already has a token", function() {
            if (!History.getToken()) {
                History.add('foo');
            }

            app = new TestApplication.Application({
                defaultToken : 'bar'
            });

            expect(History.getToken()).toEqual('foo');
        });
    });
});
