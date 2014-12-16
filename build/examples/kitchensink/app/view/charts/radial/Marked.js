/**
 * Marked radial is a multi-series radial chart displaying trends across multiple
 * categories. Markers are placed at each point to clearly depict their position.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.radial.Marked', {
    extend: 'Ext.Panel',
    xtype: 'radial-marked',

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
                    me.down('polar').preview();
                }
            }
        ];
        //</example>
        me.items = [{
            xtype: 'polar',
            width: '100%',
            height: 500,
            legend: {
                docked: 'right'
            },
            animation: {
                duration: 200
            },
            store: {type: 'browsers'},
            insetPadding: '40 40 60 40',
            interactions: ['rotate'],
            sprites: [{
                type: 'text',
                text: 'Radar Charts - Marked',
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
                y: 480
            }, {
                type: 'text',
                text: 'Source: http://www.w3schools.com/',
                fontSize: 10,
                x: 12,
                y: 495
            }],
            axes: [{
                type: 'numeric',
                position: 'radial',
                minimum: 0,
                maximum: 50,
                majorTickSteps: 9
            }, {
                type: 'category',
                position: 'angular',
                grid: true
            }],
            series: [{
                type: 'radar',
                title: 'IE',
                xField: 'month',
                yField: 'data1',
                style: {
                    lineWidth: 2,
                    fillStyle: 'none'
                },
                marker: true,
                highlightCfg: {
                    radius: 6,
                    fillStyle: 'yellow'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                    }
                }
            }, {
                type: 'radar',
                title: 'Firefox',
                xField: 'month',
                yField: 'data2',
                style: {
                    lineWidth: 2,
                    fillStyle: 'none'
                },
                marker: true,
                highlightCfg: {
                    radius: 6,
                    fillStyle: 'yellow'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data2') + '%');
                    }
                }
            }, {
                type: 'radar',
                title: 'Chrome',
                xField: 'month',
                yField: 'data3',
                style: {
                    lineWidth: 2,
                    fillStyle: 'none'
                },
                marker: true,
                highlightCfg: {
                    radius: 6,
                    fillStyle: 'yellow'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data3') + '%');
                    }
                }
            }, {
                type: 'radar',
                title: 'Safari',
                xField: 'month',
                yField: 'data4',
                style: {
                    lineWidth: 2,
                    fillStyle: 'none'
                }
            }]
        //<example>
        }, {
            style: 'padding-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: function(v) { return v + '%'; }
                },
                items: [
                    { text: '2012', dataIndex: 'month', renderer: function(v) { return v; } },
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
