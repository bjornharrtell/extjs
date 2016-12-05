(function() {
    /**
     * Demonstrates how to use Ext.chart.PlotChart
     */
    var fn = [
        function(x) {
            return Math.sin(5 * x);
        },
        function(x) {
            return x * x * 2 - 1;
        },
        function(x) {
            return Math.sqrt((1 + x) / 2) * 2 - 1;
        },
        function(x) {
            return x * x * x;
        },
        function(x) {
            return Math.cos(10 * x);
        },
        function(x) {
            return 2 * x;
        },
        function(x) {
            return Math.pow(x, -2);
        },
        function(x) {
            return Math.pow(x, -3);
        },
        function(x) {
            return Math.tan(5 * x);
        }
    ];

    var ct = 0.02,
        i = 0;

    var createData = function() {
        var delta = arguments[0],
            l = arguments.length,
            data = [],
            cap = 10000,
            i, j, y,
            rec;
        for (i = -2; i <= 2; i += delta) {
            rec = {
                x: i
            };
            for (j = 1; j < l; ++j) {
                y = arguments[j](i);
                if (y > cap) {
                    y = cap;
                }
                rec['y' + j] = y;
            }
            data.push(rec);
        }
        return data;
    };

    Ext.define('KitchenSink.view.chart.Plot', {
        extend: 'Ext.Panel',
        requires: [
            'Ext.chart.CartesianChart', 
            'Ext.chart.interactions.PanZoom',
            'Ext.chart.series.Bar', 
            'Ext.chart.axis.Numeric', 
            'Ext.chart.axis.Category'
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
    
        layout: 'fit',
        shadow: true,

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
                    Ext.getStore('PlotStore').setData(createData(ct, fn[++i % fn.length]));
                }
            }]
        }, {
            xtype: 'cartesian',
            store: {
                storeId: 'PlotStore',
                fields: ['x', 'y1', 'y2', 'y3', 'y4', 'y5']
            },
            background: 'white',
            theme: "Sky",
            interactions: 'panzoom',
            series: [{
                type: 'line',
                xField: 'x',
                yField: 'y1',
                style: {
                    lineWidth: 2,
                    strokeStyle: 'rgb(0, 119, 204)'
                }
            }],
            axes: [{
                type: 'numeric',
                position: 'left',
                fields: ['y1'],
                titleMargin: 20,
                title: {
                    text: 'f(x)',
                    fontSize: 16,
                    fillStyle: 'rgb(255, 0, 136)'
                },
                minimum: -4,
                maximum: 4,
                floating: {
                    value: 0,
                    alongAxis: 1
                },
                grid: true
            }, {
                type: 'numeric',
                position: 'bottom',
                fields: ['x'],
                titleMargin: 6,
                title: {
                    text: 'x',
                    fontSize: 16,
                    fillStyle: 'rgb(255, 0, 136)'
                },
                floating: {
                    value: 0,
                    alongAxis: 0
                },
                grid: true
            }]
        }],

        initialize: function() {
            this.callParent();
            
            Ext.getStore('PlotStore').setData(createData(ct, fn[0]));
            var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
                interaction = Ext.ComponentQuery.query('interaction', this)[0];
            
            if (toolbar && interaction) {
                toolbar.add(interaction.getModeToggleButton());
            }
        }
    });
})();
