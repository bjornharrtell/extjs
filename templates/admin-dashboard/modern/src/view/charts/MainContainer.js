Ext.define('Admin.view.charts.MainContainer', {
    extend: 'Ext.Container',   
     requires: [
        'Admin.view.charts.MainContainerViewModel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
         'Ext.chart.series.Bar',
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Pie3D',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.series.Gauge',
        'Ext.chart.series.Radar'
    ],
    viewModel: {
        type: 'chartsmaincontainer'
    },
    layout: 'vbox',
    items:[
        {
            flex:1,   
            xtype:'cartesian', 
            bind: {
                store: '{dashboardfulllinechartstore}'
            },   
            axes: [{
                type: 'numeric',
                position: 'left',
                fields: [
                    'y1value',
                    'y2value',
                    'y3value'
                ],
                hidden: true                                             
            },
            {
                 type: 'category',
                 position: 'bottom',
                 fields: [
                    'xvalue'
                ],
                hidden: true
             }],
             series: [{
                 type: 'line',
                 colors: [
                    'rgba(103, 144, 199, 0.6)'
                ],
                xField: 'xvalue',
                yField: [
                    'y1value'
                ],
                fill: true,
                 smooth: true                        
             }, 
             {
                 type: 'line',
                 colors: [
                    'rgba(238, 146, 156, 0.6)'
                 ],
                xField: 'xvalue',
                yField: [
                    'y2value'
                ],
                fill: true,
                 smooth: true
            }] 
        },
        {
            flex:1,   
            xtype:'cartesian',           
            bind: {
                store: '{marketshareoneentitystore}'
            },  
            axes: [{
                type: 'numeric',
                position: 'bottom',
                fields: [
                    'yvalue',
                    'y1value',
                    'y2value',
                    'y3value',
                    'y4value',
                    'y5value'
                ],
                hidden: true                                             
            },
            {
                 type: 'category',
                 position: 'left',
                 fields: [
                    'xvalue'
                ],
                hidden: true
             }],
             series: [{
                type: 'line',                
                xField: 'xvalue',
                yField: [
                    'yvalue'
                ]                       
             }, 
             {
                type: 'line',                
                xField: 'xvalue',
                yField: [
                    'y1value'
                ]
            }]
        },
        {
            flex:1,    
            xtype: 'cartesian',
            colors: [
                '#6aa5db'                
            ],            
            bind: {
                store: '{marketshareoneyear}'
            },
            axes: [
                {
                    type: 'category',
                    fields: [
                        'xvalue'
                    ],
                    hidden: true,
                    position: 'bottom'
                },
                {
                    type: 'numeric',
                    fields: [
                        'yvalue'
                    ],
                    hidden: true,
                    position: 'left'
                }
            ],
            series: [
                {
                    type: 'bar',
                    xField: 'xvalue',
                    yField: [
                        'yvalue'
                    ]
                }
            ]
        },
        {
            xtype: 'cartesian',
            flex:1,
            colors: [
                '#6aa5db',
                '#ee929c'
            ],            
            bind: {
                store: '{marketsharemultiyear}'
            },
            axes: [
                {
                    type: 'category',
                    fields: [
                        'xvalue'
                    ],
                    hidden: true,
                    position: 'bottom'
                },
                {
                    type: 'numeric',
                    fields: [
                            'y1value',
                            'y2value',
                            'y3value'
                    ],
                    grid: {
                        odd: {
                            fill: '#e8e8e8'
                        }
                    },
                    hidden: true,
                    position: 'left'
                }
            ],
            series: [
                {
                    type: 'bar',
                    xField: 'xvalue',
                    yField: [                        
                        'y2value',
                        'y3value'
                    ]
                }
            ]
        },
        {
            flex:1,
            xtype: 'polar',
            colors: [
                '#aed581',
                '#6aa5db',
                '#ee929c'
            ],
            interactions: 'rotate',
            bind: {
                store: '{piedatastore}'
            },
            series: [
                {
                    type: 'pie',
                    label: {
                        field: 'xvalue',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Arial'
                    },
                    xField: 'yvalue'
                }
            ]
        },
        {
            flex:1,
            xtype: 'polar',
            colors: [
                '#aed581',
                '#6aa5db',
                '#ee929c'
            ],
            interactions: 'rotate',            
            bind: {
                store: '{piedatastore}'
            },
            series: [
                {
                    type: 'pie3d',
                    angleField: 'yvalue',
                    donut: 30
                }
            ]      
        },
        {
            xtype: 'polar',
            flex:1,
            colors: [
                '#6aa5db',
                '#aed581'
            ],           
            bind: {
                store: '{gaugechartstore}'
            },
            series: [
                {
                    type: 'gauge',
                    angleField: 'position',
                    needleLength: 100
                }
            ]
        },
        {
            xtype: 'polar',
            flex:1,
            colors: [
                '#6aa5db'
            ],
            interactions: 'rotate',
            bind: {
                store: '{radialchartstore}'
            },
            axes: [
                {
                    type: 'numeric',
                    fields: [
                        'yvalue'
                    ],
                    grid: true,
                    position: 'radial'
                },
                {
                    type: 'category',
                    fields: [
                        'xvalue'
                    ],
                    grid: true,
                    position: 'angular'
                }
            ],
            series: [
                {
                    type: 'radar',
                    xField: 'xvalue',
                    yField: 'yvalue'
                }
            ]
        }
    ] 
});