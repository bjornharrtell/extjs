describe("Ext.field.Checkbox", function() {

    var field;

    function makeField(cfg) {
        field = new Ext.field.Checkbox(cfg);
        field.renderTo(Ext.getBody());
    }

    afterEach(function() {
        field = Ext.destroy(field);
    });

    describe("binding", function() {
        describe("publish with reference", function() {
            it("should publish the checked state if checked: false", function() {
                var vm;
                makeField({
                    reference: 'fooField',
                    viewModel: {}
                });
                vm = field.getViewModel();
                vm.notify();
                expect(vm.get('fooField.checked')).toBe(false);

            });

            it("should publish the checked state if checked: true", function() {
                var vm;
                makeField({
                    reference: 'fooField',
                    checked: true,
                    viewModel: {}
                });
                vm = field.getViewModel();
                vm.notify();
                expect(vm.get('fooField.checked')).toBe(true);
            });
        });
    });

});