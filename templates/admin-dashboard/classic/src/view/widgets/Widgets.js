Ext.define('Admin.view.widgets.Widgets', {
    extend: 'Ext.container.Container',
    xtype: 'widgets',

    requires: [
        'Admin.view.widgets.WidgetA',
        'Admin.view.widgets.WidgetB',
        'Admin.view.widgets.WidgetC',
        'Admin.view.widgets.WidgetD',
        'Admin.view.widgets.WidgetE',
        'Admin.view.widgets.WidgetF',
        'Ext.slider.Single',
        'Ext.form.field.Display'
    ],

    viewModel: {
        type: 'widgets'
    },

    layout: 'responsivecolumn',

    defaults: {
        xtype: 'container'
    },

    items: [
        {
            xtype: 'widget-a',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'widget-b',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'widget-c',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'widget-d',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'widget-e',
            containerColor: 'cornflower-blue',
            responsiveCls: 'big-33 small-50',
            data: {
                amount: 840,
                type: 'Sales',
                icon: 'shopping-cart'
            }
        },
        {
            xtype: 'widget-e',
            containerColor: 'green',
            responsiveCls: 'big-33 small-50',
            data: {
                amount: 611,
                type: 'Messages',
                icon: 'envelope'
            }
        },
        {
            xtype: 'widget-e',
            containerColor: 'magenta',
            responsiveCls: 'big-33 small-50',
            data: {
                amount: 792,
                type: 'Lines of Code',
                icon: 'code'
            }
        },
        {
            xtype: 'widget-e',
            containerColor: 'orange',
            responsiveCls: 'big-33 small-50',
            data: {
                amount: 637,
                type: 'Users',
                icon: 'plus-circle'
            }
        },
        {
            xtype: 'widget-e',
            containerColor: 'blue',
            responsiveCls: 'big-33 small-50',
            data: {
                amount: 112,
                type: 'Servers',
                icon: 'tasks'
            }
        },
        {
            xtype: 'widget-e',
            containerColor: 'pink',
            responsiveCls: 'big-33 small-50',
            data: {
                amount: 244,
                type: 'Files',
                icon: 'file-text'
            }
        },
        {
            xtype: 'widget-f',
            containerColor: 'cornflower-blue',
            responsiveCls: 'big-50 small-100',
            data: {
                amount: 840,
                type: 'Sales',
                icon: 'shopping-cart'
            }
        },
        {
            xtype: 'widget-f',
            containerColor: 'green',
            responsiveCls: 'big-50 small-100',
            data: {
                amount: 611,
                type: 'Messages',
                icon: 'envelope'
            }
        },
        {
            xtype: 'widget-f',
            containerColor: 'magenta',
            responsiveCls: 'big-50 small-100',
            data: {
                amount: 792,
                type: 'Lines of Code',
                icon: 'code'
            }
        },
        {
            xtype: 'widget-f',
            containerColor: 'pink',
            responsiveCls: 'big-50 small-100',
            data: {
                amount: 244,
                type: 'Files',
                icon: 'file-text'
            }
        }
    ]
});
