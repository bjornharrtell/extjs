describe("Ext.form.field.Checkbox", function() {
    var component, makeComponent;

    function expectAria(attr, value) {
        jasmine.expectAriaAttr(component.inputEl, attr, value);
    }
    
    beforeEach(function() {
        makeComponent = function(config) {
            config = config || {};
            Ext.applyIf(config, {
                name: "test",
                renderTo: Ext.getBody()
            });
            component = new Ext.form.field.Checkbox(config);
        };
    });

    afterEach(function() {
        if (component) {
            component.destroy();
        }
        component = makeComponent = null;

    });

    it("should be registered with the 'checkboxfield' xtype", function() {
        component = Ext.create("Ext.form.field.Checkbox", {name: 'test'});
        expect(component instanceof Ext.form.field.Checkbox).toBe(true);
        expect(Ext.getClass(component).xtype).toBe("checkboxfield");
    });
    
    describe("configuring", function() {
        it("should accept a value config", function() {
            makeComponent({
                value: true
            });    
            expect(component.checked).toBe(true);
        });  
    });

    describe("rendering", function() {
        // NOTE this doesn't test the main label, error icon, etc. just the parts specific to Checkbox.

        describe("bodyEl", function() {
            beforeEach(function() {
                makeComponent({value: 'foo'});
            });

            it("should exist", function() {
                expect(component.bodyEl).toBeDefined();
            });

            it("should have the class 'x-form-item-body'", function() {
                expect(component.bodyEl.hasCls('x-form-item-body')).toBe(true);
            });

            it("should have the id '[id]-bodyEl'", function() {
                expect(component.bodyEl.dom.id).toEqual(component.id + '-bodyEl');
            });
        });

        describe("inputEl (checkbox element)", function() {
            beforeEach(function() {
                makeComponent({value: 'foo'});
            });

            it("should exist", function() {
                expect(component.inputEl).toBeDefined();
            });

            it("should be a child of the div wrapper", function() {
                expect(component.inputEl.dom.parentNode.tagName.toLowerCase()).toBe('div');
            });

            it("should be an ancestor of the bodyEl", function() {
                expect(component.inputEl.dom.parentNode.parentNode).toBe(component.bodyEl.dom);
            });

            it("should be an input element", function() {
                expect(component.inputEl.dom.tagName.toLowerCase()).toEqual('input');
            });

            it("should have type='checkbox'", function() {
                expect(component.inputEl.dom.tagName.toLowerCase()).toEqual('input');
            });

            it("should have the component's inputId as its id", function() {
                expect(component.inputEl.dom.id).toEqual(component.inputId);
            });

            it("should have the 'fieldCls' config as a class", function() {
                expect(component.displayEl.hasCls(component.fieldCls)).toBe(true);
            });
            
            describe("ARIA attributes", function() {
                it("should have checkbox role", function() {
                    expectAria('role', 'checkbox');
                });
                
                it("should have aria-hidden", function() {
                    expectAria('aria-hidden', 'false');
                });
                
                it("should have aria-disabled", function() {
                    expectAria('aria-disabled', 'false');
                });
                
                it("should have aria-invalid", function() {
                    expectAria('aria-invalid', 'false');
                });
                
                it("should have aria-checked", function() {
                    expectAria('aria-checked', 'false');
                });
                
                describe("aria-readonly", function() {
                    it("should false by default", function() {
                        expectAria('aria-readonly', 'false');
                    });
                    
                    it("should be true when readOnly", function() {
                        var cb2 = new Ext.form.field.Checkbox({
                            renderTo: Ext.getBody(),
                            name: 'cb2',
                            readOnly: true
                        });
                        
                        jasmine.expectAriaAttr(cb2.inputEl, 'aria-readonly', 'true');
                        
                        Ext.destroy(cb2);
                    });
                });
            });
        });


        describe("box label", function() {
            it("should not be created by default", function() {
                makeComponent({});
                expect(component.bodyEl.child('label')).toBeNull();
            });

            it("should be created if the boxLabel config is defined", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.bodyEl.down('label')).not.toBeNull();
            });

            it("should be stored as a 'boxLabelEl' reference", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.bodyEl.down('label').dom).toBe(component.boxLabelEl.dom);
            });

            it("should have the class 'x-form-cb-label' by default", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.boxLabelEl.hasCls('x-form-cb-label')).toBe(true);
            });

            it("should be given the configured boxLabelCls", function() {
                makeComponent({boxLabel: 'the box label', boxLabelCls: 'my-custom-boxLabelCls'});
                expect(component.boxLabelEl.hasCls('my-custom-boxLabelCls')).toBe(true);
            });

            it("should have a 'for' attribute set to the inputId", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.boxLabelEl.getAttribute('for')).toEqual(component.inputId);
            });

            it("should contain the boxLabel as its inner text node", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.boxLabelEl.dom).hasHTML('the box label');
            });
            
            it("should be set to aria-labelledby", function() {
                makeComponent({ boxLabel: 'foo' });
                expectAria('aria-labelledby', component.boxLabelEl.id);
            });

            describe('boxLabelAlign', function() {
                it("should render the label after the checkbox by default", function() {
                    makeComponent({boxLabel: 'the box label'});
                    expect(component.boxLabelEl.prev().prev().dom).toBe(component.inputEl.dom);
                });
                it("should render the label after the checkbox when boxLabelAlign='after'", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'after'});
                    expect(component.boxLabelEl.prev().prev().dom).toBe(component.inputEl.dom);
                });
                it("should give the 'after' label a class of {boxLabelCls}-after", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'after'});
                    expect(component.boxLabelEl.hasCls(component.boxLabelCls + '-after')).toBe(true);
                });
                it("should render the label before the checkbox when boxLabelAlign='before'", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'before'});
                    expect(component.boxLabelEl.next().dom).toBe(component.inputEl.dom);
                });
                it("should give the 'before' label a class of {boxLabelCls}-before", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'before'});
                    expect(component.boxLabelEl.hasCls(component.boxLabelCls + '-before')).toBe(true);
                });
            });
            
            describe("noBoxLabelCls", function() {
                it("should add the class when there is no boxLabel", function() {
                    makeComponent();
                    expect(component.el.down('.' + component.noBoxLabelCls, true)).not.toBeNull();
                });
                
                it("should not add the class when there is a boxLabel", function() {
                    makeComponent({
                        boxLabel: 'Foo'
                    });
                    expect(component.el.down('.' + component.noBoxLabelCls, true)).toBeNull();
                });
            });
        });
    });

    describe("setting value", function() {

        it("should accept the checked attribute", function(){
            makeComponent({
                checked: true
            });
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent();
            expect(component.getValue()).toBeFalsy();

        });

        it("should allow the value to be set while not rendered", function(){
            makeComponent({
                renderTo: null
            });
            component.setValue(true);
            component.render(Ext.getBody());
            expect(component.getValue()).toBeTruthy();
        });

        it("should support different values for setValue", function(){
            makeComponent();
            component.setValue('true');
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent();
            component.setValue('1');
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent();
            component.setValue('on');
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent({
                inputValue: 'foo'
            });
            component.setValue('foo');
            expect(component.getValue()).toBeTruthy();
            component.setValue('bar');
            expect(component.getValue()).toBeFalsy();
        });

        it("should fire the handler, with the correct scope", function(){
            var o1 = {
                fn: function(){}
            }, o2 = {},
            spy = spyOn(o1, 'fn');


            makeComponent({
                handler: o1.fn
            });
            component.setValue(true);
            expect(o1.fn).toHaveBeenCalledWith(component, true);
            expect(spy.calls[0].object).toBe(component);
            component.destroy();

            makeComponent({
                handler: o1.fn,
                scope: o1
            });
            component.setValue(true);
            expect(o1.fn).toHaveBeenCalledWith(component, true);
            expect(spy.calls[1].object).toBe(o1);
            component.destroy();

            makeComponent({
                handler: o1.fn,
                scope: o2
            });
            component.setValue(true);
            expect(o1.fn).toHaveBeenCalledWith(component, true);
            expect(spy.calls[2].object).toBe(o2);
        });

        it("should not fire the handler if the value doesn't change", function() {
            makeComponent({
                handler: function() {}
            });
            spyOn(component, 'handler');
            component.setValue(false);
            expect(component.handler).not.toHaveBeenCalled();
        });

        it("should allow the handler to route to a view controller", function() {
            var ctrl = new Ext.app.ViewController();
            ctrl.someMethod = function() {};
            spyOn(ctrl, 'someMethod');

            var ct = new Ext.container.Container({
                controller: ctrl,
                renderTo: Ext.getBody(),
                items: {
                    xtype: 'checkbox',
                    handler: 'someMethod'
                }
            });

            ct.items.first().setValue(true);
            expect(ctrl.someMethod).toHaveBeenCalled();
            ct.destroy();
        });
        
        it("should update aria-checked", function() {
            makeComponent();
            component.setValue(true);
            
            expectAria('aria-checked', 'true');
        });
    });

    describe('readOnly', function() {
        it("should set the checkbox to disabled=true", function() {
            makeComponent({
                readOnly: true,
                renderTo: Ext.getBody()
            });
            expect(component.inputEl.dom.disabled).toBe(true);
        });

        describe('setReadOnly method', function() {
            it("should set disabled=true when the arg is true", function() {
                makeComponent({
                    readOnly: false,
                    renderTo: Ext.getBody()
                });
                component.setReadOnly(true);
                expect(component.inputEl.dom.disabled).toBe(true);
            });
            it("should set disabled=false when the arg is false", function() {
                makeComponent({
                    readOnly: true,
                    renderTo: Ext.getBody()
                });
                component.setReadOnly(false);
                expect(component.inputEl.dom.disabled).toBe(false);
            });
            it("should set disabled=true when the arg is false but the component is disabled", function() {
                makeComponent({
                    readOnly: true,
                    disabled: true,
                    renderTo: Ext.getBody()
                });
                component.setReadOnly(false);
                expect(component.inputEl.dom.disabled).toBe(true);
            });
        });
    });

    describe('submit value', function() {
        it("should submit the inputValue when checked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                checked: true
            });
            expect(component.getSubmitData()).toEqual({'cb-name': 'the-input-value'});
        });

        it("should submit nothing when unchecked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                checked: false
            });
            expect(component.getSubmitData()).toBeNull();
        });

        it("should submit the uncheckedValue when unchecked, if defined", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                uncheckedValue: 'the-unchecked-value',
                checked: false
            });
            expect(component.getSubmitData()).toEqual({'cb-name': 'the-unchecked-value'});
        });
    });

    describe('getModelData', function() {
        it("should return true when checked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                checked: true
            });
            expect(component.getModelData()).toEqual({'cb-name': true});
        });

        it("should return false when unchecked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                uncheckedValue: 'the-unchecked-value',
                checked: false
            });
            expect(component.getModelData()).toEqual({'cb-name': false});
        });
    });
    
    describe("setRawValue", function() {
        it("should be able to fire the change event when checking after calling setRawValue", function() {
            var val;
            makeComponent();
            component.setRawValue(true);
            component.on('change', function(arg1, arg2) {
                val = arg2;
            });  
            jasmine.fireMouseEvent(component.inputEl.dom, 'click');
            expect(val).toBe(false);
        });  
        
        it("should be dirty after calling setRawValue", function() {
            makeComponent();
            component.setRawValue(true);
            expect(component.isDirty()).toBe(true);
        });
    });

    describe("setBoxLabel", function() {

        var boxOnlyWidth = 0,
            withLabelWidth = 0,
            label = '<div style="width: 100px;">a</div>';

        beforeEach(function() {
            var temp;

            if (boxOnlyWidth === 0) {
                temp = new Ext.form.field.Checkbox({
                    renderTo: Ext.getBody()
                });
                boxOnlyWidth = temp.getWidth();
                temp.destroy();

                temp = new Ext.form.field.Checkbox({
                    renderTo: Ext.getBody(),
                    boxLabel: label
                });
                withLabelWidth = temp.getWidth();
                temp.destroy();
            }
        });

        describe("before render", function() {
            describe("with an existing label", function() {
                it("should clear the label when passing an empty string", function() {
                    makeComponent({
                        boxLabel: 'Foo',
                        renderTo: null
                    });
                    component.setBoxLabel('');
                    component.render(Ext.getBody());
                    expect(component.getWidth()).toBe(boxOnlyWidth);
                });

                it("should change the label when passing an empty string", function() {
                    makeComponent({
                        boxLabel: 'Foo',
                        renderTo: null
                    });
                    component.setBoxLabel('');
                    component.render(Ext.getBody());
                    expect(component.getWidth()).toBe(boxOnlyWidth);
                });
            });

            describe("with no label configured", function() {
                it("should show the label", function() {
                    makeComponent({
                        renderTo: null
                    });
                    component.setBoxLabel(label);
                    component.render(Ext.getBody());
                    expect(component.getWidth()).toBe(withLabelWidth);
                });
            });
        });

        describe("after render", function() {
            describe("with an existing label", function() {
                it("should clear the label when passing an empty string", function() {
                    makeComponent({
                        boxLabel: 'Foo',
                        liquidLayout: false // Use false so layouts run
                    });
                    var count = component.componentLayoutCounter;
                    component.setBoxLabel('');
                    expect(component.getWidth()).toBe(boxOnlyWidth);
                    expect(component.componentLayoutCounter).toBe(count + 1);
                });

                it("should change the label when passing an empty string", function() {
                    makeComponent({
                        boxLabel: 'Foo',
                        liquidLayout: false // Use false so layouts run
                    });
                    var count = component.componentLayoutCounter;
                    component.setBoxLabel(label);
                    expect(component.getWidth()).toBe(withLabelWidth);
                    expect(component.componentLayoutCounter).toBe(count + 1);
                });
            });

            describe("with no label configured", function() {
                it("should show the label", function() {
                    makeComponent({
                        liquidLayout: false // Use false so layouts run
                    });
                    var count = component.componentLayoutCounter;
                    component.setBoxLabel(label);
                    expect(component.getWidth()).toBe(withLabelWidth);
                    expect(component.componentLayoutCounter).toBe(count + 1);
                });
            });
        });
    });

});
