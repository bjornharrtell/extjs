Ext.define('StockApp.view.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onVisibleRangeChange: function (axis, visibleRange) {
        var preview = this.lookupReference('preview');

        if (!preview) {
            // Not all view components have been created yet.
            return;
        }

        var surface = preview.getSurface('chart'),
            rangeMask = surface.getItems()[0];

        rangeMask.setAttributes({
            visibleRange: visibleRange.concat([0, 1])
        });
        surface.renderFrame();
    }
});