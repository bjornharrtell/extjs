Ext.define('Admin.view.charts.MainContainerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chartsmaincontainer',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Field'
    ],

    stores: {
        marketshareoneyear: {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 2004,
                    yvalue: 239
                },
                {
                    xvalue: 2005,
                    yvalue: 402
                },
                {
                    xvalue: 2006,
                    yvalue: 706
                },
                {
                    xvalue: 2007,
                    yvalue: 432
                },
                {
                    xvalue: 2008,
                    yvalue: 200
                },
                {
                    xvalue: 2009,
                    yvalue: 763
                },
                {
                    xvalue: 2010,
                    yvalue: 550
                },
                {
                    xvalue: 2011,
                    yvalue: 630
                },
                {
                    xvalue: 2012,
                    yvalue: 278
                },
                {
                    xvalue: 2013,
                    yvalue: 312
                },
                {
                    xvalue: 2014,
                    yvalue: 600
                },
                {
                    xvalue: 2015,
                    yvalue: 283
                }
            ]
        },
        marketsharemultiyear: {
            model: 'Admin.model.MultiDataXY',
            data: [
                {
                    xvalue: 1997,
                    y1value: 281,
                    y2value: 72,
                    y3value: 269,
                    y4value: 762
                },
                {
                    xvalue: 1981,
                    y1value: 518,
                    y2value: 999,
                    y3value: 43,
                    y4value: 310
                },
                {
                    xvalue: 1985,
                    y1value: 38,
                    y2value: 311,
                    y3value: 942,
                    y4value: 77
                },
                {
                    xvalue: 1984,
                    y1value: 936,
                    y2value: 415,
                    y3value: 562,
                    y4value: 412
                },
                {
                    xvalue: 1979,
                    y1value: 978,
                    y2value: 331,
                    y3value: 927,
                    y4value: 114
                },
                {
                    xvalue: 1982,
                    y1value: 196,
                    y2value: 240,
                    y3value: 72,
                    y4value: 888
                },
                {
                    xvalue: 1992,
                    y1value: 481,
                    y2value: 375,
                    y3value: 139,
                    y4value: 762
                },
                {
                    xvalue: 19895,
                    y1value: 623,
                    y2value: 999,
                    y3value: 260,
                    y4value: 310
                },
                {
                    xvalue: 1988,
                    y1value: 328,
                    y2value: 451,
                    y3value: 542,
                    y4value: 77
                },
                {
                    xvalue: 1980,
                    y1value: 456,
                    y2value: 615,
                    y3value: 342,
                    y4value: 412
                },
                {
                    xvalue: 1990,
                    y1value: 788,
                    y2value: 531,
                    y3value: 489,
                    y4value: 114
                }
            ]
        },
        gaugechartstore: {
            data: [
                {
                    position: 40
                }
            ],
            fields: [
                {
                    name: 'position'
                }
            ]
        },
        radialchartstore: {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 'A',
                    yvalue: 417
                },
                {
                    xvalue: 'B',
                    yvalue: 676
                },
                {
                    xvalue: 'C',
                    yvalue: 606
                },
                {
                    xvalue: 'D',
                    yvalue: 124
                },
                {
                    xvalue: 'E',
                    yvalue: 473
                },
                {
                    xvalue: 'F',
                    yvalue: 108
                },
                {
                    xvalue: 'G',
                    yvalue: 847
                },
                {
                    xvalue: 'H',
                    yvalue: 947
                },
                {
                    xvalue: 'I',
                    yvalue: 694
                },
                {
                    xvalue: 'J',
                    yvalue: 603
                }
            ]
        },
        marketshareoneentitystore: {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 2011,
                    yvalue: 0.1,
                    y1value: 0.2,
                    y2value: 0.3,
                    y3value: 0.1,
                    y4value: 0,
                    y5value: 1
                },
                {
                    xvalue: 2012,
                     yvalue: 0.2,
                    y1value: 0.4,
                    y2value: 0.2,
                    y3value: 0.2,
                     y4value: 0,
                    y5value: 1
                },
                {
                    xvalue: 2013,
                    yvalue: 0.3,
                    y1value: 0.2,
                    y2value: 0.4,
                    y3value: 0.3,
                     y4value: 0,
                    y5value: 1

                },
                {
                    xvalue: 2014,
                     yvalue: 0.2,
                    y1value: 0.4,
                    y2value: 0.1,
                    y3value: 0.2,
                     y4value: 0,
                    y5value: 1
                },{
                    xvalue: 2015,
                     yvalue: 0.4,
                    y1value: 0.3,
                    y2value: 0.4,
                    y3value: 0.4,
                     y4value: 0,
                    y5value: 1
                }
            ]
        },
        yearwisemarketsharestore: {
            model: 'Admin.model.MultiDataXY',
            data: [
                {
                    xvalue: 2011,
                    y1value: 517.27,
                    y2value: 520.3,
                    y3value: 291.41,
                    y4value: 420.24
                },
                {
                    xvalue: 2012,
                    y1value: 389.38,
                    y2value: 632.31,
                    y3value: 882.90,
                    y4value: 771.08
                },
                {
                    xvalue: 2013,
                    y1value: 287.24,
                    y2value: 440.78,
                    y3value: 549.99,
                    y4value: 627.71
                },
                {
                    xvalue: 2014,
                    y1value: 505.25,
                    y2value: 631.07,
                    y3value: 570.43,
                    y4value: 583.67
                }
            ]
        },
        piedatastore: {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 'Drama',
                    yvalue: 10
                },
                {
                    xvalue: 'Fantacy',
                    yvalue: 10
                },
                {
                    xvalue: 'Action',
                    yvalue: 12
                }
            ]
        },
        'dashboard.QGAreaStore': {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 0,
                    yvalue: 100
                },
                {
                    xvalue: 10,
                    yvalue: 141
                },
                {
                    xvalue: 20,
                    yvalue: 120
                },
                {
                    xvalue: 30,
                    yvalue: 156
                },
                {
                    xvalue: 40,
                    yvalue: 130
                },
                {
                    xvalue: 50,
                    yvalue: 160
                },
                {
                    xvalue: 60,
                    yvalue: 120
                },
                {
                    xvalue: 70,
                    yvalue: 135
                }
            ]
        },
        'dashboard.QGBarStore': {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 0,
                    yvalue: 600
                },
                {
                    xvalue: 10,
                    yvalue: 748
                },
                {
                    xvalue: 20,
                    yvalue: 569
                },
                {
                    xvalue: 30,
                    yvalue: 850
                },
                {
                    xvalue: 40,
                    yvalue: 500
                },
                {
                    xvalue: 50,
                    yvalue: 753
                },
                {
                    xvalue: 60,
                    yvalue: 707
                },
                {
                    xvalue: 70,
                    yvalue: 640
                }
            ]
        },
        'dashboard.QGLineStore': {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 0,
                    yvalue: 250
                },
                {
                    xvalue: 10,
                    yvalue: 300
                },
                {
                    xvalue: 20,
                    yvalue: 270
                },
                {
                    xvalue: 30,
                    yvalue: 370
                },
                {
                    xvalue: 40,
                    yvalue: 400
                },
                {
                    xvalue: 50,
                    yvalue: 350
                },
                {
                    xvalue: 60,
                    yvalue: 410
                },
                {
                    xvalue: 70,
                    yvalue: 450
                }
            ]
        },
        'dashboard.QGPieStore': {
            model: 'Admin.model.DataXY',
            data: [
                {
                    xvalue: 'Research',
                    yvalue: 68
                },
                {
                    xvalue: 'Finance',
                    yvalue: 20
                },
                {
                    xvalue: 'Marketing',
                    yvalue: 12
                }
            ]
        },
        dashboardfulllinechartstore: {
            model: 'Admin.model.MultiDataXY',
            data: [
                    {
                     xvalue: 250,
                    y1value: 94,
                    y2value: 40
                    },
                    {
                     xvalue: 500,
                    y1value: 78,
                    y2value: 46
                    },
                    {
                     xvalue: 750,
                    y1value: 60,
                    y2value: 53
                    },
                    {
                     xvalue: 1250,
                    y1value: 51,
                    y2value: 48
                    },
                    {
                     xvalue: 1500,
                    y1value: 60,
                    y2value: 36
                    },
                    {
                     xvalue: 1750,
                    y1value: 68,
                    y2value: 26
                    },
                    {
                     xvalue: 2250,
                    y1value: 59,
                    y2value: 37
                    },
                    {
                     xvalue: 2500,
                    y1value: 40,
                    y2value: 58
                    },
                    {
                     xvalue: 2750,
                    y1value: 24,
                    y2value: 78
                    },
                    {
                     xvalue: 3250,
                    y1value: 36,
                    y2value: 85
                    },
                    {
                     xvalue: 3500,
                    y1value: 65,
                    y2value: 70
                    },
                    {
                     xvalue: 3750,
                    y1value: 94,
                    y2value: 55
                    },
                    {
                     xvalue: 4250,
                    y1value: 103,
                    y2value: 61
                    },
                    {
                     xvalue: 4500,
                    y1value: 83,
                    y2value: 82
                    },
                    {
                     xvalue: 4750,
                    y1value: 61,
                    y2value: 102
                    },
                    {
                     xvalue: 5250,
                    y1value: 55,
                    y2value: 95
                    },
                    {
                     xvalue: 5500,
                    y1value: 70,
                    y2value: 67
                    },
                    {
                     xvalue: 5750,
                    y1value: 84,
                    y2value: 39
                    },
                    {
                     xvalue: 6250,
                    y1value: 78,
                    y2value: 31
                    },
                    {
                     xvalue: 6500,
                    y1value: 58,
                    y2value: 49
                    },
                    {
                     xvalue: 6750,
                    y1value: 38,
                    y2value: 69
                    },
                    {
                     xvalue: 7250,
                    y1value: 41,
                    y2value: 74
                    },
                    {
                     xvalue: 7500,
                    y1value: 65,
                    y2value: 60
                    },
                    {
                     xvalue: 7750,
                    y1value: 89,
                    y2value: 46
                    }
                ]
            }
    }

});