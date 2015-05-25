describe("Ext.form.RadioGroup", function() {

    var group;

    function makeGroup(items, cfg) {
        group = new Ext.form.RadioGroup(Ext.apply({
            renderTo: Ext.getBody(),
            items: items
        }, cfg));
    }

    afterEach(function() {
        group = Ext.destroy(group);
    });

    describe("setValue", function() {
        it("should check the matching item", function() {
            makeGroup([{
                name: 'foo',
                inputValue: 'a'
            }, {
                name: 'foo',
                inputValue: 'b'
            }, {
                name: 'foo',
                inputValue: 'c'
            }]);

            group.setValue({
                foo: 'b'
            });

            expect(group.getValue()).toEqual({
                foo: 'b'
            });
        });

        describe("with a view model", function() {
            it("should be able to set the value with inline data", function() {
                var vm = new Ext.app.ViewModel({
                    data: {
                        theValue: {
                            foo: 'b'
                        }
                    }
                });

                makeGroup([{
                    name: 'foo',
                    inputValue: 'a'
                }, {
                    name: 'foo',
                    inputValue: 'b'
                }, {
                    name: 'foo',
                    inputValue: 'c'
                }], {
                    viewModel: vm,
                    bind: {
                        value: '{theValue}'
                    }
                });

                vm.notify();

                expect(group.getValue()).toEqual({
                    foo: 'b'
                });
            });

            it("should be able to set the value with a defined viewmodel", function() {
                Ext.define('spec.Bar', {
                    extend: 'Ext.app.ViewModel',
                    alias: 'viewmodel.bar',
                    data: {
                        theValue: {
                            foo: 'b'
                        }
                    }
                });

                makeGroup([{
                    name: 'foo',
                    inputValue: 'a'
                }, {
                    name: 'foo',
                    inputValue: 'b'
                }, {
                    name: 'foo',
                    inputValue: 'c'
                }], {
                    viewModel: {
                        type: 'bar'
                    },
                    bind: {
                        value: '{theValue}'
                    }
                });

                group.getViewModel().notify();

                expect(group.getValue()).toEqual({
                    foo: 'b'
                });
                Ext.undefine('spec.Bar');
                Ext.Factory.viewModel.instance.clearCache();
            });
        });
    });

});