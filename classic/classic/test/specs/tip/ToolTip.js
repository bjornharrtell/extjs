describe("Ext.tip.ToolTip", function() {

    var tip,
        target;

    function createTip(config) {
        config = Ext.apply({}, config, {target: target, width: 50, height: 50, html: 'X'});
        tip = new Ext.tip.ToolTip(config);
        return tip;
    }

    beforeEach(function() {
        // force scroll to top, to avoid issues with positions getting calculted incorrectly as the scroll jumps around
       // window.scrollTo(0, 0);

        target = Ext.getBody().insertHtml(
            'beforeEnd',
            '<a href="#" id="tipTarget" style="position:absolute; left:100px; top:100px; width: 50px; height: 50px;">x</a>',
            true
        );
                
    });

    afterEach(function() {
        if (tip) {
            tip.destroy();
            tip = null;
        }
        target.destroy();
    });

    function mouseOverTarget() {
        jasmine.fireMouseEvent(target, 'mouseover', target.getX(), target.getY());
    }

    describe("basic", function() {
        it("should extend Ext.tip.Tip", function() {
            expect(createTip() instanceof Ext.tip.Tip).toBeTruthy();
        });

        it("should accept an id for the 'target' config", function() {
            createTip({target: 'tipTarget'});
            expect(tip.target.dom).toBe(target.dom);
        });

        it("should accept an Ext.Element for the 'target' config", function() {
            createTip({target: target});
            expect(tip.target.dom).toBe(target.dom);
        });

        it("should accept an HTMLElement for the 'target' config", function() {
            createTip({target: target.dom});
            expect(tip.target.dom).toBe(target.dom);
        });
    });

    describe("disable", function() {
        it("should not show when not using a delay", function() {
            createTip({
                target: 'tipTarget',
                showDelay: 0
            });
            tip.disable();
            mouseOverTarget();
            expect(tip.isVisible()).toBe(false);
        });

        it("should not show when disabled during a delay and not rendered", function() {
            createTip({
                target: 'tipTarget',
                showDelay: 1000
            });
            mouseOverTarget();
            tip.disable();
            var spy = jasmine.createSpy();
            tip.on('show', spy);
            waits(1500);
            runs(function() {
                expect(spy).not.toHaveBeenCalled();
            });
        });

        it("should not show when disabled during a delay and already rendered", function() {
            createTip({
                target: 'tipTarget',
                showDelay: 1000,
                renderTo: Ext.getBody()
            });
            tip.hide();
            mouseOverTarget();
            tip.disable();
            var spy = jasmine.createSpy();
            tip.on('show', spy);
            waits(1500);
            runs(function() {
                expect(spy).not.toHaveBeenCalled();
            });
        });
    });

    describe("show/hide", function() {
        it("should show the tooltip after mousing over the target element", function() {
            runs(function() {
                createTip({showDelay: 1});
                var delaySpy = spyOn(tip, 'delayShow').andCallThrough();
                expect(tip.isVisible()).toBeFalsy();
                mouseOverTarget();
                expect(delaySpy).toHaveBeenCalled();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
        });

        it("should hide the tooltip after mousing out of the target element", function() {
            runs(function() {
                createTip({showDelay: 1, hideDelay: 15});
                mouseOverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                jasmine.fireMouseEvent(target, 'mouseout', target.getX(), target.getY());
            });
            waitsFor(function() {
                return !tip.isVisible();
            }, "ToolTip was never hidden");
        });

        it("should hide the tooltip after a delay", function() {
            runs(function() {
                createTip({showDelay: 1, dismissDelay: 15});
                mouseOverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            waitsFor(function() {
                return !tip.isVisible();
            }, "ToolTip was never hidden");
        });

        it("should prevent the tooltip from automatically hiding if autoHide is false", function() {
            runs(function() {
                createTip({showDelay: 1, autoHide: false});
                this.spy = spyOn(tip, 'hide');
                mouseOverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            waits(100);
            runs(function() {
                expect(this.spy).not.toHaveBeenCalled();
            });
        });

        it("should allow clicking outside the tip to close it if autoHide is false", function() {
            runs(function() {
                createTip({showDelay: 1, autoHide: false});
                mouseOverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                this.spy = spyOn(tip, 'hide').andCallThrough();
                jasmine.fireMouseEvent(Ext.getBody(), 'mousedown', 0, 0);
                expect(this.spy).toHaveBeenCalled();
            });
        });
    });

    describe("mouseOffset", function() {
        it("should display the tooltip [15,18] from the mouse pointer by default", function() {
            runs(function() {
                createTip({showDelay: 1});
                mouseOverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                expect(tip.el).toBePositionedAt(target.getX() + 15, target.getY() + 18);
            });
        });

        it("should allow configuring the mouseOffset", function() {
            runs(function() {
                createTip({showDelay: 1, mouseOffset: [20, 30]});
                mouseOverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                expect(tip.el).toBePositionedAt(target.getX() + 35, target.getY() + 48);
            });
        });
    });
    
    describe("showAt", function(){
        it("should at the specified position", function(){
            createTip();
            tip.showAt([100, 100]);
            expect(tip.el).toBePositionedAt(100, 100);    
        });  
    });

    describe("trackMouse", function() {
        it("should move the tooltip along with the mouse if 'trackMouse' is true", function() {
            var x = target.getX(),
                y = target.getY();
            runs(function() {
                createTip({showDelay: 1, trackMouse: true});
                jasmine.fireMouseEvent(target, 'mouseover', x, y);
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                expect(tip.el).toBePositionedAt(x + 15, y + 18);
                for(var i = 0; i < 5; i++) {
                    jasmine.fireMouseEvent(target, 'mousemove', ++x, ++y);
                    expect(tip.el).toBePositionedAt(x + 15, y + 18);
                }
            });
        });

        describe('caching coords', function () {
            // See EXTJSIV-11292.
            // NOTE: The first time that the target is moused over the tooltip's layer (it's el)
            // won't have been created yet, so it's necessary to mouseover twice to test the API.
            //
            // When trackMouse = false, the XY coords will be cached by Tooltip.delayShow() and passed along
            // as an argument to Tooltip.show().  This is why we're checking the arguments passed to it.
            var x, y, n = 0;

            beforeEach(function () {
                x = target.getX();
                y = target.getY();

                runs(function() {
                    // Since there are only two tests in this suite let's use the variable n to flip trackMouse.
                    createTip({showDelay: 1, trackMouse: n ? true : false});
                    spyOn(tip, 'show').andCallThrough();
                    jasmine.fireMouseEvent(target, 'mouseover', x, y);
                    n++;
                });

                waitsFor(function() {
                    return tip.isVisible();
                }, 'ToolTip was never shown');
            });

            it('should cache xy coords when trackMouse=false', function () {
                runs(function () {
                    expect(tip.show.mostRecentCall.args[0]).toBe(undefined);
                });

                waits(10);

                runs(function () {
                    jasmine.fireMouseEvent(target, 'mouseover', x, y);
                    expect(tip.show.mostRecentCall.args[0]).toEqual([115, 118]);
                });
            });

            it('should not cache xy coords when trackMouse=true', function () {
                runs(function () {
                    expect(tip.show.mostRecentCall.args[0]).toBeFalsy();
                });

                waits(10);

                runs(function () {
                    jasmine.fireMouseEvent(target, 'mouseover', x, y);
                    expect(tip.show.mostRecentCall.args[0]).toBeFalsy();
                });
            });
        });
    });

    describe("anchor", function() {
        it("should allow anchoring the top of the tooltip to the target", function() {
            createTip({anchor: 'top'});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0], tgtXY[1] + target.getHeight() + 9);
        });

        it("should allow anchoring the right of the tooltip to the target", function() {
            createTip({anchor: 'right'});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0] - tip.el.getWidth() - 13, tgtXY[1]);
        });

        it("should allow anchoring the bottom of the tooltip to the target", function() {
            createTip({anchor: 'bottom'});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0], tgtXY[1] - tip.el.getHeight() - 13);
        });

        it("should allow anchoring the left of the tooltip to the target", function() {
            createTip({anchor: 'left'});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0] + target.getWidth() + 9, tgtXY[1]);
        });

        it("should flip from top to bottom if not enough space below the target", function() {
            target.setY(Ext.Element.getViewportHeight() - 75);
            createTip({anchor: 'top', constrainPosition: true});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0], tgtXY[1] - tip.el.getHeight() - 13);
        });

        it("should flip from bottom to top if not enough space above the target", function() {
            target.setY(25);
            createTip({anchor: 'bottom', constrainPosition: true});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0], tgtXY[1] + target.getHeight() + 9);
        });

        it("should flip from right to left if not enough space to the left of the target", function() {
            target.setX(25);
            createTip({anchor: 'right', constrainPosition: true});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0] + target.getWidth() + 9, tgtXY[1]);
        });

        it("should flip from left to right if not enough space to the right of the target", function() {
            target.setX(Ext.Element.getViewportWidth() - 75);
            createTip({anchor: 'left', constrainPosition: true});
            tip.show();
            var tgtXY = target.getXY();
            expect(tip.el).toBePositionedAt(tgtXY[0] - tip.el.getWidth() - 13, tgtXY[1]);
        });
    });

    describe("anchorToTarget=false", function() {
        it("should allow anchoring the top of the tooltip to the mouse pointer", function() {
            var xy = target.getXY();
            runs(function() {
                createTip({showDelay: 1, anchorToTarget: false, anchor: 'top'});
                jasmine.fireMouseEvent(target, 'mouseover', xy[0], xy[1]);
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                expect(tip.el).toBePositionedAt(xy[0] - 15, xy[1] + 30);
            });
        });

        it("should allow anchoring the right of the tooltip to the mouse pointer", function() {
            var xy = target.getXY();
            runs(function() {
                createTip({showDelay: 1, anchorToTarget: false, anchor: 'right'});
                jasmine.fireMouseEvent(target, 'mouseover', xy[0], xy[1]);
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                expect(tip.el).toBePositionedAt(xy[0] - tip.el.getWidth() - 15, xy[1] - 13);
            });
        });

        it("should allow anchoring the bottom of the tooltip to the mouse pointer", function() {
            var xy = target.getXY();
            runs(function() {
                createTip({showDelay: 1, anchorToTarget: false, anchor: 'bottom'});
                jasmine.fireMouseEvent(target, 'mouseover', xy[0], xy[1]);
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                expect(tip.el).toBePositionedAt(xy[0] - 19, xy[1] - tip.el.getHeight() - 13);
            });
        });
        
        it("should allow anchoring the left of the tooltip to the mouse pointer", function() {
            var xy = target.getXY();
            runs(function() {
                createTip({showDelay: 1, anchorToTarget: false, anchor: 'left'});
                jasmine.fireMouseEvent(target, 'mouseover', xy[0], xy[1]);
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "ToolTip was never shown");
            runs(function() {
                expect(tip.el).toBePositionedAt(xy[0] + 25, xy[1] - 13);
            });
        });
    });

    describe("anchorOffset", function() {
        it("should move the anchor arrow horizontally when anchor is top", function() {
            createTip({anchor: 'top', anchorOffset: 25});
            tip.show();
            var tipXY = tip.el.getXY(),
                anchorXY = tip.anchorEl.getXY();
            expect(anchorXY[0]).toEqual(tipXY[0] + 15 + 25);
        });

        it("should move the anchor arrow horizontally when anchor is bottom", function() {
            createTip({anchor: 'bottom', anchorOffset: 25});
            tip.show();
            var tipXY = tip.el.getXY(),
                anchorXY = tip.anchorEl.getXY();
            expect(anchorXY[0]).toEqual(tipXY[0] + 15 + 25);
        });

        it("should move the anchor arrow vertically when anchor is left", function() {
            createTip({anchor: 'left', anchorOffset: 25});
            tip.show();
            var tipXY = tip.el.getXY(),
                anchorXY = tip.anchorEl.getXY();
            expect(anchorXY[1]).toEqual(tipXY[1] + 7 + 25);
        });

        it("should move the anchor arrow vertically when anchor is right", function() {
            createTip({anchor: 'right', anchorOffset: 25});
            tip.show();
            var tipXY = tip.el.getXY(),
                anchorXY = tip.anchorEl.getXY();
            expect(anchorXY[1]).toEqual(tipXY[1] + 7 + 25);
        });
    });

    describe("delegate", function() {
        var delegatedTarget;

        beforeEach(function() {
            target.insertHtml('beforeEnd', '<span class="hasTip" id="delegatedTarget">x</span><span class="noTip">x</span>');
            delegatedTarget = Ext.get('delegatedTarget');
        });

        afterEach(function() {
            delegatedTarget.destroy();
        });

        it("should show the tooltip for descendants matching the selector", function() {
            createTip({delegate: '.hasTip'});
            var spy = spyOn(tip, 'delayShow');
            jasmine.fireMouseEvent(delegatedTarget, 'mouseover', delegatedTarget.getX(), delegatedTarget.getY());
            expect(spy).toHaveBeenCalled();
        });

        it("should not show the tooltip for descendants that do not match the selector", function() {
            createTip({delegate: '.hasTip'});
            var spy = spyOn(tip, 'delayShow');
            mouseOverTarget();
            expect(spy).not.toHaveBeenCalled();
        });

        it("should set the triggerElement property to the active descendant element when shown", function() {
            createTip({delegate: '.hasTip'});
            jasmine.fireMouseEvent(delegatedTarget, 'mouseover', delegatedTarget.getX(), delegatedTarget.getY());
            expect(tip.triggerElement).toBe(delegatedTarget.dom);
        });

        it("should unset the triggerElement property when hiding", function() {
            createTip({delegate: '.hasTip'});
            jasmine.fireMouseEvent(delegatedTarget, 'mouseover', delegatedTarget.getX(), delegatedTarget.getY());
            tip.hide();
            expect(tip.triggerElement).not.toBeDefined();
        });
    });

});
