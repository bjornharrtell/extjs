/**
 * Controller for several grid examples (such as BasicGrid).
 *
 * Provides column renderers and handlers for the ActionColumn and buttons.
 */
Ext.define('KitchenSink.view.grid.BasicGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicgrid',

    getBuyClass: function(v, meta, rec) {
        if (rec.get('change') < 0) {
            return 'array-grid-alert-col';
        } else {
            return 'array-grid-buy-col';
        }
    },

    getBuyTip: function(v, meta, rec) {
        if (rec.get('change') < 0) {
            return 'Hold stock';
        } else {
            return 'Buy stock';
        }
    },

    onBuyClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            action = (rec.get('change') < 0 ? 'Hold' : 'Buy');

        Ext.Msg.alert(action, action + ' ' + rec.get('name'));
    },

    onSellClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.alert('Sell', 'Sell ' + rec.get('name'));
    },

    onToggleTrading: function(btn, pressed) {
        var view = this.view;

        if (pressed) {
            view.getAction('buy').disable();
            view.getAction('sell').disable();
            btn.setText('Resume Trading');
        } else {
            view.getAction('buy').enable();
            view.getAction('sell').enable();
            btn.setText('Suspend Trading');
        }
    },

    renderChange: function (value) {
        return this.renderSign(value, '0.00');
    },

    renderPercent: function (value) {
        return this.renderSign(value, '0.00%');
    },

    renderSign: function (value, format) {
        var text = Ext.util.Format.number(value, format),
            tpl = this.signTpl,
            data = this.data;

        if (Math.abs(value) > 0.1) {
            if (!tpl) {
                this.signTpl = tpl = this.getView().lookupTpl('signTpl');
                this.data = data = {};
            }

            data.value = value;
            data.text = text;

            text = tpl.apply(data);
        }

        return text;
    }
});
