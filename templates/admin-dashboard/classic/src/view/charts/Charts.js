Ext.define('Admin.view.charts.Charts', {
    extend: 'Ext.container.Container',

    viewModel: {
        type: 'charts'
    },

    id: 'charts',

    layout: 'responsivecolumn',

    defaults: {
        defaults: {
            animation : !Ext.isIE9m && Ext.os.is.Desktop
        }
    },

    items: [
        {
            xtype: 'chartsareapanel',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'chartspie3dpanel',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'chartspolarpanel',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsstackedpanel',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsbarpanel',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsgaugepanel',
            responsiveCls: 'big-50 small-100'
        }
    ]
});
