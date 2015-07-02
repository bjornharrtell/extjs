Ext.define('Admin.view.widgets.WidgetF', {
    extend: 'Admin.view.widgets.WidgetE',
    xtype: 'widget-f',

    cls:'admin-widget info-card-item info-card-large-wrap shadow-panel',

    height: 280,

    tpl: '<div><span class="x-fa fa-{icon}"></span><h2>{amount}</h2><div class="infodiv">{type}</div></div>'
});
