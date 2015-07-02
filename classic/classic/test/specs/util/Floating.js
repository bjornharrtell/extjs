describe("Ext.util.Floating", function() {
    var component;

    function makeComponent(cfg){
        component = new Ext.Component(Ext.apply({
            floating: true
        }, cfg));
    }

    function spyOnEvent(object, eventName, fn) {
        var obj = {
            fn: fn || Ext.emptyFn
        },
        spy = spyOn(obj, 'fn');

        object.addListener(eventName, obj.fn);
        return spy;
    }

    afterEach(function() {
        if (component) {
            component.destroy();
            component = null;
        }
    });

    it('should fire the deactivate event once on hide', function() {
        makeComponent();
        var activateSpy = spyOnEvent(component, 'activate'),
            deactivateSpy = spyOnEvent(component, 'deactivate');

        component.show();

        // That should have fired the activate event once
        expect(activateSpy.callCount).toBe(1);
        expect(deactivateSpy.callCount).toBe(0);

        component.hide();

        // That should have fired the deactivate event once
        expect(activateSpy.callCount).toBe(1);
        expect(deactivateSpy.callCount).toBe(1);
    });

    it("should call the floating constructor on first show", function() {
        makeComponent();

        spyOn(component.mixins.floating, 'constructor').andCallThrough();

        component.show();

        expect(component.mixins.floating.constructor).toHaveBeenCalled();
    });

    it("should have the x-layer CSS class on its element", function() {
        makeComponent();
        component.show();

        expect(component.el).toHaveCls('x-layer');
    });

    it("should have the x-fixed-layer CSS class if fixed is true", function() {
        makeComponent({
            fixed: true
        });
        component.show();

        expect(component.el).toHaveCls('x-fixed-layer');
    });

    it("should wait until first show to render the component", function() {
        makeComponent();
        expect(component.rendered).toBe(false);
        expect(component.el).toBeUndefined();

        component.show();

        expect(component.rendered).toBe(true);
        expect(component.el instanceof Ext.dom.Element).toBe(true);
    });

    it("should render the component to the renderTo element", function() {
        var el = Ext.getBody().createChild();
        makeComponent({
            renderTo: el
        });

        expect(component.rendered).toBe(true);
        expect(component.el.parent()).toBe(el);
        expect(component.el.isVisible()).toBe(true);
        el.destroy();
    });

    it("should render the component as hidden to the renderTo el if hidden is true", function() {
        var el = Ext.getBody().createChild();
        makeComponent({
            renderTo: el,
            hidden: true
        });

        expect(component.rendered).toBe(true);
        expect(component.el.parent()).toBe(el);
        expect(component.el.isVisible()).toBe(false);
        el.destroy();
    });

    it("it should show the element when the component is shown", function () {
        makeComponent();
        component.show();

        expect(component.el.isVisible()).toBe(true);
    });

    it("it should hide the element when the component is hidden", function () {
        makeComponent();
        component.show();
        component.hide();

        expect(component.el.isVisible()).toBe(false);
    });

    describe("shim", function() {
        it("should not have a shim by default", function() {
            makeComponent();
            component.show();

            expect(component.el.shim).toBeUndefined();
        });

        it("should create a shim if shim is true", function() {
            makeComponent({
                shim: true
            });
            component.show();

            expect(component.el.shim instanceof Ext.dom.Shim).toBe(true);
        });

        it("should create a shim if Ext.useShims is true", function() {
            Ext.useShims = true;
            makeComponent({
                shim: true
            });
            component.show();

            expect(component.el.shim instanceof Ext.dom.Shim).toBe(true);

            Ext.useShims = false;
        });

        it("should set position:fixed on the shim if fixed is true", function() {
            makeComponent({
                fixed: true,
                shim: true
            });
            component.show();

            expect(component.el.shim.el.getStyle('position')).toBe('fixed');
        });
    });

    describe("shadow", function() {
        beforeEach(function() {
            this.addMatchers({
                toBeWithin: function(deviation, value) {
                    var actual = this.actual;

                    if (deviation > 0) {
                        return actual >= (value - deviation) && actual <= (value + deviation);
                    } else {
                        return actual >= (value + deviation) && actual <= (value - deviation);
                    }
                }
            });
        });

        it("should have a shadow by default", function() {
            makeComponent();
            component.show();

            expect(component.el.shadow instanceof Ext.dom.Shadow).toBe(true);
        });

        it("should not have a shadow if shadow is false", function() {
            makeComponent({
                shadow: false
            });
            component.show();

            expect(component.el.shadow).toBeUndefined();
        });

        it("should pass shadowOffset along to the shadow", function() {
            makeComponent({
                shadowOffset: 15
            });
            component.show();

            expect(component.el.shadow.offset).toBe(15);
        });

        it("should use 'sides' as the default mode", function() {
            makeComponent();
            component.show();

            expect(component.el.shadow.mode).toBe('sides');
        });

        it("should pass a string shadow config along as the 'mode' config of the shadow", function() {
            makeComponent({
                shadow: 'drop'
            });
            component.show();

            expect(component.el.shadow.mode).toBe('drop');
        });

        it("should set position:fixed on the shadow if fixed is true", function() {
            makeComponent({
                fixed: true
            });
            component.show();

            expect(component.el.shadow.el.getStyle('position')).toBe('fixed');
        });

        it("should hide the shadow during animations", function() {
            var animationDone = false,
                shadow, shadowEl;

            makeComponent({
                width: 200,
                height: 100,
                x: 100,
                y: 100
            });
            component.show();

            shadow = component.el.shadow;
            shadowEl = shadow.el;

            expect(shadowEl.isVisible()).toBe(true);

            component.el.setXY([350, 400], {
                duration: 200,
                listeners: {
                    afteranimate: function() {
                        animationDone = true;
                    }
                }
            });

            waitsFor(function() {
                return !shadow.el && !shadowEl.isVisible();
            }, "Shadow was never hidden", 150);

            waitsFor(function() {
                return animationDone;
            }, "Animation never completed", 300);

            runs(function() {
                expect(shadow.el.isVisible()).toBe(true);
                expect(shadow.el.getX()).toBe(350);
                expect(shadow.el.getY()).toBe(404);
                
                // FFWindows gets this off by one
                expect(shadow.el.getWidth()).toBeWithin(1, 200);
                expect(shadow.el.getHeight()).toBe(96);
            });
        });

        it("should not hide the shadow during animations if animateShadow is true", function() {
            var animationDone = false,
                shadow;

            makeComponent({
                animateShadow: true,
                width: 200,
                height: 100,
                x: 100,
                y: 100
            });
            component.show();

            shadow = component.el.shadow;

            spyOn(shadow, 'hide').andCallThrough();

            expect(shadow.el.isVisible()).toBe(true);

            component.el.setXY([350, 400], {
                duration: 50,
                listeners: {
                    afteranimate: function() {
                        animationDone = true;
                    }
                }
            });

            waitsFor(function() {
                return animationDone;
            }, "Animation never completed", 300);

            runs(function() {
                expect(shadow.hide).not.toHaveBeenCalled();
                expect(shadow.el.isVisible()).toBe(true);
                expect(shadow.el.getX()).toBe(350);
                expect(shadow.el.getY()).toBe(404);
                expect(shadow.el.getWidth()).toBe(200);
                expect(shadow.el.getHeight()).toBe(96);
            });
        });
    });

    describe("setActive", function() {
        describe("focus", function() {
            it("should not focus the floater if a descandant component contains focus", function() {
                component = new Ext.window.Window({
                    autoShow: true,
                    floating: true,
                    items: [{
                        xtype: 'textfield',
                        itemId: 'text'
                    }]
                });
                var text = component.down('#text');
                jasmine.focusAndWait(text);
                runs(function() {
                    component.setActive(true, true);
                });
                jasmine.waitAWhile();
                runs(function() {
                    expect(Ext.ComponentManager.getActiveComponent()).toBe(text);
                });
            });

            it("should not focus the floater if a descandant component contains focus and it is not in the same DOM hierarchy", function() {
                component = new Ext.window.Window({
                    autoShow: true,
                    floating: true
                });

                var text = new Ext.form.field.Text({
                    renderTo: Ext.getBody(),
                    getRefOwner: function() {
                        return component;
                    }
                });

                jasmine.focusAndWait(text);
                runs(function() {
                    component.setActive(true, true);
                });
                jasmine.waitAWhile();
                runs(function() {
                    expect(Ext.ComponentManager.getActiveComponent()).toBe(text);
                    text.destroy();
                });
            });
        });
    });

    describe("scroll alignment when rendered to body", function() {
        var spy, c, floater, count;

        beforeEach(function() {
            spy = jasmine.createSpy();

            count = Ext.GlobalEvents.hasListeners.scroll;

            c = new Ext.Component({
                renderTo: Ext.getBody(),
                width: 400,
                height: 400,
                scrollable: true,
                autoEl: {
                    children: [{
                        html: 'A',
                        style: {
                            'float': 'left',
                            width: '100px',
                            height: '500px'
                        }
                    }, {
                        html: 'B',
                        cls: 'align',
                        style: {
                            'float': 'left',
                            width: '100px',
                            height: '200px'
                        }
                    }]
                }
            });

            floater = new Ext.Component({
                autoShow: true,
                floating: true,
                shadow: false,
                width: 50,
                height: 50,
                style: 'border: 1px solid black'
            });
        });

        afterEach(function() {
            Ext.un('scroll', spy);
            count = c = floater = spy = Ext.destroy(floater, c);
        });

        it("should keep the floater aligned on scroll", function() {
            var alignToSpy = spyOn(floater, 'alignTo').andCallThrough();

            floater.alignTo(c.getEl().down('.align'), 'tl-bl');

            // We've called it once;
            expect(alignToSpy.callCount).toBe(1);

            expect(floater.getEl().getTop()).toBe(200);

            Ext.on('scroll', spy);

            c.getScrollable().getElement().dom.scrollTop = 50;


            waitsFor(function() {
                return spy.callCount === 1;
            });

            runs(function() {
                // Should realign on scroll event
                expect(alignToSpy.callCount).toBe(2);
                expect(floater.getEl().getTop()).toBe(150);
                c.getScrollable().getElement().dom.scrollTop = 100;
            });

            waitsFor(function() {
                return spy.callCount === 2;
            });

            runs(function() {
                // Should realign on scroll event
                expect(alignToSpy.callCount).toBe(3);
                expect(floater.getEl().getTop()).toBe(100);
            });
        });

        it("should unbind the scroll listener on destroy", function() {
            floater.alignTo(c.getEl().down('.align'), 'tl-bl');
            floater.destroy();
            expect(Ext.GlobalEvents.hasListeners.scroll).toBe(count);
        });

        it("should not move the element if the alignTo element is destroyed", function() {
            floater.alignTo(c.getEl().down('.align'), 'tl-bl');

            expect(floater.getEl().getTop()).toBe(200);

            c.getEl().down('.align').destroy();

            Ext.on('scroll', spy);

            runs(function() {
                c.getScrollable().getElement().dom.scrollTop = 100;
            });

            waitsFor(function() {
                return spy.callCount === 1;
            });

            runs(function() {
                expect(floater.getEl().getTop()).toBe(200);
            });
        });
    });


    describe("scroll alignment when rendered into the scrolling element", function() {
        var spy, c, floater, count;

        beforeEach(function() {
            spy = jasmine.createSpy();

            count = Ext.GlobalEvents.hasListeners.scroll;

            c = new Ext.Component({
                renderTo: Ext.getBody(),
                width: 400,
                height: 400,
                scrollable: true,
                autoEl: {
                    children: [{
                        html: 'A',
                        style: {
                            'float': 'left',
                            width: '100px',
                            height: '500px'
                        }
                    }, {
                        html: 'B',
                        cls: 'align',
                        style: {
                            'float': 'left',
                            width: '100px',
                            height: '200px'
                        }
                    }]
                }
            });

            // Render the floater into the scrolling element
            floater = new Ext.Component({
                autoShow: true,
                floating: true,
                shadow: false,
                width: 50,
                height: 50,
                style: 'border: 1px solid black',
                renderTo: c.getContentTarget()
            });
        });

        afterEach(function() {
            Ext.un('scroll', spy);
            count = c = floater = spy = Ext.destroy(floater, c);
        });

        it("should keep the floater aligned on scroll", function() {
            var alignToSpy = spyOn(floater, 'alignTo').andCallThrough();

            floater.alignTo(c.getEl().down('.align'), 'tl-bl');

            // We've called it once;
            expect(alignToSpy.callCount).toBe(1);

            expect(floater.getEl().getTop()).toBe(200);

            Ext.on('scroll', spy);

            c.getScrollable().getElement().dom.scrollTop = 50;


            waitsFor(function() {
                return spy.callCount === 1;
            });

            runs(function() {
                // Should NOT realign because it is scrolling with content
                expect(alignToSpy.callCount).toBe(1);

                expect(floater.getEl().getTop()).toBe(150);
                c.getScrollable().getElement().dom.scrollTop = 100;
            });

            waitsFor(function() {
                return spy.callCount === 2;
            });

            runs(function() {
                // Should NOT realign because it is scrolling with content
                expect(alignToSpy.callCount).toBe(1);

                expect(floater.getEl().getTop()).toBe(100);
            });
        });
    });

});