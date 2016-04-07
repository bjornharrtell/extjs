Ext.define('Admin.view.charts.ChartsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.charts',

    stores: {
        barData: {
            model: 'Admin.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/oneyear'
            }
        },

        stackedData: {
            model: 'Admin.model.MultiDataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/multiyear'
            }
        },

        gaugeData: {
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

        radialData: {
            model: 'Admin.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/radial'
            }
        },

        lineData: {
            model: 'Admin.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/oneentity'
            }
        },

        pieData: {
            model: 'Admin.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/pie'
            }
        },

        areaData: {
            model: 'Admin.model.MultiDataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/dashboard/full'
            }
        }
    }
});
