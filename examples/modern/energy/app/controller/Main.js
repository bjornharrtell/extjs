Ext.define('EnergyApp.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: ['ChartStore', 'YearStore', 'NavigationStore'],

    config: {
        refs: {
            main: "#main",
            nav: '#navigation',
            navButton: '#navigationButton',
            chartView: '#chartView',
            viewport: '#ext-viewport'
        },
        control: {
            nav: {
                leafitemtap: 'onNavTap'
            },
            navButton: {
                tap: 'showNav'
            },
            viewport: {
                orientationchange: 'onOrientationChange'
            },
            "#prevButton": {
                tap: "prev"
            },
            "#nextButton": {
                tap: "next"
            }
        }
    },

    prev: function () {
        this.getChartView().previous();
    },

    next: function () {
        this.getChartView().next();
    },
    
    launch: function () {
        this.onOrientationChange(Ext.Viewport, Ext.Viewport.getOrientation());
    },

    showNav: function () {
        this.getMain().getSheet().show();
    },

    onNavTap: function (buttonx, list, index, item) {
        var me = this,
            record = list.getStore().getAt(index),
            mainView = me.getMain(),
            mainRegion = mainView.getMainRegion(),
            mainViewDocked = mainView.getNavigationDocked(),
            chartView = me.getChartView(),
            type = record.parentNode.data.key,
            state = record.data.key;

        mainRegion.setActiveItem(chartView, 'slide');
        mainView.setTitle(record.get('label'));
        Ext.getCmp('prevButton').setDisabled(true);
        Ext.getCmp('nextButton').setDisabled(true);

        if (!mainViewDocked) {
            this.getMain().getSheet().hide();
        }

        Ext.Ajax.request({
            url: 'resources/data/' + type + "_" + state + ".json",
            success: function (response, opts) {
                // decode responseText in order to create json object
                var data = Ext.decode(response.responseText);

                // load it into the charts store: this will update the area series
                Ext.getStore('ChartStore').setData(data.items);

                // reset chart's legend and axes when category changes
                if (this.oldType !== type) {
                    var areaChart = chartView.down('area chart'),
                        areaChartAxes = Ext.ComponentQuery.query('axis', areaChart);
                    for (var i = 0; i < areaChartAxes.length; i++) {
                        areaChartAxes[i].setVisibleRange([0, 1]);
                    }
                    areaChart.redraw();
                    areaChart.resetLegendStore();
                }

                EnergyApp.app.loadPieAtYear();
                Ext.getCmp('prevButton').setDisabled(chartView.getActiveIndex() === 0);
                Ext.getCmp('nextButton').setDisabled(chartView.getActiveIndex() === chartView.getMaxItemIndex());

                this.oldType = type;
            },
            failure: function (response) {
                mainView.setMasked({
                    msg: 'Failed loading!'
                });
            },
            scope: this
        });
    },

    onOrientationChange: function (viewport, orientation) {
        this.getMain().orientate(orientation);
    }
});