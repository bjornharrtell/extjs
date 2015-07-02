Ext.define('KitchenSink.view.charts.line.ImageMarkersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.line-markers',

    onRefresh: function () {
        var chart = this.lookupReference('chart'),
            store = chart.getStore();

        store.refreshData();
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

    onPanZoomReset: function () {
        var chart = this.lookupReference('chart'),
            axes = chart.getAxes();

        axes[0].setVisibleRange([0, 1]);
        axes[1].setVisibleRange([0, 1]);
        chart.redraw();
    },

    onAxisRangeChange: function (axis, range) {
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        var max = range[1];
        if (max >= 1000) {
            range[1] = max - max % 100 + 100;
        } else {
            range[1] = max - max % 50 + 50;
        }
    },

    onAfterRender: function () {
        var chart = this.lookupReference('chart'),
            toolbar = this.lookupReference('toolbar'),
            panzoom = chart.getInteractions()[0];

        toolbar.add(panzoom.getModeToggleButton());
    }

});