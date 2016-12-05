Ext.define('KitchenSink.view.tip.ToolTipsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tooltips',

    beforeAjaxTipShow: function(tip) {
        Ext.Ajax.request({
            url: '/KitchenSink/ToolTipsSimple',
            success: function(response) {
                tip.setHtml(response.responseText);
            }
        });
    }
});
