Ext.define('KitchenSink.view.d3.TreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree',

    requires: [
        'Ext.util.Format'
    ],

    onTooltip: function (component, tooltip, node, element, event) {
        var n = node.childNodes.length;

        tooltip.setHtml(n + ' items' + (n === 1 ? '' : 's') + ' inside.');
    }

});