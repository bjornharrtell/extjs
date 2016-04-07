describe('Ext.Button', function() {
    var button;
    
    function createButton(config) {
        config = Ext.apply({
        }, config);
        
        button = new Ext.Button(config);
    };

    afterEach(function() {
        if (button) {
            button.destroy();
        }
        
        button = null;
    });

    describe("configurations", function() {
        describe("autoHandler", function() {
            describe("configuration", function() {

                it("should set the autoHandler configuration", function() {
                    createButton({autoEvent: 'test'});

                    expect(button.getAutoEvent()).not.toBeNull();
                });

                it("should set a handler", function() {
                    createButton({autoEvent: 'test'});

                    expect(button.getHandler()).not.toBeNull();
                });

                it("should set a scope", function() {
                    createButton({autoEvent: 'test'});

                    expect(button.getScope()).not.toBeNull();
                });

                describe("transforming", function() {
                    it("should transform a string into an object", function() {
                        createButton({autoEvent: 'test'});

                        var ae = button.getAutoEvent();

                        expect(ae).not.toBeNull();
                        expect(typeof ae).toEqual("object");
                    });

                    it("should set the name of the object", function() {
                        createButton({autoEvent: 'test'});

                        var ae = button.getAutoEvent();

                        expect(ae.name).toEqual('test');
                    });

                    it("should set the scope of the object", function() {
                        createButton({autoEvent: 'test'});

                        var ae = button.getAutoEvent();

                        expect(ae.scope).not.toBeNull();
                    });
                });
            });

            describe("method", function() {
                it("should set the autoHandler configuration", function() {
                    createButton();
                    button.setAutoEvent('test');

                    expect(button.getAutoEvent()).not.toBeNull();
                });

                it("should set a handler", function() {
                    createButton();
                    button.setAutoEvent('test');

                    expect(button.getHandler()).not.toBeNull();
                });

                it("should set a scope", function() {
                    createButton();
                    button.setAutoEvent('test');

                    expect(button.getScope()).not.toBeNull();
                });

                describe("transforming", function() {
                    it("should transform a string into an object", function() {
                        createButton();
                        button.setAutoEvent('test');

                        var ae = button.getAutoEvent();

                        expect(ae).not.toBeNull();
                        expect(typeof ae).toEqual("object");
                    });

                    it("should set the name of the object", function() {
                        createButton();
                        button.setAutoEvent('test');

                        var ae = button.getAutoEvent();

                        expect(ae.name).toEqual('test');
                    });

                    it("should set the scope of the object", function() {
                        createButton();
                        button.setAutoEvent('test');

                        var ae = button.getAutoEvent();

                        expect(ae.scope).not.toBeNull();
                    });
                });
            });
        });


        describe("badgeText", function() {
            describe("configuration", function() {
                beforeEach(function() {
                    createButton({badgeText: 'test'});
                });

                it("should set the badgeText", function() {
                    expect(button.getBadgeText()).toEqual('test');
                });

                describe("after render", function() {
                    beforeEach(function() {
                        button.renderTo(Ext.getBody());
                    });
                    it("should create a badgeEl", function() {
                        expect(button.badgeElement).not.toBeNull();
                    });
                    it("should have the badgeText value in the badgeEl", function() {
                        expect(button.badgeElement.dom.innerHTML).toEqual('test');
                    });
                });
            });

            describe("methods", function() {
                beforeEach(function() {
                    createButton();
                });

                describe("after render", function() {
                    beforeEach(function() {
                        button.renderTo(Ext.getBody());

                        button.setBadgeText('test');
                    });

                    it("should set the badgeText", function() {
                         expect(button.getBadgeText()).toEqual('test');
                    });

                    it("should create a badgeEl", function() {
                        expect(button.badgeElement).not.toBeNull();
                    });

                    describe("when removing badgeText", function() {
                        beforeEach(function() {
                            button.setBadgeText(null);
                        });

                        it("should remove the badgeText configuration", function() {

                            expect(button.getBadgeText()).toBeNull();
                        });
                    });

                    it("should have the badgeText value in the badgeEl", function() {
                        expect(button.badgeElement.dom.innerHTML).toEqual('test');
                    });
                });
            });
        });


        describe("text", function() {
            describe("configuration", function() {
                beforeEach(function() {
                    createButton({
                        text: 'test'
                    });
                });

                it("should set the text", function() {
                    expect(button.getText()).toEqual('test');
                });

                describe("after render", function() {
                    beforeEach(function() {
                        button.renderTo(Ext.getBody());
                    });

                    it("should create a textEl", function() {
                        expect(button.textElement).not.toBeNull();
                    });
                });
            });

            describe("methods", function() {
                beforeEach(function() {
                    createButton();
                });

                it("should set the text", function() {
                    button.setText('test');
                    expect(button.getText()).toEqual('test');
                });

                describe("after render", function() {

                    it("should create a textEl", function() {
                        expect(button.textElement).not.toBeNull();
                    });

                    describe("when removing text", function() {
                        beforeEach(function() {
                            button.setText(null);
                        });

                        it("should remove the text configuration", function() {
                            expect(button.getText()).toBeNull();
                        });
                    });
                });
            });
        });


        describe("icon", function() {
            describe("configuration", function() {
                beforeEach(function() {
                    createButton({
                        icon: 'test'
                    });
                });

                it("should set the icon", function() {
                    expect(button.getIcon()).toEqual('test');
                });

                describe("after render", function() {
                    beforeEach(function() {
                        button.renderTo(Ext.getBody());
                    });

                    it("should create a iconEl", function() {
                        expect(button.iconElement).not.toBeNull();
                    });
                });
            });

            describe("methods", function() {
                beforeEach(function() {
                    createButton({
                        icon: 'test'
                    });

                });

                it("should set the icon", function() {
                    button.setIcon('test');
                    expect(button.getIcon()).toEqual('test');
                });

                describe("after render", function() {
                    beforeEach(function() {
                        button.renderTo(Ext.getBody());
                    });

                    it("should create a iconEl", function() {
                        expect(button.iconElement).not.toBeNull();
                    });

                    describe("when remove the icon", function() {
                        beforeEach(function() {
                            button.setIcon(null);
                        });

                        it("should remove the icon configuration", function() {
                            expect(button.getIcon()).toBeNull();
                        });
                    });

                    it("should call refreshIconAlign when updating the icon", function() {
                        spyOn(button, "refreshIconAlign");

                        button.setIcon('another');

                        expect(button.refreshIconAlign.calls.length).toBe(1);
                    });

                    it("should have the new background-image on the iconEl", function() {
                        button.setIcon('another');

                        expect(button.iconElement.getStyle('background-image')).toMatch('another');
                    });

                    it("should remove any old cls on the iconEl", function() {
                        button.setIcon('another');

                        expect(button.iconElement.getStyle('background-image')).toMatch('another');

                        button.setIcon('new');

                        expect(button.iconElement.getStyle('background-image')).not.toMatch('another');
                        expect(button.iconElement.getStyle('background-image')).toMatch('new');
                    });
                });
            });
        });


        describe("iconCls", function() {
            describe("configuration", function() {
                beforeEach(function() {
                    createButton({
                        iconCls: 'test'
                    });
                });

                it("should set the iconCls", function() {
                    expect(button.getIconCls()).toEqual('test');
                });

                describe("after render", function() {
                    beforeEach(function() {
                        button.renderTo(Ext.getBody());
                    });

                    it("should insert the iconEl", function() {
                        expect(button.iconElement.parentNode).not.toBeNull();
                    });
                });
            });

            describe("methods", function() {
                beforeEach(function() {
                    createButton();
                });

                it("should set the iconCls", function() {
                    button.setIconCls('test');
                    expect(button.getIconCls()).toEqual('test');
                });

                  it("should create an iconEl", function() {
                    expect(button.iconElement).not.toBeNull();
                });

                describe("after render", function() {
                    beforeEach(function() {
                        button.renderTo(Ext.getBody());
                        button.setIconCls('test');
                    });

                    describe("when removing iconCls", function() {
                        beforeEach(function() {
                            button.setIconCls(null);
                        });

                        it("should remove the iconCls configuration", function() {
                            expect(button.getIconCls()).toBeNull();
                        });

                        it("should remove the iconCls", function() {
                            expect(button.element.hasCls('test')).toBeFalsy();
                        });
                    });

                    it("should call refreshIconAlign one time when updating the iconCls", function() {
                        spyOn(button, "refreshIconAlign");

                        button.setIconCls('another');

                        expect(button.refreshIconAlign.calls.length).toBe(1);
                    });

                    it("should have the new cls on the iconEl", function() {
                        button.setIconCls('another');

                        expect(button.iconElement.hasCls('another')).toBeTruthy();
                    });

                    it("should remove any old cls on the iconEl", function() {
                        button.setIconCls('another');

                        expect(button.iconElement.hasCls('another')).toBeTruthy();

                        button.setIconCls('new');

                        expect(button.iconElement.hasCls('another')).toBeFalsy();
                        expect(button.iconElement.hasCls('new')).toBeTruthy();
                    });
                });
            });
        });


        describe("iconAlign", function() {
            var value = 'right',
                cls   = Ext.baseCSSPrefix + 'iconalign-' + value;

            describe("with icon", function() {
                describe("configuration", function() {
                    beforeEach(function() {
                        createButton({iconAlign: value, icon: 'test', text: 'test'});
                    });

                    it("should set the iconAlign", function() {
                        expect(button.getIconAlign()).toEqual(value);
                    });

                    describe("after render", function() {
                        beforeEach(function() {
                            button.renderTo(Ext.getBody());
                        });

                        it("should add the iconAlign class", function() {
                            expect(button.element.hasCls(cls)).toBeTruthy();
                        });
                    });
                });

                describe("methods", function() {
                    beforeEach(function() {
                        createButton({icon: 'test', text: 'test'});
                    });

                    it("should set the iconAlign", function() {
                        button.setIconAlign(value);
                        expect(button.getIconAlign()).toEqual(value);
                    });

                    describe("after render", function() {
                        beforeEach(function() {
                            button.renderTo(Ext.getBody());

                            button.setIconAlign(value);
                        });

                        it("should add the iconAlign cls", function() {
                            expect(button.element.hasCls(cls)).toBeTruthy();
                        });

                        describe("when removing iconAlign", function() {
                            beforeEach(function() {
                                button.setIconAlign(null);
                            });

                            it("should remove the iconAlign configuration", function() {
                                expect(button.getIconAlign()).toBeNull();
                            });

                            it("should remove the iconAlign cls", function() {
                                expect(button.element.hasCls(cls)).not.toBeTruthy();
                            });
                        });
                    });
                });
            });

            describe("without icon", function() {
                describe("configuration", function() {
                    beforeEach(function() {
                        createButton({iconAlign: 'right'});
                    });

                    describe("after render", function() {
                        beforeEach(function() {
                            button.renderTo(Ext.getBody());
                        });

                        it("should add the iconAlign cls", function() {
                            expect(button.element.hasCls(cls)).toBeFalsy();
                        });
                    });
                });

                describe("methods", function() {
                    beforeEach(function() {
                        createButton();
                    });

                    describe("after render", function() {
                        beforeEach(function() {
                            button.renderTo(Ext.getBody());
                            button.setIconAlign(value);
                        });

                        it("should add the iconAlign cls", function() {
                            expect(button.element.hasCls(cls)).toBeFalsy();
                        });

                        describe("when adding icon", function() {
                            beforeEach(function() {
                                button.setText('another');
                                button.setIcon('another');
                            });

                            it("should add the iconAlign configuration", function() {
                                expect(button.getIconAlign()).toEqual(value);
                            });

                            it("should add the iconAlign cls", function() {
                                expect(button.element.hasCls(cls)).toBeTruthy();
                            });
                        });
                    });
                });
            });
        });
    });

    describe("#refreshIconAlign", function() {
        beforeEach(function() {
            createButton();
        });

        it("should call #updateIconAlign", function() {
            spyOn(button, "updateIconAlign");

            button.refreshIconAlign();

            expect(button.updateIconAlign).wasCalled();
        });
    });

    describe("#onTap", function() {
        beforeEach(function() {
            createButton();
        });

        it("should return false if disabled", function() {
            button.disabled = true;

            expect(button.onTap()).toBeFalsy();
        });

        it("should call fireAction", function() {
            spyOn(button, 'fireAction');

            button.onTap();

            expect(button.fireAction).wasCalled();
        });
    });

    describe("#doTap", function() {
        beforeEach(function() {
            createButton();
        });

        describe("no handler", function() {
            it("should return false", function() {
                expect(button.doTap(button)).toBeFalsy();
            });
        });

        describe("with handler", function() {
            describe("string", function() {
                it("should call the function", function() {
                    button.testFoo = function() {};
                    spyOn(button, 'testFoo');

                    button.setHandler('testFoo');

                    button.doTap(button);

                    expect(button.testFoo).wasCalled();
                });
            });

            describe("reference", function() {
                it("should call the function", function() {
                    button.testFoo = function() {};
                    spyOn(button, 'testFoo');

                    button.setHandler(button.testFoo);

                    button.doTap(button);

                    expect(button.testFoo).wasCalled();
                });
            });
        });
    });

    describe("el", function() {
        beforeEach(function() {
            createButton();
            button.renderTo(Ext.getBody());
        });

        describe("tap", function() {
            it("should call onTap", function() {
                spyOn(button, "onTap");

                button.el.fireAction('tap', [], Ext.emptyFn);

                expect(button.onTap).wasCalled();
            });
        });

        (Ext.supports.Touch ? describe : xdescribe)("touchstart", function() {
            it("should call onPress", function() {
                spyOn(button, "onPress");

                button.el.fireAction('touchstart', [], Ext.emptyFn);

                expect(button.onPress).wasCalled();
            });
        });

        (Ext.supports.Touch ? describe : xdescribe)("touchend", function() {
            it("should call onRelease", function() {
                spyOn(button, "onRelease");

                button.el.fireAction('touchend', [], Ext.emptyFn);

                expect(button.onRelease).wasCalled();
            });
        });
    });
});
