Ext.define('Admin.view.charts.ChartBase', {
    extend: 'Ext.Panel',

    cls: 'quick-graph-panel shadow',

    height: 300,
    ui: 'light',
    layout: 'fit',

    platformConfig: {
        classic: {
            headerPosition: 'bottom'
        },
        modern: {
            header: {
                docked: 'bottom'
            }
        }
    },

    defaults: {
        width: '100%'
    }
});
