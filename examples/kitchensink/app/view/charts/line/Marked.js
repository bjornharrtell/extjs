/**
 * Marked lines are multi-series lines displaying trends across multiple categories.
 * Markers are placed at each point to clearly depict their position on the chart.
 */
Ext.define('KitchenSink.view.charts.line.Marked', {
    extend: 'Ext.panel.Panel',
    xtype: 'line-marked',

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
                text: 'Preview',
                handler: function() {
                    me.down('cartesian').preview();
                }
            }
        ];
        //</example>

        var markerFx = {
            duration: 200,
            easing: 'backOut'
        };

        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 500,
            legend: {
                docked: 'right'
            },
            store: {type: 'browsers'},
            insetPadding: 40,
            sprites: [{
                type: 'text',
                text: 'Line Charts - Marked Lines',
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
                y: 470
            }, {
                type: 'text',
                text: 'Source: http://www.w3schools.com/',
                fontSize: 10,
                x: 12,
                y: 485
            }],
            axes: [{
                type: 'numeric',
                fields: ['data1', 'data2', 'data3', 'data4' ],
                position: 'left',
                grid: true,
                minimum: 0,
                renderer: function (v) {
                    return v.toFixed(v < 10 ? 1: 0) + '%';
                }
            }, {
                type: 'category',
                fields: 'month',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                title: 'IE',
                xField: 'month',
                yField: 'data1',
                marker: {
                    type: 'square',
                    fx: markerFx
                },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        var title = item.series.getTitle();
                        this.setHtml(title + ' for ' + storeItem.get('month') + ': ' + storeItem.get(item.series.getYField()) + '%');
                    }
                }
            }, {
                type: 'line',
                axis: 'left',
                title: 'Firefox',
                xField: 'month',
                yField: 'data2',
                marker: {
                    type: 'triangle',
                    fx: markerFx
                },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        var title = item.series.getTitle();
                        this.setHtml(title + ' for ' + storeItem.get('month') + ': ' + storeItem.get(item.series.getYField()) + '%');
                    }
                }
            }, {
                type: 'line',
                axis: 'left',
                title: 'Chrome',
                xField: 'month',
                yField: 'data3',
                marker: {
                    type: 'arrow',
                    fx: markerFx
                },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        var title = item.series.getTitle();
                        this.setHtml(title + ' for ' + storeItem.get('month') + ': ' + storeItem.get(item.series.getYField()) + '%');
                    }
                }
            }, {
                type: 'line',
                axis: 'left',
                title: 'Safari',
                xField: 'month',
                yField: 'data4',
                marker: {
                    type: 'cross',
                    fx: markerFx
                },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        var title = item.series.getTitle();
                        this.setHtml(title + ' for ' + storeItem.get('month') + ': ' + storeItem.get(item.series.getYField()) + '%');
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
                    renderer: function (v) { return v + '%'; }
                },
                items: [
                    { text: 'Month', dataIndex: 'month', renderer: function (v) { return v; } },
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
