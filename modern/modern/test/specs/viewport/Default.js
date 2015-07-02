describe("Ext.viewport.Default", function() {
    var initialHeight = 600,
        initialWidth = 300,
        addWindowListenerSpy,
        Viewport = Ext.viewport.Default;

    Viewport.override({
        addWindowListener: function() {
            if (!addWindowListenerSpy) return this.callOverridden(arguments);
            addWindowListenerSpy.apply(this, arguments);
        },

        getWindowWidth: function() {
            return initialWidth;
        },

        getWindowHeight: function() {
            return initialHeight;
        },

        getWindowOrientation: function() {
            return 0;
        },

        waitUntil: function(condition, onSatisfied) {
            onSatisfied.call(this);
        }
    });

    beforeEach(function() {
        addWindowListenerSpy = jasmine.createSpy();
    });

    describe("constructor()", function(){
        it("should attach initial listeners", function(){
            var viewport = new Viewport();

            expect(addWindowListenerSpy).toHaveBeenCalled();

            viewport.destroy();
        });
    });

    describe("methods", function(){
        var viewport;

        beforeEach(function() {
            viewport = new Viewport();
        });

        afterEach(function(){
            viewport.destroy();
        });

        describe("onWindowReady()", function() {
            it("should set isReady flag to true", function() {
                viewport.onDomReady();

                expect(viewport.isReady).toBe(true);
            });
        });

        describe("doAddListener()", function(){
            it("should invoke the listener immediately if eventName is 'ready' and isReady flag equals 'true'", function(){
                var fn = jasmine.createSpy();

                viewport.isReady = true;
                viewport.addListener('ready', fn);

                expect(fn).toHaveBeenCalled();
            });

            it("should proxy to observable mixin's doAddListener() otherwise", function(){
                var fn = jasmine.createSpy();

                viewport.isReady = false;
                viewport.addListener('ready', fn);

                expect(fn).not.toHaveBeenCalled();
                expect(viewport.events.ready.listeners.length).toBe(1);
            });
        });

        describe("onResize()", function(){
            it("should invoke getWindowWidth() and getWindowHeight()", function(){
                spyOn(viewport, 'getWindowWidth');
                spyOn(viewport, 'getWindowHeight');

                viewport.onResize();

                expect(viewport.getWindowWidth).toHaveBeenCalled();
                expect(viewport.getWindowHeight).toHaveBeenCalled();
            });

            it("should NOT fire a 'resize' event if the size doesn't change", function(){
                spyOn(viewport, 'fireEvent');

                viewport.onResize();

                expect(viewport.fireEvent).not.toHaveBeenCalled();
            });

            it("should fire a 'resize' event and pass the width and height as arguments if the size changes", function(){
                // both width and height must change, and the actual calculated orientation
                // much also change between portrait and landscape
                var newHeight = initialWidth,
                    newWidth = initialHeight;

                spyOn(viewport, 'getWindowHeight').andReturn(newHeight);
                spyOn(viewport, 'getWindowWidth').andReturn(newWidth);
                spyOn(viewport, 'fireEvent');

                viewport.onResize();

                expect(viewport.fireEvent).toHaveBeenCalledWith(
                    'orientationchange',
                    viewport, 'landscape',
                    newWidth,
                    newHeight);
            });

            it("should invoke fireOrientationChangeEvent() if width is greater than height", function(){
                var newHeight = 300,
                    newWidth = 600;

                spyOn(viewport, 'getWindowHeight').andReturn(newHeight);
                spyOn(viewport, 'getWindowWidth').andReturn(newWidth);

                spyOn(viewport, 'fireOrientationChangeEvent');

                viewport.onResize();

                expect(viewport.fireOrientationChangeEvent).toHaveBeenCalled();
            });

            it("should NOT invoke onOrientationChange() if width is still smaller than height", function(){
                var newHeight = 600,
                    newWidth = 599;

                spyOn(viewport, 'getWindowHeight').andReturn(newHeight);
                spyOn(viewport, 'getWindowWidth').andReturn(newWidth);

                spyOn(viewport, 'fireOrientationChangeEvent');

                viewport.onResize();

                expect(viewport.fireOrientationChangeEvent).not.toHaveBeenCalled();
            });
        });

        describe("determineOrientation()", function(){
            describe("if supportOrientation is true", function(){
                beforeEach(function() {
                    spyOn(viewport, 'supportsOrientation').andReturn(true);
                });

                it("should invoke getWindowOrientation()", function(){
                    spyOn(viewport, 'getWindowOrientation');

                    viewport.determineOrientation();

                    expect(viewport.getWindowOrientation).toHaveBeenCalled();
                });

                it("should return viewport.PORTRAIT if orientation equals 0", function(){
                    spyOn(viewport, 'getWindowOrientation').andReturn(0);

                    viewport.determineOrientation();

                    expect(viewport.determineOrientation()).toBe(viewport.PORTRAIT);
                });

                it("should return viewport.PORTRAIT if orientation equals 180", function(){
                    spyOn(viewport, 'getWindowOrientation').andReturn(180);

                    viewport.determineOrientation();

                    expect(viewport.determineOrientation()).toBe(viewport.PORTRAIT);
                });

                it("should return viewport.LANDSCAPE if orientation equals 90", function(){
                    spyOn(viewport, 'getWindowOrientation').andReturn(90);

                    viewport.determineOrientation();

                    expect(viewport.determineOrientation()).toBe(viewport.LANDSCAPE);
                });

                it("should return viewport.LANDSCAPE if orientation equals 270", function(){
                    spyOn(viewport, 'getWindowOrientation').andReturn(270);

                    viewport.determineOrientation();

                    expect(viewport.determineOrientation()).toBe(viewport.LANDSCAPE);
                });
            });

            describe("if supportOrientation is false", function(){
                beforeEach(function() {
                    spyOn(viewport, 'supportsOrientation').andReturn(false);
                });

                it("should invoke getWindowWidth() and getWindowHeight()", function(){
                    spyOn(viewport, 'getWindowWidth');
                    spyOn(viewport, 'getWindowHeight');

                    viewport.determineOrientation();

                    expect(viewport.getWindowWidth).toHaveBeenCalled();
                    expect(viewport.getWindowHeight).toHaveBeenCalled();
                });

                it("should return viewport.PORTRAIT if height is 600 and width is 400", function(){
                    spyOn(viewport, 'getWindowHeight').andReturn(600);
                    spyOn(viewport, 'getWindowWidth').andReturn(400);

                    expect(viewport.determineOrientation()).toBe(viewport.PORTRAIT);
                });

                it("should return viewport.PORTRAIT if height is 600 and width is 600 (equivalent)", function(){
                    spyOn(viewport, 'getWindowHeight').andReturn(600);
                    spyOn(viewport, 'getWindowWidth').andReturn(600);

                    expect(viewport.determineOrientation()).toBe(viewport.PORTRAIT);
                });

                it("should return viewport.LANDSCAPE if height is 400 and width is 600", function(){
                    spyOn(viewport, 'getWindowHeight').andReturn(400);
                    spyOn(viewport, 'getWindowWidth').andReturn(600);

                    expect(viewport.determineOrientation()).toBe(viewport.LANDSCAPE);
                });
            });
        });

        describe("onOrientationChange()", function(){
            it("should invoke determineOrientation()", function(){
                spyOn(viewport, 'determineOrientation');

                viewport.onOrientationChange();

                expect(viewport.determineOrientation).toHaveBeenCalled();
            });

            it("should NOT fire an 'orientationchange' event if the orientation didn't change", function(){
                spyOn(viewport, 'fireEvent');

                viewport.onOrientationChange();

                expect(viewport.fireEvent).not.toHaveBeenCalled();
            });

            it("should fire an 'orientationchange' event and pass the new orientation, width and height as arguments, if the orientation did change", function(){
                var newOrientation = viewport.LANDSCAPE;

                spyOn(viewport, 'determineOrientation').andReturn(newOrientation);
                spyOn(viewport, 'fireEvent');

                viewport.onOrientationChange();

                expect(viewport.fireEvent).toHaveBeenCalledWith('orientationchange', viewport, newOrientation, viewport.windowWidth, viewport.windowHeight);
            });
        });
    });

});
