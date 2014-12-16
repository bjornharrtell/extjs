/**
 * An example showing a Pie Chart and a Grid as elements inside a tooltip.
 */
Ext.define('KitchenSink.view.charts.other.TipCharts', {
    extend: 'Ext.Panel',
    xtype: 'tip-chart',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    // </example>


    initComponent: function() {
        var me = this;
        //<example>
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
            {
                text: 'Save Chart',
                handler: function() {
                    Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                        if(choice == 'yes'){
                            me.down('cartesian').save({
                                type: 'image/png'
                            });
                        }
                    });

                }
            }]
        }];
        //</example>

        me.tipStore = Ext.create('Ext.data.JsonStore', {
            fields: ['browser', 'data' ],
            data: [
                { browser: 'IE', data: 0 },
                { browser: 'Firefox', data: 0 },
                { browser: 'Chrome', data: 0 }, 
                { browser: 'Safari', data: 0 }
            ]
        });

        me.smartTip = Ext.create('Ext.tip.ToolTip', {
            trackMouse: true,
            width: 400,
            height: 180,
            dismissDelay: 0,
            hideDelay: 10000,
            layout: 'fit',
            items: [{
                xtype: 'panel',
                layout: 'hbox',                
                title: 'Detailed Tip',
                items: [{
                    flex: 1,
                    xtype: 'cartesian',
                    width: 130,
                    height: 130,
                    animation: false,
                    store: me.tipStore,
                    insetPadding: 10,
                    shadow: true,
                    series: [{
                        type: 'pie',
                        highlight: {
                            fillStyle: '#000',
                            lineWidth: 20,
                            strokeStyle: '#fff'
                        },
                        angleField:  'data',
                        label: {
                            field: 'browser',
                            display: 'rotate',
                            contrast: true,
                            font: '9px Arial'
                        }
                    }]
                }, {
                    xtype: 'grid',
                    store: me.tipStore,
                    scrollable: false,
                    flex: 1,
                    columns: [
                        { text: 'Browser', dataIndex: 'browser' },
                        { text: 'Data', dataIndex: 'data' }
                    ]
                }]
            }],
            renderer: function(storeItem, item) {
                this.down('panel').setTitle('Detailed View for ' + storeItem.get('month'));
                me.tipStore.removeAll();
                me.tipStore.loadData([
                    { browser: 'IE', data: storeItem.get('data1') },
                    { browser: 'Firefox', data: storeItem.get('data2') },
                    { browser: 'Chrome', data: storeItem.get('data3') },
                    { browser: 'Safari', data: storeItem.get('data4') }
                ]);
            }
        });

        me.items = [{
            xtype: 'cartesian',
            height: 410,
            padding: '10 0 0 0',
            store: {type: 'browsers'},
            insetPadding: 40,
            sprites: [{
                type: 'text',
                text: 'Chart with Chart and grid in Tips',
                fontSize: 22,
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: [ 'data1', 'data2', 'data3', 'data4' ],
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: 'month',
                grid: true
            }],
//<example>
            seriesDefaults: {
                style:  {
                    lineWidth: 2
                },
                marker: {
                    radius: 3
                },
                smooth: true
            },
//</example>
            series: [{
                type: 'line',
                xField: 'month',
                yField:  'data1',
                axis: 'left',
                smooth: true,
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 3
                },
                highlight: {
                    fillStyle: '#000',
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: me.smartTip
            }, {
                type: 'line',
                axis: 'left',
                xField: 'month',
                yField:  'data2',
                smooth: true,
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 3
                },
                highlight: {
                    fillStyle: '#000',
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: me.smartTip
            }, {
                type: 'line',
                xField: 'month',
                yField:  'data3',
                axis: 'left',
                smooth: true,
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 3
                },
                highlight: {
                    fillStyle: '#000',
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: me.smartTip
            }, {
                type: 'line',
                axis: 'left',
                smooth: true,
                xField: 'month',
                yField:  'data4',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 3
                },
                highlight: {
                    fillStyle: '#000',
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: me.smartTip
            }]
        //<example>
        }, {
            style: 'padding-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true
                },
                items: [
                    { text: '2012', dataIndex: 'month' },
                    { text: 'IE', dataIndex: 'data1', renderer: function(v) { return v + '%'; } },
                    { text: 'Chrome', dataIndex: 'data2', renderer: function(v) { return v + '%'; } },
                    { text: 'Firefox', dataIndex: 'data3', renderer: function(v) { return v + '%'; } },
                    { text: 'Safari', dataIndex: 'data4', renderer: function(v) { return v + '%'; } }                   
                ]
            },
            store: {type: 'browsers'},
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
