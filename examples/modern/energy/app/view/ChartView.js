Ext.define("EnergyApp.view.ChartView", {
    extend: "Ext.carousel.Carousel",
    xtype: 'chartview',
    config: {
        tabBar: {
            docked: 'top',
            layout: {
                pack: 'center'
            }
        },
        ui: 'light',
        items: Ext.os.is.Phone ? [
            {
                xtype: 'area'
            },
            {
                xtype: 'line'
            }
        ] : [
            {
                xtype: 'area'
            },
            {
                xtype: 'line'
            },
            {
                xtype: 'year'
            }
        ]
    },
    doSetActiveItem: function (activeItem) {
        Ext.getCmp('prevButton').setDisabled(this.getActiveIndex() === 0);
        Ext.getCmp('nextButton').setDisabled(this.getActiveIndex() === this.getMaxItemIndex());
        this.callSuper(arguments);
    }
});