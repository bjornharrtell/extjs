Ext.define('Admin.view.forms.Forms', {
    extend: 'Ext.Container',
    xtype: 'forms',
    cls: 'dashboard',

    //controller: 'dashboard',
    //viewModel: {
    //    type: 'dashboard'
    //},

    scrollable: true,

    defaults: {
        height: '25em'
    },

    items: [
        {
            xtype: 'wizard',

            back: {
                ui: 'wizard'
            },
            next: {
                ui: 'wizard'
            },

            tabBar: {
                ui: 'wizard',
                defaultTabUI: 'wizard',
                layout: {
                    pack: 'center'
                }
            },

            // 60% width when viewport is big enough,
            // 100% when viewport is small
            userCls: 'big-100 small-100 dashboard-item shadow',

            plugins: 'responsive',

            responsiveConfig: {
                'phone && width < 1000': {
                    height: '25em'
                },

                '!phone && width < 1000': {
                    height: '50em'
                },

                'width >= 1000': {
                    height: '25em'
                }
            },

            defaults: {
                tab: {
                    iconAlign: 'top'
                }
            },

            items: [{
                xtype: 'specialoffer',

                plugins: 'responsive',

                platformConfig: {
                    phone: {
                        hidden: true
                    }
                },

                responsiveConfig: {
                    'width < 1000': {
                        docked: 'top',
                        width: null,
                        height: '25em'
                    },

                    'width >= 1000': {
                        docked: 'left',
                        width: '50%',
                        height: null
                    }
                }
            },{
                xtype: 'accountform'
            }, {
                xtype: 'profileform'
            }, {
                xtype: 'addressform'
            }, {
                xtype: 'finishform'
            }]
        }
        //{
        //    xtype: 'wizard',
        //    userCls: 'big-50 small-100 dashboard-item shadow'
        //},
        //{
        //    xtype: 'wizard',
        //    userCls: 'big-50 small-100 dashboard-item shadow'
        //}
    ]
});
