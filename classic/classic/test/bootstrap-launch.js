Ext.Loader.setConfig({enabled: true});
Ext.require([
    '*',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.XmlSimlet',
    'Ext.ux.ajax.SimManager',
    'Ext.ux.PreviewPlugin'
]);
Ext.onReady(function () {
    // Errors thrown by XTemplate-generated code should not be caught; they should cause test failures
    Ext.XTemplate.prototype.strict = true;

    // In case some tests which access the Ext.EventObject are invoked before the first DOM event.
    Ext.EventObject = new Ext.event.Event({});

    // ensures the body begins absolutely empty (some browsers have a default text node)
    document.body.innerHTML = '';

    // The deferCallback method defers execution of a function until the next animation frame.
    // In unit tests, we do not want this, we need everything to execute synchronously.
    Ext.deferCallback = Ext.callback;

    // The gesture publisher uses requestAnimationFrame for all its handlers by default.
    // This can cause the timing of when gestures are fired to be different from that of
    // normal dom events (e.g. tap vs click).  For consistency we turn off animationFrame
    // timing for all gestures during the test run.
    Ext.event.publisher.Gesture.instance.setAsync(false);

    // calling setCapture() can cause problem with emulated mouse events
    Ext.Element.prototype.setCapture = Ext.emptyFn;

    Ext.Loader.loadScripts({
        url: [
            "../../../../build/classic/theme-classic/theme-classic-debug.js",
            "cmd.js",
            "../../.sencha/test/json2.js",
            "../../.sencha/test/jasmine.js",
            "cmd-jasmine.js",
            "../resources/init.js",
            "../../../../packages/core/test/resources/helpers.js",
            "../bootstrap-specs.js"
        ]
    });
});
