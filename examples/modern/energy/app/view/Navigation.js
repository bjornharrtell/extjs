Ext.define("EnergyApp.view.Navigation", {
    extend: "Ext.dataview.NestedList",
    requires: ['Ext.chart.axis.Category'],
    xtype: 'navigation',
    id: 'navigation',
    config: {
        toolbar: {
            id: 'navigationBar'
        },
        backButton: Ext.os.is.Phone ? {
            style: 'font-size: smaller'
        } : {},
        store: "NavigationStore",
        docked: 'left',
        useTitleAsBackText: false,
        displayField: 'label',
        title: 'Category'
    },
    constructor: function () {
        this.callSuper(arguments);
        //this.setHidden(!Ext.os.is.Phone && Ext.Viewport.getOrientation() === 'portrait');
    }
});
