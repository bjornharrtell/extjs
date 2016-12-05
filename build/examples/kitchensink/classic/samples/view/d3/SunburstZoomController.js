Ext.define('KitchenSink.view.d3.SunburstZoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sunburst-zoom',

    onSelectionChange: function (sunburst, node) {
        sunburst.zoomInNode(node);
    }

});
