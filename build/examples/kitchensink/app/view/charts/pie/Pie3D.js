/**
 * This example shows how to create a 3D Pie chart.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.pie.Pie3D', {
    extend: 'Ext.Panel',
    xtype: 'pie-3d',

    requires: [
        'Ext.chart.PolarChart'
    ],

    layout: 'fit',

    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var chart = this.up('panel').down('polar'),
                    store = chart.getStore();
                chart.setAnimation({
                    duration: 500,
                    easing: 'easeInOut'
                });
                store.refreshData();
            }
        },
        {
            text: 'Switch Theme',
            handler: function () {
                var panel = this.up().up(),
                    chart = panel.down('polar'),
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
        xtype: 'polar',
        width: '100%',
        height: 500,
        store: {
            type: 'pie'
        },
        id: 'pie-chart-3d',
        theme: 'Category1',
        background: 'white',
        interactions: 'rotatePie3d',
        animation: {
            duration: 500,
            easing: 'easeIn'
        },
        series: [
            {
                type: 'pie3d',
                field: 'g1',
                donut: 30,
                distortion: 0.6,
                style: {
                    strokeStyle: 'white',
                    opacity: 0.90
                }
            }
        ]
    }]
});
