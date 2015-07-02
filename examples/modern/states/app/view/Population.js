Ext.define("States.view.Population", {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'popu',
    config: {
        store: 'BarStore',
        insetPadding: '20 0 0 0',
        interactions: [
            {
                type: 'panzoom',
                panGesture: 'none'
            },
            {
                type: 'itemhighlight',
                sticky: true
            }
        ],
        selection: null,
        axes: [
            {
                type: 'category',
                position: 'bottom',
                style: {
                    estStepSize: 16
                },
                label: {
                    field: 'name',
                    font: '12px Helvetica'
                }
            },
            {
                type: 'numeric',
                minimum: 0,
                maximum: 40000000,
                majorTickSteps: 40,
                position: 'left',
                renderer: function (axis, v) {
                    return (v / 1e6).toFixed(1) + 'M';
                },
                style: {
                    estStepSize: 8
                },
                title: {
                    text: 'Population Distribution',
                    font: '18px Helvetica'
                },
                label: {
                    font: '12px Helvetica'
                }
            }
        ],
        series: [
            {
                type: 'bar',
                xField: 'name',
                yField: 'population',
                axis: 'left',
                highlightCfg: {
                    shadowColor: 'black',
                    strokeStyle: 'white',
                    shadowBlur: 15,
                    zIndex: 15,
                    fill: '#dd8',
                    lineWidth: 2
                },
                label: {
                    field: 'name',
                    display: 'insideEnd',
                    font: '10px Helvetica'
                },
                style: {
                    stroke: '#333',
                    fill: 'rgb(49,235,247)',
                    minGapWidth: 1,
                    renderer: function (sprite, config, rendererData, index) {
                        var minVal = sprite.attr.dataMinY,
                            maxVal = sprite.attr.dataMaxY,
                            store = rendererData.store,
                            storeItem = store.getData().items[index],
                            val = storeItem.get('population'),
                            ratio = (val - minVal) / (maxVal - minVal),
                            from = {r: 49, g: 130, b: 189},
                            to = {r: 222, g: 235, b: 247};

                        config.fillStyle = Ext.draw.Color.fly(
                            Math.round((to.r - from.r) * ratio + from.r),
                            Math.round((to.g - from.g) * ratio + from.g),
                            Math.round((to.b - from.b) * ratio + from.b),
                            1
                        ).toString();
                    }
                },
                listeners: {
                    itemtap: function (series, item) {
                        States.app.setStateData(item.record.get('name'));
                    }
                }
            }
        ]
    },

    setSelection: function (selection) {
        var store = this.getStore(),
            items = store.getData().items, series = this.getSeries()[0],
            i, ln;

        for (i = 0, ln = items.length; i < ln; i++) {
            if (items[i].data.name === selection) {
                this.setHighlightItem({
                    series: series,
                    sprite: series.sprites[0],
                    index: i,
                    category: 'items'
                });
                return items[i];
            }
        }
        this.setHighlightItem(null);
    }
});