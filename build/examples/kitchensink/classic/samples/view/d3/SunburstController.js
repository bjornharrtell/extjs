Ext.define('KitchenSink.view.d3.SunburstController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sunburst',

    requires: [
        'Ext.util.Format'
    ],

    onTooltip: function (component, tooltip, node, element, event) {
        var size = node.get('size'),
            n = node.childNodes.length;

        tooltip.setTitle(node.get('text'));
        if (size) {
            tooltip.setHtml(Ext.util.Format.fileSize(size));
        } else {
            tooltip.setHtml(n + ' file' + (n === 1 ? '' : 's') + ' inside.');
        }
    }

});
