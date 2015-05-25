describe("Ext.view.AbstractView", function(){
    var store;
    beforeEach(function(){
        store = new Ext.data.Store({
            fields: ['field']
        });
    });
    
    afterEach(function(){
        store = null;
    });

    describe("without any select config", function(){

        it("should give selection model mode 'SINGLE'", function(){
            var c = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null
            });
            expect(c.getSelectionModel().mode).toEqual('SINGLE');
        });

    });

    describe("with single select config", function(){

        it("should give selection model mode 'SINGLE'", function(){
            var c = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null,
                singleSelect: true
            });
            expect(c.getSelectionModel().mode).toEqual('SINGLE');
        });

    });

    describe("with simple select config", function(){

        it("should give selection model mode 'SIMPLE'", function(){
            var c = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null,
                simpleSelect: true
            });
            expect(c.getSelectionModel().mode).toEqual('SIMPLE');
        });

    });

    describe("with multi select config", function(){

        it("should give selection model mode 'MULTI'", function(){
            var c = new Ext.view.AbstractView({
                tpl: null,
                store: store,
                itemSelector: null,
                multiSelect: true
            });
            expect(c.getSelectionModel().mode).toEqual('MULTI');
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

});
