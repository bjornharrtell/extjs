Ext.define('KitchenSink.view.d3.SunburstZoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sunburst',

    requires: [
        'Ext.util.Format'
    ],

    onTooltip: function (component, tooltip, node, element, event) {
        var size = node.get('size'),
            n = node.childNodes.length,
            html;

        if (size) {
            tooltip.setHtml(Ext.util.Format.fileSize(size));
        } else {
            html = n + ' file' + (n === 1 ? '' : 's') + ' inside.';
            if (node.depth > 1) {
                html += '<br>(This sunburst is set to render top 3 levels only.)';
            }
            tooltip.setHtml(html);
        }
    }

});
