/**
 * Stacked 3D columns are column charts where categories are stacked on top of each other.
 * This is typically done to visually represent the total of all categories
 * for a given period or value.
 */
Ext.define('KitchenSink.view.charts.column3d.Stacked', {
    extend: 'Ext.panel.Panel',
    xtype: 'column-stacked-3d',
    controller: 'column-stacked-3d',
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'app/view/charts/column3d/StackedController.js'
    }],
    //</example>

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.theme.*'
    ],

    layout: 'fit',

    width: 650,
    height: 500,

    tbar: [
        '->',
        {
            text: 'Switch Theme',
            handler: 'onThemeSwitch'
        },
        {
            xtype: 'segmentedbutton',
            width: 200,
            items: [{
                text: 'Stack',
                pressed: true
            }, {
                text: 'Group'
            }],
            listeners: {
                toggle: 'onStackedToggle'
            }
        }
    ],

    items: {
        xtype: 'cartesian',
        reference: 'chart',
        store: {type: 'economy-sectors'},
        theme: 'Muted',
        insetPadding: '40 20 10 20',
        interactions: ['itemhighlight'],
        series: {
            type: 'bar3d',
            xField: 'country',
            yField: ['agr', 'ind', 'ser'],
            title: ['Agriculture', 'Industry', 'Services'],
            style: {
                maxBarWidth: 80
            },
            highlight: true,
            tooltip: {
                style: 'background: #fff',
                trackMouse: true,
                renderer: function(storeItem, item) {
                    var index = Ext.Array.indexOf(item.series.getYField(), item.field),
                        sector = item.series.getTitle()[index],
                        value = Ext.util.Format.number(storeItem.get(item.field), '0,000 (millions of USD)');

                    this.setHtml(sector + ': ' + value);
                }
            }
        },
        legend: {
            docked: 'bottom'
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            grid: {
                odd: {
                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                },
                even: {
                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                }
            },
            title: 'Billions of USD',
            renderer: function (v, layoutContext) {
                return Ext.util.Format.number(layoutContext.renderer(v) / 1000, '0,000');
            },
            listeners: {
                rangechange: function (axis, range) {
                    if (!range) {
                        return;
                    }
                    // expand the range slightly to make sure markers aren't clipped
                    if (range[1] > 15000000) {
                        range[1] = 18000000;
                    }
                }
            }
        }, {
            type: 'category3d',
            position: 'bottom',
            grid: true
        }],
        sprites: {
            type: 'text',
            text: 'Major economies by GDP sector composition (2011)',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40,
            y: 20
        }
    }

});
