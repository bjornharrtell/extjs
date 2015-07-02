Ext.require("Ext.draw.Color", function () {
    Ext.define('EnergyApp.view.AreaChart', {
        xtype: 'area',
        extend: 'Ext.Panel',
        require: ['Ext.draw.Color'],
        config: {
            title: 'Area',
            layout: 'fit',
            cls: 'chartpanel',
            margin: '0 0 40 0',
            items: [
                {
                    xtype: 'chart',
                    background: 'rgb(44,44,44)',
                    colors: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"],
                    interactions: [
                        {
                            type: 'panzoom',
                            zoomOnPanGesture: true,
                            modeToggleButton: {
                                hideText: true,
                                style: 'margin-left: 7px'
                            }
                        },
                        {
                            type: 'iteminfo',
                            gesture: 'itemtap',
                            listeners: {
                                show: function (interaction, item, panel) {
                                    EnergyApp.app.popup(item, panel);
                                }
                            }
                        }
                    ],
                    store: 'ChartStore',
                    insetPadding: 10,
                    legend: {
                        position: 'top',
                        style: {
                            background: 'rgb(44,44,44)'
                        }
                    },
                    series: [
                        {
                            type: 'area',
                            highlight: false,
                            strokeWidth: 2,
                            title: ['Coal', 'Nuclear', 'Oil', 'Natural Gas', 'Renewable'],
                            axis: 'right',
                            xField: 'year',
                            yField: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable'],
                            subStyle: {
                                stroke: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
                            },
                            style: {
                                lineWidth: 3,
                                fillOpacity: 0.9
                            },
                            highlightCfg: {
                                globalAlpha: 1
                            },
                            marker: {
                                type: 'circle',
                                r: 4,
                                lineWidth: 1,
                                globalAlpha: 0,
                                fillOpacity: 1,
                                fillStyle: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"].map(
                                    function (color) {
                                        return Ext.draw.Color.fly(color).createDarker(0.1).toString();
                                    }
                                )
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
                            style: {
                                lineWidth: 2,
                                stroke: '#555',
                                fill: '#555'
                            },
                            label: {
                                fill: '#777'
                            },
                            adjustMinimumByMajorUnit: 0,
                            fields: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable'],
                            title: {
                                text: 'Million BTUs',
                                fontSize: 15,
                                fillStyle: '#ccc'
                            }
                        },
                        {
                            type: 'category',
                            position: 'bottom',
                            fields: ['year'],
                            style: {
                                lineWidth: 2,
                                stroke: '#555',
                                estStepSize: 5,
                                fill: '#555'
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
});
