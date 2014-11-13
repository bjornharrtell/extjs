/**
 * This example shows how to use custom sprites to create a 3D Column Chart. Click and
 * drag to zoom the chart.
 */
Ext.define('KitchenSink.view.charts.column.Column3D', {
    extend: 'Ext.panel.Panel',
    xtype: 'column-3d',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.theme.*'
    ],

    layout: 'fit',

    width: 650,
    height: 500,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var chart = this.up('panel').down('cartesian');
                chart.getStore().refreshData();
            }
        },
        {
            text: 'Switch Theme',
            handler: function () {
                var panel = this.up().up(),
                    chart = panel.down('cartesian'),
                    currentThemeClass = Ext.getClassName(chart.getTheme()),
                    themes = Ext.chart.theme,
                    themeNames = [],
                    currentIndex = 0,
                    name;

                for (name in themes) {
                    if (Ext.getClassName(themes[name]) === currentThemeClass) {
                        currentIndex = themeNames.length;
                    }
                    if (name !== 'Base' && name.indexOf('Gradients') < 0) {
                        themeNames.push(name);
                    }
                }
                chart.setTheme(themes[themeNames[++currentIndex % themeNames.length]]);
                chart.redraw();
            }
        }
    ],

    items: [{
        xtype: 'cartesian',
        store: {type: 'climate'},
        theme: 'Category5',
        id: 'column-chart-3d',
        background: 'white',
        insetPadding: 20,
        interactions: [
            {
                type: 'panzoom',
                zoomOnPanGesture: true
            }
        ],
        series: {
            type: 'column3d',
            xField: 'month',
            yField: 'high',
            style: {
                maxBarWidth: 50
            }
        },
        axes: [
            {
                type: 'numeric',
                position: 'left',
                grid: true,
                label: {
                    rotate: {
                        degrees: -30
                    }
                },
                listeners: {
                    'rangechange': function (range) {
                        if (!range) {
                            return;
                        }
                        // expand the range slightly to make sure markers aren't clipped
                        var max = range[1];
                        if (max >= 35) {
                            range[1] = max - max % 5 + 5;
                        } else {
                            range[1] = max - max % 2 + 2;
                        }
                    }
                }
            },
            {
                type: 'category',
                position: 'bottom'
            }
        ]
    }]

});


/*
 *  3D Column Sprite
 */

Ext.define('KitchenSink.view.charts.touch.ColumnSprite3D', {
    alias: 'sprite.columnSeries3d',
    extend: 'Ext.chart.series.sprite.Bar',
    inheritableStatics: {
        def: {
            defaults: {
                transformFillStroke: true,
                lineJoin: 'bevel'
            }
        }
    },
    lastClip: null,

    drawBar: function (ctx, surface, clip, left, top, right, bottom, itemId) {
        var me = this,
            attr = me.attr,
            center = (left + right) / 2,
            barWidth = (right - left) * 0.33333,
            depthWidth = barWidth * 0.5,
            fill = attr.fillStyle,
            color, darkerColor, lighterColor;

        color = Ext.draw.Color.create(fill.isGradient ? fill.getStops()[0].color : fill),
        darkerColor = color.createDarker(0.05),
        lighterColor = color.createLighter(0.25);

        // top
        ctx.beginPath();
        ctx.moveTo(center - barWidth, top);
        ctx.lineTo(center - barWidth + depthWidth, top + depthWidth);
        ctx.lineTo(center + barWidth + depthWidth, top + depthWidth);
        ctx.lineTo(center + barWidth, top);
        ctx.lineTo(center - barWidth, top);
        ctx.fillStyle = lighterColor.toString();
        ctx.fillStroke(attr);

        // right side
        ctx.beginPath();
        ctx.moveTo(center + barWidth, top);
        ctx.lineTo(center + barWidth + depthWidth, top + depthWidth);
        ctx.lineTo(center + barWidth + depthWidth, bottom + depthWidth);
        ctx.lineTo(center + barWidth, bottom);
        ctx.lineTo(center + barWidth, top);
        ctx.fillStyle = darkerColor.toString();
        ctx.fillStroke(attr);

        // front
        ctx.beginPath();
        ctx.moveTo(center - barWidth, bottom);
        ctx.lineTo(center - barWidth, top);
        ctx.lineTo(center + barWidth, top);
        ctx.lineTo(center + barWidth, bottom);
        ctx.lineTo(center - barWidth, bottom);
        ctx.fillStyle = fill.isGradient ? fill : color.toString();
        ctx.fillStroke(attr);
    }
});

/*
 *  3D Column Series
 */

Ext.define('KitchenSink.view.charts.touch.ColumnSeries3D', {
    extend: 'Ext.chart.series.Bar',
    requires: ['KitchenSink.view.charts.touch.ColumnSprite3D'],
    seriesType: 'columnSeries3d',
    alias: 'series.column3d',
    type: 'column3d',
    config: {
        itemInstancing: null
    }
});

