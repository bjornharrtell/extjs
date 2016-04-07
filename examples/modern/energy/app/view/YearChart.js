Ext.define('EnergyApp.view.YearChart', {
    xtype: 'year',
    requires: ['Ext.slider.Slider',
               'Ext.Toolbar',
               'Ext.chart.axis.Axis',
               'Ext.chart.PolarChart',
               'Ext.chart.series.Radar',
               'Ext.chart.series.Pie',
               'Ext.chart.interactions.Rotate'],
    extend: 'Ext.Panel',
    config: {
        title: 'Yearly',
        cls: 'chartpanel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {
                docked: 'bottom',
                xtype: 'toolbar',
                height: 70,
                items: [
                    {
                        xtype: 'component',
                        cls: ['yearlabel', 'x-title'],
                        html: '1960'
                    },
                    {
                        flex: 1,
                        ui: 'light',
                        id: 'mySlider',
                        xtype: 'slider',
                        name: 'year',
                        // TODO: wait for touch team to allow minValue > 0
                        maxValue: 2009 - 1960,
                        minValue: 0,
                        value: 2009 - 1960,
                        listeners: {
                            change: function (slider) {
                                var value = slider.getValue()[0] + 1960;
                                Ext.getCmp('yearToolbar').setTitle('Data For ' + value);
                                EnergyApp.app.loadPieAtYear(value);
                            },
                            drag: function (slider, thumb, value) {
                                value = value[0] + 1960;
                                Ext.getCmp('yearToolbar').setTitle('Data For ' + value);
                                EnergyApp.app.loadPieAtYear(value);
                            }
                        }
                    },
                    {
                        xtype: 'component',
                        cls: ['yearlabel', 'x-title'],
                        html: '2009'
                    }
                ]
            },
            {
                id: 'yearToolbar',
                docked: 'bottom',
                xtype: 'toolbar',
                title: 'Data For 2009'
            },
            {
                flex: 1,
                xtype: 'polar',
                store: "YearStore",
                background: 'rgb(44,44,44)',
                interactions: [
                    {
                        type: 'iteminfo',
                        listeners: {
                            show: function (interaction, item, panel) {
                                EnergyApp.app.popupYear(item, panel);
                            }
                        }
                    },
                    'rotate'
                ],
                axes: [
                    {
                        type: 'category',
                        position: 'angular',
                        margin: 50,
                        fields: 'type',
                        grid: true,
                        style: {
                            estStepSize: 1,
                            strokeStyle: '#fff'
                        },
                        label: {
                            fillStyle: "#fff"
                        }
                    },
                    {
                        type: 'numeric',
                        position: 'radial',
                        fields: 'data',
                        grid: true,
                        label: {
                            fillStyle: "#fff",
                            y: -10
                        },
                        renderer: function (axis, v) {
                            return EnergyApp.app.commify(v) + "M";
                        }
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        angleField: 'type',
                        radiusField: 'data',
                        label: {
                            fillStyle: "#fff",
                            textAlign: "center",
                            translationX: 0,
                            translationY: -10
                        },
                        style: {
                            lineJoin: 'miter',
                            lineWidth: 3,
                            strokeStyle: '#115fa6',
                            fillStyle: "rgba(17,95,166,0.5)"
                        }
                    }
                ],
                listeners: {
                    afterrender: function (me) {
                        me.on('beforerefresh', function () {
                            if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                                return false;
                            }
                        }, me);
                    }
                }
            },
            {
                flex: 1,
                xtype: 'polar',
                background: 'rgb(44,44,44)',
                store: "YearStore",
                innerPadding: 20,
                colors: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"],
                interactions: [
                    {
                        type: 'rotate'
                    },
                    {
                        type: 'iteminfo',
                        listeners: {
                            show: function (interaction, item, panel) {
                                EnergyApp.app.popupYear(item, panel);
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'pie',
                        angleField: 'data',
                        interactions: ['rotate'],
                        highlight: false,
                        label: {
                            field: 'type',
                            display: 'rotate',
                            fill: 'white',
                            font: '12px Arial'
                        },
                        highlightCfg: {
                            margin: 20
                        }
                    }
                ],
                listeners: {
                    afterrender: function (me) {
                        me.on('beforerefresh', function () {
                            if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                                return false;
                            }
                        }, me);
                    }
                }
            }
        ]
    }
});