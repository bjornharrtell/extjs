describe("Ext.view.BoundList", function() {
    var boundList, store;

    function createBoundList(cfg, data) {
        cfg = cfg || {};
        cfg.displayField = 'name';
        cfg.renderTo = document.body;
        store = cfg.store = new Ext.data.Store({
            autoDestroy: true,
            model: 'spec.View',
            data: data || [{
                name: 'Item1'
            }]
        });
        boundList = new Ext.view.BoundList(cfg);
    }
    
    beforeEach(function() {
        Ext.define('spec.View', {
            extend : 'Ext.data.Model',
            fields : ['name']
        });
    });

    afterEach(function() {
        Ext.undefine('spec.View');
        Ext.data.Model.schema.clear();
        Ext.destroy(boundList);
        boundList = store = null;
    });

    describe("custom tpl", function() {
        it("should clear the view when using a custom node outside the tpl", function() {
            createBoundList({
                tpl: [
                    '<div class="header">header</div>',
                    '<tpl for=".">',
                        '<li class="x-boundlist-item">{name}</li>',
                    '</tpl>'
                ]
            });
            boundList.refresh();
            boundList.refresh();
            boundList.refresh();
            expect(boundList.getEl().select('.header').getCount()).toBe(1);
        });
    });
    
    describe("modifying the store", function() {
        describe("adding", function() {
            it("should be able to add to an empty BoundList", function() {
                createBoundList({
                }, []);

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(0);
                store.add({
                    name: 'Item1'
                });

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(1);
                var nodes = boundList.getNodes();
                expect(nodes.length).toBe(1);
                expect(nodes[0].innerHTML).toBe('Item1');
            });
        
            it("should be able to add to the end of a BoundList", function() {
                createBoundList({
                });

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(1);
                store.add({
                    name: 'Item2'
                });

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(2);
                var nodes = boundList.getNodes();
                expect(nodes.length).toBe(2);
                expect(nodes[1].innerHTML).toBe('Item2');
            });
            
            it("should be able to insert a node at the start of the BoundList", function() {
                createBoundList({
                });

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(1);
                store.insert(0, {
                    name: 'Item2'
                });

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(2);
                var nodes = boundList.getNodes();
                expect(nodes.length).toBe(2);
                expect(nodes[0].innerHTML).toBe('Item2');
            });
            
            it("should be able to insert a node in the middle of the BoundList", function() {
                createBoundList({
                }, [{
                    name: 'Item1'
                },{
                    name: 'Item2'
                }, {
                    name: 'Item3'
                }, {
                    name: 'Item4'
                }]);

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(4);
                store.insert(2, {
                    name: 'new'
                });

                // The <li> items should go indide the <ul>
                expect(boundList.getNodeContainer().dom.childNodes.length).toBe(5);
                var nodes = boundList.getNodes();
                expect(nodes.length).toBe(5);
                expect(nodes[2].innerHTML).toBe('new');
            });
        });
        
        describe("updating", function() {
            it("should update the node content", function() {
                createBoundList({
                });
                store.first().set('name', 'foo');
                var nodes = boundList.getNodes();
                expect(nodes.length).toBe(1);
                expect(nodes[0].innerHTML).toBe('foo');    
            });
        });
        
        describe("removing", function() {
            it("should remove a node from the BoundList", function() {
                createBoundList({
                });
                store.removeAt(0);
                var nodes = boundList.getNodes();
                expect(nodes.length).toBe(0); 
            });  
        });
    });

    describe("highlighting", function(){
        beforeEach(function(){
            var nodes = [],
                i = 1;
            
            for (; i <= 10; ++i) {
                nodes.push({
                    name: 'Item ' + i
                });
            }
            
            createBoundList({
                itemCls: 'foo',
                renderTo: Ext.getBody(),
                itemTpl: '{name}',
                overItemCls: 'over'
            }, nodes);
        });
        
        it("should apply the highlight class to a node", function(){
            boundList.highlightItem(boundList.getNode(0));
            var nodes = boundList.getEl().select('.foo');
            expect(nodes.item(0).hasCls(boundList.overItemCls)).toBe(true);
        });
        
        it("should remove the highlight on an item", function(){
            boundList.highlightItem(boundList.getNode(0));
            boundList.clearHighlight(boundList.getNode(0));
            var nodes = boundList.getEl().select('.foo');
            expect(nodes.item(0).hasCls(boundList.overItemCls)).toBe(false);
        });
        
        it("should only have at most one item highlighted", function(){
            boundList.highlightItem(boundList.getNode(0));
            boundList.highlightItem(boundList.getNode(1));
            var nodes = boundList.getEl().select('.foo');
            expect(nodes.item(0).hasCls(boundList.overItemCls)).toBe(false);
            expect(nodes.item(1).hasCls(boundList.overItemCls)).toBe(true);
        });
        
        it("should keep highlight on an item when updated", function(){
            boundList.highlightItem(boundList.getNode(0));
            boundList.getStore().getAt(0).set('name', 'New');
            var nodes = boundList.getEl().select('.foo');
            expect(nodes.item(0).hasCls(boundList.overItemCls)).toBe(true);
        });
        
        it("should clear all highlights on refresh", function(){
            boundList.highlightItem(boundList.getNode(0));
            boundList.refresh();
            var nodes = boundList.getEl().select('.foo');
            expect(nodes.item(0).hasCls(boundList.overItemCls)).toBe(false);
        });
    });

    describe('masking', function () {
        describe('disabling the boundlist', function () {
            it('should mark the boundlist as disabled', function () {
                createBoundList();

                boundList.setDisabled(true);

                expect(boundList.disabled).toBe(true);
            });

            it('should call Element.mask', function () {
                // This tests to make sure that the element is being masked by Element.mask and not by the LoadMask component.
                // See EXTJSIV-11838.
                createBoundList();

                spyOn(Ext.dom.Element.prototype, 'mask');

                boundList.setDisabled(true);

                expect(Ext.dom.Element.prototype.mask).toHaveBeenCalled();
            });
        });

        describe('enabling the boundlist', function () {
            beforeEach(function () {
                createBoundList({
                    disabled: true
                });

                spyOn(Ext.dom.Element.prototype, 'unmask');

                boundList.setDisabled(false);
            });

            it('should mark the boundlist as enabled', function () {
                expect(boundList.disabled).toBe(false);
            });

            it('should call Element.unmask', function () {
                // This tests to make sure that the element is being unmasked by Element.mask and not by the LoadMask component.
                // See EXTJSIV-11838.
                expect(Ext.dom.Element.prototype.unmask).toHaveBeenCalled();
            });
        });
    });
});
