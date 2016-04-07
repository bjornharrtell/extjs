Ext.define('Admin.view.widgets.WidgetE', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-e',

    cls: 'admin-widget-small sale-panel info-card-item shadow',

    containerColor: '',

    height: 170,

    data: {
        amount: 0,
        type: '',
        icon: ''
    },

    tpl: '<div><h2>{amount}</h2><div>{type}</div><span class="x-fa fa-{icon}"></span></div>',

    initComponent: function(){
        var me = this;

        Ext.apply(me, {
            cls: me.config.containerColor
        });

        me.callParent(arguments);
    }
});
