describe("Ext.form.field.Base", function() {

    var c, makeField;

    beforeEach(function() {
        makeField = function(cfg) {
            cfg = cfg || {};
            c = new Ext.form.field.Base(cfg);
        };
    });

    afterEach(function() {
        Ext.destroy(c);
        makeField = c = null;
    });

    it("should encode the input value in the template", function() {
        makeField({
            renderTo: Ext.getBody(),
            value: 'test "  <br/> test'
        });

        expect(c.inputEl.dom.value).toBe('test "  <br/> test');
    });

    describe("readOnly", function() {
        it("should be readOnly false by default", function() {
            makeField();
            expect(c.readOnly).toBe(false);
        });

        it("should add the readOnlyCls if configured with readOnly: true", function() {
            makeField({
                readOnly: true,
                renderTo: Ext.getBody()
            });
            expect(c.el.hasCls(c.readOnlyCls)).toBe(true);
        });

        it("should add readOnly to the inputEl if configured with readOnly: true", function() {
            makeField({
                readOnly: true,
                renderTo: Ext.getBody()
            });
            expect(c.inputEl.dom.readOnly).toBe(true);
        });

        it("should use a custom readOnlyCls if provided", function() {
            makeField({
                readOnly: true,
                renderTo: Ext.getBody(),
                readOnlyCls: 'myCustomReadOnlyCls'
            });
            expect(c.el.hasCls('myCustomReadOnlyCls')).toBe(true);
        });

        it("should be able to set readOnly: true at runtime", function() {
            makeField({
                renderTo: Ext.getBody()
            });
            c.setReadOnly(true);
            expect(c.el.hasCls(c.readOnlyCls)).toBe(true);
            expect(c.inputEl.dom.readOnly).toBe(true);
        });

        it("should be able to set readOnly: false at runtime", function() {
            makeField({
                renderTo: Ext.getBody(),
                readOnly: true
            });
            c.setReadOnly(false);
            expect(c.el.hasCls(c.readOnlyCls)).toBe(false);
            expect(c.inputEl.dom.readOnly).toBe(false);
        });

    });

    describe("fieldLabel", function() {

        describe("hasVisibleLabel", function() {
            it("should always return false when hideLabel: true", function() {
                makeField({
                    hideLabel: true,
                    fieldLabel: 'Foo'
                });
                expect(c.hasVisibleLabel()).toBe(false);
            });

            it("should return false with an empty label and hideEmptyLabel: true", function() {
                makeField({
                    hideEmptyLabel: true
                });
                expect(c.hasVisibleLabel()).toBe(false);
            });

            it("should return true when we specify a label, even if it's empty", function() {
                makeField({
                    fieldLabel: '',
                    hideEmptyLabel: false
                });
                expect(c.hasVisibleLabel()).toBe(true);
            });

            it("should return true when we have a label and hideEmptyLabel: true", function() {
                makeField({
                    fieldLabel: 'Foo',
                    hideEmptyLabel: true
                });
                expect(c.hasVisibleLabel()).toBe(true);
            });
        });

        it("should be able to set the label before being rendered", function() {
            makeField({
                labelSeparator: ''
            });
            c.setFieldLabel('Foo');
            c.render(Ext.getBody());
            expect(c.labelEl.dom.firstChild).hasHTML('Foo');
        });

        it("should set a configured label", function() {
            makeField({
                labelSeparator: '',
                fieldLabel: 'Foo',
                renderTo: Ext.getBody()
            });
            expect(c.labelEl.dom.firstChild).hasHTML('Foo');
        });

        it("should not hide an empty label with hideEmptyLabel: false", function() {
            makeField({
                fieldLabel: '',
                hideEmptyLabel: false,
                renderTo: Ext.getBody()
            });
            expect(c.labelEl.isVisible()).toBe(true);
        });

        it("should hide an empty label with hideEmptyLabel: true", function() {
            makeField({
                fieldLabel: '',
                hideEmptyLabel: true,
                renderTo: Ext.getBody()
            });
            expect(c.labelEl.isVisible()).toBe(false);
        });

        it("should always hide the label with hideLabel: true", function() {
            makeField({
                fieldLabel: 'Foo',
                hideLabel: true,
                renderTo: Ext.getBody()
            });
            expect(c.labelEl.isVisible()).toBe(false);
        });

        it("should set the label after render", function() {
            makeField({
                labelSeparator: '',
                renderTo: Ext.getBody(),
                fieldLabel: 'Foo'
            });
            c.setFieldLabel('Bar');
            expect(c.labelEl.dom.firstChild).hasHTML('Bar');
        });

        it("should append the separator when explicitly set", function() {
            makeField({
                labelSeparator: ':',
                renderTo: Ext.getBody(),
                fieldLabel: 'Foo'
            });
            c.setFieldLabel('Bar');
            expect(c.labelEl.dom.firstChild).hasHTML('Bar:');
        });

        it("should only append the separator if the label doesn't end with the separator when explicitly set", function() {
            makeField({
                labelSeparator: ':',
                renderTo: Ext.getBody(),
                fieldLabel: 'Foo'
            });
            c.setFieldLabel('Bar:');
            expect(c.labelEl.dom.firstChild).hasHTML('Bar:');
        });

        it("should append the separator when implicitly set", function() {
            makeField({
                labelSeparator: ':',
                renderTo: Ext.getBody(),
                fieldLabel: 'Foo'
            });
            expect(c.labelEl.dom.firstChild).hasHTML('Foo:');
        });

        it("should only append the separator if the label doesn't end with the separator when implicitly set", function() {
            makeField({
                labelSeparator: ':',
                renderTo: Ext.getBody(),
                fieldLabel: 'Foo:'
            });
            expect(c.labelEl.dom.firstChild).hasHTML('Foo:');
        });

        it("should hide the label if an empty one is set with hideEmptyLabel: true", function() {
            makeField({
                fieldLabel: 'Foo',
                hideEmptyLabel: true,
                renderTo: Ext.getBody()
            });
            c.setFieldLabel('');
            expect(c.labelEl.isVisible()).toBe(false);
        });

        it("should show the label if an non-empty one is set with hideEmptyLabel: true", function() {
            makeField({
                fieldLabel: '',
                hideEmptyLabel: true,
                renderTo: Ext.getBody()
            });
            c.setFieldLabel('Foo');
            expect(c.labelEl.isVisible()).toBe(true);
        });
    });

    describe("validitychange", function() {
        var error, spy;

        function makeDisableField(cfg) {
            makeField(Ext.apply({
                renderTo: Ext.getBody(),
                listeners: {
                    validitychange: spy
                },
                getErrors: function() {
                    return error === null ? [] : [error];
                }
            }, cfg));
        }

        beforeEach(function() {
            error = null;
            spy = jasmine.createSpy();
        });

        afterEach(function() {
            spy = error = null;
        });

        describe("starting disabled", function() {
            describe("initialization", function() {
                it("should not fire the event with a valid value", function() {
                    makeDisableField({
                        disabled: true
                    });
                    expect(spy).not.toHaveBeenCalled();
                });

                it("should not fire the event with an invalid value", function() {
                    error = 'Foo';
                    makeDisableField({
                        disabled: true
                    });
                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe("enabling before having validated", function() {
                it("should not fire the event with a valid value", function() {
                    makeDisableField({
                        disabled: true
                    });
                    c.enable();
                    expect(spy).not.toHaveBeenCalled();
                });

                it("should not fire the event with an invalid value", function() {
                    error = 'Foo';
                    makeDisableField({
                        disabled: true
                    });
                    c.enable();
                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe("enabling after having validated", function() {
                beforeEach(function() {
                    makeDisableField({
                        disabled: true
                    });
                });

                describe("after validating with an invalid value", function() {
                    beforeEach(function() {
                        error = 'Foo';
                        c.validate();
                        spy.reset();
                    });

                    it("should not fire the event with a valid value", function() {
                        error = null;
                        c.enable();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should fire the event with an invalid value", function() {
                        c.enable();
                        expect(spy.callCount).toBe(1);
                        expect(spy.mostRecentCall.args[0]).toBe(c);
                        expect(spy.mostRecentCall.args[1]).toBe(false);
                    });
                });

                describe("after validating with a valid value", function() {
                    beforeEach(function() {
                        c.validate();
                        spy.reset();
                    });

                    it("should not fire the event with a valid value", function() {
                        c.enable();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should fire the event with an invalid value", function() {
                        error = 'Foo';
                        c.enable();
                        expect(spy.callCount).toBe(1);
                        expect(spy.mostRecentCall.args[0]).toBe(c);
                        expect(spy.mostRecentCall.args[1]).toBe(false);
                    });
                });
            });
        });

        describe("starting enabled", function() {
            describe("initialization", function() {
                it("should not fire the event with a valid value", function() {
                    makeDisableField();
                    expect(spy).not.toHaveBeenCalled();
                });

                it("should not fire the event with an invalid value", function() {
                    error = 'Foo';
                    makeDisableField();
                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe("disabling before having validated", function() {
                it("should not fire the event with a valid value", function() {
                    makeDisableField();
                    c.disable();
                    expect(spy).not.toHaveBeenCalled();
                });

                it("should not fire the event with an invalid value", function() {
                    error = 'Foo';
                    makeDisableField();
                    c.disable();
                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe("disabling after having validated", function() {
                beforeEach(function() {
                    makeDisableField();
                });

                describe("after validating with an invalid value", function() {
                    beforeEach(function() {
                        error = 'Foo';
                        c.validate();
                        spy.reset();
                    });

                    it("should fire the event with a valid value", function() {
                        error = null;
                        c.disable();
                        expect(spy.callCount).toBe(1);
                        expect(spy.mostRecentCall.args[0]).toBe(c);
                        expect(spy.mostRecentCall.args[1]).toBe(true);
                    });

                    it("should fire the event with an invalid value", function() {
                        c.disable();
                        expect(spy.callCount).toBe(1);
                        expect(spy.mostRecentCall.args[0]).toBe(c);
                        expect(spy.mostRecentCall.args[1]).toBe(true);
                    });
                });

                describe("after validating with a valid value", function() {
                    beforeEach(function() {
                        c.validate();
                        spy.reset();
                    });

                    it("should not fire the event with a valid value", function() {
                        c.disable();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should fire the event with an invalid value", function() {
                        error = 'Foo';
                        c.disable();
                        expect(spy).not.toHaveBeenCalled();
                    });
                });
            });
        });
    });
    
    describe("errors", function(){
        describe("enabling/disabling", function() {
            beforeEach(function() {
                makeField({
                    renderTo: Ext.getBody(),
                    allowBlank: false,
                    getErrors: function() {
                        return ['Some error'];
                    }
                });
            });
            
            it("should remove any active errors during a disable", function(){
                c.validate();
                c.disable();
                expect(c.hasActiveError()).toBe(false);
            });
            
            it("should should revalidate when enabled if invalid when disabled", function(){
                c.validate();
                c.disable();
                c.enable();
                expect(c.hasActiveError()).toBe(true);
            });
            
            it("should should not revalidate when enabled if clearInvalid is called", function(){
                c.validate();
                c.disable();
                c.clearInvalid();
                c.enable();
                expect(c.hasActiveError()).toBe(false);
            });
        });
    });
});
