Ext.define('KitchenSink.view.grid.ActionsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.actionsgrid',

    renderChange: function(val) {
        var out = Ext.util.Format.number(val, '0.00');
        if (val > 0) {
            return '<span style="color:' + this.getView().profileInfo.green + ';">' + out + '</span>';
        } else if (val < 0) {
            return '<span style="color:' + this.getView().profileInfo.red + ';">' + out + '</span>';
        }
        return out;
    },

    renderPctChange: function(val) {
        var out = Ext.util.Format.number(val, '0.00%');
        if (val > 0) {
            return '<span style="color:' + this.getView().profileInfo.green + ';">' + out + '</span>';
        } else if (val < 0) {
            return '<span style="color:' + this.getView().profileInfo.red + ';">' + out + '</span>';
        }
        return out;
    },

    handleBuyAction: function(widget, event) {
        var rec = this.getView().getSelectionModel().getSelection()[0];
        if (rec) {
            Ext.example.msg('Buy', 'Buy ' + rec.get('name'));
        }
    },

    handleSellAction: function(widget, event) {
        var rec = this.getView().getSelectionModel().getSelection()[0];
        if (rec) {
            Ext.example.msg('Sell', 'Sell ' + rec.get('name'));
        }
    },

    onGridContextMenu: function(view, rec, node, index, e) {
        e.stopEvent();
        this.getContextMenu().show().setLocalXY(e.getXY());
        return false;
    },

    onSelectionChange: function(sm, selections) {
        var buyAction = this.view.getAction('buy'),
            sellAction = this.view.getAction('sell');

        // Enable/disable Actions.
        // All widgets created from the Actions are affected.
        if (selections.length) {
            buyAction.enable();
            sellAction.enable();
        } else {
            buyAction.disable();
            sellAction.disable();
        }
    },

    getBuyAction: function() {
        var me = this;
        return me.buyAction || (me.buyAction = Ext.create('Ext.Action', {
            iconCls: 'array-grid-buy-col',
            text: 'Buy stock',
            disabled: true,
            handler: me.handleBuyAction,
            scope: me
        }));
    },

    getSellAction: function() {
        var me = this;
        return me.sellAction || (me.sellAction = Ext.create('Ext.Action', {
            iconCls: 'array-grid-sell-col',
            text: 'Sell stock',
            disabled: true,
            handler: me.handleSellAction,
            scope: me
        }));
    },

    getContextMenu: function() {
        return this.contextMenu || (this.contextMenu = this.view.add({
            xtype: 'menu',
            items: [
                // Actions can be converted into MenuItems
                '@buy',
                '@sell'
            ]
        }));
    }
});
