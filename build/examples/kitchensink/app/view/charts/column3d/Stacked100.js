/**
 * 100% stacked 3D columns are column charts where categories are stacked
 * on top of each other. The value of each category is recalculated, so that
 * it represents a share of the whole, which is the full stack and is equal
 * to 100 by default.
 */
Ext.define('KitchenSink.view.charts.column3d.Stacked100', {
    extend: 'Ext.Panel',
    xtype: 'column-stacked-100-3d',
    requires: ['Ext.chart.theme.Muted'],

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>
    width: 650,

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        interactions: ['itemhighlight'],
        width: '100%',
        height: 460,
        insetPadding: 40,
        innerPadding: '0 3 0 0',
        theme: 'Muted',
        legend: {
            docked: 'bottom'
        },
        store: {
            type: 'browsers'
        },
        animation: Ext.isIE8 ? false : {
            easing: 'backOut',
            duration: 500
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            grid: true,
            fields: ['data1', 'data2', 'data3', 'data4', 'other' ],
            renderer: function(v) { return v + '%'; },
            minimum: 0,
            maximum: 100
        }, {
            type: 'category3d',
            position: 'bottom',
            grid: true,
            fields: ['month'],
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'bar3d',
            fullStack: true,
            title: [ 'IE', 'Firefox', 'Chrome', 'Safari', 'Others' ],
            xField: 'month',
            yField: [ 'data1', 'data2', 'data3', 'data4', 'other' ],
            stacked: true,
            highlightCfg: {
                brightnessFactor: 1.2,
                saturationFactor: 1.5
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                renderer: function(record, item) {
                    var index = Ext.Array.indexOf(item.series.getYField(), item.field),
                        browser = item.series.getTitle()[index];
                    this.setHtml(browser + ' for ' + record.get('month') + ': ' +
                        Ext.util.Format.number(item.sprite.attr.dataY[item.index] - item.sprite.attr.dataStartY[item.index], '0.##') + '%');
                }
            }
        }],
        sprites: [{
            type: 'text',
            text: 'Usage share of desktop browsers',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Browser Stats 2012',
            fontSize: 10,
            x: 12,
            y: 380
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 395
        }]
    }],

    tbar: [
        '->',
        {
            text: 'Preview',
            handler: function () {
                var chart = this.lookupReferenceHolder('view').lookupReference('chart');
                chart.preview();
            }
        }
    ]
});
