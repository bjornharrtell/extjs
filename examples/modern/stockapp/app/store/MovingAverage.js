Ext.define("StockApp.store.MovingAverage", {
    alias: 'store.MovingAverage',
    requires: ['StockApp.model.Stock', 'Ext.data.reader.Array'],
    extend: "Ext.data.ArrayStore",
    config: {
        model: "StockApp.model.Stock",
        source: null,
        window: 50
    },

    applySource: function (source) {
        return Ext.StoreManager.lookup(source);
    },

    updateSource: function (source, oldSource) {
        if (source) {
            source.on('refresh', 'onRefreshSource', this);
            this.setOriginalData(source.getData());
        }
        if (oldSource) {
            oldSource.on('refresh', 'onRefreshSource', this);
        }
    },

    onRefreshSource: function () {
        if (this.getSource()) {
            this.setOriginalData(this.getSource().getData());
        }
    },

    setOriginalData: function (data) {
        var length = data.length,
            items = data.items,
            ma = [],
            window = this.getWindow(),
            item, item2,
            cntDate = 0,
            cntOpen = 0,
            cntHigh = 0,
            cntLow = 0,
            cntClose = 0,
            cntVolume = 0,
            cntAdjClose = 0,
            i, j;
        for (i = 0; i < window; i++) {
            item = items[i].data;
            cntDate += item.date;
            cntOpen += item.open;
            cntHigh += item.high;
            cntLow += item.low;
            cntClose += item.close;
            cntVolume += item.volume;
            cntAdjClose += item.adjClose;
            ma.push([
                cntDate / (i + 1),
                cntOpen / (i + 1),
                cntHigh / (i + 1),
                cntLow / (i + 1),
                cntClose / (i + 1),
                cntVolume / (i + 1),
                cntAdjClose / (i + 1)
            ]);
        }
        for (i = 0, j = window; j < length; i++, j++) {
            item = items[i].data;
            item2 = items[j].data;
            cntDate += item2.date - item.date;
            cntOpen += item2.open - item.open;
            cntHigh += item2.high - item.high;
            cntLow += item2.low - item.low;
            cntClose += item2.close - item.close;
            cntVolume += item2.volume - item.volume;
            cntAdjClose += item2.adjClose - item.adjClose;
            ma.push([
                cntDate / window,
                cntOpen / window,
                cntHigh / window,
                cntLow / window,
                cntClose / window,
                cntVolume / window,
                cntAdjClose / window
            ]);
        }
        for (; i < length - 1; i++) {
            item = items[i].data;
            cntDate -= item.date;
            cntOpen -= item.open;
            cntHigh -= item.high;
            cntLow -= item.low;
            cntClose -= item.close;
            cntVolume -= item.volume;
            cntAdjClose -= item.adjClose;
            ma.push([
                cntDate / (length - i - 1),
                cntOpen / (length - i - 1),
                cntHigh / (length - i - 1),
                cntLow / (length - i - 1),
                cntClose / (length - i - 1),
                cntVolume / (length - i - 1),
                cntAdjClose / (length - i - 1)
            ]);
        }
        item = items[i].data;
        ma.push([
            item.date,
            item.open,
            item.high,
            item.low,
            item.close,
            item.volume,
            item.adjClose
        ]);
        this.setData(ma);
    }
});