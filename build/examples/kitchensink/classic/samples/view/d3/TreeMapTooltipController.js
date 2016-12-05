Ext.define('KitchenSink.view.d3.TreeMapTooltipController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.treemap-tooltip',

    onTooltip: function (component, tooltip, node, element, event) {
        var view = this.getView(),
            tpl = view.lookupTpl(node.isLeaf() ? 'leafTpl' : 'parentTpl'),
            html;

        component.setSelection(node);

        html = tpl.apply(node);
        tooltip.setHtml(html);
    }
});
