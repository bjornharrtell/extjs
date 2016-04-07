describe("Ext.view.AbstractView", function(){
    var store, view,
        synchronousLoad = true,
        proxyStoreLoad = Ext.data.ProxyStore.prototype.load,
        loadStore;
    
    function makeView(cfg) {
        cfg = Ext.apply({
            renderTo: Ext.getBody(),
            width: 300,
            height: 100,
            x: 10,
            y: 10,
            store: store,
            itemTpl: '{field}',
            itemSelector: 'div'
        }, cfg);
        
        return view = new Ext.view.AbstractView(cfg);
    }

    beforeEach(function() {
        // Override so that we can control asynchronous loading
        loadStore = Ext.data.ProxyStore.prototype.load = function() {
            proxyStoreLoad.apply(this, arguments);
            if (synchronousLoad) {
                this.flushLoad.apply(this, arguments);
            }
            return this;
        };

        store = new Ext.data.Store({
            fields: ['field']
        });
    });

    afterEach(function() {
        // Undo the overrides.
        Ext.data.ProxyStore.prototype.load = proxyStoreLoad;

        if (view) {
            view.destroy();
        }
        
        store.destroy();
        store = view = null;
    });

    describe("without any select config", function() {
        it("should give selection model mode 'SINGLE'", function() {
            view = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null
            });
            
            expect(view.getSelectionModel().mode).toEqual('SINGLE');
        });
    });

    describe("with single select config", function() {
        it("should give selection model mode 'SINGLE'", function() {
            view = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null,
                singleSelect: true
            });
            
            expect(view.getSelectionModel().mode).toEqual('SINGLE');
        });
    });

    describe("with simple select config", function() {
        it("should give selection model mode 'SIMPLE'", function() {
            view = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null,
                simpleSelect: true
            });
            
            expect(view.getSelectionModel().mode).toEqual('SIMPLE');
        });
    });

    describe("with multi select config", function() {
        it("should give selection model mode 'MULTI'", function() {
            view = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null,
                multiSelect: true
            });
            
            expect(view.getSelectionModel().mode).toEqual('MULTI');
        });
    });

    describe("Initial layout call", function(){

        // The shrinkwrap layout caused by that will be coalesced into the initial render layout
        it("should lay out once", function() {
            var contextRun = Ext.layout.Context.prototype.run,
                v,
                layoutCount = 0;

            Ext.layout.Context.prototype.run = Ext.Function.createInterceptor(contextRun, function() {
                layoutCount++;
            });

            v = new Ext.view.AbstractView({
                tpl: '<tpl for="."><div>{field}</div></tpl>',
                itemSelector: 'div',
                store: {
                    type: 'array',
                    fields: ['field'],
                    data: [
                        ['datum']
                    ]
                },
                renderTo: document.body
            });
            
            // Wait. There MUST NOT be a further, deferred layout call!
            waits(100);
            runs(function() {
                expect(layoutCount).toEqual(1);
                Ext.layout.Context.prototype.run = contextRun;
                v.destroy();
            });
        });

    });
    
    describe("events", function(){
        it("should fire itemadd when adding an item to an empty view", function(){
            var fired = false;
            
            var c = new Ext.view.AbstractView({
                itemTpl: '{field}',
                store: store,
                renderTo: Ext.getBody(),
                listeners: {
                    itemadd: function() {
                        fired = true;
                    }
                }
            });
            store.add({
                field: 'a'
            });
            expect(fired).toBe(true);
            c.destroy();
        });

        it("should fire focuschange when changing focus in a view", function(){
            var focuschangeFired = false;
            
            var c = new Ext.view.AbstractView({
                itemTpl: '{field}',
                store: store,
                renderTo: Ext.getBody(),
                listeners: {
                    focuschange: function() {
                        focuschangeFired = true;
                    }
                }
            });
            store.add({
                field: 'a'
            });

            expect(focuschangeFired).toBe(false);
            c.getNavigationModel().setPosition(0);
            expect(focuschangeFired).toBe(true);

            c.destroy();
        });
    });
    
    describe("ARIA", function() {
        function expectAria(attr, value) {
            jasmine.expectAriaAttr(view, attr, value);
        }
        
        function expectNoAria(attr) {
            jasmine.expectNoAriaAttr(view, attr);
        }
        
        describe("role", function() {
            beforeEach(function() {
                makeView();
            });
            
            it("should have listbox role", function() {
                expectAria('role', 'listbox');
            });
        });
        
        describe("aria-multiselectable", function() {
            it("should not be set when mode == SINGLE", function() {
                makeView({ singleSelect: true });
                
                expectNoAria('aria-multiselectable');
            });
            
            it("should be set to true when mode == SIMPLE", function() {
                makeView({ simpleSelect: true });
                
                expectAria('aria-multiselectable', 'true');
            });
            
            it("should be set to true when mode == MULTI", function() {
                makeView({ multiSelect: true });
                
                expectAria('aria-multiselectable', 'true');
            });
        });
        
        describe("item attributes", function() {
            var node, selModel;
            
            function expectAria(attr, value) {
                jasmine.expectAriaAttr(node, attr, value);
            }
            
            function expectNoAria(attr) {
                jasmine.expectNoAriaAttr(node, attr);
            }
            
            beforeEach(function() {
                makeView({
                    tpl: '<tpl for="."><div>{field}</div></tpl>',
                    itemTpl: null
                });
                
                store.add({ field: 'foo' });
                
                selModel = view.getSelectionModel();
                node = view.all.item(0);
            });
            
            afterEach(function() {
                node = selModel = null;
            });
            
            describe("role", function() {
                it("should have option role", function() {
                    expectAria('role', 'option');
                });
            });
            
            describe("aria-selected", function() {
                it("should not set aria-selected when rendering", function() {
                    expectNoAria('aria-selected');
                });
                
                it("should set aria-selected to true when selected", function() {
                    selModel.select(0);
                    
                    expectAria('aria-selected', 'true');
                });
                
                it("should remove aria-selected when deselected", function() {
                    selModel.select(0);
                    selModel.deselectAll();
                    
                    expectNoAria('aria-selected');
                });
            });
        });
    });
});
