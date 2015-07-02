Ext.define("EnergyApp.view.LineChart", {
    xtype: 'line',
    requires: ['Ext.chart.interactions.ItemHighlight'],
    extend: 'Ext.Panel',
    config: {
        title: 'Line',
        layout: 'fit',
        cls: 'chartpanel',
        items: [
            {
                xtype: 'chart',
                background: 'rgb(44,44,44)',
                interactions: [
                    {
                        type: 'panzoom',
                        zoomOnPanGesture: true,
                        modeToggleButton: {
                            hideText: true,
                            style: 'margin-left: 7px'
                        }
                    }, {
                        type: 'iteminfo',
                        gesture: 'itemtap',
                        listeners: {
                            show: function (interaction, item, panel) {
                                EnergyApp.app.popup(item, panel);
                            }
                        }
                    }],
                store: 'ChartStore',
                legend: {
                    position: 'top',
                    style: {
                        background: 'rgb(44,44,44)'
                    }
                },
                series: [
                    {
                        type: 'line',
                        highlight: false,
                        showMarkers: false,
                        xField: 'year',
                        yField: 'coal',
                        title: ['Coal'],
                        style: {
                            stroke: "#115fa6",
                            fill: "#115fa6",
                            fillOpacity: 0.6,
                            lineWidth: 3
                        }
                    },
                    {
                        type: 'line',
                        highlight: false,
                        showMarkers: false,
                        xField: 'year',
                        yField: 'crude-oil',
                        title: ['Oil'],
                        style: {
                            stroke: "#94ae0a",
                            fill: "#94ae0a",
                            fillOpacity: 0.6,
                            lineWidth: 3
                        }
                    },
                    {
                        type: 'line',
                        highlight: false,
                        showMarkers: false,
                        xField: 'year',
                        yField: 'gas',
                        title: ['Natural Gas'],
                        style: {
                            stroke: "#a61120",
                            fill: "#a61120",
                            fillOpacity: 0.6,
                            lineWidth: 3
                        }
                    },
                    {
                        type: 'line',
                        highlight: false,
                        showMarkers: false,
                        xField: 'year',
                        yField: 'nuclear',
                        title: ['Nuclear'],
                        style: {
                            stroke: "#ff8809",
                            fill: "#ff8809",
                            fillOpacity: 0.6,
                            lineWidth: 3
                        }
                    },
                    {
                        type: 'line',
                        highlight: false,
                        showMarkers: false,
                        fill: true,
                        smooth: true,
                        axis: 'right',
                        xField: 'year',
                        yField: 'renewable',
                        title: ['Renewable'],
                        style: {
                            stroke: "#ffd13e",
                            fill: "#ffd13e",
                            fillOpacity: 0.6,
                            lineWidth: 3
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'right',
                        minimum: 0,
                        renderer: function (nStr, x) {
                            return(nStr / 1000000).toFixed(2);
                        },
                        label: {
                            fill: '#777'
                        },
                        fields: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable'],
                        title: {
                            text: 'Million BTUs',
                            fontSize: 15,
                            fillStyle: '#ccc'
                        },
                        style: {
                            lineWidth: 2,
                            stroke: '#777'
                        },
                        grid: {
                            stroke: '#777',
                            odd: {
                                stroke: '#777'
                            },
                            even: {
                                stroke: '#555'
                            }
                        }
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: ['year'],
                        style: {
                            lineWidth: 2,
                            stroke: '#777'
                        },
                        label: {
                            fill: '#777',
                            rotate: {
                                degrees: 45
                            }
                        }
                    }
                ],
                listeners: {
                    afterrender: function (me) {
                        me.on('beforerefresh', function () {
                            if (me.ownerCt.getActiveItem().id !== me.id) {
                                return false;
                            }
                        }, me);
                    }
                }
            }
        ]
    },
    initialize: function () {
        this.callSuper();
        var legend = Ext.ComponentQuery.query('legend', this)[0],
            interaction = Ext.ComponentQuery.query('interaction[type=panzoom]', this)[0];
        if (legend && interaction && !interaction.isMultiTouch()) {
            interaction.getModeToggleButton().setRenderTo(legend.innerElement);
        }
    }
});
