Ext.define('KitchenSink.view.charts.financial.CandlestickController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.financial-candlestick',

    onRefresh: function () {
        var chart = this.lookupReference('chart'),
            store = chart.getStore();

        store.refreshData();
    },

    onModeToggle: function (segmentedButton, button, pressed) {
        var chart = this.lookupReference('chart'),
            interactions = chart.getInteractions(),
            panzoom = interactions[0],
            crosshair = interactions[1],
            value = segmentedButton.getValue(),
            isCrosshair = value === 0;

        crosshair.setEnabled(isCrosshair);
        panzoom.setEnabled(!isCrosshair);
        panzoom.setZoomOnPanGesture(value === 2);
    },

    onPanZoomReset: function () {
        var chart = this.lookupReference('chart'),
            axes = chart.getAxes();

        axes[0].setVisibleRange([0, 1]);
        axes[1].setVisibleRange([0, 0.3]);

        chart.redraw();
    },

    onThemeSwitch: function () {
        var chart = this.lookupReference('chart'),
            currentThemeClass = Ext.getClassName(chart.getTheme()),
            themes = Ext.chart.theme,
            themeNames = [],
            currentIndex = 0,
            name;

        for (name in themes) {
            if (Ext.getClassName(themes[name]) === currentThemeClass) {
                currentIndex = themeNames.length;
            }
            if (name !== 'Base' && name.indexOf('Gradients') < 0) {
                themeNames.push(name);
            }
        }
        chart.setTheme(themes[themeNames[++currentIndex % themeNames.length]]);
        chart.redraw();
    },

    onAfterRender: function () {
        this.onRefresh();
    }

});