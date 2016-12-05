Ext.define('KitchenSink.view.d3.PivotTreeMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.treemap-pivot',

    changeDock: function(button, checked){
        if(checked) {
            this.getView().getConfigurator().setDock(button.text.toLowerCase());
        }
    },

    monthLabelRenderer: function(v){
        return Ext.Date.monthNames[v];
    },

    onBeforeAddConfigField: function(panel, config){
        var dest = config.toContainer;

        if(dest.getFieldType() === 'aggregate' && dest.items.getCount() >= 1){
            // this will force single fields on aggregate
            dest.removeAll();
        }
    },

    onShowFieldSettings: function(panel, config){
        var align = config.container.down('[name=align]');
        // hide the alignment field in settings since it's useless
        if(align) {
            align.hide();
        }
    },

    onShowConfigPanel: function(panel){
        panel.getLeftAxisHeader().getTitle().setText('Tree labels');
        panel.setTopAxisContainerVisible(false);
    },

    onTooltip: function (component, tooltip, node, element, event) {
        var view = this.getView(),
            tpl = view.lookupTpl(node.isLeaf() ? 'leafTpl' : 'parentTpl'),
            html;

        component.setSelection(node);

        html = tpl.apply(node);
        tooltip.setHtml(html);
    }

});
