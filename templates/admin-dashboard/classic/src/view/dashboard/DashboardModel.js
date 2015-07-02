Ext.define('Admin.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean'
    ],

    stores: {
        'dashboard.QGAreaStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/area',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }

        },
        'dashboard.QGBarStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/bar',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        'dashboard.QGLineStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/line',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        'dashboard.QGPieStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/pie',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }            

        },
        dashboardfulllinechartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: '~api/dashboard/full',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardvisitorchartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: '~api/dashboard/visitor',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardcouncechartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: '~api/dashboard/counce',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        subscriptionstore: {
            autoLoad: true,
            model: 'Admin.model.Subscription',
            proxy: {
                type: 'ajax',
                url: '~api/subscriptions',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardtaskstore: {
            autoLoad: true,
            fields: [
                {
                    type: 'int',
                    name: 'id'
                },
                {
                    type: 'string',
                    name: 'task'
                },
                {
                    type: 'boolean',
                    name: 'done'
                }
            ],
            proxy: {
                type: 'ajax',
                url: '~api/dashboard/tasks',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }            
        }
    }
});
