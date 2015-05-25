addGlobal([
    'spec'
]);

Ext.onReady(function() {
    // calling setCapture() can cause problem with emulated mouse events
    Ext.Element.prototype.setCapture = Ext.emptyFn;
});