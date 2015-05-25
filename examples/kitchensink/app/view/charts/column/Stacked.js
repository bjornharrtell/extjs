/**
 * Stacked columns are multi-series column charts where categories are stacked on top of
 * each other. This is typically done to visually represent the total of all categories
 * for a given period or value.
 */
Ext.define('KitchenSink.view.charts.column.Stacked', {
    extend: 'Ext.Panel',
    xtype: 'column-stacked',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>

    width: 650,

    initComponent: function() {
        var me = this;
        //<example>
        me.tbar = [
            '->',
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
                }
            },
            {
                xtype: 'segmentedbutton',
                width: 200,
                defaults: { ui: 'default-toolbar' },
                items: [
                    {
                        text: 'Stack',
                        pressed: true
                    },
                    {
                        text: 'Group'
                    }
                ],
                listeners: {
                    toggle: function (segmentedButton, button, pressed) {
                        var chart = this.up('panel').down('cartesian'),
                            series = chart.getSeries()[0],
                            value = segmentedButton.getValue();
                        series.setStacked(value === 0);
                        chart.redraw();

                    }
                }
            },
            {
                text: 'Preview',
                handler: function() {
                    me.down('cartesian').preview();
                }
            }
        ];
        //</example>

        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 460,
            legend: {
                docked: 'bottom'
            },
            store: {type: 'browsers'},
            insetPadding: {
                top: 40,
                left: 40,
                right: 40,
                bottom: 40
            },
            sprites: [{
                type: 'text',
                text: 'Column Charts - Stacked Columns',
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
            }],
            axes: [{
                type: 'numeric',
                position: 'left',
                adjustByMajorUnit: true,
                grid: true,
                fields: ['data1'],
                renderer: function (v) { return v.toFixed(v < 10 ? 1: 0) + '%'; },
                minimum: 0
            }, {
                type: 'category',
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
                type: 'bar',
                axis: 'left',
                title: [ 'IE', 'Firefox', 'Chrome', 'Safari' ],
                xField: 'month',
                yField: [ 'data1', 'data2', 'data3', 'data4' ],
                stacked: true,
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fillStyle: 'yellow'
                },
                tooltip: {
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        var browser = item.series.getTitle()[Ext.Array.indexOf(item.series.getYField(), item.field)];
                        this.setHtml(browser + ' for ' + storeItem.get('month') + ': ' + storeItem.get(item.field) + '%');
                    }
                }
            }]
        //<example>
        }, {
            style: 'margin-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: function(v) { return v + '%'; } 
                },
                items: [
                    { text: 'Month', dataIndex: 'month', renderer: function(v) { return v; } },
                    { text: 'IE', dataIndex: 'data1' },
                    { text: 'Firefox', dataIndex: 'data2' },
                    { text: 'Chrome', dataIndex: 'data3' },
                    { text: 'Safari', dataIndex: 'data4' }
                ]
            },
            store: {type: 'browsers'},
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
