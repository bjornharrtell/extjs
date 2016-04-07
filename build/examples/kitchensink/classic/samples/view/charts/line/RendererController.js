Ext.define('KitchenSink.view.charts.line.RendererController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.line-renderer',

    onSeriesRender: function (sprite, config, rendererData, index) {
        var store = rendererData.store,
            storeItems = store.getData().items,
            currentRecord = storeItems[index],
            previousRecord = (index > 0 ? storeItems[index-1] : currentRecord),
            current = currentRecord && currentRecord.data['g1'],
            previous = previousRecord && previousRecord.data['g1'],
            isUp = current >= previous,
            changes = {};

        switch (config.type) {
            case 'marker':
                changes.strokeStyle = (isUp ? 'cornflowerblue' : 'tomato');
                changes.fillStyle = (isUp ? 'aliceblue' : 'lightpink');
                break;
            case 'line':
                changes.strokeStyle = (isUp ? 'cornflowerblue' : 'tomato');
                changes.fillStyle = (isUp ? 'rgba(100, 149, 237, 0.4)' : 'rgba(255, 99, 71, 0.4)');
                break;
        }

        return changes;
    },

    onAxisRangeChange: function (axis, range) {
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        var max = range[1];

        if (max >= 1000) {
            range[1] = max - max % 100 + 100;
        } else if (max >= 500) {
            range[1] = max - max % 50 + 50;
        } else {
            range[1] = max - max % 20 + 20;
        }
    },

    onRefresh: function () {
        var chart = this.lookupReference('chart'),
            store = chart.getStore();

        store.refreshData();
    }

});