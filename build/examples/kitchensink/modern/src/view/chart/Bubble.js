(function() {
    /**
     * Demonstrates how to make a buble chart using Ext.chart.series.Scatter
     */
    Ext.define('KitchenSink.view.chart.Bubble', {
        extend: 'Ext.Panel',
        requires: [
            'Ext.chart.CartesianChart', 
            'Ext.chart.series.Scatter', 
            'Ext.chart.axis.Numeric'
        ],

        controller: {
            type: 'chart',
            defaultVisibleRange: {
                left: [0, 1],
                bottom: [0, 1]
            }
        },

        // <example>
        otherContent: [{
            type: 'Controller',
            path: 'modern/src/view/chart/ChartController.js'
        }],
        // </example>
    
        shadow: true,
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            cls: 'charttoolbar',
            items: [{
                xtype: 'spacer'
            }, {
                iconCls: 'x-fa fa-refresh',
                text: 'Refresh',
                handler: function() {
                    Ext.getStore('BubbleStore').setData(createData(50));
                }
            }]
        }, {
            xtype: 'cartesian',
            store: {
                storeId: 'BubbleStore',
                fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5']
            },
            background: 'white',
            interactions: ['panzoom', 'itemhighlight'],
            innerPadding: 30,
            series: [{
                type: 'scatter',
                xField: 'id',
                yField: 'g2',
                highlightCfg: {
                    scale: 1.5,
                    lineWidth: 4,
                    fill: 'gold',
                    fillOpacity: 1
                },
                marker: {
                    type: 'circle',
                    radius: 5,
                    stroke: 'gray',
                    lineWidth: 2,
                    fx: {
                        duration: 200
                    }
                },
                style: {
                    renderer: function(sprite, config, rendererData, index) {
                        var store = rendererData.store,
                            storeItem = store.getData().items[index];
                        config.radius = interpolate(storeItem.data.g3, 0, 1000, 5, 30);
                        config.fillOpacity = interpolate(storeItem.data.g3, 0, 1000, 1, 0.7);
                        config.fill = interpolateColor(storeItem.data.g3, 0, 1000);
                        config.stroke = Ext.util.Color.fromString(config.fill).createDarker(0.15).toString();
                    }
                }
            }],
            axes: [{
                type: 'numeric',
                position: 'left',
                fields: ['g2'],
                minimum: 0,
                maximum: 1800,
                style: {
                    estStepSize: 20
                },
                label: {
                    rotate: {
                        degrees: -30
                    }
                }
            }, {
                type: 'category',
                position: 'bottom',
                fields: ['id']
            }]
        }],
        initialize: function() {
            this.callParent();
            Ext.getStore('BubbleStore').setData(createData(50));
        }
    });

    var seed = 1.3;

    // Controllable random.
    function random() {
        seed *= 7.3;
        seed -= Math.floor(seed);
        return seed;
    }

    function createData(count) {
        var data = [],
            record = {
                'id': 0,
                'g0': 300,
                'g1': 700 * random() + 100,
                'g2': 700 * random() + 100,
                'g3': 700 * random() + 100,
                'name': 'Item-0'
            },
            i;

        data.push(record);
        for (i = 1; i < count; i++) {
            record = {
                'id': i,
                'g0': record.g0 + 30 * random(),
                'g1': Math.abs(record.g1 + 300 * random() - 140),
                'g2': Math.abs(record.g2 + 300 * random() - 140),
                'g3': Math.abs(record.g3 + 300 * random() - 140)
            };
            data.push(record);
        }
        return data;
    }

    function interpolate(lambda, minSrc, maxSrc, minDst, maxDst) {
        return minDst + (maxDst - minDst) * Math.max(0, Math.min(1, (lambda - minSrc) / (maxSrc - minSrc)));
    }

    var fromHSL = Ext.util.Color.fly('blue').getHSL(),
        toHSL = Ext.util.Color.fly('red').getHSL();
    fromHSL[2] = 0.5;

    function interpolateColor(lambda, minSrc, maxSrc) {
        return Ext.util.Color.fly(0, 0, 0, 0).setHSL(
            interpolate(lambda, minSrc, maxSrc, fromHSL[0], toHSL[0]),
            interpolate(lambda, minSrc, maxSrc, fromHSL[1], toHSL[1]),
            interpolate(lambda, minSrc, maxSrc, fromHSL[2], toHSL[2])
        ).toString();
    }
})();
